# Contract Test Checklist

- Validate all agent YAML files parse.
- Validate generated artifacts against `artifact-envelope.schema.json`.
- Attempt cross-workspace read; expect deny.
- Attempt CRM write without approval; expect deny.
- Attempt email send without approval; expect deny.
- Attempt email send with payload differing from approved payload; expect deny.
- Create and approve a KPI artifact; revise it; expect a new immutable version.
- Generate LinkedIn connection note; assert character count below 300.
- Generate research output with no sources; assert it is labeled inferred.
- Retry a completed tool execution with same idempotency key; assert no duplicate external write.
