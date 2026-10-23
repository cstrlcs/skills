---
name: review
description: Reviews diffs, branches, pull requests, or named code and documentation scopes for requirements, project standards, and concrete defects. Use for reviews or audits; remain read-only unless fixes are requested.
---

# Reviewer

Report the concrete, reachable defects in a change or a named scope. Leave project files unchanged unless fixes are requested.

## Scope

Review the change against the requested base, from the merge-base for a branch; for unspecified current work, include staged, unstaged, and untracked files. For an audit, review the named scope. State the base and scope you used.

For a change, report only issues it introduces or directly affects. An issue that exists unchanged on the base is out of scope, even as a side note, because it buries the change's own findings.

Check the change against its spec when one exists (a supplied path, a matching spec in the repository, or one named in the conversation) and against documented project standards such as `CODING_STANDARDS.md`, `CONTRIBUTING.md`, or `AGENTS.md`. Load a reference when its branch applies:

- Bug or performance fixes: [bug fixes](references/bug-fixes.md).
- Trust boundaries, identity, sensitive data, persistence, distributed work, deployment, or recovery: [security and reliability](references/security-and-reliability.md).
- Tests, hot paths, data access, concurrency, rendering, resource use, or performance claims: [performance and testing](references/performance-and-testing.md).
- Interface changes (markup, styles, interface copy, focus or input handling, native views): the [frontend and UI floor](../develop/references/frontend-ui.md), including its review section; also [motion](../develop/references/motion.md) for animation or gestures, [native UI](../develop/references/native-ui.md) for iOS or Android, and [Tailwind](../develop/references/tailwind.md) for Tailwind classes.

When the diff exceeds about 2,000 changed lines or does not fit comfortably in your context, launch one scanning subagent per subsystem, in parallel, with `model: "sonnet"`. Give each one the base, its files, the documents and references that apply, and the finding format, and ask for candidate findings only. Stay the reviewer: verify every candidate yourself before reporting it (reread the code path, reproduce the Blocker and High ones, drop what you cannot confirm), and look across slices for defects no single slice shows. Below that size, review alone, because splitting costs about three times as much for the same recall.

## Findings

Each finding needs a `path:line`, a concrete trigger (the inputs and steps that reproduce it), the observable impact, a proportional fix, and a severity set by impact and reachability, not by the pattern's name:

- **Blocker:** immediate compromise, data corruption or loss, severe outage, or fundamentally broken central behavior.
- **High:** likely failure in an important flow or a missing essential safeguard.
- **Medium:** concrete, limited behavioral or maintenance impact.
- **Low:** small improvement with demonstrated value.

Tag each finding **Spec**, **Standards**, or **Correctness**. Quote the requirement a Spec finding misses and the documented rule a Standards finding breaks. Beyond documented rules, report design problems the change introduces, such as Fowler's code smells or code it leaves dead, as Standards findings labeled judgment calls; documented rules override them, and checks the project's tooling enforces stay out. Code reshaped to slip past those checks does not: report `void` on a promise that can reject, an unused value renamed with `_`, `as unknown as` or other double casts, `@ts-expect-error`, a re-export re-declared as a local binding or a copied function, a helper that moves branches without removing any, a TODO or FIXME deleted while its bug remains, and a rule disabled or loosened in config without a reason. Tag them Standards, or Correctness when the hidden diagnostic was a real bug. Leave out preferences and speculative future risks, and keep unanswered questions apart from findings.

For a Blocker, High, or uncertain defect, attempt a safe local check that fails on the predicted symptom: a test at the failure boundary, a request, or a run against the base and the change, with throwaway files outside the worktree. Label the evidence of every finding, test-gap and Standards findings included, **Reproduced**, with the command and its relevant output, or **Traced**, with the static reasoning. Replace secrets with `<REDACTED>`.

## Report

List findings from most to least severe. When no spec or no documented standards exist, say so in one line instead of an empty section. When the change looks risky in a way you checked and ruled out, say what still holds in one line, so a clean result reads as checked rather than skipped. End with the assumptions and verification gaps that could change a finding.
