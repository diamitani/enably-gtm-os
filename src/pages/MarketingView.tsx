import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Check, 
  Plus, 
  Bot, 
  Layers, 
  Key, 
  Brain, 
  Lock, 
  Terminal, 
  ChevronRight,
  FileText,
  Sliders,
  Play,
  CheckCircle2,
  Building2,
  Workflow
} from 'lucide-react';
import { Logo } from '../components/brand/Logo';
import { TEAM_TEMPLATES, ROLES, SKILLS, TOOLS, memberFromRole } from '../lib/team-catalog';
import { AgentTeam, AgentMember, TeamTemplate } from '../types/team';

interface MarketingViewProps {
  onLaunchStudio: (prompt?: string) => void;
  setCurrentView: (view: string) => void;
}

export const MarketingView: React.FC<MarketingViewProps> = ({ onLaunchStudio, setCurrentView }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<'marketing' | 'sales' | 'support' | 'research'>('marketing');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('marketing-full');
  const [customRoleIds, setCustomRoleIds] = useState<string[]>(['cmo', 'content', 'seo', 'social']);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);

  const currentTemplate = TEAM_TEMPLATES.find(t => t.id === selectedTemplateId) || TEAM_TEMPLATES[0];

  const toggleCustomRole = (roleId: string) => {
    setCustomRoleIds(prev => 
      prev.includes(roleId) ? prev.filter(r => r !== roleId) : [...prev, roleId]
    );
  };

  return (
    <div className="bg-white text-ink min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto text-center border-b border-paper-200">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-xs font-medium text-accent-ink mb-8 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>Managed Agent Workspaces & Squad Control Panel</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink max-w-5xl mx-auto leading-[1.1] mb-6">
          Build, Train & Manage Your <span className="text-accent">AI Agent Team</span>.
        </h1>

        <p className="text-base sm:text-xl text-ink-muted max-w-3xl mx-auto leading-relaxed mb-10">
          Create a full marketing squad or hire a single specialist in seconds. Train them on your brand docs, grant skills and tools, and govern execution from one control panel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="btn-accent text-base px-8 py-3.5 shadow-glow-accent"
          >
            <Plus className="h-4 w-4" />
            <span>Create Your Team Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setCurrentView('marketplace')}
            className="btn-secondary text-base px-8 py-3.5"
          >
            <Layers className="h-4 w-4 text-accent" />
            <span>Explore Team Templates</span>
          </button>
        </div>

        {/* INTERACTIVE TEAM BUILDER DEMO WIDGET */}
        <div className="max-w-5xl mx-auto card p-6 sm:p-8 text-left shadow-float border-paper-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-paper-200 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                <Users className="h-4 w-4" />
                <span>Interactive Team Builder Preview</span>
              </div>
              <h3 className="text-lg font-bold text-ink mt-1">Assemble Your Specialist Squad</h3>
            </div>

            <div className="flex items-center gap-2 bg-paper-100 p-1 rounded-xl border border-paper-200">
              {(['marketing', 'sales', 'support', 'research'] as const).map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    selectedDepartment === dept 
                      ? 'bg-white text-ink shadow-sm font-semibold' 
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Template Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {TEAM_TEMPLATES.filter(t => t.department === selectedDepartment || selectedDepartment === 'marketing').slice(0, 3).map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplateId(tpl.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedTemplateId === tpl.id 
                    ? 'border-accent bg-accent-soft/40 shadow-sm ring-1 ring-accent' 
                    : 'border-paper-200 bg-white hover:border-paper-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-ink">{tpl.name}</span>
                  <span className="chip text-[10px] uppercase font-mono">{tpl.roleIds.length} Agents</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">{tpl.description}</p>
              </div>
            ))}
          </div>

          {/* Member Roster Preview */}
          <div className="bg-paper-50 rounded-xl p-5 border border-paper-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-ink-muted uppercase font-semibold">
                Squad Roster ({currentTemplate.roleIds.length} Members Assigned)
              </span>
              <span className="text-xs text-accent font-medium">Goal: {currentTemplate.goal}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {currentTemplate.roleIds.map((roleId, idx) => {
                const role = ROLES.find(r => r.id === roleId);
                if (!role) return null;
                return (
                  <div key={roleId} className="bg-white p-3 rounded-lg border border-paper-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="h-7 w-7 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center">
                          {role.initials}
                        </span>
                        <span className="chip text-[9px] bg-emerald-50 text-emerald-700 border-emerald-200">Active</span>
                      </div>
                      <div className="font-semibold text-xs text-ink">{role.title}</div>
                      <div className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">{role.summary}</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-paper-100 flex items-center justify-between text-[10px] text-ink-faint">
                      <span>{role.defaultSkills.length} Skills</span>
                      <span>{role.defaultTools.length} Tools</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Row inside builder */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-paper-200">
            <div className="text-xs text-ink-muted flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Includes ROSTR Execution Harness & Granular Tool Permissions</span>
            </div>

            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full sm:w-auto btn-accent"
            >
              <span>Launch Control Panel With This Team</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* THE CONTROL PANEL & DASHBOARD MOAT (4 PILLARS) */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-paper-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="chip mb-3 text-accent font-mono uppercase">Control Panel Architecture</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            The Control Panel is the Moat.
          </h2>
          <p className="text-base text-ink-muted mt-4 leading-relaxed">
            Raw LLMs aren't enough. 6th Agent provides the management layer where you train, configure and govern team execution across every touchpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Team Roster & Org Structure */}
          <div className="card p-8 hover:shadow-float transition-all">
            <div className="h-12 w-12 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">1. Visual Team Org & Reporting</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              Structure your AI squad like a real department. Assign lead agents (e.g., Head of Marketing), set sub-agent reporting lines, and track monthly dollar budgets per member.
            </p>
            <ul className="space-y-2.5 text-xs text-ink font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Hierarchical reporting & task delegation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Per-agent monthly spend & execution limits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Multi-tenant workspace isolation</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Agent Training & Knowledge Vault */}
          <div className="card p-8 hover:shadow-float transition-all">
            <div className="h-12 w-12 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mb-6">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">2. Training & Knowledge Vault</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              Upload brand voice guidelines, product PDFs, Notion wikis, or target customer URLs. Agents reference your private knowledge on every single output.
            </p>
            <ul className="space-y-2.5 text-xs text-ink font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>PDF, Doc, URL & Note memory sources</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Custom system instructions per agent role</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Persistent context memory across sessions</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Granular Tool Access Gates */}
          <div className="card p-8 hover:shadow-float transition-all">
            <div className="h-12 w-12 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mb-6">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">3. Granular Tool Permission Gates</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              Never worry about runaway agents. Set per-tool access policies (<span className="font-mono font-bold text-ink">off</span> | <span className="font-mono font-bold text-ink">read</span> | <span className="font-mono font-bold text-ink">write</span> | <span className="font-mono font-bold text-accent">approval</span>) across Gmail, Slack, HubSpot, Salesforce, Stripe and GitHub.
            </p>
            <ul className="space-y-2.5 text-xs text-ink font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Human-in-the-loop approval queue for external actions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>OAuth 2.0 & encrypted BYOK API Gateway</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Audit logging for every mutation</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4: ROSTR Harness Engine (The Accent) */}
          <div className="card p-8 hover:shadow-float transition-all border-accent/30 bg-accent-soft/10">
            <div className="h-12 w-12 rounded-2xl bg-accent text-white flex items-center justify-center mb-6 shadow-glow-accent">
              <Zap className="h-6 w-6" />
            </div>
            <div className="chip bg-accent text-white mb-2">The Execution Layer Accent</div>
            <h3 className="text-xl font-bold text-ink mb-2">4. ROSTR Execution Harness</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              Under the hood, the ROSTR v2 harness compiles intent (PAL), categorizes task urgency (NPAO), and enforces phase-aware orchestration (PreD → Design → Development → Deployment → Debugging).
            </p>
            <ul className="space-y-2.5 text-xs text-ink font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Zero looping, zero stalling, zero infinite retries</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Bedrock & Vercel AI Gateway latency optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Structured artifact generation & export</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto text-center border-b border-paper-200">
        <div className="chip mb-3 text-accent font-mono uppercase">Transparent Plans</div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight mb-4">
          Simple, Predictable Team Pricing.
        </h2>
        <p className="text-base text-ink-muted max-w-2xl mx-auto mb-8">
          Start with a single agent or outfit your whole organization. All plans include full Control Panel access and the ROSTR harness.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-paper-100 p-1.5 rounded-full border border-paper-200 mb-12">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              billingPeriod === 'monthly' ? 'bg-white text-ink shadow-sm' : 'text-ink-muted'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              billingPeriod === 'annual' ? 'bg-accent text-white shadow-sm' : 'text-ink-muted'
            }`}
          >
            Annual (Save 20%)
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {/* Starter */}
          <div className="card p-6 flex flex-col justify-between">
            <div>
              <div className="font-bold text-lg text-ink">Starter</div>
              <div className="text-xs text-ink-muted mt-1">For solo founders and 1-agent setups.</div>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-ink">{billingPeriod === 'annual' ? '$39' : '$49'}</span>
                <span className="text-xs text-ink-muted"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-ink mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 1 Active Agent Member</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 2,000 Credits / mo</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Basic Knowledge Vault</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Standard Tool Access</li>
              </ul>
            </div>
            <button onClick={() => setCurrentView('dashboard')} className="btn-secondary w-full">Start Free Trial</button>
          </div>

          {/* Pro */}
          <div className="card p-6 border-accent bg-accent-soft/20 flex flex-col justify-between relative shadow-float">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 chip bg-accent text-white text-[10px] uppercase font-bold">Most Popular</div>
            <div>
              <div className="font-bold text-lg text-ink">Professional</div>
              <div className="text-xs text-ink-muted mt-1">For growing teams hiring a full pod.</div>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-ink">{billingPeriod === 'annual' ? '$159' : '$199'}</span>
                <span className="text-xs text-ink-muted"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-ink mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent font-bold" /> 5 Active Agent Members</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent font-bold" /> 15,000 Credits / mo</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent font-bold" /> Full ROSTR Execution Harness</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent font-bold" /> Human Approval Queue</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent font-bold" /> BYOK AI Gateway</li>
              </ul>
            </div>
            <button onClick={() => setCurrentView('dashboard')} className="btn-accent w-full">Launch Pro Squad</button>
          </div>

          {/* Scale */}
          <div className="card p-6 flex flex-col justify-between">
            <div>
              <div className="font-bold text-lg text-ink">Scale</div>
              <div className="text-xs text-ink-muted mt-1">For multi-department agent teams.</div>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-ink">{billingPeriod === 'annual' ? '$479' : '$599'}</span>
                <span className="text-xs text-ink-muted"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-ink mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 20 Active Agent Members</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 75,000 Credits / mo</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Multi-Team Org Structures</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Custom Tool Integrations</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Priority Support</li>
              </ul>
            </div>
            <button onClick={() => setCurrentView('dashboard')} className="btn-secondary w-full">Contact Sales</button>
          </div>

          {/* Enterprise */}
          <div className="card p-6 flex flex-col justify-between">
            <div>
              <div className="font-bold text-lg text-ink">Enterprise</div>
              <div className="text-xs text-ink-muted mt-1">Dedicated VPC & custom SLAs.</div>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-ink">Custom</span>
              </div>
              <ul className="space-y-2.5 text-xs text-ink mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Unlimited Agents & Teams</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Custom Credits & SLAs</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Single Sign-On (SSO / SCIM)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> On-Prem / Private VPC</li>
              </ul>
            </div>
            <a href="mailto:enterprise@6thagent.ai" className="btn-secondary w-full text-center">Talk to Enterprise</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-20 px-6 sm:px-12 max-w-5xl mx-auto text-center">
        <div className="card p-12 bg-accent-soft/30 border-accent/30 shadow-float">
          <Logo size="lg" variant="vertical" className="mb-6" />
          <h2 className="text-3xl font-extrabold text-ink mb-4">Ready to Create Your Agent Team?</h2>
          <p className="text-sm text-ink-muted max-w-xl mx-auto mb-8">
            Join revenue and creative leaders managing autonomous agent squads with 6th Agent.
          </p>
          <button onClick={() => setCurrentView('dashboard')} className="btn-accent text-base px-8 py-3.5 shadow-glow-accent">
            <Plus className="h-4 w-4" />
            <span>Launch Your Control Panel</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
