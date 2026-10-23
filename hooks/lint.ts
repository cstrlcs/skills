import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { Glob } from "bun";

const skillsDirectory = process.argv[2] ?? join(import.meta.dir, "..", "skills");
const skippedDirectories = new Set(["synced"]);

const knownKeys = new Set([
  "name",
  "description",
  "argument-hint",
  "disable-model-invocation",
  "user-invocable",
  "allowed-tools",
  "license",
  "compatibility",
  "metadata",
  "when_to_use",
  "context",
  "agent",
  "model",
  "effort",
  "paths",
  "hooks",
]);

const errors: string[] = [];
const warnings: string[] = [];

const parseFrontmatter = (text: string) => {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);

  if (!match) {
    return;
  }

  const fields = new Map<string, string>();

  for (const line of match[1].split("\n")) {
    const field = /^([A-Za-z_-]+):\s*(.*)$/.exec(line);

    if (field) {
      fields.set(field[1], field[2].replaceAll(/^["']|["']$/g, ""));
    }
  }

  return { fields, body: text.slice(match[0].length) };
};

const markdownLinks = (text: string) => {
  const withoutCode = text.replaceAll(/```[\s\S]*?```/g, "").replaceAll(/`[^`\n]*`/g, "");

  return [...withoutCode.matchAll(/\]\(([^)\s]+)\)/g)]
    .map((match) => match[1].split("#")[0])
    .filter((target) => target && !/^[a-z]+:/i.test(target));
};

const skills = readdirSync(skillsDirectory, { withFileTypes: true }).filter(
  (entry) => entry.isDirectory() && !entry.name.startsWith(".") && !skippedDirectories.has(entry.name),
);

for (const { name: folder } of skills) {
  const directory = join(skillsDirectory, folder);
  const skillPath = join(directory, "SKILL.md");
  const at = (path: string) => relative(skillsDirectory, path);

  if (!existsSync(skillPath)) {
    errors.push(`${folder}/: missing SKILL.md`);

    continue;
  }

  const parsed = parseFrontmatter(readFileSync(skillPath, "utf8"));

  if (!parsed) {
    errors.push(
      `${at(skillPath)}: missing frontmatter; open the file with --- name/description --- block`,
    );

    continue;
  }

  const { fields, body } = parsed;
  const name = fields.get("name") ?? "";
  const description = fields.get("description") ?? "";

  if (name !== folder) {
    errors.push(`${at(skillPath)}: name "${name}" must match the folder name "${folder}"`);
  }

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) {
    errors.push(
      `${at(skillPath)}: name must be 1-64 lowercase letters, digits, and single hyphens`,
    );
  }

  if (description.length === 0 || description.length > 1024) {
    errors.push(
      `${at(skillPath)}: description must be 1-1024 characters (has ${description.length})`,
    );
  }

  if (/[<>]/.test(description)) {
    errors.push(`${at(skillPath)}: description must not contain < or >`);
  }

  if (description.length + (fields.get("when_to_use") ?? "").length > 1536) {
    warnings.push(
      `${at(skillPath)}: description plus when_to_use exceeds 1,536 characters; Claude Code truncates the listing`,
    );
  }

  for (const key of fields.keys()) {
    if (!knownKeys.has(key)) {
      warnings.push(
        `${at(skillPath)}: unknown frontmatter key "${key}"; check the host docs or remove it`,
      );
    }
  }

  const bodyLines = body.split("\n").length;

  if (bodyLines > 500) {
    errors.push(
      `${at(skillPath)}: body has ${bodyLines} lines; keep it under 500 and move reference into linked files`,
    );
  }

  const markdownFiles = [...new Glob("**/*.md").scanSync({ cwd: directory })];

  for (const file of markdownFiles) {
    const path = join(directory, file);
    const text = readFileSync(path, "utf8");

    for (const [block] of text.matchAll(/```![\s\S]*?```/g)) {
      if (/~\/\.claude\b/.test(block)) {
        errors.push(
          `${at(path)}: shell block hardcodes ~/.claude; use "\${CLAUDE_CONFIG_DIR:-$HOME/.claude}" so it works with CLAUDE_CONFIG_DIR`,
        );
      }
    }

    for (const target of markdownLinks(text)) {
      if (target.startsWith("/") || target.startsWith("~")) {
        continue;
      }

      if (!existsSync(join(dirname(path), decodeURIComponent(target)))) {
        errors.push(`${at(path)}: broken link to ${target}`);
      }
    }
  }
}

for (const warning of warnings) {
  console.log(`warning: ${warning}`);
}

for (const error of errors) {
  console.log(`error: ${error}`);
}

console.log(
  `${skills.length} skills checked: ${errors.length} errors, ${warnings.length} warnings`,
);
process.exit(errors.length > 0 ? 1 : 0);
