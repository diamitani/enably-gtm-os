import { PluginPack } from '../types';

export const INITIAL_PLUGINS: PluginPack[] = [
  {
    id: 'plugin-enably-gtm-master',
    name: '6th Agent GTM Master OS (ROSTR v2)',
    version: '2.0.0',
    category: 'Strategy',
    description: 'The flagship multi-agent GTM operating system bundle. Includes orchestrator, 5-stage PAL compiler, NPAO task allocator, and RAG DAL research engine.',
    author: '6th Agent Core Architecture',
    installs: 4820,
    rating: 4.98,
    phase: 'design',
    icon: 'Cpu',
    tags: ['GTM', 'ROSTR v2', 'PAL', 'NPAO', 'Orchestration'],
    isInstalled: true,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: AgentPack
metadata:
  id: enably-gtm-agent-pack
  name: 6th Agent GTM Agent Pack
  version: 2.0.0
spec:
  runtime:
    entry_agent: enably-orchestrator
    execution_model: phase_aware
    state_store: required
    approval_gate: required_for_external_writes`
  },
  {
    id: 'plugin-n8n-outbound-engine',
    name: 'n8n 5-Pillar Autonomous Outbound Suite',
    version: '2.1.0',
    category: 'Automation',
    description: 'Production-ready n8n nodes for Webhook Trigger Ingest, HubSpot CRM Shield & Dedupe, Clay Waterfall Enrichment, and Smartlead enrollment.',
    author: 'Prospect Automation Labs',
    installs: 3410,
    rating: 4.95,
    phase: 'development',
    icon: 'Workflow',
    tags: ['n8n', 'Make.com', 'Clay', 'Webhooks', 'Sequencers'],
    isInstalled: true,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: AutomationPlugin
metadata:
  id: n8n-outbound-engine
  name: n8n 5-Pillar Suite
  version: 2.1.0
spec:
  platform: n8n
  nodes: [webhook, hubspot, httpRequest, openAi, smartlead, slack]`
  },
  {
    id: 'plugin-sdr-sales-bible',
    name: 'Signal SDR Copilot & Sales Bible Builder',
    version: '2.0.0',
    category: 'Outreach',
    description: 'Complete sales enablement engine: Day 1-12 cadences, MEDDICC qualification scorecard, 10 objection busters, and SDR daily task checklist.',
    author: 'Sales Enablement Guild',
    installs: 2950,
    rating: 4.92,
    phase: 'design',
    icon: 'BookOpen',
    tags: ['SDR', 'Sales Bible', 'MEDDICC', 'Objection Handling'],
    isInstalled: true,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: PlaybookPlugin
metadata:
  id: sdr-sales-bible
  version: 2.0.0
spec:
  cadences: [email, linkedin, call_opener]
  qualification: MEDDICC`
  },
  {
    id: 'plugin-linkedin-inmail-pro',
    name: 'LinkedIn InMail & Social DM Architect',
    version: '1.9.0',
    category: 'Outreach',
    description: 'Generates conversational, relationship-led LinkedIn connection notes (<250 chars) and InMails (<120 words) with real trigger hooks.',
    author: 'Social Selling Ops',
    installs: 1890,
    rating: 4.88,
    phase: 'development',
    icon: 'Share2',
    tags: ['LinkedIn', 'InMail', 'Social Selling', 'Icebreakers'],
    isInstalled: false,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: AgentPlugin
metadata:
  id: linkedin-inmail-pro
  version: 1.9.0`
  },
  {
    id: 'plugin-clay-waterfall-enricher',
    name: 'Clay Deep Waterfall & Technographics',
    version: '2.0.0',
    category: 'Automation',
    description: 'Waterfall cascade formulas for Apollo, Hunter, Findymail, and BuiltWith tech stack discovery with AI relevance scoring.',
    author: 'Clay Data Guild',
    installs: 2150,
    rating: 4.94,
    phase: 'development',
    icon: 'Database',
    tags: ['Clay', 'Waterfall', 'Technographics', 'Enrichment'],
    isInstalled: false,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: DataPlugin
metadata:
  id: clay-waterfall-enricher
  version: 2.0.0`
  },
  {
    id: 'plugin-kpi-pipeline-math',
    name: 'RevOps Reverse Funnel & KPI Forecaster',
    version: '2.0.0',
    category: 'Analytics',
    description: 'Reverse-funnel pipeline mathematics: ARR targets -> SQLs -> Dials/Touches required, with send-health deliverability anomaly detectors.',
    author: 'RevOps Analytics',
    installs: 1420,
    rating: 4.89,
    phase: 'design',
    icon: 'BarChart3',
    tags: ['KPI', 'Reverse Funnel', 'Deliverability Alerts', 'Pipeline Math'],
    isInstalled: false,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: AnalyticsPlugin
metadata:
  id: kpi-pipeline-math
  version: 2.0.0`
  },
  {
    id: 'plugin-signalwire-voice-agent',
    name: 'SignalWire Conversational AI Voice Connector',
    version: '1.8.0',
    category: 'Outreach',
    description: 'Ultra low-latency WebRTC and SIP phone agent integration for inbound qualification and outbound follow-up calls.',
    author: 'Voice AI Systems',
    installs: 980,
    rating: 4.85,
    phase: 'development',
    icon: 'PhoneCall',
    tags: ['SignalWire', 'Voice AI', 'WebRTC', 'Phone Qualification'],
    isInstalled: false,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: VoicePlugin
metadata:
  id: signalwire-voice-agent
  version: 1.8.0`
  },
  {
    id: 'plugin-mcp-hubspot-bridge',
    name: 'HubSpot Model Context Protocol (MCP) Server',
    version: '1.5.0',
    category: 'RevOps',
    description: 'Official MCP bridge enabling LLM agents to safely query contacts, check deals, and stage draft tasks in HubSpot with host approval tokens.',
    author: 'MCP Integration Team',
    installs: 2780,
    rating: 4.96,
    phase: 'deployment',
    icon: 'Layers',
    tags: ['MCP', 'HubSpot', 'Tool Connector', 'CRM'],
    isInstalled: true,
    manifestYaml: `apiVersion: rostr.ai/v2
kind: McpServerPlugin
metadata:
  id: mcp-hubspot-bridge
  version: 1.5.0`
  }
];
