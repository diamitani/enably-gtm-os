# Enably GTM OS — Sales Enablement Agent

A Go-to-Market Operating System. Enably helps founders and revenue teams define
ICP, personas, USPs, and use-cases, then execute with playbooks, messaging,
research/enrichment, CRM sync, and a memory-aware SDR assistant.

This repo contains the **agent layer** — 5 AWS Bedrock AgentCore harnesses
(managed Claude agents, no infra to run) fronted by a FastAPI backend.

## Architecture

```
Client (Vercel/Next.js or curl)
        │
        ▼
FastAPI backend  (backend/backend.py)
        │  invoke_harness (boto3)
        ▼
AWS AgentCore harnesses (5 Claude-powered agents)
  ├─ enably_master    — Central GTM Architect
  ├─ enably_icp       — ICP & Persona Architect
  ├─ enably_playbook  — Sales Playbook Architect
  ├─ enably_messaging — Messaging Workshop
  └─ enably_research  — Research & Enrichment Agent
```

## Layout

```
enably-gtm/
├── agent/
│   ├── system_prompts.py      # 5 harness system prompts (source of truth)
│   ├── create_harnesses.py    # boto3 create_harness + registry dump
│   ├── harness_client.py      # invoke_harness client
│   └── harness_registry.json  # name -> harnessId/arn (generated)
└── backend/
    ├── backend.py             # FastAPI service
    └── requirements.txt
```

## Setup

```bash
# 1. Install deps (dedicated venv — do NOT reuse Hermes' venv)
python3 -m venv .venv
.venv/bin/pip install -r backend/requirements.txt

# 2. Create the 5 harnesses (boto3 >= 1.43.59 required)
PYTHONPATH=/tmp/boto3-latest python3 agent/create_harnesses.py

# 3. Run the backend
PYTHONPATH="" .venv/bin/uvicorn backend.backend:app --host 0.0.0.0 --port 8080
```

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | liveness + harness availability |
| GET | `/agents` | list the 5 agents |
| POST | `/agent/{name}/chat` | one-shot chat (`{"message": "..."}`) |
| POST | `/icp` | generate ICP/personas/USPs |
| POST | `/playbook` | generate Sales Bible / playbook |
| POST | `/messaging` | generate emails/sequences/DMs |
| POST | `/research` | company snapshot + talking points |

## Skills

Domain knowledge from the source docs is also codified as Hermes skills:
`enably-gtm-os`, `enably-icp-framework`, `enably-outreach-sequences`,
`enably-outreach-process`, `circuit-sales-enablement`.

## Notes

- Model: `us.anthropic.claude-sonnet-4-6` (temperature 0.2, no topP — the two conflict).
- Each harness auto-creates a `DEFAULT` endpoint; invoke via `InvokeHarness`, not `InvokeAgentRuntime`.
