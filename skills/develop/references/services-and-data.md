# Services and data

## Contracts and persistence

Define and preserve observable inputs, validation, authentication, authorization, outputs, errors, pagination, ordering, and idempotency where applicable. Reuse the project's contract format; add mapping layers only when representations differ meaningfully.

Align transactions with business invariants. Use exact representations for money and other precision-sensitive values, and indexes matched to real queries. Make destructive migrations explicit, with rollout or recovery proportional to risk; account for old and new application versions coexisting during deployment.

## Background work and dependencies

Publish events only for committed facts. If losing an event violates correctness, couple persistence and publication atomically, for example with an outbox. Provide stable identity and enough context for idempotent consumers without exposing private data.

Make retries safe for repeated requests and messages. Retry only transient failures with backoff and a stopping condition; ensure retry layers neither multiply attempts nor duplicate irreversible effects. Set timeouts, propagate cancellation and deadlines, and define behavior for partial failure and dependency unavailability.

Bound queues and concurrency. Release tasks, timers, streams, connections, and locks on success, failure, cancellation, and shutdown.

## Runtime

Keep configuration examples accurate and free of secrets. Add logs, traces, or metrics only where they help diagnose or operate the changed flow; omit sensitive fields and bound metric-label cardinality. Verify startup, health, and readiness against what the service can actually serve.
