---
name: gtm-intake
version: 1.0.0
kind: rostrv2.skill
triggers: [outbound setup, GTM setup, ICP, lead upload, sequence, sales ops]
inputs: [business, product, icp, goals, crm, mailbox, domain, lead_source]
outputs: [gtm_brief, setup_checklist, icp_pack, sequence, readiness_report]
---
# GTM Intake

## Procedure
1. Capture business, offer, buyers, sales motion, geography, goals, assets, CRM, mailbox, domain, and lead-source status.
2. Compile a GTM brief and flag missing decisions.
3. Create ICP and targeting exclusions before generating messaging.
4. Produce a deliverability/DNS/SES readiness checklist; never perform changes without approval.
5. Validate lead file fields, duplicates, consent/risk notes, and personalization readiness.
6. Create a Day 1–Day 4 sequence with skip-if-replied and skip-if-bounced logic.
7. Define daily send-health reporting: sent, delivered, bounced, opened, replied; meetings are post-MVP.

## Guardrails
Research must be cited or labeled inferred. CRM writes, DNS changes, and all outbound sends require host-enforced approval.
