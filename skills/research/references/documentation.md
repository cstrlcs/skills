# Technical documentation

Prefer updating an existing canonical document when practical. Choose its form by reader need: tutorial for learning, how-to for a task, reference for contracts, explanation for rationale, or plan for intended changes.

## Write

Start with the outcome. For a task guide, give prerequisites, the shortest complete procedure, a success check, and likely failure recovery. Include only sections the reader needs.

Use direct verbs and the product's terminology. Keep caveats beside the affected step; explain reasons when they help a decision or troubleshooting. Examples should be runnable or adaptable and contain no real credentials or sensitive data.

## Verify

Check behavioral claims against code, schemas, and tests. For API documentation, verify:

- Methods, routes, authentication, authorization, and input locations.
- Field types, formats, constraints, nullability, and defaults.
- Response shapes, status codes, stable error identifiers, and recovery.
- Pagination, ordering, filtering, idempotency, compatibility, and deprecation where supported.

Check links and run safe commands or examples when feasible. Resolve discrepancies or identify what could not be verified.

## Design system

Document a design system as `DESIGN.md` at the project root, in the [DESIGN.md format](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md). Write it from the shipped UI, not from a plan, because a rulebook written ahead of the build gets defended against it; where plan and build differ, the build wins. Read the files that own the system (CSS custom properties, theme configuration, token files, the main components and their variants), then sample computed styles of body text, headings, links, buttons, and cards in the running UI for values the tokens miss. Sample enough screens to tell system choices from local exceptions.

- Record a value only when it is reused, deliberately named, or governs several surfaces. Group near-duplicates that serve one role, and keep differences that mean something.
- Write the recorded values as the spec's YAML frontmatter tokens, keyed by the project's own token names within the spec's groups (`--radius-md` becomes `rounded.md`) and holding their current values in the project's color format, because the spec makes the tokens the normative values and a reader without the code (a mockup tool, another agent) applies only what is written there. Name the code file the tokens mirror at the top of the body, and regenerate the frontmatter from that file when its values change rather than editing it by hand, so the code stays the single source of truth.
- In prose, describe each value by its role and reference its token name, as in "gently rounded corners (`rounded.md`)". The spec has no token group for shadows, so give exact `box-shadow` values in Elevation & Depth.
- Use the spec's `##` headings verbatim and in its order (Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts), omitting any without evidence, because DESIGN.md tooling matches those names.
- Group colors by role (Primary, Secondary, Tertiary, Neutral); with one accent, write Primary and Neutral and leave the others out. Describe a flat system as flat and say how it conveys depth instead, such as tonal layers or borders.
- Document only tokens, components, and states that exist. Record an inconsistency as drift instead of picking a winner, a missing primitive as a gap, and a value that fails develop's [frontend and UI floor](../../develop/references/frontend-ui.md) as a carried defect, never as a rule.
- Ground each Do and Don't in shipped code or a decision the user confirmed, and mark which choices are required, preferred, or only observed. Keep the composition of one page or task out of system-wide rules.

When `DESIGN.md` exists, judge staleness by reading it against the current tokens and components, not from commit dates. Keep the decisions that still match; when everything matches, leave the file untouched and report what you checked. Describe drift instead of overwriting it, and ask when it is unclear whether the code or the document is the authority. Finish with the drift and gaps you left out of the document, each specific enough for its owner to act on.
