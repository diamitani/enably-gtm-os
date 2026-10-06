import React, { useState } from 'react';
import { Artifact } from '../../types';
import { 
  Settings, 
  Key, 
  Users, 
  ShieldCheck, 
  Database, 
  Trash2, 
  Copy, 
  Check, 
  Plus, 
  Download, 
  FileText,
  Lock,
  Cpu,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingsViewProps {
  artifacts: Artifact[];
  onDeleteArtifact: (id: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  artifacts,
  onDeleteArtifact,
}) => {
  const [activeTab, setActiveTab] = useState<'gateway' | 'team' | 'apikeys' | 'artifacts'>('gateway');
  
  // Gateway State
  const [selectedProvider, setSelectedProvider] = useState<'bedrock' | 'anthropic' | 'openai' | 'gemini'>('bedrock');
  const [awsAccessKey, setAwsAccessKey] = useState('AKIA****************');
  const [awsSecretKey, setAwsSecretKey] = useState('wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');
  const [awsRegion, setAwsRegion] = useState('us-east-1');
  const [customEndpoint, setCustomEndpoint] = useState('https://bedrock-runtime.us-east-1.amazonaws.com');
  const [showSecret, setShowSecret] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Team State
  const [members, setMembers] = useState([
    { id: '1', name: 'Patrick Diamitani', email: 'patrick@enably.ai', role: 'Owner', seats: 'Full Admin' },
    { id: '2', name: 'Elena Rostova', email: 'elena@enably.ai', role: 'GTM Strategist', seats: 'Studio Access' },
    { id: '3', name: 'David Chen', email: 'david@enably.ai', role: 'SDR Team Lead', seats: 'Console Access' },
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // API Key State
  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Make.com Webhook Key', prefix: 'enb_live_9f8a...', created: '3 days ago' },
    { id: 'key-2', name: 'Clay Enrichment Router', prefix: 'enb_live_41c2...', created: '1 week ago' },
  ]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSaveGateway = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddMember = () => {
    if (!newMemberEmail.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `mem-${Date.now()}`,
        name: newMemberEmail.split('@')[0],
        email: newMemberEmail,
        role: 'GTM Member',
        seats: 'Studio Access',
      },
    ]);
    setNewMemberEmail('');
  };

  const handleGenerateApiKey = () => {
    const newKey = {
      id: `key-${Date.now()}`,
      name: `Agent Key ${apiKeys.length + 1}`,
      prefix: `enb_live_${Math.random().toString(36).substring(2, 8)}...`,
      created: 'Just now',
    };
    setApiKeys((prev) => [...prev, newKey]);
  };

  const downloadArtifact = (artifact: Artifact) => {
    const blob = new Blob([artifact.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artifact.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-paper-200">
        <div className="flex items-center space-x-2 text-accent text-xs font-mono">
          <Settings className="w-4 h-4" />
          <span>Workspace Control Plane // Governance & Security</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
          BYOK Gateway & Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Configure model routing, manage API keys for agent webhooks, and enforce role-based access control.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-paper-200 pb-2">
        <button
          onClick={() => setActiveTab('gateway')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors ${
            activeTab === 'gateway'
              ? 'bg-accent/15 text-accent border border-brand-cyan/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>LLM Gateway & BYOK</span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors ${
            activeTab === 'team'
              ? 'bg-accent/15 text-accent border border-brand-cyan/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team & Roles</span>
        </button>

        <button
          onClick={() => setActiveTab('apikeys')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors ${
            activeTab === 'apikeys'
              ? 'bg-accent/15 text-accent border border-brand-cyan/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Agent Webhook Keys</span>
        </button>

        <button
          onClick={() => setActiveTab('artifacts')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors ${
            activeTab === 'artifacts'
              ? 'bg-accent/15 text-accent border border-brand-cyan/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Saved Artifacts ({artifacts.length})</span>
        </button>
      </div>

      {/* Tab 1: LLM Gateway & BYOK */}
      {activeTab === 'gateway' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-card rounded-xl p-6 border border-paper-200 space-y-6">
            <div>
              <h3 className="text-base font-bold text-ink">LLM Provider & BYOK Gateway</h3>
              <p className="text-xs text-slate-400 mt-1">
                Route agent inferences through your dedicated enterprise AWS Bedrock cluster or custom API proxy.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'bedrock', name: 'AWS Bedrock', desc: 'AgentCore' },
                { id: 'anthropic', name: 'Anthropic Direct', desc: 'Claude API' },
                { id: 'openai', name: 'OpenAI Gateway', desc: 'GPT-4o' },
                { id: 'gemini', name: 'Google Gemini', desc: 'Flash 2.5' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProvider(p.id as any)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    selectedProvider === p.id
                      ? 'bg-accent/15 border-brand-cyan/40 text-ink'
                      : 'bg-paper-50 border-obsidian-750 text-slate-400 hover:bg-obsidian-850'
                  }`}
                >
                  <div className="font-bold">{p.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{p.desc}</div>
                </button>
              ))}
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">AWS Access Key ID</label>
                <input
                  type="text"
                  value={awsAccessKey}
                  onChange={(e) => setAwsAccessKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-obsidian-750 text-slate-200 font-mono text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-medium">AWS Secret Access Key</label>
                  <button
                    onClick={() => setShowSecret(!showSecret)}
                    className="text-[11px] text-accent hover:underline flex items-center space-x-1"
                  >
                    {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSecret ? 'Hide' : 'Reveal'}</span>
                  </button>
                </div>
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={awsSecretKey}
                  onChange={(e) => setAwsSecretKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-obsidian-750 text-slate-200 font-mono text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">AWS Region</label>
                  <input
                    type="text"
                    value={awsRegion}
                    onChange={(e) => setAwsRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-obsidian-750 text-slate-200 font-mono text-xs focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Inference Temperature</label>
                  <input
                    type="text"
                    value="0.2 (Precision Mode)"
                    disabled
                    className="w-full px-3 py-2 rounded-lg bg-white/60 border border-paper-200 text-slate-400 font-mono text-xs cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Custom Bedrock Gateway Endpoint</label>
                <input
                  type="text"
                  value={customEndpoint}
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-obsidian-750 text-slate-200 font-mono text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-emerald-600 font-mono">
                {savedSuccess && '✓ Gateway parameters updated successfully'}
              </span>

              <button
                onClick={handleSaveGateway}
                className="px-5 py-2.5 rounded-lg bg-accent text-white font-bold text-xs hover:brightness-110 shadow-glow-accent transition-all"
              >
                Save Gateway Credentials
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-xl p-6 border border-paper-200 space-y-3">
              <h4 className="text-sm font-bold text-ink flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Data Retention & VPC Policy</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enably harnesses invoke Bedrock AgentCore inside your isolated VPC boundaries. Customer inputs, ICP parameters, and contact emails are never retained for model training.
              </p>
              <div className="p-3 rounded-lg bg-white border border-paper-200 font-mono text-[11px] text-slate-400 space-y-1">
                <div>Encryption: AWS KMS (AES-256)</div>
                <div>Compliance: SOC2 Type II, GDPR, CCPA</div>
                <div>Network: PrivateLink VPC Peering Ready</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Team & Roles */}
      {activeTab === 'team' && (
        <div className="glass-card rounded-xl p-6 border border-paper-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-ink">Workspace Members & Permissions</h3>
              <p className="text-xs text-slate-400 mt-1">
                Grant team members access to the 5 GTM agent harnesses and workspace libraries.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="colleague@company.com"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white border border-obsidian-750 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
              <button
                onClick={handleAddMember}
                className="px-3 py-1.5 rounded-lg bg-accent text-white font-bold text-xs hover:brightness-110 shadow-glow-accent"
              >
                Invite
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-paper-200 text-[10px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Email</th>
                  <th className="py-2.5">Role</th>
                  <th className="py-2.5">Harness Access</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-800/60">
                {members.map((m) => (
                  <tr key={m.id} className="text-slate-300">
                    <td className="py-3 font-semibold text-ink">{m.name}</td>
                    <td className="py-3 font-mono text-slate-400">{m.email}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-obsidian-850 border border-obsidian-750 font-mono text-[10px]">
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{m.seats}</td>
                    <td className="py-3 text-right">
                      {m.role !== 'Owner' && (
                        <button
                          onClick={() => setMembers((prev) => prev.filter((item) => item.id !== m.id))}
                          className="text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Agent Webhook Keys */}
      {activeTab === 'apikeys' && (
        <div className="glass-card rounded-xl p-6 border border-paper-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink">Agent Webhook & Ingestion API Keys</h3>
              <p className="text-xs text-slate-400 mt-1">
                Keys for programmatic agent execution from Make.com, n8n, Clay, or your internal scripts.
              </p>
            </div>

            <button
              onClick={handleGenerateApiKey}
              className="px-3.5 py-1.5 rounded-lg bg-accent text-white font-bold text-xs hover:brightness-110 shadow-glow-accent flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate Key</span>
            </button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((k) => (
              <div
                key={k.id}
                className="p-4 rounded-xl bg-white border border-paper-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-ink">{k.name}</div>
                  <div className="font-mono text-slate-400 text-[11px] mt-0.5">
                    {k.prefix} • Created {k.created}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(k.prefix);
                      setCopiedKey(k.id);
                      setTimeout(() => setCopiedKey(null), 2000);
                    }}
                    className="px-2.5 py-1 rounded bg-obsidian-850 hover:bg-paper-100 border border-paper-300 text-slate-300"
                  >
                    {copiedKey === k.id ? 'Copied' : 'Copy Key'}
                  </button>

                  <button
                    onClick={() => setApiKeys((prev) => prev.filter((item) => item.id !== k.id))}
                    className="p-1.5 rounded bg-obsidian-850 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Saved Artifacts */}
      {activeTab === 'artifacts' && (
        <div className="glass-card rounded-xl p-6 border border-paper-200 space-y-6">
          <div>
            <h3 className="text-base font-bold text-ink">Saved Workspace Artifacts</h3>
            <p className="text-xs text-slate-400 mt-1">
              All generated ICP documents, competitive battlecards, sales playbooks, and outbound sequences.
            </p>
          </div>

          {artifacts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No saved artifacts in this workspace yet. Execute any agent in the GTM Studio to save outputs here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artifacts.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-xl bg-white border border-paper-200 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-ink flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-accent" />
                        <span>{art.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-obsidian-850 text-slate-400 border border-obsidian-750">
                        {art.version}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {art.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-slate-400 bg-paper-50 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-3 font-mono bg-paper-50/60 p-2 rounded">
                      {art.content.slice(0, 150)}...
                    </p>
                  </div>

                  <div className="pt-2 border-t border-obsidian-850 flex items-center justify-between text-xs">
                    <button
                      onClick={() => downloadArtifact(art)}
                      className="text-accent hover:underline flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download .md</span>
                    </button>

                    <button
                      onClick={() => onDeleteArtifact(art.id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
