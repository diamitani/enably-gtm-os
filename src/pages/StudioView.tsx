import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  Cpu, 
  Workflow, 
  Database, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Download, 
  PhoneCall, 
  Play, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  Check, 
  Code2, 
  FileText, 
  ChevronRight,
  Maximize2,
  Lock,
  Zap,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { GTM_AGENTS, GET_AGENT_BY_ID } from '../lib/agents-registry';
import { RostrEngine } from '../lib/rostr-engine';
import { DEFAULT_WORKFLOWS } from '../lib/workflows-engine';
import { AgentManifest, PalCompiledIntent, RagDalQueryResult, NpaoTask, ContextSessionRecord } from '../types';

interface StudioViewProps {
  initialPrompt?: string;
  onOpenByokModal: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  agentId?: string;
  content: string;
  timestamp: string;
  palManifest?: PalCompiledIntent;
  toolCall?: {
    tool: string;
    status: 'running' | 'completed' | 'approval_required';
    details?: string;
  };
}

export const StudioView: React.FC<StudioViewProps> = ({ initialPrompt, onOpenByokModal }) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('enably-orchestrator');
  const [operatingMode, setOperatingMode] = useState<'chat' | 'pal_inspector' | 'rag_dal' | 'npao_board' | 'context_engine' | 'workflow_sandbox' | 'voice_simulator'>('chat');
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState<string>(initialPrompt || '');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // ROSTR v2 State Containers
  const [activePal, setActivePal] = useState<PalCompiledIntent>(RostrEngine.compileIntent('Build an automated outbound pipeline with cold emails for Series A startups.'));
  const [ragDalResult, setRagDalResult] = useState<RagDalQueryResult>(RostrEngine.performResearch('Optimal outbound cold email deliverability and cadence length'));
  const [contextSession, setContextSession] = useState<ContextSessionRecord>(RostrEngine.generateInitialContextSession());
  const [researchQuery, setResearchQuery] = useState<string>('B2B outbound conversion rates by channel');
  const [activeArtifact, setActiveArtifact] = useState<string>('');
  const [copiedArtifact, setCopiedArtifact] = useState<boolean>(false);
  
  // Voice Simulation State
  const [voiceCallStatus, setVoiceCallStatus] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');
  const [voiceTranscript, setVoiceTranscript] = useState<string[]>([]);

  const selectedAgent = GET_AGENT_BY_ID(selectedAgentId) || GTM_AGENTS[0];

  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      handleSendMessage(initialPrompt);
    } else if (messages.length === 0) {
      // Welcome message
      setMessages([
        {
          id: 'welcome-1',
          role: 'assistant',
          agentId: 'enably-orchestrator',
          content: `👋 **Welcome to 6th Agent Agent Studio.** I am the **6th Agent Master GTM Architect** powered by the ROSTR v2 runtime.

I coordinate 14 specialist agents across your 5D GTM lifecycle:
- 🚀 **Prospect Automation Engineer:** Autonomous n8n & Clay waterfall workflows.
- 🎯 **ICP & Persona Architects:** Target segment definitions & buying triggers.
- ✉️ **Messaging & SDR Copilots:** Cold email cadences (<150 words), LinkedIn InMails, & phone openers.
- 📊 **KPI & Playbook Architects:** Sales Bible, MEDDICC qualification, & reverse-funnel math.

What commercial revenue goal shall we architect today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [initialPrompt]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsGenerating(true);

    // Run PAL Compilation on user input
    const palResult = RostrEngine.compileIntent(text);
    setActivePal(palResult);

    // Auto-switch agent if PAL detected specialist route
    if (palResult.target_agent_id && palResult.target_agent_id !== selectedAgentId) {
      setSelectedAgentId(palResult.target_agent_id);
    }

    setTimeout(() => {
      const activeAgentNow = GET_AGENT_BY_ID(palResult.target_agent_id) || selectedAgent;
      
      // Generate response based on agent
      let responseText = '';
      let generatedArtifactContent = '';

      if (palResult.target_agent_id === 'prospect-automation-engineer') {
        responseText = `### ⚙️ Prospect Automation & n8n Pipeline Compiled
I have compiled an autonomous **5-Pillar Outbound Workflow** for your objective:
1. **Trigger Ingest:** Webhook listening for target hiring / funding signals.
2. **CRM Shield & Dedupe:** HubSpot contact check to prevent double-outreach.
3. **Waterfall Enrichment:** Apollo -> Hunter -> Clay cascade.
4. **AI PAS Copywriting:** Model prompted for Grade 5 reading level and pain personalization.
5. **Sequencer Enrollment:** Instant API dispatch to Smartlead/Instantly.

*Artifact generated:* \`n8n-5pillar-outbound-workflow.json\` (viewable in the Artifacts panel).`;
        generatedArtifactContent = DEFAULT_WORKFLOWS[0].jsonDefinition;
      } else if (palResult.target_agent_id === 'email-architect' || palResult.target_agent_id === 'social-dm-architect') {
        responseText = `### ✉️ Multi-Channel Outreach Cadence Generated
I have crafted a 3-step high-converting sequence tailored to your ICP:
- **Step 1 (Day 1):** Pain Observation Email (<120 words, low friction CTA).
- **Step 2 (Day 3):** LinkedIn InMail & Connection Note (<250 chars).
- **Step 3 (Day 6):** Social Proof & Metric Follow-Up.

All copy is plain text, Grade 5-6 reading level, and CAN-SPAM compliant.`;
        generatedArtifactContent = `# 6th Agent GTM Outbound Sequence
## Step 1: Day 1 Pain Observation (Cold Email)
**Subject:** {{company}} + predictable outbound pipeline
**Body:**
Hi {{first_name}},

Noticed {{company}}'s recent expansion in {{industry}} and your hiring signals for outbound roles.

Most founders at your stage tell us their reps spend 60%+ of their week on manual prospect research and list cleaning instead of actual sales conversations.

We built 6th Agent to run autonomous 5-pillar outbound workflows—combining trigger detection, waterfall enrichment, and personalized messaging without needing a full-time RevOps hire.

Open to a brief 10-minute walkthrough this Thursday to see how companies like {{company}} are scaling qualified pipeline?

---
## Step 2: Day 3 LinkedIn Connection Note (<250 chars)
"Hi {{first_name}} - noticed your focus on {{industry}} growth at {{company}}. Would love to connect and share some benchmark data on outbound conversion rates we compiled recently."

---
## Step 3: Day 6 Social Proof & Case Study
**Subject:** quick idea for {{company}}'s outbound motion
**Body:**
Hi {{first_name}},

Following up with a quick data point: teams using our automated Clay + n8n pipeline saw their verified email rate jump to 94% while cutting lead research time by 5x.

We put together a custom account brief for {{company}} mapping your top 3 buying triggers.

Would you be against me sending over the 1-page overview?`;
      } else {
        responseText = `### 🏛️ GTM Master Blueprint Compiled
I have synthesized your request through the **ROSTR v2 PAL Compiler**:
- **NPAO Phase:** ${palResult.npao_phase.toUpperCase()}
- **Target Specialist:** ${activeAgentNow.name}
- **Assigned Tools:** \`${activeAgentNow.tools.join(', ')}\`

I have drafted a comprehensive operational roadmap and added structured deliverables to your workspace session.`;
        generatedArtifactContent = `# 6th Agent GTM OS: Commercial Strategy Blueprint
**Project:** Active GTM Motion
**Target ICP:** Series A SaaS Startups ($1M-$20M ARR)
**Execution Phase:** ${palResult.npao_phase.toUpperCase()}

## 1. Executive Summary
Objective: "${palResult.primary_intent}".
Framework: ROSTR v2 Multi-Agent Orchestration with Host-Approved Outbound Gating.

## 2. Recommended Action Plan
1. **ICP & Persona Lock:** Complete 3-ICP framework specification.
2. **Deliverability Setup:** Validate SPF, DKIM (2048-bit), and DMARC alignment.
3. **Autonomous Ingest:** Deploy n8n 5-Pillar webhook receiver.
4. **Sales Bible Deployment:** Train reps on MEDDICC qualification SLAs.`;
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        agentId: activeAgentNow.id,
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        palManifest: palResult,
        toolCall: {
          tool: 'rostr.pal_compile',
          status: 'completed',
          details: `Compiled intent in 240ms with ambiguity score ${palResult.ambiguity_score}`
        }
      };

      setMessages(prev => [...prev, assistantMsg]);
      setActiveArtifact(generatedArtifactContent);
      setIsGenerating(false);

      // Log accomplishment to ContextEngine
      setContextSession(prev => ({
        ...prev,
        accomplishments: [...prev.accomplishments, `Executed task: "${text.substring(0, 50)}..." with ${activeAgentNow.name}`]
      }));
    }, 800);
  };

  const handleCopyArtifact = () => {
    if (!activeArtifact) return;
    navigator.clipboard.writeText(activeArtifact);
    setCopiedArtifact(true);
    setTimeout(() => setCopiedArtifact(false), 2000);
  };

  const handleDownloadArtifact = () => {
    if (!activeArtifact) return;
    const blob = new Blob([activeArtifact], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enably-artifact-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleStartVoiceCall = () => {
    setVoiceCallStatus('calling');
    setVoiceTranscript(['Initiating SignalWire WebRTC phone connection...']);
    setTimeout(() => {
      setVoiceCallStatus('connected');
      setVoiceTranscript([
        'Connected to SignalWire Voice API (Latency: 180ms)',
        'AI Agent: "Hello! This is Alex from 6th Agent GTM. I saw your request regarding autonomous prospecting pipelines—do you currently use HubSpot or Salesforce?"'
      ]);
    }, 1500);
  };

  const handleEndVoiceCall = () => {
    setVoiceCallStatus('completed');
    setVoiceTranscript(prev => [...prev, 'Call ended. Transcript and MEDDICC qualification notes logged to Lead Studio CRM.']);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Studio Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-obsidian-800 bg-obsidian-950/90 px-4 py-2.5 gap-4">
        {/* Agent Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-brand-cyan" />
            <span className="text-xs font-semibold text-white">Active Agent:</span>
          </div>
          <select
            value={selectedAgentId}
            onChange={(e) => setSelectedAgentId(e.target.value)}
            className="rounded-lg border border-obsidian-700 bg-obsidian-900 px-3 py-1.5 text-xs font-medium text-white focus:border-brand-cyan focus:outline-none"
          >
            {GTM_AGENTS.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name} ({agent.category})
              </option>
            ))}
          </select>
          <span className="rounded bg-obsidian-800 px-2 py-0.5 text-[10px] font-mono text-obsidian-400 hidden sm:inline">
            v{selectedAgent.version}
          </span>
        </div>

        {/* Operating Mode Selector Tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-obsidian-800 bg-obsidian-900/80 p-1 overflow-x-auto">
          {[
            { id: 'chat', label: 'Chat & Swarm', icon: Bot },
            { id: 'pal_inspector', label: 'PAL Compiler', icon: Zap },
            { id: 'rag_dal', label: 'RAG DAL Research', icon: Search },
            { id: 'npao_board', label: 'NPAO Task Board', icon: Layers },
            { id: 'context_engine', label: 'ContextEngine Memory', icon: Database },
            { id: 'workflow_sandbox', label: 'n8n Sandbox', icon: Workflow },
            { id: 'voice_simulator', label: 'Voice AI Simulator', icon: PhoneCall },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = operatingMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setOperatingMode(mode.id as any)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-cyan text-obsidian-950 font-bold shadow-sm'
                    : 'text-obsidian-400 hover:text-white hover:bg-obsidian-800'
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Body Grid (Left Workspace + Right Artifacts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
        {/* Left Side: Active Operating Workstation */}
        <div className="lg:col-span-8 flex flex-col h-full border-r border-obsidian-800 bg-obsidian-950/40 overflow-hidden">
          
          {/* 1. CHAT & SWARM MODE */}
          {operatingMode === 'chat' && (
            <div className="flex flex-col h-full justify-between">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-[11px] text-obsidian-400">
                      {msg.role === 'user' ? (
                        <span>You • {msg.timestamp}</span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-brand-cyan">
                            {GET_AGENT_BY_ID(msg.agentId || '')?.name || '6th Agent Master GTM'}
                          </span>
                          <span>• {msg.timestamp}</span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-brand-blue/30 to-brand-violet/30 border border-brand-cyan/40 text-white shadow-sm'
                          : 'glass-panel text-obsidian-200 border border-obsidian-700/80 shadow-glass-card'
                      }`}
                    >
                      {/* Tool Call Tag if present */}
                      {msg.toolCall && (
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded bg-obsidian-900 px-2 py-0.5 text-[10px] font-mono text-brand-cyan border border-obsidian-700">
                          <Zap className="h-3 w-3" />
                          <span>Tool: {msg.toolCall.tool}</span>
                          <span className="text-obsidian-400 font-sans">({msg.toolCall.details})</span>
                        </div>
                      )}

                      <div className="prose prose-invert prose-xs max-w-none whitespace-pre-wrap">
                        {msg.content}
                      </div>

                      {/* Approval Gate Banner if sensitive write */}
                      {msg.content.includes('write') && (
                        <div className="mt-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-2.5 flex items-center justify-between text-yellow-200">
                          <div className="flex items-center gap-2">
                            <Lock className="h-3.5 w-3.5 text-yellow-400" />
                            <span className="text-[11px] font-semibold">Host Approval Gate Required</span>
                          </div>
                          <button className="rounded bg-yellow-400 px-2.5 py-1 text-[10px] font-bold text-obsidian-950 hover:bg-yellow-300">
                            Issue Approval Token
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex items-center gap-3 text-xs text-brand-cyan font-mono animate-pulse">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>ROSTR v2 PAL Compiler running multi-pass enhancement...</span>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-obsidian-800 bg-obsidian-950">
                <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 text-[11px]">
                  <span className="text-obsidian-400 whitespace-nowrap">Suggested Directives:</span>
                  {[
                    'Generate 5-pillar n8n workflow for Series A SaaS',
                    'Draft MEDDICC Sales Bible for mid-market services',
                    'Audit outbound deliverability & DKIM setup',
                    'Build Clay waterfall enrichment table schema'
                  ].map((sug) => (
                    <button
                      key={sug}
                      onClick={() => handleSendMessage(sug)}
                      className="rounded-full bg-obsidian-900 border border-obsidian-700 px-3 py-1 text-obsidian-300 hover:text-brand-cyan hover:border-brand-cyan/40 whitespace-nowrap transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Direct ${selectedAgent.name} (e.g. "Build outbound cadence for fintech buyers")...`}
                    className="flex-1 rounded-xl border border-obsidian-700 bg-obsidian-900 px-4 py-3 text-xs text-white placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isGenerating || !inputPrompt.trim()}
                    className="rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue px-5 py-3 text-xs font-bold text-obsidian-950 hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-glow-cyan"
                  >
                    <Send className="h-3.5 w-3.5 fill-obsidian-950" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. PAL COMPILER INSPECTOR */}
          {operatingMode === 'pal_inspector' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Zap className="h-4 w-4 text-brand-cyan" />
                    <span>PAL 5-Stage Intent Compiler</span>
                  </h3>
                  <p className="text-xs text-obsidian-400">
                    Inspect the transformation from raw natural language intent into typed, executable agent runtime manifests.
                  </p>
                </div>
                <span className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-mono text-brand-cyan border border-brand-cyan/30">
                  Ambiguity: {activePal.ambiguity_score}
                </span>
              </div>

              {/* 5 Stages Flow */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900/60 p-4 space-y-2">
                  <div className="text-[11px] font-mono font-bold text-brand-cyan">Stage 1: Intent Extraction</div>
                  <div className="text-xs text-obsidian-300"><strong>Primary Intent:</strong> {activePal.primary_intent}</div>
                  <div className="text-xs text-obsidian-300"><strong>Domain:</strong> <span className="font-mono text-brand-violet">{activePal.domain}</span></div>
                  <div className="text-xs text-obsidian-300"><strong>Urgency:</strong> {activePal.urgency}</div>
                </div>

                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900/60 p-4 space-y-2">
                  <div className="text-[11px] font-mono font-bold text-brand-emerald">Stage 2: Context Injection</div>
                  <div className="text-xs text-obsidian-300"><strong>Project State:</strong> {activePal.injected_context.project_state}</div>
                  <div className="text-xs text-obsidian-400"><strong>Decisions Injected:</strong> {activePal.injected_context.prior_decisions.length} rules loaded</div>
                </div>

                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900/60 p-4 space-y-2 md:col-span-2">
                  <div className="text-[11px] font-mono font-bold text-brand-blue">Stage 3: Semantic Enhancement</div>
                  <p className="text-xs text-obsidian-200 leading-relaxed bg-obsidian-950 p-3 rounded-lg border border-obsidian-800">
                    {activePal.enhanced_instruction}
                  </p>
                </div>

                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900/60 p-4 space-y-2 md:col-span-2">
                  <div className="text-[11px] font-mono font-bold text-brand-violet">Stage 4 & 5: Compiled Runtime Manifest & Routing</div>
                  <pre className="text-[11px] font-mono text-obsidian-200 bg-obsidian-950 p-3 rounded-lg border border-obsidian-800 overflow-x-auto">
                    {activePal.compiled_yaml}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* 3. RAG DAL 3-TIER RESEARCH WORKSTATION */}
          {operatingMode === 'rag_dal' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-obsidian-800 gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Search className="h-4 w-4 text-brand-cyan" />
                    <span>RAG DAL (Dynamic Acquisition Layer)</span>
                  </h3>
                  <p className="text-xs text-obsidian-400">
                    Hierarchical 3-Tier Source Credibility (Tier 1: 1.0, Tier 2: 0.75, Tier 3: 0.40) with multi-pass convergence.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-brand-emerald font-bold">
                    Confidence: {(ragDalResult.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  placeholder="Enter market or technical research query..."
                  className="flex-1 rounded-xl border border-obsidian-700 bg-obsidian-900 px-4 py-2.5 text-xs text-white placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none"
                />
                <button
                  onClick={() => setRagDalResult(RostrEngine.performResearch(researchQuery))}
                  className="rounded-xl bg-brand-cyan px-5 py-2.5 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 transition-colors"
                >
                  Run 3-Tier Passes
                </button>
              </div>

              {/* Research Synthesis Brief */}
              <div className="rounded-xl border border-obsidian-800 bg-obsidian-900/70 p-5 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Synthesized Ground-Truth Report
                </h4>
                <div className="prose prose-invert prose-xs text-obsidian-200">
                  {ragDalResult.synthesized_brief}
                </div>
              </div>

              {/* Source Stratification */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-obsidian-300 uppercase tracking-wider">
                  Tiered Source Provenance ({ragDalResult.sources.length} Verified Sources)
                </h4>
                <div className="space-y-2">
                  {ragDalResult.sources.map((src) => (
                    <div key={src.id} className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{src.title}</span>
                        <span className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
                          src.tier === 1 ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30' :
                          src.tier === 2 ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30' :
                          'bg-obsidian-800 text-obsidian-400'
                        }`}>
                          Tier {src.tier} (Weight {src.credibility_score})
                        </span>
                      </div>
                      <p className="text-[11px] text-obsidian-400 leading-relaxed">{src.excerpt}</p>
                      <div className="text-[10px] text-obsidian-500 font-mono">{src.author} • {src.published_date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. NPAO TASK BOARD & SCHEDULER */}
          {operatingMode === 'npao_board' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="h-4 w-4 text-brand-cyan" />
                    <span>NPAO Multi-Dimensional Task Scheduler</span>
                  </h3>
                  <p className="text-xs text-obsidian-400">
                    Execution order: <strong>Necessity</strong> (blockers) → <strong>Anxiety</strong> (friction) → <strong>Priority</strong> (mission) → <strong>Opportunity</strong> (growth).
                  </p>
                </div>
                <span className="rounded-full bg-brand-violet/10 px-3 py-1 text-xs font-mono text-brand-violet border border-brand-violet/30">
                  5D Phase Aware
                </span>
              </div>

              {/* Kanban Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: '1. Necessity (Blockers)', cat: 'necessity', color: 'border-red-500/40 bg-red-500/5 text-red-300' },
                  { title: '2. Anxiety (Friction)', cat: 'anxiety', color: 'border-yellow-500/40 bg-yellow-500/5 text-yellow-300' },
                  { title: '3. Priority (Mission)', cat: 'priority', color: 'border-brand-cyan/40 bg-brand-cyan/5 text-brand-cyan' },
                  { title: '4. Opportunity (Growth)', cat: 'opportunity', color: 'border-brand-emerald/40 bg-brand-emerald/5 text-brand-emerald' },
                ].map((col) => (
                  <div key={col.cat} className="space-y-3">
                    <div className={`rounded-xl border p-2.5 text-xs font-bold uppercase tracking-wider text-center ${col.color}`}>
                      {col.title}
                    </div>
                    <div className="space-y-2">
                      {col.cat === 'necessity' && (
                        <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-3 text-xs space-y-1">
                          <div className="font-semibold text-white">DKIM & DMARC DNS Alignment</div>
                          <div className="text-[11px] text-obsidian-400">Hard deliverability requirement</div>
                          <div className="text-[10px] font-mono text-brand-emerald font-bold">Score: 9.8 / 10</div>
                        </div>
                      )}
                      {col.cat === 'anxiety' && (
                        <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-3 text-xs space-y-1">
                          <div className="font-semibold text-white">ContextEngine Session Audit</div>
                          <div className="text-[11px] text-obsidian-400">Prevent cold-start re-briefing</div>
                          <div className="text-[10px] font-mono text-yellow-400 font-bold">Score: 8.2 / 10</div>
                        </div>
                      )}
                      {col.cat === 'priority' && (
                        <>
                          <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-3 text-xs space-y-1">
                            <div className="font-semibold text-white">Deploy 5-Pillar n8n Outbound</div>
                            <div className="text-[11px] text-obsidian-400">Assigned: Prospect Automation Engineer</div>
                            <div className="text-[10px] font-mono text-brand-cyan font-bold">Score: 8.9 / 10</div>
                          </div>
                          <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-3 text-xs space-y-1">
                            <div className="font-semibold text-white">Export MEDDICC Sales Bible</div>
                            <div className="text-[11px] text-obsidian-400">Assigned: Sales Playbook Architect</div>
                            <div className="text-[10px] font-mono text-brand-cyan font-bold">Score: 7.6 / 10</div>
                          </div>
                        </>
                      )}
                      {col.cat === 'opportunity' && (
                        <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-3 text-xs space-y-1">
                          <div className="font-semibold text-white">SignalWire Voice AI Call Experiment</div>
                          <div className="text-[11px] text-obsidian-400">Automated 90s phone qualifier</div>
                          <div className="text-[10px] font-mono text-brand-emerald font-bold">Score: 6.4 / 10</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. CONTEXTENGINE MEMORY INSPECTOR */}
          {operatingMode === 'context_engine' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Database className="h-4 w-4 text-brand-cyan" />
                    <span>ContextEngine (Zero-Infrastructure Session Memory)</span>
                  </h3>
                  <p className="text-xs text-obsidian-400">
                    Flat-file human-readable append-only memory (.context/CONTEXT.md). Eliminates session amnesia.
                  </p>
                </div>
                <span className="rounded-full bg-brand-emerald/10 px-3 py-1 text-xs font-mono text-brand-emerald border border-brand-emerald/30">
                  Zero Vector DB Dependency
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-4 space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Accomplishments (This Session)</span>
                  <ul className="space-y-1.5 text-xs text-obsidian-300">
                    {contextSession.accomplishments.map((acc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-brand-emerald" />
                        <span>{acc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-4 space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Decisions Logged</span>
                  <div className="space-y-2">
                    {contextSession.decisions_made.map((dec, i) => (
                      <div key={i} className="rounded-lg bg-obsidian-950 p-2.5 text-xs border border-obsidian-800">
                        <div className="font-semibold text-brand-cyan">{dec.decision}</div>
                        <div className="text-obsidian-400 text-[11px] mt-0.5">Rationale: {dec.rationale}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-4 space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Next Recommended Action</span>
                  <p className="text-xs text-brand-emerald font-semibold">
                    {contextSession.next_recommended_action}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. N8N WORKFLOW SANDBOX */}
          {operatingMode === 'workflow_sandbox' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-brand-cyan" />
                    <span>Autonomous n8n & Make.com Workflow Sandbox</span>
                  </h3>
                  <p className="text-xs text-obsidian-400">
                    Live blueprint editor with JSON schema validation, node connectors, and execution simulation.
                  </p>
                </div>
                <button
                  onClick={() => setActiveArtifact(DEFAULT_WORKFLOWS[0].jsonDefinition)}
                  className="rounded-lg bg-brand-cyan px-3.5 py-1.5 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 transition-colors"
                >
                  Load into Artifacts
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-obsidian-800 bg-obsidian-900 p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-obsidian-800 mb-3">
                    <span className="text-xs font-bold text-white">Active Blueprint: 5-Pillar Outbound Pipeline</span>
                    <span className="text-[10px] font-mono text-brand-emerald font-bold">9 Nodes Connected</span>
                  </div>
                  <pre className="text-[11px] font-mono text-obsidian-200 bg-obsidian-950 p-3 rounded-lg border border-obsidian-800 max-h-72 overflow-y-auto">
                    {DEFAULT_WORKFLOWS[0].jsonDefinition}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* 7. SIGNALWIRE VOICE AI SIMULATOR */}
          {operatingMode === 'voice_simulator' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-brand-cyan" />
                    <span>SignalWire Voice AI Call Simulator</span>
                  </h3>
                  <p className="text-xs text-obsidian-400">
                    Test low-latency Conversational Phone AI for inbound qualification and outbound follow-up calls.
                  </p>
                </div>
                <span className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-mono text-brand-cyan border border-brand-cyan/30">
                  WebRTC Audio Link
                </span>
              </div>

              {/* Call Action Console */}
              <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/80 p-8 text-center space-y-6 shadow-glass-card max-w-md mx-auto">
                <div className="flex justify-center">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full border ${
                    voiceCallStatus === 'connected' ? 'border-brand-emerald bg-brand-emerald/20 text-brand-emerald animate-pulse' :
                    voiceCallStatus === 'calling' ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400 animate-bounce' :
                    'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan'
                  }`}>
                    <PhoneCall className="h-8 w-8" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">SignalWire AI SDR (Alex)</h4>
                  <p className="text-xs text-obsidian-400">Status: <span className="font-mono text-brand-cyan uppercase">{voiceCallStatus}</span></p>
                </div>

                <div className="flex justify-center gap-3">
                  {voiceCallStatus === 'idle' || voiceCallStatus === 'completed' ? (
                    <button
                      onClick={handleStartVoiceCall}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-emerald px-6 py-3 text-xs font-bold text-obsidian-950 hover:opacity-95 shadow-glow-cyan transition-all"
                    >
                      <Play className="h-4 w-4 fill-obsidian-950" />
                      <span>Start Test Phone Call</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleEndVoiceCall}
                      className="rounded-xl bg-red-500 px-6 py-3 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                    >
                      End Call & Save Transcript
                    </button>
                  )}
                </div>

                {/* Live Transcript Box */}
                <div className="text-left bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 text-xs font-mono space-y-2 min-h-24">
                  <div className="text-[10px] text-obsidian-500 uppercase tracking-wider">// Audio Transcript</div>
                  {voiceTranscript.map((line, idx) => (
                    <p key={idx} className="text-obsidian-300">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Live Dynamic Artifacts Viewer & Exporter */}
        <div className="lg:col-span-4 flex flex-col h-full bg-obsidian-950/90 overflow-hidden border-t lg:border-t-0">
          <div className="flex items-center justify-between border-b border-obsidian-800 px-4 py-3 bg-obsidian-900/60">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-cyan" />
              <span className="text-xs font-bold text-white">Live GTM Artifact</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyArtifact}
                disabled={!activeArtifact}
                className="flex items-center gap-1 rounded bg-obsidian-800 px-2 py-1 text-[11px] text-obsidian-300 hover:text-white transition-colors"
                title="Copy to Clipboard"
              >
                {copiedArtifact ? <Check className="h-3.5 w-3.5 text-brand-emerald" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedArtifact ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadArtifact}
                disabled={!activeArtifact}
                className="flex items-center gap-1 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 px-2 py-1 text-[11px] font-semibold hover:bg-brand-cyan/30 transition-colors"
                title="Download Artifact File"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Artifact Content Container */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-obsidian-200 bg-obsidian-950/80">
            {activeArtifact ? (
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed">
                {activeArtifact}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-obsidian-500 space-y-3">
                <Code2 className="h-8 w-8 text-obsidian-700" />
                <p className="text-xs">
                  Direct the agents in the Studio to generate Sales Bibles, n8n workflows, ICP specs, or cold outreach sequences.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
