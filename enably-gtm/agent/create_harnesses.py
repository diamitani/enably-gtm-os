"""Create the 5 Enably AgentCore harnesses.

Run:  PYTHONPATH=/tmp/boto3-latest python3 agent/create_harnesses.py

Requirements: boto3/botocore >= 1.43.59 (invoke_harness + create_harness).
Claude Sonnet 4.6 rejects temperature + topP together — set temperature only.
"""
import json
import sys
import time
import uuid

import boto3

sys.path.insert(0, "/Users/patmini/enably-gtm/agent")
from system_prompts import (
    ENABLY_MASTER_PROMPT,
    ENABLY_ICP_PROMPT,
    ENABLY_PLAYBOOK_PROMPT,
    ENABLY_MESSAGING_PROMPT,
    ENABLY_RESEARCH_PROMPT,
)

REGION = "us-east-1"
ACCOUNT = "148761663702"
EXECUTION_ROLE_ARN = (
    "arn:aws:iam::148761663702:role/service-role/"
    "AmazonBedrockAgentCoreHarnessDefaultServiceRole-udozm"
)
MODEL_ID = "us.anthropic.claude-sonnet-4-6"

HARNESSES = [
    ("enably_master", "Central GTM Architect — orchestrates the full go-to-market motion.", ENABLY_MASTER_PROMPT),
    ("enably_icp", "ICP & Persona Architect — produces ICPs, personas, USPs, use cases.", ENABLY_ICP_PROMPT),
    ("enably_playbook", "Sales Playbook Architect — produces the Sales Bible / playbook.", ENABLY_PLAYBOOK_PROMPT),
    ("enably_messaging", "Messaging Workshop — generates cold emails, sequences, DMs, scripts.", ENABLY_MESSAGING_PROMPT),
    ("enably_research", "Research & Enrichment Agent — company snapshot + talking points from a URL.", ENABLY_RESEARCH_PROMPT),
]


def main():
    client = boto3.client("bedrock-agentcore-control", region_name=REGION)

    # List existing to avoid duplicate names
    existing = {h["harnessName"] for h in client.list_harnesses().get("harnesses", [])}

    results = []
    for name, desc, prompt in HARNESSES:
        if name in existing:
            print(f"[skip] {name} already exists")
            continue
        print(f"[create] {name} ...")
        resp = client.create_harness(
            harnessName=name,
            executionRoleArn=EXECUTION_ROLE_ARN,
            model={
                "bedrockModelConfig": {
                    "modelId": MODEL_ID,
                    "temperature": 0.2,
                    "maxTokens": 4096,
                }
            },
            systemPrompt=[{"text": prompt}],
            truncation={"strategy": "sliding_window", "config": {"slidingWindow": {"messagesCount": 50}}},
            maxIterations=50,
            timeoutSeconds=1800,
            allowedTools=["*"],
            environment={
                "agentCoreRuntimeEnvironment": {
                    "lifecycleConfiguration": {"idleRuntimeSessionTimeout": 1800, "maxLifetime": 28800},
                    "networkConfiguration": {"networkMode": "PUBLIC"},
                }
            },
            clientToken=str(uuid.uuid4()),
            tags={"product": "enably", "category": "sales-enablement", "version": "1.0"},
        )
        results.append({"name": name, "harnessId": resp.get("harnessId"), "arn": resp.get("harnessArn")})
        print(f"  -> {resp.get('harnessId')}")

    # Poll until READY
    print("\nWaiting for harnesses to reach READY ...")
    ready = {}
    deadline = time.time() + 300
    while time.time() < deadline and len(ready) < len(HARNESSES):
        try:
            lst = client.list_harnesses().get("harnesses", [])
            by_name = {h["harnessName"]: h for h in lst}
            for name, *_ in HARNESSES:
                h = by_name.get(name)
                if h and h.get("status") == "READY":
                    ready[name] = h
        except Exception as e:
            print("poll error:", e)
        time.sleep(10)

    for name, *_ in HARNESSES:
        h = ready.get(name)
        print(f"{name}: {h.get('status') if h else 'NOT_READY'}  {h.get('harnessId') if h else ''}")

    # Persist registry
    registry = {
        name: {"harness_id": ready.get(name, {}).get("harnessId"),
               "arn": ready.get(name, {}).get("harnessArn")}
        for name, *_ in HARNESSES
    }
    with open("/Users/patmini/enably-gtm/agent/harness_registry.json", "w") as f:
        json.dump(registry, f, indent=2)

    print("\nSaved registry -> agent/harness_registry.json")


if __name__ == "__main__":
    main()
