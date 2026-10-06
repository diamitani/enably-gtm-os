# Harness Installation

## Generic harness mapping
- System prompt / agent spec: load each `agents/*.agent.yaml`.
- Skills directory: mount `skills/*/SKILL.md`.
- Agent registry: read `contracts/rostrv2.manifest.yaml`.
- Tools: bind canonical names in `contracts/tool-adapters.yaml` to harness tool implementations.
- State: implement the run state machine in `runtime/state-machine.yaml`.
- Routing: apply `runtime/routing.yaml` before defaulting to a general assistant.

## Required host guarantees
1. Workspace-scoped identity context reaches each run.
2. Tool adapters enforce mode and approval requirements server-side.
3. Approval binds exact target and payload.
4. Artifact IDs and versions remain stable across retries.
5. Agents cannot access unapproved secrets or send data to tools outside the workspace policy.
