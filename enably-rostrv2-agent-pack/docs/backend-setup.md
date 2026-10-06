# Backend Setup: ROSTRv2 Runtime

## Required services
- Postgres or Supabase Postgres for workspace state, run state, artifact metadata, approvals, and audit logs.
- Object storage for exported documents and source files.
- Vector-capable retrieval store for approved GTM artifacts only.
- Queue/worker for model calls, research, exports, and integration retries.
- Secret manager for LLM, CRM, AWS, and email credentials.

## Minimum tables
- workspaces, members, runs, artifacts, artifact_versions
- approvals, audit_events, tool_executions
- integrations, integration_connections, sync_jobs
- conversations, messages, retrieval_chunks

## API endpoints
- POST /v1/runs: create a run with workspace and user context.
- POST /v1/runs/{id}/input: submit normalized input.
- GET /v1/runs/{id}: retrieve phase, artifacts, and errors.
- POST /v1/approvals: issue/reject an approval bound to exact action payload.
- POST /v1/tools/execute: host-only tool execution endpoint that verifies approval scope.
- GET /v1/artifacts/{id}: return current or specified immutable version.

## Execution loop
1. Authenticate user and resolve workspace.
2. Create idempotent run record.
3. Orchestrator routes to a specialist agent.
4. Specialist produces draft artifact envelope.
5. Validator checks schema, provenance, and guardrails.
6. Store draft and return it to UI.
7. On an external action, request host approval with exact payload.
8. Verify approval token server-side; execute through adapter; audit result.

## Security baseline
Use workspace-scoped authorization/RLS. Keep all secrets server-side. Sign approval tokens. Encrypt integration credentials. Use idempotency keys for all writes. Restrict retrieval to approved artifacts unless a user explicitly selects drafts.
