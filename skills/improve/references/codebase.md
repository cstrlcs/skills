# Codebase area

Find deepening opportunities: refactors that turn shallow modules into deep ones, so the code is easier to test and to navigate for agents. Uses the vocabulary in [codebase-design.md](codebase-design.md).

## Explore

Explore the scope organically:

- Where does understanding one concept require moving between many small modules?
- Where is an interface nearly as complex as its implementation?
- Where were pure functions extracted for testability while the real bugs remain in their callers?
- Where do tightly coupled modules leak across seams?
- What behavior is untested or hard to test through the current interface?

Apply the deletion test to suspected shallow modules: does deleting the module remove indirection, or redistribute useful hidden complexity across callers? Favor changes that concentrate complexity. Read [deepening](deepening.md) when assessing dependencies, seam placement, and replacement tests.

## After the choice

Load the `interview` skill through the Skill tool, or your runtime's equivalent, and walk the decision tree: constraints, dependencies, the shape of the deepened module, what sits behind the seam, and which tests survive. Preserve its investigation, question rounds, and completion criteria.

Keep the domain model current as decisions settle:

- When an agreed concept needs a new name, add its term and definition to the domain glossary. Create `CONTEXT.md` only when a term needs recording and no glossary exists.
- When the conversation clarifies a fuzzy term, update its definition there, following the existing format.
- When the user rejects a candidate for a durable, consequential reason, offer to record an ADR so future reviews do not propose it again. Skip temporary reasons such as “not now” and self-evident reasons. If accepted, use the project's ADR format; otherwise record context, decision, rationale, and consequences under `docs/adr/`.

Read [design it twice](design-it-twice.md) when exploring alternative interfaces for the chosen candidate. It preserves the parallel design briefs, distinct constraints, comparison, and recommendation.

Finish with the agreed direction, constraints, and any unresolved decisions. Follow `interview`'s confirmation of shared understanding before implementation; an improvement discussion alone does not authorize the refactor.
