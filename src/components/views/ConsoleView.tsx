import React, { useState, useRef, useEffect } from 'react';
import { AgentId, ChatMessage, Artifact } from '../../types';
import { ENABLY_AGENTS } from '../../data/agents';
import { 
  Send, 
  Sparkles, 
  Terminal, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RotateCw, 
  Cpu, 
  FileText, 
  ChevronRight, 
  Maximize2,
  Trash2,
  SlidersHorizontal,
  Code
} from 'lucide-react';

interface ConsoleViewProps {
  onSaveArtifact: (artifact: Artifact) => void;
}

export const ConsoleView: React.FC<ConsoleViewProps> = ({ onSaveArtifact }) => {
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>('enably_master');
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentAgent = ENABLY_AGENTS.find((a) => a.id === selectedAgentId) || ENABLY_AGENTS[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      agentId: 'enably_master',
      content: `Hello! I am your GTM Master Architect connected via AWS Bedrock AgentCore. 

I can orchestrate all 5 specialized agents to build ICPs, competitive battlecards, outbound sequences, and account dossiers. What GTM motion are we planning today?`,
      timestamp: 'Just now',
      toolsExecuted: [
        {
          name: 'bedrock_invoke_harness',
          input: '{"agent": "enably_master", "action": "init_session"}',
          output: '{"status": "READY", "harnessId": "enably-gtm-master-01"}',
          durationMs: 320,
        },
      ],
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSend = () => {
    if (!inputMessage.trim() || isGenerating) return;

    const userText = inputMessage;
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: userText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    // Simulate Agent Harness Execution
    setTimeout(() => {
      let agentResponse = '';
      let generatedArtifact: Artifact | undefined = undefined;

      if (selectedAgentId === 'enably_icp') {
        agentResponse = `I have analyzed the market requirements and generated a high-converting Ideal Customer Profile matrix.

### Tier-1 ICP Summary:
- **Target Accounts:** High-growth B2B SaaS companies with 150-1,000 employees.
- **Economic Buyer:** VP of Revenue Operations / VP Sales.
- **Primary Buying Trigger:** Inconsistent rep ramp times and low outbound conversion.`;

        generatedArtifact = {
          id: `art-icp-${Date.now()}`,
          title: 'Tier-1 ICP Matrix & Persona Spec',
          type: 'icp_matrix',
          agentId: 'enably_icp',
          createdAt: new Date().toISOString(),
          version: 'v1.0.0',
          content: `# ICP & Persona Matrix: B2B Growth Accounts\n\n## 1. Firmographic Filter\n- Headcount: 150 - 1,000\n- Primary Cloud: AWS / Multi-cloud\n- Target ACV: $35,000 - $75,000\n\n## 2. Persona Specifications\n### Economic Buyer: VP Sales Operations\n- Objective: Predictable pipeline pacing & rep quota attainment.\n- Objection: "We have Outreach already."\n- Wedge Counter: Enably provides autonomous AI agent orchestration on top of Outreach.`,
          tags: ['ICP', 'Personas', 'Enably-ICP'],
        };
      } else if (selectedAgentId === 'enably_messaging') {
        agentResponse = `Here is a high-converting 3-touch outbound sequence tailored to your target persona with dynamic variable slots ready for Clay / Lemlist ingestion.`;

        generatedArtifact = {
          id: `art-seq-${Date.now()}`,
          title: '3-Touch VP Sales Outbound Sequence',
          type: 'outreach_sequence',
          agentId: 'enably_messaging',
          createdAt: new Date().toISOString(),
          version: 'v1.0.0',
          content: `# 3-Touch Sequence: VP Sales\n\n### Touch 1 (Email - Day 1)\nSubject: quick question on {{company}}'s outbound conversion\n\nHey {{first_name}},\n\nSaw {{company}} is scaling the sales team with {{open_sdr_roles}} open roles.\nUsually when sales headcount doubles, outbound sequence quality degrades and rep ramp extends past 4 months.\n\nWe built Enably to equip every rep with 5 autonomous GTM agents.\n\nOpen to a 3-minute video breakdown of how Apex doubled outbound meetings?\n\nBest,\nAlex - Enably GTM`,
          tags: ['Sequence', 'Outbound', 'Cold Email'],
        };
      } else {
        agentResponse = `I have executed the GTM analysis across our 5-agent harness. The strategy has been synthesized into a structured ROSTR v2 artifact below.`;

        generatedArtifact = {
          id: `art-gtm-${Date.now()}`,
          title: 'GTM Strategy & Multi-Agent Execution Plan',
          type: 'gtm_blueprint',
          agentId: selectedAgentId,
          createdAt: new Date().toISOString(),
          version: 'v1.0.0',
          content: `# GTM Execution Plan\n\n1. Target Market: Enterprise Infrastructure & Security\n2. Primary Channel: Outbound Cold Email + LinkedIn Multi-Touch\n3. Sales Methodology: MEDDPICC\n4. Projected Ramp: 45 Days to First $250k Pipeline`,
          tags: ['Master Plan', 'GTM', 'ROSTR v2'],
        };
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentId: selectedAgentId,
        content: agentResponse,
        timestamp: 'Just now',
        artifacts: generatedArtifact ? [generatedArtifact] : undefined,
        toolsExecuted: [
          {
            name: `bedrock_${selectedAgentId}_harness`,
            input: JSON.stringify({ prompt: userText.slice(0, 50) }),
            output: '{"status": "SUCCESS", "tokens_processed": 1840}',
            durationMs: 840,
          },
          {
            name: 'artifact_envelope_validator',
            input: '{"schema": "agentcompanies/v1"}',
            output: '{"valid": true, "confidence": 0.98}',
            durationMs: 120,
          },
        ],
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsGenerating(false);

      if (generatedArtifact) {
        setSelectedArtifact(generatedArtifact);
        onSaveArtifact(generatedArtifact);
      }
    }, 1200);
  };

  const starterPrompts = [
    'Generate Tier-1 ICP and buyer personas for an Enterprise DevTool',
    'Write a 3-touch cold email sequence targeting VP Infrastructure',
    'Build a competitor battlecard against legacy suites',
    'Run account intelligence on Stripe tech stack & open hiring signals',
  ];

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Agent Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-obsidian-800">
        <div>
          <div className="flex items-center space-x-2 text-brand-cyan text-xs font-mono">
            <Terminal className="w-4 h-4" />
            <span>Interactive Multi-Agent Console // Bedrock Harness API</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-0.5">
            Active Agent: {currentAgent.name}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-400 font-mono">Switch Agent:</label>
          <select
            value={selectedAgentId}
            onChange={(e) => setSelectedAgentId(e.target.value as AgentId)}
            className="px-3 py-1.5 rounded-lg bg-obsidian-850 border border-obsidian-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-brand-cyan"
          >
            {ENABLY_AGENTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setMessages([])}
            className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-400 hover:text-rose-400 border border-obsidian-700 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: Chat Window on Left, Artifact Pane on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chat Window */}
        <div className="lg:col-span-7 glass-panel rounded-xl border border-obsidian-700/80 flex flex-col h-[650px] overflow-hidden bg-obsidian-900/90 shadow-2xl">
          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <Bot className="w-10 h-10 text-slate-600" />
                <h3 className="text-sm font-bold text-slate-300">Agent Console Ready</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Select a starter prompt below or enter custom GTM parameters to trigger the active Bedrock harness.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex space-x-3 text-xs ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div 
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${currentAgent.color}20`, border: `1px solid ${currentAgent.color}40` }}
                  >
                    <Bot className="w-4 h-4" style={{ color: currentAgent.color }} />
                  </div>
                )}

                <div className={`space-y-2 max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Message Bubble */}
                  <div
                    className={`p-3.5 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-brand-blue text-white rounded-br-none shadow-md'
                        : 'bg-obsidian-950/80 border border-obsidian-750 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>

                    {/* Attached Artifact Preview Button */}
                    {msg.artifacts && msg.artifacts.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-obsidian-800 space-y-2">
                        <div className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider">
                          Generated Artifact Created:
                        </div>
                        {msg.artifacts.map((art) => (
                          <button
                            key={art.id}
                            onClick={() => setSelectedArtifact(art)}
                            className="w-full flex items-center justify-between p-2 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 border border-brand-cyan/30 text-xs font-semibold text-white transition-colors"
                          >
                            <span className="flex items-center space-x-2">
                              <FileText className="w-3.5 h-3.5 text-brand-cyan" />
                              <span>{art.title}</span>
                            </span>
                            <span className="text-[10px] font-mono text-brand-cyan">View →</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tool Execution Diagnostics */}
                  {msg.toolsExecuted && msg.toolsExecuted.length > 0 && (
                    <div className="space-y-1">
                      {msg.toolsExecuted.map((tool, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 px-2 py-1 rounded bg-obsidian-950 border border-obsidian-800 text-[10px] font-mono text-slate-400"
                        >
                          <Cpu className="w-3 h-3 text-brand-cyan" />
                          <span className="text-slate-300">{tool.name}</span>
                          <span className="text-slate-500">({tool.durationMs}ms)</span>
                          <span className="text-brand-emerald">200 OK</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Copy Button */}
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => copyMessage(msg.id, msg.content || msg.text || '')}
                      className="hover:text-slate-300"
                    >
                      {copiedId === msg.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-md bg-obsidian-800 border border-obsidian-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center space-x-3 text-xs text-brand-cyan font-mono">
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Invoking {currentAgent.name} harness...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts */}
          <div className="px-4 py-2 bg-obsidian-950/60 border-t border-obsidian-800/80 flex items-center space-x-2 overflow-x-auto text-[11px] font-mono">
            <span className="text-slate-500 flex-shrink-0">Starter:</span>
            {starterPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInputMessage(p)}
                className="px-2.5 py-1 rounded bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 border border-obsidian-750 whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-obsidian-950 border-t border-obsidian-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Ask ${currentAgent.name} (e.g. build competitor battlecard, audit ICP, write sequence)...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-obsidian-900 border border-obsidian-750 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim() || isGenerating}
              className="px-4 py-2.5 rounded-lg bg-brand-cyan hover:brightness-110 text-obsidian-950 font-bold text-xs flex items-center space-x-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-cyan"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Live Artifact Inspector */}
        <div className="lg:col-span-5 glass-panel rounded-xl border border-obsidian-700/80 h-[650px] flex flex-col overflow-hidden bg-obsidian-900/90 shadow-2xl">
          <div className="px-4 py-3 bg-obsidian-950/80 border-b border-obsidian-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-bold text-white">
                {selectedArtifact ? selectedArtifact.title : 'Live Artifact Inspector'}
              </span>
            </div>

            {selectedArtifact && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                {selectedArtifact.version}
              </span>
            )}
          </div>

          <div className="flex-1 p-5 overflow-y-auto text-xs text-slate-300 leading-relaxed bg-obsidian-950/60">
            {selectedArtifact ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5 pb-2 border-b border-obsidian-800">
                  {selectedArtifact.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-obsidian-850 text-slate-400 font-mono text-[10px] border border-obsidian-750">
                      #{t}
                    </span>
                  ))}
                </div>
                <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-200">
                  {selectedArtifact.content}
                </pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <FileText className="w-10 h-10 text-slate-600" />
                <h4 className="text-xs font-bold text-slate-400">No Artifact Selected</h4>
                <p className="text-[11px] text-slate-500 max-w-xs">
                  Run a query in the console or generate an ICP/Playbook to view the structured ROSTR v2 document here.
                </p>
              </div>
            )}
          </div>

          {selectedArtifact && (
            <div className="p-3 bg-obsidian-950 border-t border-obsidian-800 flex items-center justify-between">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedArtifact.content);
                }}
                className="px-3 py-1.5 rounded bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 border border-obsidian-750 text-xs font-medium flex items-center space-x-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Artifact</span>
              </button>

              <button
                onClick={() => onSaveArtifact(selectedArtifact)}
                className="px-3 py-1.5 rounded bg-brand-cyan text-obsidian-950 text-xs font-bold hover:brightness-110 shadow-glow-cyan"
              >
                Save to Library
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
