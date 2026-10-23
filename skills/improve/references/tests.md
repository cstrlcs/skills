# Tests area

Find where the test suite costs more than the confidence it gives, and where critical behavior has none. Judge tests against develop's [testing reference](../../develop/references/testing.md), which defines seams, levels, mocking, and honest tests; read it first. Coverage percentage is not evidence either way.

## Baseline

Run the scoped suite once and record the command, duration, failures, and skipped tests. Rerun the failures alone to tell flaky from broken. Note the slowest tests from the runner's report.

## Explore

- **Coupled tests:** mocks of internal collaborators, assertions on call counts or order, private state, or storage queried past the interface. Solution: rewrite at the seam.
- **Tautological tests:** expected values recomputed with the implementation's own logic, or broad snapshots of whole outputs.
- **Redundant tests:** behavior already pinned at another seam or by the type checker, including unit tests left over after a module was deepened. Solution: delete, naming the test that keeps the behavior pinned.
- **Worthless tests:** tests whose failure could not reveal a bug in the project's code, as listed under "Choose the level" in the testing reference. Solution: delete.
- **Mocks that could be real:** a mocked database, query layer, or own HTTP layer where a local stand-in or in-memory adapter exists.
- **Tests that cannot fail:** for the few tests guarding the riskiest behavior, break that behavior (flip a condition, drop a branch) and run them; a test that stays green is a candidate. Make these edits in a temporary git worktree, or in a scratch copy when the scope has uncommitted changes or no repository, never in the user's checkout, because a parallel or interrupted run would leave broken code behind.
- **Wrong level:** logic reachable only through slow end-to-end tests, browser-dependent UI behavior tested in a simulated DOM, or many trivial variants run end to end.
- **Slow or flaky tests:** sleeps, real time, shared state, order dependence, or network calls.
- **Layout:** an inconsistent layout or naming convention, or one that contradicts the project's instructions. Solution: propose consolidating the suite as a separate change.
- **Gaps:** critical behavior (money, auth, data loss, recent bug fixes found in `git log`) with no test at a seam.

Give each candidate its evidence: test names with paths, the mutation that stayed green, timings, or the duplicate test, plus the expected change in test count and suite time. Compute any expected value you quote by running the code, not by hand.

## After the choice

The user's choice authorizes the change, because test changes leave production behavior untouched; load the `develop` skill through the Skill tool, or your runtime's equivalent, and implement it with its testing reference. New tests need agreed seams; replacements and deletions keep every behavior pinned by at least one test. Rerun the scoped suite and report test count and duration before and after.
