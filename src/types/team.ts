// Core domain for the 6th Agent control panel: workspaces own teams, teams own agents.
// Agents are configured with a role, skills, instructions, knowledge and tool grants,
// then executed by the ROSTR harness.

export type Department = 'marketing' | 'sales' | 'support' | 'research' | 'operations' | 'creative';
export type ToolAccess = 'off' | 'read' | 'write' | 'approval';
export type AgentStatus = 'draft' | 'training' | 'active' | 'paused';

export interface SkillDef {
  id: string;
  name: string;
  description: string;
}

export interface ToolDef {
  id: string;
  name: string;
  category: 'Communication' | 'CRM' | 'Content' | 'Data' | 'Ads & Social' | 'Payments' | 'Dev';
  description: string;
  /** Simple Icons slug for the real brand logo */
  logo: string;
}

export interface KnowledgeSource {
  id: string;
  kind: 'file' | 'url' | 'note';
  label: string;
  detail: string;
}

export interface RoleTemplate {
  id: string;
  title: string;
  department: Department;
  summary: string;
  defaultSkills: string[];
  defaultTools: string[];
  defaultInstructions: string;
  initials: string;
}

export interface AgentMember {
  id: string;
  name: string;
  roleId: string;
  title: string;
  department: Department;
  skills: string[];
  instructions: string;
  knowledge: KnowledgeSource[];
  tools: Record<string, ToolAccess>;
  model: string;
  status: AgentStatus;
  reportsTo?: string;
  monthlyBudget: number;
  spent: number;
  tasksDone: number;
}

export interface AgentTeam {
  id: string;
  name: string;
  department: Department;
  goal: string;
  members: AgentMember[];
  createdAt: string;
  approvalPolicy: 'every_action' | 'external_only' | 'autonomous';
}

export interface TeamTemplate {
  id: string;
  name: string;
  department: Department;
  description: string;
  roleIds: string[];
  goal: string;
}

export interface ActivityItem {
  id: string;
  agentId: string;
  teamId: string;
  action: string;
  target: string;
  at: string;
  kind: 'done' | 'approval' | 'running' | 'blocked';
}
