export type ViewMode = 'overview' | 'studio' | 'console' | 'integrations' | 'settings';

export type AgentId = 'enably_master' | 'enably_icp' | 'enably_playbook' | 'enably_messaging' | 'enably_research';

export interface AgentInfo {
  id: AgentId;
  name: string;
  tagline: string;
  role: string;
  model: string;
  temperature: number;
  capabilities: string[];
  systemPromptSummary: string;
  color: string;
  iconName: string;
  defaultPrompt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentId?: AgentId;
  content: string;
  timestamp: string;
  artifacts?: Artifact[];
  toolsExecuted?: {
    name: string;
    input: string;
    output: string;
    durationMs: number;
  }[];
}

export interface Artifact {
  id: string;
  title: string;
  type: 'icp_matrix' | 'sales_playbook' | 'outreach_sequence' | 'account_intel' | 'gtm_blueprint';
  agentId: AgentId;
  createdAt: string;
  version: string;
  content: string;
  tags: string[];
  metadata?: Record<string, any>;
}

export interface Integration {
  id: string;
  name: string;
  category: 'crm' | 'enrichment' | 'sequencing' | 'automation' | 'infrastructure';
  description: string;
  icon: string;
  connected: boolean;
  status: 'active' | 'configured' | 'disconnected';
  authType: 'oauth' | 'api_key';
  lastSync?: string;
}

export interface Workspace {
  id: string;
  name: string;
  tier: 'Growth' | 'Enterprise' | 'Scale';
  activeAgents: number;
  tokenSpendThisMonth: number;
  tokenBudget: number;
  teamSeats: number;
}
