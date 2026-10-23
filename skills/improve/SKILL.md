---
name: improve
description: Finds improvement opportunities in a codebase's architecture, test suite, or rendered UI, presents ranked candidates, and drives the chosen one. Use when the user wants to improve codebase structure, deepen modules, make code more testable, slim down or strengthen a test suite, or find what most needs fixing in an existing UI.
argument-hint: "[codebase|tests|ui] [path or focus]"
---

# Improve

Find the changes that most improve how easily the code can be changed and verified, or how well its UI serves the people using it, present them as ranked candidates, and pursue the one the user chooses.

## 1. Choose areas and scope

Take the first word of the arguments as the area and the rest as the scope: a path, module, or pain point. When the first word names no area, the whole argument is the scope. Without arguments, take the area and scope from the user's request, choosing the areas whose "Looks for" matches it. Cover every area when neither the arguments nor the request select one; skip `ui` when the scope renders no UI (web pages, components, or native screens).

| Area | Looks for | Brief |
|---|---|---|
| `codebase` | Shallow modules, leaky seams, and interfaces that make behavior hard to test | [codebase](references/codebase.md) |
| `tests` | Tests that cost more than the confidence they give, and critical behavior left untested | [tests](references/tests.md) |
| `ui` | UI that fails its users or drifts from its own system: floor failures, missing states, weak hierarchy, unclear copy, inconsistent tokens or components, and design that could belong to any product | [ui](references/ui.md) |

Without a named scope, prioritize code that changes often, because improvements pay off in future changes: walk back a substantial stretch of history with `git log --oneline`, inspect the affected paths, and widen the search when changes are scattered. If history is unavailable, use the available project context and state that limitation.

Read the project's domain glossary (`CONTEXT.md` when present) and relevant ADRs (`docs/adr/` when present), following the project's own documentation locations when they differ, and use the domain language throughout. When `codebase` or `tests` is selected, also read [codebase design](references/codebase-design.md) and use its design vocabulary (module, interface, implementation, depth, seam, adapter, leverage, locality) for those areas.

## 2. Explore

Spawn one subagent per selected area, in parallel, with `model: "sonnet"`, because you verify every candidate against the code yourself. When the scope is a few files you would read anyway to verify, explore it yourself and say so. Give each its brief's path, the scope, the domain language, and the relevant ADRs, plus the design vocabulary for `codebase` and `tests`, and list the brief's required steps in the prompt (for `tests`: the baseline, isolated reruns of failures, and the mutation check), because explorers skip steps that only the brief names. Ask each to return candidates in the shape of step 3 with the evidence behind each, and wait for their results in this turn.

While they work, inspect the callers, dependencies, and tests you need to judge their findings. Verify each returned candidate against the code before presenting it, drop any that do not hold, and merge candidates that two areas found for the same code. Exploration is complete when every area has returned verified candidates or an explicit finding that nothing in the scope is worth changing.

## 3. Present candidates

Present one numbered list in the conversation, ranked by payoff across areas. For each candidate include:

- **Area:** `codebase`, `tests`, or `ui`, when more than one area ran.
- **Files:** the modules, paths, or tests involved.
- **Problem:** concrete friction found during exploration, with its evidence.
- **Solution:** a plain-language description of what would change.
- **Benefits:** gains in locality, leverage, confidence, test time and maintenance, or, for `ui`, the tasks and people it helps.
- **Recommendation strength:** `Strong`, `Worth exploring`, or `Speculative`, with the reason.

Name things in the project's domain vocabulary: if the glossary defines “Order,” say “the Order intake module,” rather than an incidental class name.

Surface an ADR conflict only when observed friction warrants reopening the decision. Identify the ADR and explain why; omit refactors an ADR forbids without that evidence.

End with the candidate you recommend first and why. Do not propose interfaces yet. Ask which candidate the user wants to pursue, then wait for their choice. When you ask through a structured question tool, put each candidate's one-line problem and solution inside its option, because the tool can hide the text written beside it until the user answers. If no worthwhile candidate emerges, report that with the explored scope rather than inventing one.

## 4. Pursue the chosen candidate

Follow the "After the choice" section of the chosen candidate's area brief.
