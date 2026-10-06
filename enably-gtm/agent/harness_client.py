"""Enably harness client — invoke AgentCore harnesses.

Loads the registry produced by create_harnesses.py. Falls back gracefully
when a harness isn't provisioned yet (reports which one to create).
"""
import json
import os
import uuid
from typing import Optional

import boto3

REGISTRY_PATH = os.path.join(os.path.dirname(__file__), "harness_registry.json")
REGION = "us-east-1"
ACCOUNT = "148761663702"

# Enably agents (name -> harness ARN suffix id)
AGENTS = [
    "enably_master",
    "enably_icp",
    "enably_playbook",
    "enably_messaging",
    "enably_research",
]


def _load_registry() -> dict:
    if os.path.exists(REGISTRY_PATH):
        with open(REGISTRY_PATH) as f:
            return json.load(f)
    return {}


def harness_arn(name: str) -> str:
    """Return the ARN for a harness by name, building it from registry or id."""
    reg = _load_registry()
    entry = reg.get(name, {})
    arn = entry.get("arn")
    if arn:
        return arn
    hid = entry.get("harness_id")
    if hid:
        return f"arn:aws:bedrock-agentcore:{REGION}:{ACCOUNT}:harness/{hid}"
    raise LookupError(f"Harness '{name}' not provisioned — run agent/create_harnesses.py")


class HarnessClient:
    def __init__(self, region: str = REGION):
        self._client = boto3.client("bedrock-agentcore", region_name=region)

    def invoke(self, agent: str, prompt: str, *, user_id: str = "default",
               session_id: Optional[str] = None) -> str:
        arn = harness_arn(agent)
        if session_id is None:
            session_id = str(uuid.uuid4())
        resp = self._client.invoke_harness(
            harnessArn=arn,
            runtimeSessionId=session_id,
            runtimeUserId=user_id,
            qualifier="DEFAULT",
            messages=[{"role": "user", "content": [{"text": prompt}]}],
        )
        text = ""
        for event in resp["stream"]:
            if "contentBlockDelta" in event:
                text += event["contentBlockDelta"]["delta"].get("text", "")
        return text


_client: Optional[HarnessClient] = None


def get_client() -> HarnessClient:
    global _client
    if _client is None:
        _client = HarnessClient()
    return _client
