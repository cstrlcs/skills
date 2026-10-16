---
name: interview
description: Interviews the user to clarify and stress-test a plan, decision, or idea. Use when the user asks to be interviewed, challenged, or grilled; ordinary implementation requests need only routine clarification.
---

# Interview

Resolve every decision within the agreed scope through focused questions. Challenge assumptions with evidence and tradeoffs, while leaving decisions to the user.

## Prepare

Identify the goal, constraints, settled decisions, and open decisions from the conversation and relevant project context. Map a design tree: each decision branches into the decisions that depend on it.

When the plan is an interface, the tree also holds what is uniquely true here that a neighboring product or template could not claim; the real content and data with their minimum, typical, and maximum ranges; on a page meant to persuade, which real proof and assets earn the visitor's belief; the intended fidelity (exploration, one production screen, or a full flow); what must stay untouched; and what would make the result feel wrong even if it looked polished. Keep these questions at product, experience, and direction level, never CSS values or a menu of aesthetic styles, because those follow from the direction rather than from the user's guess.

Delegate discoverable facts to subagents instead of asking the user. A pending investigation is an unsettled prerequisite: defer only the questions that depend on it and continue with the rest. Ask the user for missing access or context only when it blocks investigation.

## Ask in rounds

The frontier is every open decision whose prerequisites are settled. Ask the entire frontier in one round. A question that depends on another unanswered question or pending investigation belongs to a later round.

Number each question, explain the choice briefly, and give a recommended answer with its reason. State uncertainty when evidence is insufficient for a recommendation. Use this format, repeating it for every question in the round:

```text
❓ **Q1** - **<question title>**: <question and relevant options>

➡️ <recommended answer and reason>

---

❓ **Q2** - **<question title>**: <question and relevant options>

➡️ <recommended answer and reason>
```

Wait for the user's answers before the next round; continue independent research while waiting.

After each round, update the design tree and recompute the frontier. Probe contradictions and gaps; carry forward settled answers unless new evidence changes them. Put unresolved decisions to the user rather than silently assuming answers. A question the user skipped stays open, because your recommendation is not their answer. Ask a workflow default as its own question, never as a clause inside another.

## Finish

The interview is complete when the frontier is empty because every branch within scope has been visited and resolved, with no pending investigation or silently assumed decision. If the user ends early or defers a decision, summarize what remains open without claiming completion.

Summarize the agreed direction and constraints, then obtain confirmation of shared understanding before implementation. A request to proceed based on that summary counts as confirmation; the interview itself authorizes discussion, not changes.
