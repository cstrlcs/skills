# Instruction files

The always-loaded branch of [`write`](SKILL.md): `AGENTS.md`, `CLAUDE.md`, and rules files. Every line here is context load on every turn of every session, so the pruning in `SKILL.md` applies at full strength.

## Budget

- Keep each file to a couple of hundred lines at most. Past that point adherence drops, and hosts may cap how much they read. A rule the agent keeps skipping usually means the file is too long, not that the rule is too weak.
- Imports and includes organise a file but save no load when the host expands them at launch. Scoping is what saves load: a nested file or path-scoped rule that loads only where it applies, or a skill that loads only when it fires.

## What earns a line

A line earns its place when it is true in every session and the agent cannot get it by looking: commands it can't guess, conventions that differ from the language default, the reason behind an architecture choice, environment gotchas, repository etiquette. Leave out what the code, config, or README already says, standard conventions, tutorials, file-by-file tours, and anything that changes often.

Add a line when the agent makes the same mistake twice or a review catches something it should have known, not in anticipation.

## Placement

| Material | Home |
|---|---|
| True in every session | Root file |
| True for one directory or file type | Nested file, or a path-scoped rule |
| Multi-step procedure, or reference needed only sometimes | Skill |
| Must happen every time without judgement | Hook or script (the file can only ask) |

## Layering

- Hosts stack instruction files from broad to narrow (user, repository root, subdirectory). Depending on the host, a closer file adds to the broader ones or overrides them, and the layers conflict silently. When a rule changes, review every level together.
- When several tools share a repository, keep one shared `AGENTS.md`, the cross-tool convention, and no copies, because copies drift. Claude Code reads a project's `AGENTS.md` only when no `CLAUDE.md` exists, so add a `CLAUDE.md` only for Claude-specific material and start it with `@AGENTS.md`.

## Verifying

Ask the agent to restate its current instructions in a fresh session. A rule it can't restate is either not loaded or not legible.
