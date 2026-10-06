import React, { useState } from 'react';
import { ViewMode, AgentId } from '../../types';
import { ENABLY_AGENTS } from '../../data/agents';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Terminal, 
  Copy, 
  Check, 
  Layers, 
  Users, 
  BookOpen, 
  Mail, 
  Search,
  DollarSign,
  ChevronRight,
  Cpu,
  BarChart3
} from 'lucide-react';

interface OverviewViewProps {
  onViewChange: (view: ViewMode) => void;
  onSelectAgent: (agentId: AgentId) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onViewChange, onSelectAgent }) => {
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [activeDemoTab, setActiveDemoTab] = useState<'icp' | 'playbook' | 'sequence'>('icp');
  
  // ROI Calculator States
  const [teamSize, setTeamSize] = useState<number>(8);
  const [avgDealSize, setAvgDealSize] = useState<number>(25000);
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  // Computed ROI
  const hoursSavedPerWeek = teamSize * 14;
  const additionalDealsPerQuarter = Math.max(1, Math.round(teamSize * 0.75));
  const estimatedRevenueLift = additionalDealsPerQuarter * 4 * avgDealSize;

  const demoSnippets = {
    icp: `# Tier-1 Ideal Customer Profile (ICP)
Target: Enterprise Cloud Infrastructure & Security (Series-B to Pre-IPO)
Employee Bracket: 150 - 1,200 | ACV Target: $35,000 - $80,000
Primary Triggers: Multi-cloud migration, SOC2 renewal, hiring > 5 DevOps engineers.

## Buyer Persona Matrix
1. Economic Buyer: VP of Engineering / CTO
   - Core Priority: Reduce outage frequency and developer friction
   - Objection: "We built an internal wrapper around Terraform."
   - Wedge Answer: Zero-maintenance state locking with native AWS IAM integration.
2. Technical Champion: Lead DevSecOps Architect
   - Core Priority: Continuous compliance without manual ticketing`,
    playbook: `# Competitor Kill Sheet: Legacy Incumbents
Target Competitor: Legacy Suite Inc.
Core Vulnerability: 6-month implementation cycles and seat-tax pricing model.

## Discovery Question Framework
- "When your team triggers a cluster re-deployment, how many engineers get paged?"
- "What happens to your audit trail when third-party contractors touch the pipeline?"

## MEDDPICC Quick Check
- Metrics: 70% reduction in deployment pipeline latency.
- Economic Buyer: Direct sign-off from VP Engineering.
- Decision Criteria: Zero-agent architecture and native AWS Bedrock API support.`,
    sequence: `# 4-Touch Outbound Sequence: VP Engineering
Touch 1: Pattern Interrupt Email (Day 1)
Subject: quick question on {{company}}'s deploy audit latency

Hey {{first_name}}, saw {{company}} is scaling the platform team with {{open_roles_count}} open DevOps roles.
Usually when infrastructure teams grow past {{headcount_range}}, pipeline audit sprawl slows deployment cadence by 40%.

We built Enably to automate infrastructure policy verification with zero manual ticketing.
Open to taking a look at a 2-minute interactive audit for {{company}}?

Best,
Alex - Enably GTM Agent`,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  return (
    <div className="w-full space-y-20 pb-20">
      {/* 1. ASYMMETRIC SPLIT HERO */}
      <section className="relative pt-12 md:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-xs text-brand-cyan font-mono">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              <span>Autonomous GTM Operating System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Orchestrate revenue with <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">5 specialized AI agents.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              From precision ICP discovery and competitive battlecards to multi-touch outbound sequences and real-time buyer intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => onViewChange('studio')}
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-obsidian-950 font-bold text-sm hover:brightness-110 shadow-glow-cyan flex items-center justify-center space-x-2 transition-all"
              >
                <span>Launch GTM Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onViewChange('console')}
                className="px-6 py-3.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 text-slate-200 font-semibold text-sm flex items-center justify-center space-x-2 transition-all"
              >
                <Terminal className="w-4 h-4 text-brand-cyan" />
                <span>Test Live Console</span>
              </button>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-400 font-mono pt-2">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                <span>AWS Bedrock AgentCore</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                <span>ROSTR v2 Governance</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                <span>BYOK Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Demo Terminal */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-xl border border-obsidian-700/80 shadow-2xl overflow-hidden bg-obsidian-900/90">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-obsidian-950/80 border-b border-obsidian-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">enably-gtm-harness // v1.0.0</span>
                </div>
                <div className="flex items-center space-x-1 bg-obsidian-850 p-0.5 rounded-md border border-obsidian-700">
                  <button
                    onClick={() => setActiveDemoTab('icp')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                      activeDemoTab === 'icp' ? 'bg-brand-cyan/20 text-brand-cyan font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ICP
                  </button>
                  <button
                    onClick={() => setActiveDemoTab('playbook')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                      activeDemoTab === 'playbook' ? 'bg-brand-violet/20 text-brand-violet font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Playbook
                  </button>
                  <button
                    onClick={() => setActiveDemoTab('sequence')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                      activeDemoTab === 'sequence' ? 'bg-brand-emerald/20 text-brand-emerald font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sequence
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 font-mono text-xs text-slate-300 bg-obsidian-950/60 overflow-x-auto max-h-[320px] relative">
                <button
                  onClick={() => copyToClipboard(demoSnippets[activeDemoTab])}
                  className="absolute top-3 right-3 p-1.5 rounded bg-obsidian-800 hover:bg-obsidian-700 text-slate-400 hover:text-white border border-obsidian-700 transition-colors"
                  title="Copy snippet"
                >
                  {copiedDemo ? <Check className="w-3.5 h-3.5 text-brand-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <pre className="leading-relaxed whitespace-pre-wrap">
                  {demoSnippets[activeDemoTab]}
                </pre>
              </div>

              {/* Terminal Footer Bar */}
              <div className="px-4 py-2.5 bg-obsidian-950/90 border-t border-obsidian-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                  <span>Model: Claude 3.7 Sonnet (0.2 temp)</span>
                </span>
                <button
                  onClick={() => onViewChange('studio')}
                  className="text-brand-cyan hover:underline flex items-center space-x-1"
                >
                  <span>Customize in Workbench</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY & INTEGRATIONS LOGO WALL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-xl glass-card p-6 border border-obsidian-800/70">
          <div className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">
            Native Connectors Across the Modern Revenue Stack
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center text-center">
            {['Salesforce', 'HubSpot', 'Clay.com', 'Apollo.io', 'Lemlist', 'Outreach', 'Make.com', 'n8n'].map((brand) => (
              <div
                key={brand}
                className="py-2.5 px-3 rounded-lg bg-obsidian-900/60 border border-obsidian-800 text-xs font-semibold text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors cursor-pointer"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE 5-AGENT SUITE BENTO MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            The 5 Specialized GTM Agents
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Each harness is engineered with dedicated domain reasoning, continuous state checkpointing, and structured artifact outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENABLY_AGENTS.map((agent) => (
            <div
              key={agent.id}
              onClick={() => {
                onSelectAgent(agent.id);
                onViewChange('studio');
              }}
              className="glass-panel-hover glass-card rounded-xl p-6 border border-obsidian-800 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}30` }}
                  >
                    <Sparkles className="w-5 h-5" style={{ color: agent.color }} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-850 text-slate-400 border border-obsidian-750">
                    {agent.role}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {agent.tagline}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-obsidian-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Core Capabilities
                  </div>
                  {agent.capabilities.slice(0, 3).map((cap, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: agent.color }}></div>
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-obsidian-800/60 flex items-center justify-between text-xs font-semibold" style={{ color: agent.color }}>
                <span>Launch Agent Workbench</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}

          {/* 6th Card: Multi-Agent ROSTR Orchestration Matrix */}
          <div 
            onClick={() => onViewChange('console')}
            className="glass-panel-hover glass-card rounded-xl p-6 border border-brand-cyan/30 bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-obsidian-950 flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-brand-cyan" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                  ROSTR v2 Engine
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                  Autonomous Multi-Agent Swarm
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Chain all 5 agents into an automated sequence: ICP Audit → Playbook Generation → Personalized Sequencing → CRM Ingestion.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-obsidian-950/80 border border-obsidian-800 space-y-2 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Pipeline Latency:</span>
                  <span className="text-brand-emerald">3.4s / execution</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Approval Gates:</span>
                  <span className="text-brand-cyan">Human-in-the-Loop</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-obsidian-800/60 flex items-center justify-between text-xs font-semibold text-brand-cyan">
              <span>Open Swarm Console</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE ROI & REVENUE LIFT CALCULATOR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl glass-panel p-8 border border-obsidian-700 bg-obsidian-900/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-brand-cyan text-xs font-mono">
                  <TrendingUp className="w-4 h-4" />
                  <span>Revenue Acceleration Modeling</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Calculate Your GTM Lift with Enably
                </h3>
                <p className="text-xs text-slate-400">
                  Model SDR ramp time compression, outbound capacity multipliers, and pipeline velocity.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                    <span>Revenue Team Size (SDRs + AEs)</span>
                    <span className="font-mono text-brand-cyan font-bold">{teamSize} Reps</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>1 rep</span>
                    <span>25 reps</span>
                    <span>50 reps</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                    <span>Average Contract Value (ACV)</span>
                    <span className="font-mono text-brand-cyan font-bold">${avgDealSize.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="5000"
                    value={avgDealSize}
                    onChange={(e) => setAvgDealSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>$5k</span>
                    <span>$75k</span>
                    <span>$150k+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Outputs */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-obsidian-950/80 border border-obsidian-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Weekly Rep Time Reclaimed
                </div>
                <div className="text-3xl font-extrabold text-brand-cyan font-mono mt-2">
                  {hoursSavedPerWeek} <span className="text-base text-slate-400 font-sans">hrs/wk</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  14 hours saved per rep across manual research, email authoring, and CRM logging.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-obsidian-950/80 border border-brand-emerald/30">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Projected Annual Pipeline Lift
                </div>
                <div className="text-3xl font-extrabold text-brand-emerald font-mono mt-2">
                  +${(estimatedRevenueLift).toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Based on {additionalDealsPerQuarter * 4} incremental closed-won deals per year.
                </p>
              </div>

              <div className="sm:col-span-2 p-4 rounded-xl bg-gradient-to-r from-obsidian-900 to-obsidian-850 border border-obsidian-700/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Ready to deploy these benchmarks?</div>
                  <div className="text-[11px] text-slate-400">Set up your workspace in under 3 minutes.</div>
                </div>
                <button
                  onClick={() => onViewChange('studio')}
                  className="px-4 py-2 rounded-md bg-brand-cyan text-obsidian-950 font-bold text-xs hover:brightness-110 transition-all shadow-glow-cyan"
                >
                  Start Workbench
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & TIERS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Transparent, Predictable Pricing
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Choose the plan that fits your growth stage. All plans include all 5 agent harnesses.
          </p>

          <div className="inline-flex items-center p-1 rounded-lg bg-obsidian-900 border border-obsidian-700/60 mt-4">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                !annualBilling ? 'bg-obsidian-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                annualBilling ? 'bg-brand-cyan text-obsidian-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1 rounded bg-obsidian-950/20 font-mono">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1: Starter */}
          <div className="glass-card rounded-xl p-6 border border-obsidian-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Founder & Solo</h3>
                <p className="text-xs text-slate-400 mt-1">For early-stage founders establishing first-dollar GTM.</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white font-mono">
                  ${annualBilling ? '79' : '99'}
                </span>
                <span className="text-xs text-slate-400 font-mono"> / month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-obsidian-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>500 Agent Runs / mo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>All 5 GTM Agent Harnesses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>HubSpot & Lemlist Connectors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>Markdown & JSON Exports</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onViewChange('studio')}
              className="mt-6 w-full py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Start Free Trial
            </button>
          </div>

          {/* Tier 2: Growth (Featured) */}
          <div className="glass-card rounded-xl p-6 border-2 border-brand-cyan/60 bg-gradient-to-b from-obsidian-900 to-obsidian-950 flex flex-col justify-between relative shadow-glow-cyan">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-cyan text-obsidian-950 font-bold text-[10px] uppercase font-mono tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Growth Team</h3>
                <p className="text-xs text-slate-400 mt-1">For scaling revenue teams with SDRs and AEs.</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white font-mono">
                  ${annualBilling ? '199' : '249'}
                </span>
                <span className="text-xs text-slate-400 font-mono"> / month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-obsidian-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>3,000 Agent Runs / mo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>5 Team Seats Included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>Salesforce, Clay & Apollo Sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>ROSTR v2 Autonomous Swarms</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>Priority Model Routing</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onViewChange('studio')}
              className="mt-6 w-full py-2.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-obsidian-950 text-xs font-bold hover:brightness-110 transition-all shadow-glow-cyan"
            >
              Get Started with Growth
            </button>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="glass-card rounded-xl p-6 border border-obsidian-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Enterprise Scale</h3>
                <p className="text-xs text-slate-400 mt-1">Custom governance, VPC deployment, and BYOK control.</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white font-mono">Custom</span>
                <span className="text-xs text-slate-400 font-mono"> / annual agreement</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-obsidian-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>Unlimited Agent Runs & BYOK</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>Dedicated AWS Bedrock VPC Cluster</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>Custom MCP Server Connectors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>SSO, SAML & Audit Log Ingestion</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onViewChange('settings')}
              className="mt-6 w-full py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
