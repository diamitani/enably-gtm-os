import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Check, 
  Lock, 
  Plus, 
  ExternalLink,
  Zap,
  Building
} from 'lucide-react';
import { WorkspaceConfig, Role } from '../types';

interface SettingsViewProps {
  workspace: WorkspaceConfig;
  onUpdateWorkspace: (updated: WorkspaceConfig) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ workspace, onUpdateWorkspace }) => {
  const [activeTab, setActiveTab] = useState<'byok' | 'members' | 'billing' | 'data'>('byok');
  
  // BYOK State
  const [openaiKey, setOpenaiKey] = useState<string>(workspace.byokKeys.openai || 'sk-proj-••••••••••••••••••••••••••••');
  const [anthropicKey, setAnthropicKey] = useState<string>(workspace.byokKeys.anthropic || 'sk-ant-••••••••••••••••••••••••••••');
  const [geminiKey, setGeminiKey] = useState<string>(workspace.byokKeys.gemini || 'AIzaSy••••••••••••••••••••••••••••');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Invite Member State
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<Role>('member');

  const handleSaveKeys = () => {
    onUpdateWorkspace({
      ...workspace,
      byokKeys: {
        ...workspace.byokKeys,
        openai: openaiKey,
        anthropic: anthropicKey,
        gemini: geminiKey
      }
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) return;
    const newMember = {
      id: `user-${Date.now().toString(36)}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    };
    onUpdateWorkspace({
      ...workspace,
      members: [...workspace.members, newMember]
    });
    setInviteEmail('');
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-obsidian-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            <Settings className="h-4 w-4" />
            <span>Workspace Settings & Governance</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Security, BYOK, & Workspace Configuration
          </h1>
          <p className="text-xs text-obsidian-400 mt-1">
            Configure private AI gateway keys, team access roles (RBAC), and Stripe subscription billing.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-obsidian-800 pb-2">
        {[
          { id: 'byok', label: 'BYOK & AI Gateway Keys', icon: Key },
          { id: 'members', label: 'Team Members & RBAC', icon: Users },
          { id: 'billing', label: 'Billing & Plan Quotas', icon: CreditCard },
          { id: 'data', label: 'Data Governance & Audit', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-brand-cyan text-obsidian-950 shadow-sm'
                  : 'text-obsidian-400 hover:text-white hover:bg-obsidian-900'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'byok' && (
        <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-6 sm:p-8 space-y-6 shadow-glass-card max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-white">Bring Your Own Key (BYOK) AI Gateway</h3>
            <p className="text-xs text-obsidian-400 mt-1">
              Supply your own private API keys to bypass rate limits and route requests directly through OpenAI, Anthropic, or Google Gemini.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-obsidian-300">OpenAI API Key (GPT-4o / O3-Mini)</label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full rounded-xl border border-obsidian-700 bg-obsidian-950 px-3.5 py-2.5 font-mono text-white placeholder-obsidian-600 focus:border-brand-cyan focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-obsidian-300">Anthropic Claude API Key (Claude 3.7 / 3.5 Sonnet)</label>
              <input
                type="password"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                className="w-full rounded-xl border border-obsidian-700 bg-obsidian-950 px-3.5 py-2.5 font-mono text-white placeholder-obsidian-600 focus:border-brand-cyan focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-obsidian-300">Google Gemini API Key (Gemini 2.0 Flash / Pro)</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full rounded-xl border border-obsidian-700 bg-obsidian-950 px-3.5 py-2.5 font-mono text-white placeholder-obsidian-600 focus:border-brand-cyan focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-obsidian-800">
            {saveSuccess ? (
              <span className="flex items-center gap-1.5 text-xs text-brand-emerald font-semibold">
                <Check className="h-4 w-4" />
                <span>Keys safely encrypted and updated!</span>
              </span>
            ) : (
              <span className="text-[11px] text-obsidian-500 font-mono">Zero retention private vault</span>
            )}

            <button
              onClick={handleSaveKeys}
              className="rounded-xl bg-brand-cyan px-6 py-2.5 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 transition-colors shadow-glow-cyan"
            >
              Save API Keys
            </button>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-6 sm:p-8 space-y-6 shadow-glass-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-obsidian-800 gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Team Members & Access Roles (RBAC)</h3>
              <p className="text-xs text-obsidian-400">Manage permissions across Viewer, Member, Admin, and Owner roles.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="rounded-xl border border-obsidian-700 bg-obsidian-950 px-3 py-2 text-xs text-white placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as Role)}
                className="rounded-xl border border-obsidian-700 bg-obsidian-950 px-3 py-2 text-xs text-white focus:border-brand-cyan focus:outline-none"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
              <button
                onClick={handleInviteMember}
                className="rounded-xl bg-brand-cyan px-4 py-2 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 transition-colors"
              >
                Invite
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {workspace.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-xl border border-obsidian-800 bg-obsidian-950 p-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan font-bold uppercase">
                    {member.name.substring(0, 2)}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{member.name}</span>
                    <span className="text-obsidian-400 text-[11px]">{member.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded bg-obsidian-800 px-2.5 py-1 text-[10px] font-mono text-brand-cyan uppercase font-bold">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-6 sm:p-8 space-y-6 shadow-glass-card max-w-3xl">
          <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
            <div>
              <h3 className="text-base font-bold text-white">Current Plan: {workspace.plan}</h3>
              <p className="text-xs text-obsidian-400">Managed self-serve via Stripe Billing & Customer Portal.</p>
            </div>
            <span className="rounded-full bg-brand-emerald/10 border border-brand-emerald/30 px-3 py-1 text-xs font-mono font-bold text-brand-emerald">
              Active Subscription
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-4 space-y-2">
              <span className="text-obsidian-400">Team Seats:</span>
              <div className="text-xl font-bold text-white font-mono">{workspace.members.length} / {workspace.seats} seats used</div>
            </div>
            <div className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-4 space-y-2">
              <span className="text-obsidian-400">Monthly PAL Credits:</span>
              <div className="text-xl font-bold text-brand-cyan font-mono">{workspace.creditsUsed} / {workspace.creditsLimit}</div>
            </div>
          </div>

          <div className="pt-4 border-t border-obsidian-800 flex justify-between items-center">
            <span className="text-xs text-obsidian-400 font-mono">Next billing date: November 1, 2026</span>
            <button className="flex items-center gap-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-600 px-4 py-2 text-xs font-semibold text-white transition-colors">
              <span>Open Stripe Customer Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-6 sm:p-8 space-y-6 shadow-glass-card max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-white">Data Privacy & Export</h3>
            <p className="text-xs text-obsidian-400 mt-1">Export your entire workspace state, audit logs, and lead database as a portable JSON package.</p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 rounded-xl border border-obsidian-700 bg-obsidian-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-obsidian-700 transition-colors">
              <Download className="h-4 w-4 text-brand-cyan" />
              <span>Export Workspace JSON</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
