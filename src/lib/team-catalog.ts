import {
  SkillDef,
  ToolDef,
  RoleTemplate,
  TeamTemplate,
  AgentTeam,
  AgentMember,
  ActivityItem,
  Department,
  ToolAccess,
} from '../types/team';

export const DEPARTMENTS: { id: Department; label: string }[] = [
  { id: 'marketing', label: 'Marketing' },
  { id: 'sales', label: 'Sales' },
  { id: 'support', label: 'Support' },
  { id: 'research', label: 'Research' },
  { id: 'operations', label: 'Operations' },
  { id: 'creative', label: 'Creative' },
];

export const SKILLS: SkillDef[] = [
  { id: 'copywriting', name: 'Copywriting', description: 'On-brand long and short form copy' },
  { id: 'seo', name: 'SEO research', description: 'Keyword gaps, briefs and on-page fixes' },
  { id: 'social', name: 'Social publishing', description: 'Plans, drafts and schedules posts' },
  { id: 'email', name: 'Email campaigns', description: 'Sequences, newsletters and A/B tests' },
  { id: 'analytics', name: 'Analytics', description: 'Reads dashboards and writes weekly reports' },
  { id: 'ads', name: 'Paid ads', description: 'Builds and tunes ad sets within budget' },
  { id: 'prospecting', name: 'Prospecting', description: 'Finds and enriches ICP accounts' },
  { id: 'outreach', name: 'Outreach', description: 'Personalised first touches and follow ups' },
  { id: 'crm', name: 'CRM hygiene', description: 'Logs activity, dedupes and updates stages' },
  { id: 'research', name: 'Web research', description: 'Cited briefs from trusted sources' },
  { id: 'support', name: 'Ticket triage', description: 'Answers, routes and escalates tickets' },
  { id: 'design', name: 'Visual design', description: 'Brand-safe graphics and layouts' },
  { id: 'scheduling', name: 'Scheduling', description: 'Books meetings and manages calendars' },
  { id: 'voice', name: 'Voice calls', description: 'Inbound and outbound phone conversations' },
];

export const TOOLS: ToolDef[] = [
  { id: 'gmail', name: 'Gmail', category: 'Communication', description: 'Read and send email', logo: 'gmail' },
  { id: 'slack', name: 'Slack', category: 'Communication', description: 'Post updates, ask for approval', logo: 'slack' },
  { id: 'hubspot', name: 'HubSpot', category: 'CRM', description: 'Contacts, deals and sequences', logo: 'hubspot' },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', description: 'Accounts and opportunities', logo: 'salesforce' },
  { id: 'notion', name: 'Notion', category: 'Content', description: 'Docs, briefs and wikis', logo: 'notion' },
  { id: 'webflow', name: 'Webflow', category: 'Content', description: 'Publish pages and blog posts', logo: 'webflow' },
  { id: 'gdrive', name: 'Google Drive', category: 'Data', description: 'Files and spreadsheets', logo: 'googledrive' },
  { id: 'ga', name: 'Google Analytics', category: 'Data', description: 'Traffic and conversion data', logo: 'googleanalytics' },
  { id: 'linkedin', name: 'LinkedIn', category: 'Ads & Social', description: 'Posts, ads and DMs', logo: 'linkedin' },
  { id: 'meta', name: 'Meta Ads', category: 'Ads & Social', description: 'Facebook and Instagram ads', logo: 'meta' },
  { id: 'x', name: 'X', category: 'Ads & Social', description: 'Posts and replies', logo: 'x' },
  { id: 'stripe', name: 'Stripe', category: 'Payments', description: 'Customers and invoices', logo: 'stripe' },
  { id: 'github', name: 'GitHub', category: 'Dev', description: 'Issues and pull requests', logo: 'github' },
  { id: 'figma', name: 'Figma', category: 'Content', description: 'Read designs and export assets', logo: 'figma' },
];

export const MODELS = ['Claude Sonnet', 'GPT-5', 'Gemini Pro', 'Llama (open)'];

export const ROLES: RoleTemplate[] = [
  // Marketing
  { id: 'cmo', title: 'Head of Marketing', department: 'marketing', initials: 'HM', summary: 'Sets the plan, assigns work and reviews output.', defaultSkills: ['analytics', 'copywriting'], defaultTools: ['slack', 'notion', 'ga'], defaultInstructions: 'Own the monthly marketing plan. Break goals into weekly tasks for the team, review every external-facing asset before it ships, and send a Friday summary to Slack.' },
  { id: 'content', title: 'Content Writer', department: 'marketing', initials: 'CW', summary: 'Blog posts, landing copy and newsletters.', defaultSkills: ['copywriting', 'seo'], defaultTools: ['notion', 'webflow', 'gdrive'], defaultInstructions: 'Write in our brand voice: clear, warm and specific. Every draft needs a working title, a one-line promise and sources for any claim.' },
  { id: 'seo', title: 'SEO Specialist', department: 'marketing', initials: 'SE', summary: 'Keyword strategy and on-page optimisation.', defaultSkills: ['seo', 'analytics', 'research'], defaultTools: ['ga', 'webflow'], defaultInstructions: 'Find keyword gaps against our top three competitors, write content briefs for the Content Writer and flag pages losing traffic week over week.' },
  { id: 'social', title: 'Social Media Manager', department: 'marketing', initials: 'SM', summary: 'Plans and publishes across channels.', defaultSkills: ['social', 'copywriting', 'design'], defaultTools: ['linkedin', 'x', 'meta'], defaultInstructions: 'Keep a two-week content calendar. Repurpose every blog post into three social posts. Never reply to complaints publicly without approval.' },
  { id: 'email', title: 'Email Marketer', department: 'marketing', initials: 'EM', summary: 'Lifecycle sequences and campaigns.', defaultSkills: ['email', 'copywriting', 'analytics'], defaultTools: ['hubspot', 'gmail'], defaultInstructions: 'Run the weekly newsletter and onboarding sequence. A/B test one variable at a time and report open and click rates.' },
  { id: 'ads', title: 'Paid Ads Manager', department: 'marketing', initials: 'PA', summary: 'Runs campaigns inside a set budget.', defaultSkills: ['ads', 'analytics'], defaultTools: ['meta', 'linkedin', 'ga'], defaultInstructions: 'Stay inside the monthly ad budget. Pause any ad set with CPA 30% above target and propose new creative weekly.' },
  // Sales
  { id: 'sdr', title: 'Sales Development Rep', department: 'sales', initials: 'SD', summary: 'Prospects and books first meetings.', defaultSkills: ['prospecting', 'outreach', 'scheduling'], defaultTools: ['hubspot', 'gmail', 'linkedin'], defaultInstructions: 'Find 25 ICP accounts a day, write personalised first touches and book meetings on the AE calendar. Log everything in the CRM.' },
  { id: 'researcher', title: 'Account Researcher', department: 'sales', initials: 'AR', summary: 'Deep dossiers before every call.', defaultSkills: ['research', 'prospecting'], defaultTools: ['notion', 'salesforce'], defaultInstructions: 'Before each booked call, write a one-page brief: company context, recent news, likely pains and three discovery questions.' },
  { id: 'revops', title: 'RevOps Analyst', department: 'sales', initials: 'RO', summary: 'Keeps the pipeline clean and forecastable.', defaultSkills: ['crm', 'analytics'], defaultTools: ['salesforce', 'hubspot', 'slack'], defaultInstructions: 'Dedupe records daily, flag stalled deals older than 14 days and post a Monday pipeline snapshot.' },
  // Support
  { id: 'support', title: 'Support Agent', department: 'support', initials: 'SA', summary: 'First response on every ticket.', defaultSkills: ['support', 'email'], defaultTools: ['gmail', 'slack'], defaultInstructions: 'Answer from the help centre only. Escalate billing, legal or angry customers to a human within five minutes.' },
  { id: 'voice', title: 'Voice Receptionist', department: 'support', initials: 'VR', summary: 'Answers calls and books appointments.', defaultSkills: ['voice', 'scheduling'], defaultTools: ['gmail'], defaultInstructions: 'Greet callers warmly, qualify the request, book time on the shared calendar and send a confirmation email.' },
  // Research / Ops / Creative
  { id: 'analyst', title: 'Market Analyst', department: 'research', initials: 'MA', summary: 'Competitive and market intelligence.', defaultSkills: ['research', 'analytics'], defaultTools: ['notion', 'gdrive'], defaultInstructions: 'Track five competitors. Publish a weekly digest of pricing, launches and hiring signals with links to sources.' },
  { id: 'ops', title: 'Operations Coordinator', department: 'operations', initials: 'OC', summary: 'Runs recurring processes and reports.', defaultSkills: ['scheduling', 'analytics'], defaultTools: ['slack', 'gdrive', 'notion'], defaultInstructions: 'Run the weekly ops checklist, chase owners for overdue items and keep the team wiki current.' },
  { id: 'designer', title: 'Brand Designer', department: 'creative', initials: 'BD', summary: 'On-brand visuals for every channel.', defaultSkills: ['design'], defaultTools: ['figma', 'gdrive'], defaultInstructions: 'Use only the approved brand kit. Deliver every asset in the sizes requested by Social and Ads.' },
];

export const TEAM_TEMPLATES: TeamTemplate[] = [
  { id: 'marketing-full', name: 'Full marketing team', department: 'marketing', description: 'Head of Marketing plus content, SEO, social and email.', roleIds: ['cmo', 'content', 'seo', 'social', 'email'], goal: 'Grow qualified signups 20% this quarter.' },
  { id: 'content-engine', name: 'Content engine', department: 'marketing', description: 'Writer, SEO and social working as one loop.', roleIds: ['content', 'seo', 'social'], goal: 'Publish two ranking articles a week.' },
  { id: 'outbound', name: 'Outbound sales pod', department: 'sales', description: 'SDR, researcher and RevOps.', roleIds: ['sdr', 'researcher', 'revops'], goal: 'Book 30 qualified meetings a month.' },
  { id: 'support-desk', name: 'Support desk', department: 'support', description: 'Ticket triage plus a voice receptionist.', roleIds: ['support', 'voice'], goal: 'First response under 2 minutes, 24/7.' },
  { id: 'research-cell', name: 'Research cell', department: 'research', description: 'Analyst and researcher for weekly intel.', roleIds: ['analyst', 'researcher'], goal: 'Weekly competitive digest every Monday.' },
];

const FIRST_NAMES = ['Nova', 'Atlas', 'Iris', 'Milo', 'Sage', 'Juno', 'Rhea', 'Orion', 'Wren', 'Theo', 'Lyra', 'Kai'];

export const uid = (p: string) => `${p}_${Math.random().toString(36).slice(2, 9)}`;

export const roleById = (id: string) => ROLES.find((r) => r.id === id);

export function memberFromRole(roleId: string, index = 0, reportsTo?: string): AgentMember {
  const role = roleById(roleId)!;
  const tools: Record<string, ToolAccess> = {};
  role.defaultTools.forEach((t) => (tools[t] = 'approval'));
  return {
    id: uid('agt'),
    name: FIRST_NAMES[index % FIRST_NAMES.length],
    roleId: role.id,
    title: role.title,
    department: role.department,
    skills: [...role.defaultSkills],
    instructions: role.defaultInstructions,
    knowledge: [],
    tools,
    model: MODELS[0],
    status: 'draft',
    reportsTo,
    monthlyBudget: 150,
    spent: 0,
    tasksDone: 0,
  };
}

/** Seed workspace so the control panel is alive on first visit (sample data). */
function seedTeam(): AgentTeam {
  const members = TEAM_TEMPLATES[0].roleIds.map((r, i) => memberFromRole(r, i));
  const lead = members[0];
  members.forEach((m, i) => {
    if (i > 0) m.reportsTo = lead.id;
    m.status = i === 4 ? 'training' : 'active';
    m.spent = [92, 61, 38, 44, 12][i];
    m.tasksDone = [41, 128, 57, 203, 9][i];
    m.knowledge = [
      { id: uid('kn'), kind: 'file', label: 'Brand voice guide.pdf', detail: '24 pages' },
      { id: uid('kn'), kind: 'url', label: '6thagent.ai', detail: 'Website, 38 pages' },
    ];
  });
  return {
    id: 'team_marketing',
    name: 'Growth Marketing',
    department: 'marketing',
    goal: TEAM_TEMPLATES[0].goal,
    members,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    approvalPolicy: 'external_only',
  };
}

function seedSales(): AgentTeam {
  const members = TEAM_TEMPLATES[2].roleIds.map((r, i) => memberFromRole(r, i + 6));
  members.forEach((m, i) => {
    if (i > 0) m.reportsTo = members[0].id;
    m.status = 'active';
    m.spent = [71, 33, 18][i];
    m.tasksDone = [312, 46, 88][i];
  });
  return {
    id: 'team_sales',
    name: 'Outbound Pod',
    department: 'sales',
    goal: TEAM_TEMPLATES[2].goal,
    members,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    approvalPolicy: 'external_only',
  };
}

export const SEED_TEAMS: AgentTeam[] = [seedTeam(), seedSales()];

export function seedActivity(teams: AgentTeam[]): ActivityItem[] {
  const [mkt, sales] = teams;
  const m = mkt.members;
  const s = sales.members;
  return [
    { id: uid('act'), agentId: m[1].id, teamId: mkt.id, action: 'Drafted blog post', target: '“How to brief an AI agent”', at: '2m ago', kind: 'approval' },
    { id: uid('act'), agentId: s[0].id, teamId: sales.id, action: 'Booked meeting', target: 'Northwind, VP Growth', at: '6m ago', kind: 'done' },
    { id: uid('act'), agentId: m[3].id, teamId: mkt.id, action: 'Scheduled 3 posts', target: 'LinkedIn, X', at: '14m ago', kind: 'done' },
    { id: uid('act'), agentId: m[2].id, teamId: mkt.id, action: 'Researching keywords', target: '“agent workspace”', at: 'now', kind: 'running' },
    { id: uid('act'), agentId: s[2].id, teamId: sales.id, action: 'Merged duplicates', target: '18 HubSpot contacts', at: '31m ago', kind: 'done' },
    { id: uid('act'), agentId: m[4].id, teamId: mkt.id, action: 'Needs access', target: 'HubSpot write', at: '42m ago', kind: 'blocked' },
    { id: uid('act'), agentId: m[0].id, teamId: mkt.id, action: 'Assigned 6 tasks', target: 'Week 41 plan', at: '1h ago', kind: 'done' },
  ];
}
