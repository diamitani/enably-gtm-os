---
name: artifact-versioning
version: 1.0.0
kind: rostrv2.skill
triggers: [create artifact, update document, approve output]
inputs: [artifact, source_inputs, agent_id]
outputs: [versioned_artifact_envelope]
---
# Artifact Versioning

## Rule
All generated outputs use the ROSTRv2 artifact envelope. Drafts can be revised; approved artifacts are immutable and replaced only by a new version.

## Required metadata
artifact_id, workspace_id, artifact_type, version, status, owner_agent, timestamps, source input references, model/prompt version when applicable, and approval state.

## Validation
Reject artifacts missing provenance, a payload, workspace scoping, or an explicit status.
