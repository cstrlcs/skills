# Skill mechanics

The skill-specific branch of [`write`](SKILL.md): what changes when the document is a skill (format limits, the invocation choice, and router skills). Everything else about writing it is the universal reference in `SKILL.md`.

## Format

The portable format is the open Agent Skills spec (agentskills.io); hosts may add fields of their own, which other hosts ignore.

After creating or editing a skill in this repository, run `bun hooks/lint.ts` from the repository root and fix every error it reports; it enforces the mechanical rules below.

- `name`: 1 to 64 characters, lowercase letters, digits, and hyphens, with no leading, trailing, or doubled hyphen. It must match the folder name.
- `description`: 1 to 1,024 characters, no XML tags. Write it in the third person ("Extracts…", not "I can…" or "You can…"), because hosts inject it into the system prompt. Put what the skill does first, then when to use it. Hosts truncate descriptions when many skills are installed, so the leading word must come first.
- Body: under 500 lines (roughly 5k tokens). It loads whole when the skill fires and stays in context for the rest of the session.
- Disclosed files are linked straight from `SKILL.md`, one level deep. Agents skim chained references (`SKILL.md` → `a.md` → `b.md`) with partial reads. Open any file longer than about 100 lines with a contents list, so a partial read still shows everything it covers.
- `scripts/` run without being loaded: only their output costs context. A script handles its own errors instead of leaving them for the agent to diagnose, and declares its dependencies.

## Invocation

Two choices, trading the two loads:

- A **model-invoked** skill keeps a `description`, so the agent can fire it autonomously, and other skills can reach it. You can still type its name: model-invocation always _includes_ user reach; a description only ever adds agent discovery, never removes the human's. The description is the skill's top-level context pointer, forced to stay loaded at all times: permanent context load in exchange for discoverability. A model-invoked skill whose content is all reference is also one home for shared reference: another skill can invoke it, so reference needed by several skills lives in one place. Mechanics: leave implicit invocation on (the host default), and write a model-facing description carrying the trigger branches (the pointer-writing rules in `SKILL.md` apply in full).
- A **user-invoked** skill strips the description from the agent's reach: only the human typing its name can invoke it, and no other skill can. Zero context load, but it spends cognitive load: you are the index that must remember it exists. Mechanics: turn implicit invocation off with the host's setting for it; the `description` becomes human-facing: a one-line summary, trigger lists stripped. Use this for anything with side effects (deploy, publish, send).

Pick model-invocation only when the agent must reach the skill on its own, or another skill must. If it only ever fires by hand, make it user-invoked and pay no context load.

Shared reference that two user-invoked skills both need can live in neither: with no descriptions, neither can fire the other. Push it to a plain file outside the skill system: external reference any skill can point at.

## Splitting by invocation

The invocation cut of splitting (the sequence cut lives in `SKILL.md`): split off a model-invoked skill when you have a distinct leading word that should trigger it on its own (a trigger word you actually use in your prompts), or another skill must reach it. You pay context load for the new always-loaded description, so that independent reach has to be worth it.

## Router skills

When user-invoked skills multiply past what you can remember, that piled-up cognitive load is cured by a **router skill**: one user-invoked skill that names the others and when to reach for each, so the human has one skill to remember instead of many. It can only hint, never fire them: user-invoked skills have no description, so nothing but the human can reach them.
