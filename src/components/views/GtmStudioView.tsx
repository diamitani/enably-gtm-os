import React, { useState } from 'react';
import { AgentId, Artifact } from '../../types';
import { ENABLY_AGENTS } from '../../data/agents';
import { 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  Download, 
  RotateCw, 
  FileText, 
  Code, 
  History, 
  Share2, 
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Zap,
  Target,
  BookOpen,
  Mail,
  Search,
  Layers
} from 'lucide-react';

interface GtmStudioViewProps {
  selectedAgentId: AgentId;
  onSelectAgent: (id: AgentId) => void;
  onSaveArtifact: (artifact: Artifact) => void;
}

export const GtmStudioView: React.FC<GtmStudioViewProps> = ({
  selectedAgentId,
  onSelectAgent,
  onSaveArtifact,
}) => {
  const currentAgent = ENABLY_AGENTS.find((a) => a.id === selectedAgentId) || ENABLY_AGENTS[0];

  // Form Inputs
  const [companyName, setCompanyName] = useState('Apex Cloud Security');
  const [productCategory, setProductCategory] = useState('Cloud Infrastructure & IAM Security');
  const [acvTarget, setAcvTarget] = useState('$45,000');
  const [targetIndustry, setTargetIndustry] = useState('Enterprise B2B SaaS (Series-B to Pre-IPO)');
  const [mainCompetitors, setMainCompetitors] = useState('Palo Alto Prisma, Wiz, Orca Security');
  const [keyPainPoints, setKeyPainPoints] = useState('Manual IAM permission audits, multi-cloud sprawl, slow SOC2 evidence collection');
  const [toneStyle, setToneStyle] = useState('Direct, technical, peer-to-peer');

  // Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [outputTab, setOutputTab] = useState<'formatted' | 'markdown' | 'json'>('formatted');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Generated Artifact State
  const [generatedOutput, setGeneratedOutput] = useState<string>(() => getDefaultOutput(selectedAgentId, companyName));

  function getDefaultOutput(agentId: AgentId, company: string): string {
    switch (agentId) {
      case 'enably_icp':
        return `# Ideal Customer Profile (ICP) Specification: ${company}

## 1. Firmographic Criteria (Tier-1 Accounts)
- Industry Focus: Cloud Infrastructure, Fintech, AI Application Platforms
- Company Stage: Series-B to Series-D (120 - 900 FTEs)
- Annual Cloud Spend: > $350,000 / year (AWS, GCP, Azure multi-cloud)
- Target ACV: $40,000 - $75,000 ARR

## 2. Buyer Persona Matrix

### Persona A: The Economic Buyer (VP of Infrastructure / CTO)
- Primary KPI: Cloud availability (99.99%), zero security breach disclosure.
- Critical Friction: Security tool bloat and developer complaints about slow approval gates.
- Decision Driver: Single-pane-of-glass policy enforcement with native AWS Bedrock integration.
- Top Objection: "Our security operations team already has Prisma Cloud."
- Winning Wedge: Zero-agent deployment in 10 minutes vs 6-month agent rollout.

### Persona B: The Technical Champion (Lead Platform / DevSecOps Engineer)
- Primary KPI: Time to remediate critical CVEs & zero broken build pipelines.
- Critical Friction: Alert fatigue from 1,000+ false positives per week.
- Decision Driver: Infrastructure-as-Code (Terraform / Pulumi) automated PR fixes.

## 3. Disqualification Criteria (Negative ICP)
- Companies with < 50 employees and single AWS account.
- Legacy on-premise infrastructure with no public cloud roadmap.`;

      case 'enably_playbook':
        return `# Sales Methodology Playbook: ${company}

## 1. Discovery Call Execution Architecture
Objective: Validate technical champion, quantify cost of inaction, uncover timeline driver.

### Stage 1: Problem Confirmation (First 5 Minutes)
- "When your engineering team provisions new Kubernetes clusters, how do you verify IAM role least-privilege?"
- "How many engineer-hours did your last SOC2 Type II audit take across cloud accounts?"

### Stage 2: Cost of Inaction Framework
- Latency Cost: Average 18 hours/week spent triaging overlapping alerts.
- Compliance Risk: $85,000 in delayed enterprise contract closings due to manual vendor risk reviews.

## 2. Competitive Battlecard: vs Legacy Cloud Scanners
- Competitor Vulnerability: Heavy runtime agent overhead and slow UI indexing.
- Wedge Counter: API-first, read-only IAM analysis with instant risk prioritization.
- Kill-Shot Question: "How many production Kubernetes nodes are currently running unmanaged agent daemons?"

## 3. MEDDPICC Scorecard
- Metrics: 80% reduction in IAM alert volume.
- Economic Buyer: VP Infrastructure sign-off.
- Decision Criteria: Zero-runtime footprint + automated Terraform remediation.`;

      case 'enably_messaging':
        return `# 4-Touch Outbound Sequence: ${company}

Target Role: VP Infrastructure / Head of Platform Engineering
Trigger Hook: Recent Series-B funding or active DevOps hiring spike.

---

### Touch 1: The Friction Interrupt (Email - Day 1)
Subject: quick question on {{company}}'s IAM audit sprawl

Hey {{first_name}},

Saw {{company}} is scaling the cloud platform team with {{open_devops_roles}} open positions.
Usually when cloud infrastructure scales past {{cloud_accounts_count}} accounts, cross-team IAM role sprawl turns SOC2 audits into a multi-week fire drill.

We built ${company} to automate least-privilege verification directly in Terraform PRs with zero runtime agents.

Would you be opposed to seeing a 2-minute interactive report for {{company}}'s architecture?

Best,
Alex - ${company}

---

### Touch 2: The Proof Wedge (Email - Day 4)
Subject: Re: quick question on {{company}}'s IAM audit sprawl

Hey {{first_name}},

Following up with a concrete example: the platform team at Vercel cut their quarterly audit prep from 14 days to 45 minutes using our policy engine.

Here is the 1-page architecture breakdown: [Link: Architecture Blueprint]

Worth a brief 10-minute exchange next Tuesday?

---

### Touch 3: LinkedIn InMail / DM (Day 7)
Hey {{first_name}}, noticed your team's talk on multi-region AWS topology. Sent a quick note on streamlining cross-account IAM policy verification. Open to connecting here?`;

      case 'enably_research':
        return `# Account Intelligence Dossier: Stripe, Inc.

## 1. Technographic Stack & Cloud Topology
- Cloud Providers: AWS (US-East-1, EU-West-1 primary) + GCP (BigQuery analytics)
- Infrastructure Orchestration: Kubernetes (EKS), Terraform, Envoy Proxy, Kafka
- Identified Security Stack: Okta SSO, CrowdStrike Falcon, HashiCorp Vault

## 2. Key Executive Contacts & Buying Signals
- VP Infrastructure: David R. (Joined 8 mos ago from AWS Platform)
- Head of Cloud Security: Elena K. (Spoke recently on Zero-Trust IAM at re:Invent)
- Hiring Signal: 14 open roles for Senior Platform Engineers & Cloud Compliance

## 3. High-Conversion Outbound Angles
- Angle 1: Zero-Trust IAM role boundary simplification across 80+ AWS accounts.
- Angle 2: Automated Terraform policy PR checks to accelerate deploy velocity without security tickets.`;

      case 'enably_master':
      default:
        return `# Master GTM Strategy & ROSTR v2 Execution Plan: ${company}

## Executive Summary
Comprehensive Go-To-Market blueprint coordinating ICP Discovery, Sales Playbook Governance, Personalized Outbound, and Real-Time Account Intelligence.

## 1. Phase 1: Foundation & Market Positioning (Days 1 - 15)
- Lock Tier-1 ICP: 350 target enterprise cloud infrastructure accounts ($40k+ ACV).
- Validate 2 core buyer personas (VP Infrastructure & Lead DevSecOps).
- Standardize value proposition around "Zero-agent IAM least-privilege automation."

## 2. Phase 2: Playbook & Pipeline Engine (Days 16 - 30)
- Roll out MEDDPICC discovery framework to SDRs and AEs.
- Arm sales team with 3 competitor wedge battlecards.
- Configure 4-touch outbound sequence in Lemlist and Outreach.

## 3. Phase 3: Autonomous Scale & Account Intelligence (Days 31 - 60)
- Activate real-time hiring and cloud migration buying trigger alerts.
- Connect bi-directional sync with HubSpot CRM and Salesforce.
- Target Metric: 32 qualified pipeline opportunities generated per month.`;
    }
  }

  const handleRunAgent = () => {
    setIsRunning(true);
    setExecutionStep(1);
    setSaved(false);

    const steps = [
      'Connecting to AWS Bedrock AgentCore harness...',
      'Retrieving company context & competitive inputs...',
      'Synthesizing domain reasoning & ROSTR v2 directives...',
      'Formatting high-fidelity output artifact...',
    ];

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      setExecutionStep(current);

      if (current >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setGeneratedOutput(getDefaultOutput(selectedAgentId, companyName));
        }, 600);
      }
    }, 700);
  };

  const handlePresetSelect = (presetName: string) => {
    if (presetName === 'DevTool') {
      setCompanyName('Supasync DevTools');
      setProductCategory('Real-time Postgres Sync & Event Streaming');
      setAcvTarget('$30,000');
      setTargetIndustry('Developer-led B2B SaaS & Data Platforms');
      setMainCompetitors('Debezium, Fivetran, Kafka Connect');
    } else if (presetName === 'FinTech') {
      setCompanyName('PayGate Enterprise');
      setProductCategory('Global B2B Payment Routing & Ledger API');
      setAcvTarget('$65,000');
      setTargetIndustry('Fintech & Cross-border Marketplaces');
      setMainCompetitors('Stripe Connect, Adyen, Modern Treasury');
    } else if (presetName === 'Security') {
      setCompanyName('Apex Cloud Security');
      setProductCategory('Cloud Infrastructure & IAM Security');
      setAcvTarget('$45,000');
      setTargetIndustry('Enterprise B2B SaaS (Series-B to Pre-IPO)');
      setMainCompetitors('Palo Alto Prisma, Wiz, Orca Security');
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToLibrary = () => {
    const newArtifact: Artifact = {
      id: `art-${Date.now()}`,
      title: `${currentAgent.name} - ${companyName}`,
      type: selectedAgentId === 'enably_icp' ? 'icp_matrix' : 
            selectedAgentId === 'enably_playbook' ? 'sales_playbook' : 
            selectedAgentId === 'enably_messaging' ? 'outreach_sequence' : 
            selectedAgentId === 'enably_research' ? 'account_intel' : 'gtm_blueprint',
      agentId: selectedAgentId,
      createdAt: new Date().toISOString(),
      version: 'v1.0.0',
      content: generatedOutput,
      tags: [companyName, selectedAgentId, 'Approved'],
    };
    onSaveArtifact(newArtifact);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Studio Header & Agent Switcher Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-brand-cyan text-xs font-mono">
              <Zap className="w-4 h-4" />
              <span>GTM Agent Workbench // ROSTR v2 Orchestrator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {currentAgent.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {currentAgent.tagline}
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-obsidian-850 text-slate-300 border border-obsidian-750">
              Model: Claude 3.7 Sonnet
            </span>
            <span className="px-2.5 py-1 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
              Harness Ready
            </span>
          </div>
        </div>

        {/* 5-Agent Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-obsidian-900/90 p-1.5 rounded-xl border border-obsidian-800">
          {ENABLY_AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => {
                onSelectAgent(agent.id);
                setGeneratedOutput(getDefaultOutput(agent.id, companyName));
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedAgentId === agent.id
                  ? 'bg-obsidian-800 text-white shadow-md border border-obsidian-600'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850/60'
              }`}
            >
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: agent.color }}
              ></div>
              <span className="truncate">{agent.name.replace(' Architect', '').replace(' & Account Intel', '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: Inputs on Left, Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Config Inputs & Triggers */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-xl p-6 border border-obsidian-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-obsidian-800">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-brand-cyan" />
                <span>Agent Configuration Parameters</span>
              </h3>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono text-slate-400">Presets:</span>
                <button
                  onClick={() => handlePresetSelect('Security')}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-obsidian-800 hover:bg-obsidian-750 text-slate-300 border border-obsidian-700"
                >
                  Security
                </button>
                <button
                  onClick={() => handlePresetSelect('DevTool')}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-obsidian-800 hover:bg-obsidian-750 text-slate-300 border border-obsidian-700"
                >
                  DevTool
                </button>
                <button
                  onClick={() => handlePresetSelect('FinTech')}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-obsidian-800 hover:bg-obsidian-750 text-slate-300 border border-obsidian-700"
                >
                  FinTech
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Company / Product Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category & Core Value Prop</label>
                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target ACV</label>
                  <input
                    type="text"
                    value={acvTarget}
                    onChange={(e) => setAcvTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tone & Voice</label>
                  <input
                    type="text"
                    value={toneStyle}
                    onChange={(e) => setToneStyle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Market & Buyer Segments</label>
                <input
                  type="text"
                  value={targetIndustry}
                  onChange={(e) => setTargetIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Key Competitors to Displace</label>
                <input
                  type="text"
                  value={mainCompetitors}
                  onChange={(e) => setMainCompetitors(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Key Customer Pain Vectors</label>
                <textarea
                  rows={3}
                  value={keyPainPoints}
                  onChange={(e) => setKeyPainPoints(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                />
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunAgent}
              disabled={isRunning}
              className={`w-full py-3 rounded-lg font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan ${
                isRunning 
                  ? 'bg-obsidian-800 text-slate-400 cursor-not-allowed border border-obsidian-700' 
                  : 'bg-gradient-to-r from-brand-cyan to-brand-blue text-obsidian-950 hover:brightness-110'
              }`}
            >
              {isRunning ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-brand-cyan" />
                  <span>Synthesizing Agent Output...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute {currentAgent.name}</span>
                </>
              )}
            </button>

            {/* Progress Stepper */}
            {isRunning && (
              <div className="p-3.5 rounded-lg bg-obsidian-950 border border-obsidian-800 space-y-2 text-xs font-mono">
                <div className="text-[11px] text-brand-cyan flex items-center justify-between">
                  <span>Harness Execution Step {executionStep} / 4</span>
                  <span className="text-slate-400">AWS Bedrock 200 OK</span>
                </div>
                <div className="w-full h-1.5 bg-obsidian-850 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-cyan transition-all duration-300 rounded-full"
                    style={{ width: `${(executionStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Output Artifact Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-xl border border-obsidian-700/80 shadow-2xl overflow-hidden bg-obsidian-900/90">
            {/* Output Header */}
            <div className="px-5 py-3 bg-obsidian-950/80 border-b border-obsidian-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-brand-cyan" />
                <span className="text-xs font-bold text-white">Generated GTM Artifact</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                  Version 1.0.0
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <div className="flex items-center space-x-1 bg-obsidian-850 p-0.5 rounded-md border border-obsidian-700 text-xs">
                  <button
                    onClick={() => setOutputTab('formatted')}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      outputTab === 'formatted' ? 'bg-obsidian-750 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Formatted
                  </button>
                  <button
                    onClick={() => setOutputTab('markdown')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      outputTab === 'markdown' ? 'bg-obsidian-750 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    onClick={() => setOutputTab('json')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      outputTab === 'json' ? 'bg-obsidian-750 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    JSON Spec
                  </button>
                </div>

                <button
                  onClick={copyOutput}
                  className="p-1.5 rounded-md bg-obsidian-800 hover:bg-obsidian-750 text-slate-300 border border-obsidian-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-brand-emerald" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  onClick={saveToLibrary}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    saved 
                      ? 'bg-brand-emerald text-obsidian-950' 
                      : 'bg-brand-cyan/15 text-brand-cyan hover:bg-brand-cyan/25 border border-brand-cyan/30'
                  }`}
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{saved ? 'Saved!' : 'Save Artifact'}</span>
                </button>
              </div>
            </div>

            {/* Output Body */}
            <div className="p-6 font-sans text-xs text-slate-200 bg-obsidian-950/70 overflow-y-auto max-h-[580px] leading-relaxed">
              {outputTab === 'formatted' && (
                <div className="prose prose-invert max-w-none space-y-4">
                  {generatedOutput.split('\n\n').map((block, idx) => {
                    if (block.startsWith('# ')) {
                      return <h2 key={idx} className="text-xl font-bold text-white border-b border-obsidian-800 pb-2">{block.replace('# ', '')}</h2>;
                    }
                    if (block.startsWith('## ')) {
                      return <h3 key={idx} className="text-base font-bold text-brand-cyan mt-4">{block.replace('## ', '')}</h3>;
                    }
                    if (block.startsWith('### ')) {
                      return <h4 key={idx} className="text-sm font-semibold text-slate-200 mt-2">{block.replace('### ', '')}</h4>;
                    }
                    if (block.startsWith('- ')) {
                      return (
                        <ul key={idx} className="space-y-1.5 list-disc pl-4 text-slate-300">
                          {block.split('\n').map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx} className="text-slate-300 leading-relaxed">{block}</p>;
                  })}
                </div>
              )}

              {outputTab === 'markdown' && (
                <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {generatedOutput}
                </pre>
              )}

              {outputTab === 'json' && (
                <pre className="font-mono text-xs text-brand-cyan whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify({
                    schema: "agentcompanies/v1",
                    agent_id: selectedAgentId,
                    company: companyName,
                    generated_at: new Date().toISOString(),
                    model: "us.anthropic.claude-sonnet-4-6",
                    temperature: 0.2,
                    content: generatedOutput,
                    metadata: {
                      acv_target: acvTarget,
                      target_industry: targetIndustry,
                      competitors: mainCompetitors.split(', ')
                    }
                  }, null, 2)}
                </pre>
              )}
            </div>

            {/* Output Footer Status */}
            <div className="px-5 py-3 bg-obsidian-950 border-t border-obsidian-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                <span>ROSTR v2 Envelope Verified</span>
              </span>
              <span>Tokens: 1,482 in · 2,190 out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
