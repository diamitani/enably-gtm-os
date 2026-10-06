# Enably ROSTRv2 Agent Pack

Portable agent and skill package compiled from the Enably custom-GPT specifications:
- KPI Metric Architect
- LinkedIn / Social DM Architect
- Enably Signal Sales-Ops Copilot

## Install
1. Copy this repository into an agent harness workspace.
2. Load `contracts/rostrv2.manifest.yaml`.
3. Register each file under `agents/` as an agent and each directory under `skills/` as a skill.
4. Map tool aliases in `contracts/tool-adapters.yaml` to your harness implementation.
5. Set the environment variables in `.env.example` server-side.
6. Run the included contract tests before enabling any external write or send capability.

## Runtime behavior
The orchestrator routes requests to specialized agents. Agents only propose artifacts by default. CRM writes and all outbound sends require a resolved target plus explicit approval token from the host harness.

## Source fidelity
This package preserves the operating behavior extracted from the supplied custom-GPT docs while adding schemas, versioning, provenance, approval gates, and portable tool contracts.
