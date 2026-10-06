---
name: approval-gating
version: 1.0.0
kind: rostrv2.skill
triggers: [send, publish, CRM write, DNS change, external action]
inputs: [action, resolved_target, exact_payload, approval_token]
outputs: [approval_request, approved_execution, rejection]
---
# Approval Gating

## Rule
Any irreversible or externally visible action requires an approval token issued by the host harness after the user reviews the fully resolved target and exact payload.

## Procedure
1. Resolve recipient, account, CRM object, or configuration target.
2. Present the exact action and payload for approval.
3. Store approval metadata with scope and expiration.
4. Execute only the payload that was approved.
5. Log result, external IDs, errors, and retry-safe idempotency key.

## Deny
Never infer approval from a conversational statement. Never expand target scope after approval. Never auto-send bulk outreach.
