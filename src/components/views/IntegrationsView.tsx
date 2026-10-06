import React, { useState } from 'react';
import { Integration } from '../../types';
import { INTEGRATIONS_LIST } from '../../data/integrations';
import { 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Key, 
  ExternalLink, 
  Search, 
  Plus, 
  Check, 
  Layers, 
  Database, 
  ShieldCheck, 
  Zap,
  Sliders
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS_LIST);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const categories = [
    { id: 'all', name: 'All Connectors' },
    { id: 'crm', name: 'CRMs' },
    { id: 'enrichment', name: 'Data & Enrichment' },
    { id: 'sequencing', name: 'Outbound & Sequences' },
    { id: 'automation', name: 'Workflows & Webhooks' },
    { id: 'infrastructure', name: 'AI & Infra' },
  ];

  const filteredIntegrations = integrations.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = !item.connected;
          return {
            ...item,
            connected: newStatus,
            status: newStatus ? 'active' : 'disconnected',
            lastSync: newStatus ? 'Just now' : undefined,
          };
        }
        return item;
      })
    );
    setSelectedIntegration(null);
    setApiKeyInput('');
  };

  const handleSaveModal = () => {
    if (!selectedIntegration) return;
    setIsConnecting(true);

    setTimeout(() => {
      handleToggleConnection(selectedIntegration.id);
      setIsConnecting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-paper-200">
        <div>
          <div className="flex items-center space-x-2 text-brand-violet text-xs font-mono">
            <Cpu className="w-4 h-4" />
            <span>Marketplace // Skills & Tool Connectors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
            GTM Integration & Tool Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Wire your 5 agent harnesses directly into your CRM, data enrichment waterfall, and automated outbound sequencers.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search connectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg bg-paper-50 border border-obsidian-750 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <button className="px-3.5 py-1.5 rounded-lg bg-obsidian-850 hover:bg-paper-100 border border-paper-300 text-xs text-slate-200 font-medium flex items-center space-x-1.5">
            <Plus className="w-3.5 h-3.5 text-accent" />
            <span>Custom MCP Server</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-brand-violet/20 text-brand-violet border border-brand-violet/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-xl p-6 border border-paper-200 flex flex-col justify-between hover:border-paper-300 transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-obsidian-850 border border-obsidian-750 flex items-center justify-center font-bold text-sm text-accent font-mono">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="flex items-center space-x-1.5">
                  {item.connected ? (
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-brand-emerald/20 text-[10px] font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Connected</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-obsidian-850 text-slate-500 border border-obsidian-750 text-[10px] font-mono">
                      Not Configured
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ink">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-paper-200/80 flex items-center justify-between text-xs">
              <div className="text-[11px] font-mono text-slate-500">
                {item.lastSync ? `Sync: ${item.lastSync}` : 'Auth: ' + item.authType.toUpperCase()}
              </div>

              {item.connected ? (
                <button
                  onClick={() => handleToggleConnection(item.id)}
                  className="px-3 py-1 rounded bg-obsidian-850 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-obsidian-750 text-xs transition-colors"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => setSelectedIntegration(item)}
                  className="px-3 py-1 rounded bg-brand-violet/20 hover:bg-brand-violet/30 text-brand-violet border border-brand-violet/40 font-semibold text-xs transition-colors"
                >
                  Configure Key
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Setup Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-md">
          <div className="card rounded-xl p-6 border border-paper-300 bg-paper-50 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-paper-200">
              <h3 className="text-base font-bold text-ink flex items-center space-x-2">
                <Key className="w-4 h-4 text-brand-violet" />
                <span>Connect {selectedIntegration.name}</span>
              </h3>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="text-slate-400 hover:text-ink text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                Provide your API key or OAuth credentials to enable real-time bidirectional sync with your 5-agent GTM harnesses.
              </p>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {selectedIntegration.name} API Key / Access Token
                </label>
                <input
                  type="password"
                  placeholder="sk_live_..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-obsidian-750 text-slate-200 focus:outline-none focus:border-brand-violet font-mono"
                />
              </div>

              <div className="p-3 rounded-lg bg-white border border-paper-200 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Security & Encryption:</div>
                <div>All keys are encrypted at rest using AWS KMS (AES-256) and never stored in client bundles.</div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedIntegration(null)}
                className="px-4 py-2 rounded-lg bg-paper-100 hover:bg-obsidian-750 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveModal}
                disabled={isConnecting}
                className="px-4 py-2 rounded-lg bg-brand-violet text-ink font-bold text-xs hover:brightness-110 shadow-glow-violet transition-all"
              >
                {isConnecting ? 'Verifying Key...' : 'Save & Connect'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
