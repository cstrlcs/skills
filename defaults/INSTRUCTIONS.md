# Personal development defaults

## Skill routing

Load `develop` before changing code or configuration, `review` before reviewing or auditing, and `research` before investigating, comparing, planning, or writing documentation. Load the role before the first tool call, and load the new role when the work shifts. Answer direct questions without a role. A skill the user invoked by command (such as `obsidian` or `defer`) defines its own workflow and needs no role, and web searches and buying decisions go to `search` alone. Alongside the role, load any other skill whose description matches the task.

## Tool docs

Before writing, reviewing, or answering about code that depends on a library's, framework's, or tool's API or configuration file (such as `vite.config.ts` or `drizzle.config.ts`), find the version the project uses (lockfile, manifest, or `node_modules/<pkg>/package.json`), then read the docs for that version of every one the work touches, including the ones you know well, and take signatures, options, defaults, configuration, and the recommended patterns from them, because memory lags recent releases and familiar APIs are the ones that change under you (Tailwind 4, Zod 4, Vite 8). A new dependency gets its current version. Sources, in whatever order fits:

- Agent docs shipped inside the installed package (`AGENTS.md`, `docs/`, TanStack Intent `skills/`)
- `llms.txt` or `llms-full.txt` on the docs site
- The docs Markdown in the maintainers' GitHub repository (`gh api`)
- The docs site

Type definitions confirm a signature but are not docs: when the package ships no docs, fetch one of the other sources. When a lookup returns nothing usable, try the next source before writing the code. Fetch only what the task needs. End the reply with each third-party library whose API or configuration the work used and the docs source you read for it, or "memory" where you had none; leave the line out when the work used none.

## Working agreements

- Judge the user's proposed solution against current best practices before adopting it. When you disagree, say so before acting: give the reason, the evidence, and the alternative you recommend, then follow the user's decision. Agree only when you actually agree.
- Resolve routine choices from repository evidence. Ask only when an unresolved choice materially affects behavior, scope, security, data, or a public contract.
- Prefer the simplest correct solution that is not a hack: the smallest coherent change that fixes the cause and fits existing conventions. Add scripts, tests, options, arguments, or extra checks only when the task cannot work without them or the user asks, because each one is more for the user to read and maintain. Preserve unrelated work and avoid opportunistic cleanup.
- Make each requested change as if the project had always worked that way: replace the old behavior outright, and leave out compatibility layers, code that repairs state left by earlier versions, and notes in docs about what changed. When the change will break existing data, setups, or users, or leaves something that needs undoing, ask before making it.
- Do not write code comments, not even ones explaining why. Put intent in names and structure instead. Do not write JSDoc unless the user requests it.
- When a task will run unattended for a long time (background agents, long builds or test suites), keep the machine awake for the expected duration plus a margin (`caffeinate -dimsu -t <seconds>` on macOS, `systemd-inhibit --what=idle:sleep sleep <seconds>` on Linux, in the background), so the machine does not sleep mid-task.
- Use authoritative, current sources for version-sensitive or external facts.
- Run relevant checks and report executed verification separately from recommendations.
- Do not commit, push, publish, deploy, or perform destructive actions unless the user requested or authorized them.
- Write each commit message as one short Conventional Commits subject line in English, with no body and no trailers, for example `feat: rate limit login attempts by ip`.
