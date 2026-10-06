export type Phase5D = 'pred' | 'design' | 'development' | 'deployment' | 'debugging';
export type NpaoCategory = 'necessity' | 'priority' | 'anxiety' | 'opportunity';
export type Role = 'viewer' | 'member' | 'admin' | 'owner';

export type ViewMode = 
  | 'marketing' 
  | 'marketplace' 
  | 'academy' 
  | 'directory' 
  | 'dashboard' 
  | 'console' 
  | 'studio' 
  | 'integrations' 
  | 'settings'
  | 'overview'; // backward compat

export type AgentId = 
  | 'enably_master' 
  | 'enably_icp' 
  | 'enably_playbook' 
  | 'enably_messaging' 
  | 'enably_research'
  | 'enably_voice'
  | 'enably_kpi'
  | 'enably_clay';

export interface AgentInfo {
  id: AgentId;
  name: string;
  tagline: string;
  role: string;
  model: string;
  temperature: number;
  color: string;
  iconName: string;
  capabilities: string[];
  systemPromptSummary: string;
  defaultPrompt: string;
}

export interface Artifact {
  id: string;
  title: string;
  type: string;
  agentId: string;
  createdAt: string;
  version: string;
  content: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentId?: string;
  text?: string;
  content?: string;
  timestamp: string;
  phase?: Phase5D;
  artifacts?: Artifact[];
  toolsExecuted?: {
    name: string;
    input: any;
    output: any;
    durationMs: number;
  }[];
  palTrace?: {
    intent: string;
    ambiguityScore: number;
    targetAgent: string;
  };
}

export interface Integration {
  id: string;
  name: string;
  category: 'crm' | 'enrichment' | 'sequencing' | 'automation' | 'infrastructure';
  description: string;
  icon: string;
  connected: boolean;
  status: 'active' | 'configured' | 'disconnected';
  authType: 'oauth' | 'api_key' | 'webhook';
  lastSync?: string;
}

export interface AgentManifest {
  id: string;
  name: string;
  version: string;
  tagline: string;
  role: string;
  category: 'strategy' | 'automation' | 'outreach' | 'operations' | 'research' | 'analytics';
  phases: Phase5D[];
  goals: string[];
  instructions: string;
  inputs: string[];
  outputs: string[];
  tools: string[];
  skills: string[];
  delegates?: string[];
  guardrails: string[];
  systemPrompt: string;
  avatarIcon: string;
  accentColor: string;
}

export interface PalCompiledIntent {
  raw_input: string;
  primary_intent: string;
  domain: 'code' | 'design' | 'research' | 'ops' | 'sales' | 'content' | 'deploy' | 'debug';
  subject: string;
  constraints: string[];
  desired_output: string;
  urgency: 'immediate' | 'queued' | 'scheduled';
  ambiguity_score: number;
  injected_context: {
    project_state: string;
    prior_decisions: string[];
    context_engine_blockers: string[];
    domain_knowledge: string[];
  };
  enhanced_instruction: string;
  completion_criteria: string[];
  escalation_policy: 'auto-proceed' | 'require-approval' | 'human-in-loop';
  compiled_yaml: string;
  target_agent_id: string;
  npao_phase: Phase5D;
}

export interface NpaoTask {
  id: string;
  title: string;
  category: NpaoCategory;
  phase: Phase5D;
  priorityScore: number; // 0.0 - 10.0
  urgency: number; // 0 - 10
  dependencyImpact: number; // 0 - 10
  businessImpact: number; // 0 - 10
  resourceEfficiency: number; // 0 - 10
  assignedAgentId: string;
  status: 'backlog' | 'queued' | 'in_progress' | 'review' | 'completed';
  dependencies: string[];
  createdAt: string;
}

export interface RagDalSource {
  id: string;
  url: string;
  title: string;
  author: string;
  tier: 1 | 2 | 3;
  credibility_score: number;
  excerpt: string;
  published_date: string;
}

export interface RagDalQueryResult {
  query: string;
  confidence: number;
  verification_status: 'verified' | 'uncertain' | 'open';
  passes_executed: number;
  sources: RagDalSource[];
  sub_topics: {
    topic: string;
    confidence: number;
    confirmed_by_tier1_or_2: boolean;
  }[];
  synthesized_brief: string;
}

export interface ContextSessionRecord {
  session_id: string;
  timestamp: string;
  project: string;
  phase: Phase5D;
  accomplishments: string[];
  decisions_made: { decision: string; rationale: string }[];
  failures_encountered: { attempt: string; result: string; reason: string }[];
  open_blockers: string[];
  next_recommended_action: string;
  agent_learnings: string[];
}

export interface WorkflowNode {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition' | 'ai_transform' | 'output';
  service: 'n8n' | 'clay' | 'hubspot' | 'apollo' | 'slack' | 'webhook' | 'openai' | 'make';
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  platform: 'n8n' | 'make' | 'custom_agent';
  status: 'active' | 'draft' | 'paused';
  nodesCount: number;
  lastRun: string;
  successRate: number;
  jsonDefinition: string;
}

export interface LeadRecord {
  id: string;
  fullName: string;
  title: string;
  company: string;
  domain: string;
  industry: string;
  companySize: string;
  location: string;
  email: string;
  linkedinUrl: string;
  icpScore: number; // 0 - 100
  icpTier: 'ICP-1 (SaaS Enterprise)' | 'ICP-2 (Mid-Market Scale)' | 'ICP-3 (Series-A Growth)' | 'ICP-1 (SaaS Startup)' | 'ICP-2 (Mid-Market Services)' | 'ICP-3 (Enterprise Scaleup)' | 'Out of ICP';
  enrichmentStatus: 'unprocessed' | 'enriching' | 'enriched' | 'verified';
  pipelineStatus: 'new' | 'outreached' | 'replied' | 'demo_booked' | 'won' | 'lost';
  signals: string[];
  generatedAccountBrief?: string;
  activeSequenceStep?: number;
  lastContacted?: string;
}

export interface PluginPack {
  id: string;
  name: string;
  version: string;
  category: 'Strategy' | 'Automation' | 'Outreach' | 'RevOps' | 'Research' | 'Analytics';
  description: string;
  author: string;
  installs: number;
  rating: number;
  phase: Phase5D;
  icon: string;
  tags: string[];
  isInstalled: boolean;
  manifestYaml: string;
  price?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Mastery';
  description: string;
  lessonsCount: number;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    content: string;
  }[];
  badgeName: string;
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

export interface WorkspaceConfig {
  id: string;
  name: string;
  slug: string;
  plan: 'Starter' | 'Professional' | 'Scale' | 'Enterprise';
  seats: number;
  creditsUsed: number;
  creditsLimit: number;
  byokKeys: {
    openai?: string;
    anthropic?: string;
    gemini?: string;
    groq?: string;
    openrouter?: string;
    vercelGateway?: string;
  };
  members: {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar: string;
  }[];
}
