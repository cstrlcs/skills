import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join, relative, resolve } from "node:path";

interface HookInput {
  session_id: string;
  cwd: string;
  tool_input?: Record<string, unknown>;
  permission_mode?: string;
  last_assistant_message?: string | null;
}

interface Failure {
  command: string;
  directory: string;
  output: string;
}

const codeExtensions = new Set([
  ".ts",
  ".tsx",
  ".mts",
  ".cts",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".vue",
  ".svelte",
  ".astro",
]);

const typecheckScripts = ["typecheck", "type-check", "check-types", "tsc"];

const lockfileRunners: [string, string][] = [
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["package-lock.json", "npm"],
];

const maxBlocks = 3;
const maxReasonLength = 6000;
const mode = process.argv[2];
const input: HookInput = await Bun.stdin.json();
const stateDirectory = join(tmpdir(), "agent-verify");
const filesPath = join(stateDirectory, `${input.session_id}.files`);
const blocksPath = join(stateDirectory, `${input.session_id}.blocks`);

function findUp(start: string, matches: (directory: string) => boolean): string | undefined {
  for (let directory = start; ; directory = dirname(directory)) {
    if (matches(directory)) {
      return directory;
    }

    if (dirname(directory) === directory) {
      return undefined;
    }
  }
}

function run(command: string[], directory: string) {
  const result = Bun.spawnSync({
    cmd: command,
    cwd: directory,
    env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0", CI: "1" },
  });

  return { ok: result.exitCode === 0, output: `${result.stdout}${result.stderr}`.trim() };
}

function format(files: string[]) {
  for (const file of files) {
    const oxfmt = findUp(dirname(file), (candidate) => existsSync(join(candidate, "node_modules/.bin/oxfmt")));

    if (oxfmt) {
      run([join(oxfmt, "node_modules/.bin/oxfmt"), "--no-error-on-unmatched-pattern", file], oxfmt);
    }
  }
}

function packageScripts(directory: string): Record<string, string> {
  return JSON.parse(readFileSync(join(directory, "package.json"), "utf8")).scripts ?? {};
}

function check(files: string[]): Failure[] {
  const packages = new Map<string, string[]>();

  for (const file of files.filter((file) => codeExtensions.has(extname(file)))) {
    const directory = findUp(dirname(file), (candidate) => {
      if (!existsSync(join(candidate, "package.json"))) {
        return false;
      }

      const scripts = packageScripts(candidate);

      return "lint" in scripts || typecheckScripts.some((name) => name in scripts);
    });

    if (!directory) {
      continue;
    }

    packages.set(directory, [...(packages.get(directory) ?? []), file]);
  }

  return [...packages].flatMap(([directory, packageFiles]) => {
    const scripts = packageScripts(directory);
    const runner =
      lockfileRunners.find(([lockfile]) =>
        findUp(directory, (candidate) => existsSync(join(candidate, lockfile))),
      )?.[1] ?? "npm";
    const names = [
      typecheckScripts.find((name) => name in scripts),
      "lint" in scripts ? "lint" : undefined,
    ].filter((name) => name !== undefined);

    return names.flatMap((name) => {
      const { ok, output } = run([runner, "run", name], directory);
      const mentionsEditedFile = packageFiles.some(
        (file) => output.includes(file) || output.includes(relative(directory, file)),
      );

      if (ok || !mentionsEditedFile) {
        return [];
      }

      return [{ command: `${runner} run ${name}`, directory, output }];
    });
  });
}

if (mode === "record") {
  const path = input.tool_input?.file_path ?? input.tool_input?.notebook_path;

  if (typeof path !== "string") {
    process.exit(0);
  }

  mkdirSync(stateDirectory, { recursive: true });
  appendFileSync(filesPath, `${resolve(input.cwd, path)}\n`);
  process.exit(0);
}

if (mode !== "stop") {
  console.error(`Unknown mode "${mode}"; use "record" or "stop".`);
  process.exit(1);
}

if (input.permission_mode === "plan" || !existsSync(filesPath)) {
  process.exit(0);
}

const files = [...new Set(readFileSync(filesPath, "utf8").split("\n"))].filter(
  (file) => file && existsSync(file),
);

format(files);

const failures = check(files);
const blocks = existsSync(blocksPath) ? Number(readFileSync(blocksPath, "utf8")) : 0;
const asksUser = (input.last_assistant_message ?? "").replace(/[\s*_`)"'>\]]+$/, "").endsWith("?");
const outcome =
  failures.length === 0 ? "pass" : asksUser ? "question" : blocks >= maxBlocks ? "cap" : "block";
const failingCommands = failures.map((failure) => failure.command);

if (outcome === "pass") {
  rmSync(filesPath, { force: true });
  rmSync(blocksPath, { force: true });
  process.exit(0);
}

if (outcome === "question") {
  console.log(
    JSON.stringify({
      systemMessage: `Edited files still fail ${failingCommands.join(", ")}; not blocking because the agent stopped to ask a question.`,
    }),
  );
  process.exit(0);
}

if (outcome === "cap") {
  rmSync(filesPath, { force: true });
  rmSync(blocksPath, { force: true });
  console.log(
    JSON.stringify({
      systemMessage: `Edited files still fail ${failingCommands.join(", ")} after ${maxBlocks} attempts; the turn ended anyway.`,
    }),
  );
  process.exit(0);
}

writeFileSync(blocksPath, String(blocks + 1));

const report = failures
  .map((failure) => `$ ${failure.command}  (in ${failure.directory})\n${failure.output}`)
  .join("\n\n");
const reason = `Checks failed on files edited this turn. Fix the reported problems in those files, rerun the failing command, then finish.\n\n${report}`;

console.log(JSON.stringify({ decision: "block", reason: reason.slice(0, maxReasonLength) }));
