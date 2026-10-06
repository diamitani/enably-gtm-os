import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Download, 
  Upload, 
  Check, 
  Star, 
  Sparkles, 
  Cpu, 
  Workflow, 
  BookOpen, 
  Share2, 
  Database, 
  BarChart3, 
  PhoneCall, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { INITIAL_PLUGINS } from '../lib/plugins-store';
import { PluginPack, Phase5D } from '../types';

interface MarketplaceViewProps {
  onInstallPlugin: (plugin: PluginPack) => void;
  onOpenByokModal: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onInstallPlugin, onOpenByokModal }) => {
  const [plugins, setPlugins] = useState<PluginPack[]>(INITIAL_PLUGINS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlugin, setSelectedPlugin] = useState<PluginPack | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadManifestText, setUploadManifestText] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const categories = ['All', 'Strategy', 'Automation', 'Outreach', 'RevOps', 'Analytics'];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || plugin.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleInstall = (pluginId: string) => {
    setPlugins(prev => prev.map(p => {
      if (p.id === pluginId) {
        const updated = { ...p, isInstalled: !p.isInstalled };
        if (updated.isInstalled) {
          onInstallPlugin(updated);
        }
        return updated;
      }
      return p;
    }));
  };

  const handleDownloadPlugin = (plugin: PluginPack) => {
    const blob = new Blob([plugin.manifestYaml], { type: 'application/x-yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plugin.id}.manifest.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUploadPlugin = () => {
    if (!uploadManifestText.trim()) return;
    try {
      const newPlugin: PluginPack = {
        id: `custom-plugin-${Date.now().toString(36)}`,
        name: 'Custom Imported GTM Agent Pack',
        version: '1.0.0',
        category: 'Strategy',
        description: 'Custom agent manifest imported directly into your workspace runtime.',
        author: 'Workspace Custom',
        installs: 1,
        rating: 5.0,
        phase: 'development',
        icon: 'Cpu',
        tags: ['Custom', 'Imported', 'ROSTR v2'],
        isInstalled: true,
        manifestYaml: uploadManifestText
      };
      setPlugins(prev => [newPlugin, ...prev]);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setUploadManifestText('');
      }, 1500);
    } catch (e) {
      alert('Invalid YAML manifest.');
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-obsidian-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            <Store className="h-4 w-4" />
            <span>Agent Ecosystem & Extensions</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            GTM Plugin & Agent Pack Store
          </h1>
          <p className="text-xs text-obsidian-400 mt-1">
            Install, download, and configure portable ROSTR v2 agents, n8n workflows, and MCP tool bridges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 rounded-xl border border-obsidian-700 bg-obsidian-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-obsidian-800 hover:border-obsidian-600 transition-colors"
          >
            <Upload className="h-3.5 w-3.5 text-brand-cyan" />
            <span>Upload Custom Pack</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, skills, n8n nodes..."
            className="w-full rounded-xl border border-obsidian-700 bg-obsidian-900 pl-10 pr-4 py-2 text-xs text-white placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-brand-cyan text-obsidian-950 font-bold'
                  : 'bg-obsidian-900 text-obsidian-400 hover:text-white border border-obsidian-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Plugin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <div
            key={plugin.id}
            className="rounded-2xl border border-obsidian-800 bg-obsidian-900/50 p-6 flex flex-col justify-between shadow-glass-card hover:border-brand-cyan/40 transition-all hover:-translate-y-1 group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan group-hover:scale-105 transition-transform">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {plugin.name}
                    </h3>
                    <p className="text-[11px] text-obsidian-400 font-mono">v{plugin.version} • {plugin.author}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-obsidian-300 leading-relaxed">
                {plugin.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {plugin.tags.map((tag) => (
                  <span key={tag} className="rounded bg-obsidian-950 px-2 py-0.5 text-[10px] font-mono text-obsidian-400 border border-obsidian-800">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-obsidian-400 pt-2 border-t border-obsidian-800">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-white">{plugin.rating}</span>
                  <span className="text-[10px]">({plugin.installs} installs)</span>
                </div>
                <span className="font-mono text-[10px] text-brand-emerald uppercase font-bold">Phase: {plugin.phase}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-obsidian-800">
              <button
                onClick={() => toggleInstall(plugin.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                  plugin.isInstalled
                    ? 'bg-obsidian-800 text-brand-emerald border border-brand-emerald/30'
                    : 'bg-brand-cyan text-obsidian-950 font-bold hover:bg-brand-cyan/90 shadow-glow-cyan'
                }`}
              >
                {plugin.isInstalled ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Installed</span>
                  </>
                ) : (
                  <span>Install Pack</span>
                )}
              </button>

              <button
                onClick={() => handleDownloadPlugin(plugin)}
                className="rounded-xl border border-obsidian-700 bg-obsidian-800 p-2.5 text-obsidian-300 hover:text-white hover:border-obsidian-600 transition-colors"
                title="Download YAML Manifest"
              >
                <Download className="h-4 w-4" />
              </button>

              <button
                onClick={() => setSelectedPlugin(plugin)}
                className="rounded-xl border border-obsidian-700 bg-obsidian-800 px-3 py-2.5 text-xs font-medium text-obsidian-300 hover:text-white hover:border-obsidian-600 transition-colors"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Plugin Modal */}
      {selectedPlugin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-obsidian-700 bg-obsidian-900 p-6 space-y-4 shadow-glass-card">
            <div className="flex items-center justify-between pb-3 border-b border-obsidian-800">
              <div className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-brand-cyan" />
                <h3 className="text-base font-bold text-white">{selectedPlugin.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPlugin(null)}
                className="text-obsidian-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-obsidian-300">{selectedPlugin.description}</p>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-obsidian-400">ROSTR v2 Manifest Schema (YAML):</span>
              <pre className="text-[11px] font-mono text-obsidian-200 bg-obsidian-950 p-4 rounded-xl border border-obsidian-800 max-h-60 overflow-y-auto">
                {selectedPlugin.manifestYaml}
              </pre>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-obsidian-800">
              <button
                onClick={() => handleDownloadPlugin(selectedPlugin)}
                className="flex items-center gap-1.5 rounded-xl border border-obsidian-700 bg-obsidian-800 px-4 py-2 text-xs font-semibold text-white hover:bg-obsidian-700"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Manifest</span>
              </button>
              <button
                onClick={() => setSelectedPlugin(null)}
                className="rounded-xl bg-brand-cyan px-5 py-2 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Custom Manifest Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-xl rounded-2xl border border-obsidian-700 bg-obsidian-900 p-6 space-y-4 shadow-glass-card">
            <div className="flex items-center justify-between pb-3 border-b border-obsidian-800">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-brand-cyan" />
                <h3 className="text-base font-bold text-white">Import Custom ROSTR Agent Pack</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-obsidian-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-obsidian-400">
              Paste your <code className="text-brand-cyan">rostr.ai/v2</code> YAML agent manifest below to register it into your workspace runtime.
            </p>

            <textarea
              value={uploadManifestText}
              onChange={(e) => setUploadManifestText(e.target.value)}
              rows={8}
              placeholder={`apiVersion: rostr.ai/v2\nkind: AgentPack\nmetadata:\n  id: custom-agent-pack\n  name: Custom GTM Agent\n  version: 1.0.0`}
              className="w-full rounded-xl border border-obsidian-700 bg-obsidian-950 p-3.5 font-mono text-xs text-white placeholder-obsidian-600 focus:border-brand-cyan focus:outline-none"
            />

            {uploadSuccess && (
              <div className="flex items-center gap-2 text-xs text-brand-emerald font-semibold">
                <Check className="h-4 w-4" />
                <span>Agent Pack validated and registered successfully!</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-obsidian-800">
              <button
                onClick={() => setShowUploadModal(false)}
                className="rounded-xl border border-obsidian-700 bg-obsidian-800 px-4 py-2 text-xs font-semibold text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadPlugin}
                disabled={!uploadManifestText.trim()}
                className="rounded-xl bg-brand-cyan px-5 py-2 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 disabled:opacity-50"
              >
                Validate & Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
