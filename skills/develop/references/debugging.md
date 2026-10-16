# Debugging

Follow these phases in order for hard bugs and performance regressions. Justify any skipped phase explicitly; establish the feedback loop before forming hypotheses.

Read the relevant code and design decisions. Keep credentials in environment variables. Before sharing commands, output, or artifacts, replace secrets with `<REDACTED>` and quote only the lines needed for diagnosis. If redacted evidence is insufficient, say what is missing and ask the user.

## 1. Build a feedback loop

Build a check that exercises the reported symptom. Try, in roughly this order: a failing test, HTTP request, CLI fixture, browser script, trace replay, minimal harness, property/fuzz loop, bisection harness, or differential run. As a last resort, use numbered manual steps with specific observations the user can report.

Tighten the loop: narrow setup and scope, assert the exact symptom, and control time, randomness, and external dependencies. For intermittent failures, increase and record reproduction frequency through repetition, concurrency, stress, or controlled timing.

This phase is complete only after running one command and showing its invocation and redacted output. The check must:

- Fail on the user's exact symptom in the actual code path, and pass once fixed.
- Give a deterministic result, or a pinned high reproduction rate for intermittent bugs.
- Run in seconds rather than minutes.
- Run unattended, except for the structured manual fallback.

If no loop can be built, stop before hypothesizing. List attempts and request the missing environment, a redacted artifact, or authorization for temporary production instrumentation.

## 2. Reproduce and minimize

Confirm the loop repeatedly produces the reported error, wrong output, or slow timing. Remove inputs, callers, configuration, data, and steps one at a time, rerunning after each removal. Finish when every remaining element is necessary to reproduce the failure.

## 3. Form hypotheses

Generate 3–5 ranked hypotheses before testing any, to avoid anchoring on the first plausible cause. Give each a falsifiable prediction: if X is the cause, changing Y should produce Z. Show the ranked list to the user before testing; proceed without waiting for a reply.

## 4. Instrument

Tie each probe to a hypothesis and change one variable at a time. Prefer debugger or REPL inspection; otherwise add targeted logs where predictions differ. Give debug logs a unique prefix so they can be found and removed reliably.

For performance regressions, establish a timing, profile, or query-plan baseline, then bisect. Compare measurements under equivalent conditions.

## 5. Fix and regression-test

Use a test seam that exercises the actual failure at the call site: a concurrency bug needs competing callers, not just one isolated call. If no suitable seam exists, report that the architecture prevents regression coverage.

When a suitable seam exists, turn the minimized reproduction into a test, observe it fail, apply the smallest supported fix, and observe it pass. Then rerun the original, unminimized scenario and relevant checks.

## 6. Clean up and finish

Before finishing, confirm the original scenario no longer fails. Confirm the regression test passes, or report the missing test seam. For intermittent bugs, report repetitions and residual uncertainty.

Search for the unique debug prefix and remove all temporary instrumentation, harnesses, and prototypes. Restore disabled checks and retain useful regression fixtures. Report the confirmed cause and evidence, including them in the commit or PR description when requested.
