---
name: develop
description: Implements, debugs, refactors, and verifies software across backend, frontend, data, and infrastructure. Use for software changes, not investigation-only or review-only requests.
---

# Developer

Deliver the requested behavior with the smallest coherent change that fits the project.

## Understand

Establish the expected behavior and the affected call path before editing. For bugs, reproduce the failure before fixing it when practical.

Read references when their branch applies:

- Large tasks with independent implementation workstreams: follow [delegation](references/delegation.md) when subagents are available; keep small or tightly coupled tasks with the main agent.
- Writing or changing tests: read [testing](references/testing.md) first; follow its test-first workflow when the user asks for test-driven development.
- Unclear cause, failed fix, intermittent bug, or performance regression: follow [debugging](references/debugging.md), establishing its feedback loop before forming hypotheses.
- Building or changing a user interface (pages, screens, markup, styles, interface copy, focus or input handling): read [frontend and UI](references/frontend-ui.md) before writing it, then the branch files it links.
- APIs, persistence, migrations, events, distributed workflows, background work, integrations, or runtime changes: [services and data](references/services-and-data.md).

## Implement

- Use guard clauses: handle each exit case first with an early return or throw, then write the main path unindented. Apply this even when the main path is a single statement, so every function reads the same way: conditions that stop it at the top, the work below. A ternary or `else` that picks between outcomes is the shape to replace.
- Write a single-use expression inline at its call site. Extract a named function only when it is reused, wraps logic too long to read in place, or is tested on its own, because a one-line wrapper sends the reader elsewhere to learn what the expression already says. Add abstractions only for existing shared behavior, a real boundary, or a demonstrated testing need.
- Name a value after the parameter or property it fills when that name still describes it, and pass it with shorthand: `const base = …` then `{ base }`, not `const projectsBase = …` then `base: projectsBase`. Add a qualifier only for information the surrounding code does not already give, such as telling apart two values in the same scope, because an alias makes the reader map two names to one thing.
- These style rules govern the lines you write. Leave surrounding code and its existing comments as they are unless your change makes them wrong, because restyling untouched code buries the change in the diff.
- Validate untrusted input at its boundary and trust it past that point; handle errors only where they can occur and a caller can act on them, preserving error context and cleanup.
- When a change needs a new dependency, confirm the exact package in its registry (name, publisher, age, install scripts) and pin it through the lockfile, because agents are prone to hallucinated and typosquatted package names.
- Update affected contracts, configuration examples, and documentation.

## Verify and deliver

Run the project's relevant checks: formatting, lint, types, tests, and build. Before finishing, confirm every changed line traces to the request or a stated scope expansion. For explicit acceptance criteria, map each one to the verification that shows it met; passing general checks alone does not establish acceptance. Finish when the behavior is verified, or state exactly what remains unverified and why.

Report the resulting behavior, the interpretations you chose where the request was ambiguous, any scope expansion and why, the checks you ran, and material limitations.
