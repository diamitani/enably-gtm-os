import { AutomationWorkflow } from '../types';

export const DEFAULT_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf-5pillar-n8n',
    name: '5-Pillar Autonomous Outbound Engine (n8n)',
    description: 'Trigger Ingest -> CRM Shield & Dedupe -> Waterfall Enrichment (Apollo/Hunter) -> AI PAS Copywriting -> Smartlead/Instantly Enrollment.',
    platform: 'n8n',
    status: 'active',
    nodesCount: 9,
    lastRun: '12 mins ago',
    successRate: 98.4,
    jsonDefinition: JSON.stringify({
      name: "6th Agent 5-Pillar Outbound Pipeline",
      nodes: [
        {
          parameters: { httpMethod: "POST", path: "webhook-ingest", responseMode: "onReceived" },
          id: "node-1",
          name: "Webhook Trigger Ingest",
          type: "n8n-nodes-base.webhook",
          typeVersion: 2,
          position: [240, 300]
        },
        {
          parameters: {
            authentication: "oAuth2",
            operation: "get",
            email: "={{ $json.body.email }}"
          },
          id: "node-2",
          name: "HubSpot CRM Dedupe & Shield",
          type: "n8n-nodes-base.hubspot",
          typeVersion: 1,
          position: [460, 300]
        },
        {
          parameters: {
            conditions: {
              boolean: [{ value1: "={{ $json.id ? true : false }}", value2: true }]
            }
          },
          id: "node-3",
          name: "Filter: Active Lead Check",
          type: "n8n-nodes-base.if",
          typeVersion: 1,
          position: [680, 300]
        },
        {
          parameters: {
            method: "POST",
            url: "https://api.clay.com/v3/enrich",
            sendBody: true,
            bodyParameters: {
              parameters: [
                { name: "domain", value: "={{ $json.body.companyDomain }}" },
                { name: "name", value: "={{ $json.body.fullName }}" }
              ]
            }
          },
          id: "node-4",
          name: "Clay Waterfall Enrichment",
          type: "n8n-nodes-base.httpRequest",
          typeVersion: 4.2,
          position: [900, 200]
        },
        {
          parameters: {
            model: "gpt-4o",
            prompt: `You are 6th Agent SDR. Draft a 120-word cold email for {{ $json.name }} at {{ $json.company }}.
Pain: {{ $json.enrichment.painPoint }}.
CTA: Low friction 10-min exploratory call.`
          },
          id: "node-5",
          name: "AI PAS Copywriter (OpenAI / Claude)",
          type: "n8n-nodes-base.openAi",
          typeVersion: 1.3,
          position: [1120, 200]
        },
        {
          parameters: {
            method: "POST",
            url: "https://api.smartlead.ai/api/v1/campaigns/{{ $json.campaignId }}/leads",
            sendBody: true,
            bodyParameters: {
              parameters: [
                { name: "email", value: "={{ $json.verifiedEmail }}" },
                { name: "custom_subject", value: "={{ $json.aiSubject }}" },
                { name: "custom_body", value: "={{ $json.aiBody }}" }
              ]
            }
          },
          id: "node-6",
          name: "Smartlead Sequencer Enrollment",
          type: "n8n-nodes-base.httpRequest",
          typeVersion: 4.2,
          position: [1340, 200]
        },
        {
          parameters: {
            channel: "#gtm-alerts",
            text: "🚀 Lead Enrolled: {{ $json.name }} ({{ $json.company }}) -> Score: {{ $json.icpScore }}/100"
          },
          id: "node-7",
          name: "Slack GTM Notification",
          type: "n8n-nodes-base.slack",
          typeVersion: 1,
          position: [1560, 200]
        }
      ],
      connections: {
        "Webhook Trigger Ingest": { main: [[{ node: "HubSpot CRM Dedupe & Shield", type: "main", index: 0 }]] },
        "HubSpot CRM Dedupe & Shield": { main: [[{ node: "Filter: Active Lead Check", type: "main", index: 0 }]] },
        "Filter: Active Lead Check": { main: [[{ node: "Clay Waterfall Enrichment", type: "main", index: 0 }]] },
        "Clay Waterfall Enrichment": { main: [[{ node: "AI PAS Copywriter (OpenAI / Claude)", type: "main", index: 0 }]] },
        "AI PAS Copywriter (OpenAI / Claude)": { main: [[{ node: "Smartlead Sequencer Enrollment", type: "main", index: 0 }]] },
        "Smartlead Sequencer Enrollment": { main: [[{ node: "Slack GTM Notification", type: "main", index: 0 }]] }
      }
    }, null, 2)
  },
  {
    id: 'wf-clay-waterfall',
    name: 'Clay Deep Technographic & Hiring Intent Scraper',
    description: 'Scrapes LinkedIn company job postings, checks open SDR/RevOps roles, queries BuiltWith for CRM tech stack, and scores buying intent.',
    platform: 'custom_agent',
    status: 'active',
    nodesCount: 6,
    lastRun: '1 hour ago',
    successRate: 99.1,
    jsonDefinition: JSON.stringify({
      name: "Clay Technographic & Intent Scraper",
      version: "1.0",
      steps: [
        "Ingest company domain",
        "BuiltWith API: detect HubSpot, Salesforce, Outreach, Gong",
        "LinkedIn Jobs API: detect open SDR/AE/RevOps requisitions",
        "Compute Intent Score (0-100)",
        "Write to 6th Agent Lead Studio CRM"
      ]
    }, null, 2)
  },
  {
    id: 'wf-signalwire-voice',
    name: 'SignalWire Conversational Voice Agent Qualifier',
    description: 'Connects SignalWire Voice API to low-latency LLM agent to make real-time 90-second qualification phone calls and log transcripts to CRM.',
    platform: 'make',
    status: 'active',
    nodesCount: 5,
    lastRun: '4 hours ago',
    successRate: 96.7,
    jsonDefinition: JSON.stringify({
      name: "SignalWire AI Voice Dispatcher",
      integration: "SignalWire REST API + WebRTC",
      voiceModel: "Polly.Matthew-Neural",
      llmEndpoint: "/api/chat",
      trigger: "Form Submission (Lead Score >= 85)"
    }, null, 2)
  }
];
