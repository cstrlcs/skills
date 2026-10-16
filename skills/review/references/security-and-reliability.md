# Security and reliability

## Trust boundaries

Trace untrusted inputs from requests, files, messages, stored data, configuration, and external responses to queries, commands, templates, paths, redirects, logs, and outbound requests.

Check authentication separately from authorization. Verify resource ownership and tenant isolation on reads and writes; privileged actions must use authoritative identity rather than client-supplied roles or identifiers.

For reachable paths, inspect injection, script execution, SSRF, redirects, traversal, unsafe file handling or deserialization, secrets and private data exposure, token lifetime and randomness, password handling, and webhook or message authenticity. Check dependency identity, compromise, and vulnerabilities relevant to the reviewed path. Judge exploitability from actual controls, not presumed validation elsewhere.

## Failure paths

Trace success, timeouts, retries, cancellation, shutdown, and partial failure. Check:

- Duplicate requests or messages causing repeated irreversible effects.
- Transactions and event publication disagreeing about committed state.
- Retry amplification, unbounded work, and leaked resources.
- Migrations incompatible with versions running during rollout.
- Cache invalidation, isolation, and fallbacks hiding corruption or prolonged failure.
- Health and readiness checks inconsistent with the work the service can serve.

Logs and telemetry should locate failures without sensitive data or unbounded labels. Alerts should identify actionable symptoms.
