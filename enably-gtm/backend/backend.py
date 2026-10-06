"""Enably GTM OS — Sales Enablement Agent Backend.

FastAPI service fronting the 5 Enably AgentCore harnesses. Each agent is a
Claude-powered harness (managed by AWS AgentCore) invoked via invoke_harness.

Endpoints:
  GET  /health                     — liveness + harness availability
  GET  /agents                     — list the 5 Enably agents
  POST /agent/{name}/chat          — one-shot chat with a named agent
  POST /icp                        — generate an ICP / personas / USPs
  POST /playbook                   — generate a Sales Bible / playbook
  POST /messaging                  — generate cold emails / sequences / DMs
  POST /research                   — company snapshot + talking points

Run:
  PYTHONPATH="" .venv/bin/uvicorn backend:app --host 0.0.0.0 --port 8080
"""
import os
import sys
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "agent"))
from harness_client import get_client, harness_arn, AGENTS  # noqa: E402

app = FastAPI(title="Enably GTM OS — Sales Enablement Agent Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

AGENT_DESCRIPTIONS = {
    "enably_master": "Central GTM Architect — orchestrates the full go-to-market motion.",
    "enably_icp": "ICP & Persona Architect — ICPs, personas, USPs, use cases.",
    "enably_playbook": "Sales Playbook Architect — Sales Bible / playbook.",
    "enably_messaging": "Messaging Workshop — cold emails, sequences, DMs, scripts.",
    "enably_research": "Research & Enrichment — company snapshot + talking points.",
}


class ChatRequest(BaseModel):
    message: str
    user_id: str = "default"
    session_id: Optional[str] = None


class GenerationRequest(BaseModel):
    # Free-form input accepted; specific fields below are optional conveniences.
    input: str
    company: Optional[str] = None
    product: Optional[str] = None
    market: Optional[str] = None
    target: Optional[str] = None
    url: Optional[str] = None
    user_id: str = "default"


def _agent_available(name: str) -> bool:
    try:
        harness_arn(name)
        return True
    except LookupError:
        return False


@app.get("/health")
def health():
    agents = {name: _agent_available(name) for name in AGENTS}
    available = sum(1 for v in agents.values() if v)
    return {
        "status": "healthy" if available else "degraded",
        "agents": agents,
        "available": f"{available}/{len(AGENTS)}",
    }


@app.get("/agents")
def list_agents():
    return [
        {"name": name, "description": AGENT_DESCRIPTIONS[name], "available": _agent_available(name)}
        for name in AGENTS
    ]


@app.post("/agent/{name}/chat")
def chat(name: str, req: ChatRequest):
    if name not in AGENTS:
        raise HTTPException(404, f"Unknown agent '{name}'. Choose from {AGENTS}.")
    try:
        text = get_client().invoke(name, req.message, user_id=req.user_id, session_id=req.session_id)
    except LookupError as e:
        raise HTTPException(503, str(e))
    except Exception as e:
        raise HTTPException(502, f"Harness invocation failed: {e}")
    return {"agent": name, "reply": text}


@app.post("/icp")
def icp(req: GenerationRequest):
    parts = [req.input]
    if req.company:
        parts.append(f"Company: {req.company}")
    if req.product:
        parts.append(f"Product: {req.product}")
    if req.market:
        parts.append(f"Market: {req.market}")
    return _generate("enably_icp", "\n".join(parts), req.user_id)


@app.post("/playbook")
def playbook(req: GenerationRequest):
    return _generate("enably_playbook", req.input, req.user_id)


@app.post("/messaging")
def messaging(req: GenerationRequest):
    parts = [req.input]
    if req.target:
        parts.append(f"Target audience: {req.target}")
    return _generate("enably_messaging", "\n".join(parts), req.user_id)


@app.post("/research")
def research(req: GenerationRequest):
    parts = [req.input]
    if req.url:
        parts.append(f"URL/domain: {req.url}")
    return _generate("enably_research", "\n".join(parts), req.user_id)


def _generate(agent: str, prompt: str, user_id: str):
    try:
        text = get_client().invoke(agent, prompt, user_id=user_id)
    except LookupError as e:
        raise HTTPException(503, str(e))
    except Exception as e:
        raise HTTPException(502, f"Harness invocation failed: {e}")
    return {"agent": agent, "result": text}
