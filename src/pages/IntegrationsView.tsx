import React, { useState } from 'react';
import { 
  Plug, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Layers, 
  Key, 
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface IntegrationItem {
  id: string;
  name: string;
  category: 'CRM' | 'Enrichment' | 'Orchestration' | 'Outreach' | 'Voice' | 'Payments';
  description: string;
  connected: boolean;
  icon: string;
  authType: 'OAuth2' | 'API Key' | 'Webhook Token';
}

const INITIAL_INTEGRATIONS: IntegrationItem[] = [
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    category: 'CRM',
    description: 'Bidirectional sync for contacts, company properties, and lead deduplication shield.',
    connected: true,
    icon: 'Database',
    authType: 'OAuth2'
  },
  {
    id: 'n8n',
    name: 'n8n Self-Hosted & Cloud',
    category: 'Orchestration',
    description: 'Autonomous webhook trigger ingest and 5-pillar outbound execution.',
    connected: true,
    icon: 'Workflow',
    authType: 'Webhook Token'
  },
  {
    id: 'clay',
    name: 'Clay Data Waterfall',
    category: 'Enrichment',
    description: 'Cascade enrichment with Apollo, Hunter, Findymail, and BuiltWith scraping.',
    connected: true,
    icon: 'Layers',
    authType: 'API Key'
  },
  {
    id: 'smartlead',
    name: 'Smartlead.ai & Instantly',
    category: 'Outreach',
    description: 'Automated sequencer lead enrollment and mailbox warmup monitoring.',
    connected: true,
    icon: 'Mail',
    authType: 'API Key'
  },
  {
    id: 'signalwire',
    name: 'SignalWire Voice API',
    category: 'Voice',
    description: 'Low-latency WebRTC and phone AI agent for 90-second prospect qualification.',
    connected: false,
    icon: 'PhoneCall',
    authType: 'API Key'
  },
  {
    id: 'stripe',
    name: 'Stripe Billing & Subscriptions',
    category: 'Payments',
    description: 'PCI SAQ-A compliant checkout sessions, customer portal, and webhook verification.',
    connected: true,
    icon: 'Lock',
    authType: 'OAuth2'
  },
  {
    id: 'slack',
    name: 'Slack GTM Notifications',
    category: 'Orchestration',
    description: 'Instant alerts on meeting bookings, deliverability warnings, and agent runs.',
    connected: true,
    icon: 'Sparkles',
    authType: 'OAuth2'
  },
  {
    id: 'vercel_ai',
    name: 'Vercel AI Gateway & SDK',
    category: 'Orchestration',
    description: 'Unified multi-model streaming router with BYOK key vault and prompt caching.',
    connected: true,
    icon: 'Key',
    authType: 'API Key'
  }
];

export const IntegrationsView: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(INITIAL_INTEGRATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'CRM', 'Enrichment', 'Orchestration', 'Outreach', 'Voice', 'Payments'];

  const filteredIntegrations = integrations.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, connected: !item.connected };
      }
      return item;
    }));
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-obsidian-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            <Plug className="h-4 w-4" />
            <span>Integrations & Connectors Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Connected GTM Platforms & APIs
          </h1>
          <p className="text-xs text-obsidian-400 mt-1">
            Manage your CRM, enrichment providers, sequencer webhooks, and AI gateway connections.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-brand-emerald/30 bg-brand-emerald/10 px-3.5 py-2 text-xs font-semibold text-brand-emerald font-mono">
          <ShieldCheck className="h-4 w-4" />
          <span>Encrypted with AES-256</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-brand-cyan text-obsidian-950 font-bold'
                : 'bg-obsidian-900 text-obsidian-400 hover:text-white border border-obsidian-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-6 flex flex-col justify-between shadow-glass-card hover:border-brand-cyan/40 transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded bg-obsidian-800 px-2 py-0.5 text-[10px] font-mono text-brand-cyan uppercase">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-obsidian-400">{item.authType}</span>
              </div>

              <h3 className="text-base font-bold text-white">{item.name}</h3>
              <p className="text-xs text-obsidian-400 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-obsidian-800">
              <span className={`flex items-center gap-1.5 text-xs font-mono font-semibold ${
                item.connected ? 'text-brand-emerald' : 'text-obsidian-500'
              }`}>
                <span className={`h-2 w-2 rounded-full ${item.connected ? 'bg-brand-emerald animate-pulse' : 'bg-obsidian-600'}`}></span>
                {item.connected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>

              <button
                onClick={() => toggleConnection(item.id)}
                className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors ${
                  item.connected
                    ? 'bg-obsidian-800 text-obsidian-300 hover:bg-obsidian-700'
                    : 'bg-brand-cyan text-obsidian-950 font-bold hover:bg-brand-cyan/90'
                }`}
              >
                {item.connected ? 'Configure' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
