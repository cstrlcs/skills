# Reviewing bug fixes

1. Match the change to the reported symptom, including the triggering input or sequence. When feasible, run that scenario before and after the fix; it should fail before and pass after.
2. Trace why the fix removes the cause. Swallowed errors, retries, null checks, or special cases need justification when they conceal a broken invariant. Check that the commit or PR explains the root cause, and verify that explanation against the code path.
3. Require a regression test that fails without the fix and passes with it at a seam exercising the actual call-site failure. A single-caller test cannot establish a concurrency fix; a test that misses the triggering chain is itself a finding. If no suitable seam exists, report the coverage limitation and ensure the PR states that the architecture prevents locking down the bug.
4. For performance claims, compare a baseline and the changed version under equivalent conditions. Treat unmeasured gains as unverified.
5. Check for temporary diagnostics, disabled checks, throwaway harnesses, and seeds, sleeps, or timeouts added only to force a reproduction. Distinguish those leftovers from legitimate deterministic regression fixtures.
