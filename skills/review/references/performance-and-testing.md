# Performance and testing

## Tests

Check that tests fail when changed behavior regresses. Assertions should cover observable outputs, state, or effects, including critical success and credible failure or boundary paths. Mock-call counts, “defined,” or “no error” alone rarely establish correctness; tests of language or runtime behavior alone do not protect application behavior.

Verify isolation, realistic fixtures, mocks at real boundaries, and propagation of setup or teardown failures. Control time, randomness, scheduling, and network dependencies; inspect order dependence and arbitrary sleeps.

Choose coverage by risk: unit tests for local logic, integration tests for boundaries, end-to-end tests for critical journeys, property or fuzz tests for broad inputs, and concurrency or load tests for contention. Request only tests that add meaningful confidence.

## Performance

Start from a real hot path, expected scale, trace, profile, query plan, or reproducible measurement. Inspect relevant risks:

- Repeated or quadratic work, N+1 calls, and missing batching.
- Unbounded reads, payloads, queues, or concurrency.
- Blocking work, frequent allocations, retained references, and cleanup on disconnect or cancellation.
- Indexes mismatched to filters or ordering, and connection totals across replicas.
- Cache keys, invalidation, stampedes, and tenant isolation.
- Bundle size, rendering, layout shifts, and interaction latency.

Compare equivalent conditions; missing measurements are unknown. Recommend optimization only when the path and expected load justify it. For operational evidence, use RED (rate, errors, duration) for request or job flows and USE (utilization, saturation, errors) for constrained resources as prompts, not mandatory dashboards. Use percentiles when tails matter and keep metric labels bounded.
