# Implementation delegation

Use subagents with fresh contexts for independent workstreams in a large task when delegation is available. Keep tightly coupled work together; delegate only when the saved context or parallel progress outweighs coordination cost.

1. Establish shared contracts and dependencies before dispatch. Give each workstream a bounded goal, acceptance criteria, and ownership of non-overlapping files. Assign shared files to one owner and sequence work that depends on unsettled contracts.
2. Give each subagent only the context needed for its assignment: relevant project instructions and skills, specification or design references, shared contracts, owned paths, existing behavior, and required checks. A fresh context must still carry the user's applicable constraints and authorization.
3. Keep integration decisions with the coordinator. Communicate contract changes to affected agents before dependent edits, and preserve unrelated work in shared checkouts.
4. Require a compact handoff with changed files, resulting behavior, executed checks and results, and remaining gaps or decisions.
5. Inspect the combined changes, resolve integration issues, and verify the complete user flow against the acceptance criteria. Individual agents' passing checks do not establish that their changes work together. Finish only when the combined behavior is verified or the remaining gaps are explicitly reported.
