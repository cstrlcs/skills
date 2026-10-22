# Testing

Apply this guidance whenever writing or changing tests. Apply the red → green workflow below when the user requests test-driven development or test-first implementation.

Read the project's domain glossary (`CONTEXT.md` when present) so test names and interface vocabulary match the domain. Respect relevant architecture decision records.

Run the relevant existing tests before changing code, so you know the command and the baseline, and later failures are attributable to your change.

## Layout and naming

Follow the layout and naming the project documents (`AGENTS.md`) or its existing suite uses consistently. Otherwise, keep tests out of the source tree, in a `tests/` folder at the project root (each package root in a monorepo) that mirrors the source layout: `src/billing/invoice.ts` is tested in `tests/billing/invoice.spec.ts`. End-to-end tests live in `tests/e2e/`. Shared fixtures and helpers live in `tests/support/`.

For that default layout in TypeScript and JavaScript, the suffix names the kind of test, so runners select suites by pattern:

| Suffix | Kind |
|---|---|
| `.spec.ts` / `.spec.tsx` | Unit, integration, and component tests |
| `.e2e.ts` | End-to-end tests |
| `.bench.ts` | Benchmarks |

Keep runners' include patterns aligned with the project's chosen paths and suffixes. When an existing suite is inconsistent, propose consolidating it as a separate change; do not migrate it unasked.

## Agree on test seams

A seam is the public interface where a test exercises and observes behavior without reaching into implementation details.

Before writing tests, write down the seams and behaviors to cover and confirm them with the user. An explicit request naming those seams or an earlier agreement counts as confirmation; do not ask again. Otherwise, ask which public interfaces to test. Prioritize critical paths and complex logic rather than every possible edge case.

A regression test for a fix needs no confirmation: its seam is the public interface through which the failure was reproduced.

If the interface itself is undecided, settle its shape and responsibilities before committing to tests against it.

## Choose the level

Add a test only where it adds confidence that the type checker, linter, or an existing test does not already give. A behavior pinned once at the right seam needs no second copy at another level; coverage percentage is not a target.

- Most tests exercise a module through its seam with its real collaborators.
- Isolated tests suit dense pure logic with many input cases. When the behavior is an invariant over inputs (round-trips, parsers, ordering), prefer a property test if the project has a property-testing library.
- End-to-end tests cover the few critical user journeys and behavior observable only in the assembled system, such as async server components, auth redirects, and cross-service flows.
- UI tests query what users perceive (role, label, text). Run them in a real browser when behavior depends on layout, focus, or browser APIs; a simulated DOM suffices for the rest.

Write no test whose failure could not reveal a bug in this project's code: tests of language, framework, or library behavior; constants, plain getters, and pass-through wiring; shapes the type checker already enforces; "is defined", "renders without crashing", or "no error" alone; mocks asserting what they were configured to return; and copies of a behavior already pinned elsewhere. When such tests sit in the area you are changing, delete them and list each deletion with its reason in your report.

## Test behavior

- Exercise real public interfaces and assert outcomes callers care about. Tests should survive internal refactors that preserve behavior.
- Name tests as specifications of capabilities, such as “creating a user makes that user retrievable.” Describe what happens, not which internal methods are called.
- Keep each test focused on one logical assertion about behavior; multiple checks may establish that one outcome.
- Derive expected values independently from the specification, a worked example, or a known-good literal. Repeating the implementation's calculation makes the test tautological.
- Verify through the public interface, rather than querying storage or inspecting private state as a side channel. Direct database assertions are appropriate only when that database interface is itself the agreed seam.
- Assert the specific outcomes that matter rather than snapshotting whole outputs, because broad snapshots pin incidental details and get re-accepted without review.

```typescript
// Observe the capability through its public interfaces.
const user = await createUser({ name: "Alice" });
expect((await getUser(user.id)).name).toBe("Alice");

// Use an independently worked expected value, not the same reduce as the code.
expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
```

Tests that mock internal collaborators, inspect private methods, or assert internal call counts and ordering couple themselves to implementation. A test breaking after a behavior-preserving refactor is a signal to inspect that coupling.

## Mock at system boundaries

Use real modules and internal collaborators. Mock external APIs, time, randomness, and filesystem access when isolation requires it. For databases, prefer a real engine or local stand-in (a test container, an embedded engine such as PGlite) over mocking the query layer, because a mock cannot tell whether the query works.

Pass external dependencies into the module rather than constructing them inside it. At those boundaries, prefer operation-specific interfaces such as `getUser(id)` and `createOrder(data)` over generic fetchers whose mocks need conditional routing logic. Each operation should have a clear input and result shape.

```typescript
function processPayment(order, paymentClient) {
  return paymentClient.charge(order.total);
}
```

The test can substitute the external payment client while exercising the real payment logic. Assert the observable result or externally meaningful effect, not internal coordination alone.

## Test-first workflow

Work in vertical slices: one seam, one test, one minimal implementation per cycle. Read the quality and mocking rules before and during each cycle.

1. Write one test for an agreed behavior. Run it and observe a failure caused by the missing or incorrect behavior, not a broken test setup.
2. Write only enough implementation to pass that test. Run it and confirm green; preserve the relevant existing tests.
3. Use what the cycle taught you to choose the next behavior, then repeat.

Do not write all tests first and all implementation afterward. That commits to imagined behavior and test structure before feedback from the implementation. Each test is a tracer bullet through an observable capability.

Keep refactoring separate from the red → green implementation cycle. Review the resulting design after the behavior is covered; handle justified refactoring in that review stage and rerun the relevant tests. Do not anticipate future tests or add speculative features during a cycle.

For a bug regression, demonstrate that the test fails on the bug and passes with the fix.

## Keep tests honest

- Treat existing tests as the specification: make a failing test pass by changing the implementation. Edit, skip, or delete a test only when the requested behavior contradicts it or it is worthless by the criteria in "Choose the level", and report each such change with its reason.
- A test written after its implementation passes on its first run, which proves nothing. Briefly break the behavior it covers (flip a condition, drop a branch), watch it fail, then restore the code.

## Model output

For features built on LLM or other nondeterministic output, test the deterministic code around the model as above. Evaluate the output itself with one pass/fail check per known failure mode, using code checks (schema, exact fields, patterns) first and a model judge only for what code cannot decide; validate a judge against human-labeled examples before trusting it.
