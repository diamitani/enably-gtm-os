import React from 'react';
import { ViewMode } from '../../types';
import { 
  Sparkles, 
  Terminal, 
  Grid, 
  Cpu, 
  Settings, 
  ChevronDown, 
  ShieldCheck, 
  Zap,
  Building2,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  activeWorkspace: string;
  onWorkspaceChange: (ws: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  selectedModel,
  onModelChange,
  activeWorkspace,
  onWorkspaceChange,
}) => {
  const [modelMenuOpen, setModelMenuOpen] = React.useState(false);
  const [wsMenuOpen, setWsMenuOpen] = React.useState(false);

  const models = [
    { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', badge: 'Bedrock Default' },
    { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', badge: 'Ultra Fast' },
    { id: 'gemini-2-5-flash', name: 'Gemini 2.5 Flash', badge: 'Low Latency' },
    { id: 'byok-custom', name: 'BYOK Gateway', badge: 'Enterprise' },
  ];

  const workspaces = [
    { id: 'acme-growth', name: 'Acme Growth Inc.', plan: 'Enterprise' },
    { id: 'apex-cyber', name: 'Apex Cybersecurity', plan: 'Growth' },
    { id: 'stealth-ai', name: 'Stealth AI Labs', plan: 'Founder' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-[68px] card border-b border-paper-300/60 bg-white/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Workspace */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => onViewChange('overview')} 
            className="flex items-center space-x-2.5 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet p-[1px] shadow-glow-accent">
              <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-ink text-base">Enably</span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-brand-cyan/20">
                  GTM OS
                </span>
              </div>
            </div>
          </button>

          {/* Workspace Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => {
                setWsMenuOpen(!wsMenuOpen);
                setModelMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-2.5 py-1.5 rounded-md bg-obsidian-850 hover:bg-paper-100 border border-paper-300/60 text-xs text-slate-300 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">{activeWorkspace}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {wsMenuOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-56 rounded-lg card bg-paper-50 border border-paper-300 shadow-2xl p-1.5 z-50">
                <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Active Workspaces
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      onWorkspaceChange(ws.name);
                      setWsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs text-left transition-colors ${
                      activeWorkspace === ws.name 
                        ? 'bg-accent/15 text-accent font-medium' 
                        : 'text-slate-300 hover:bg-paper-100'
                    }`}
                  >
                    <span>{ws.name}</span>
                    <span className="text-[10px] px-1 rounded bg-paper-100 text-slate-400">{ws.plan}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-paper-50/90 p-1 rounded-lg border border-paper-300/60">
          <button
            onClick={() => onViewChange('overview')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'overview'
                ? 'bg-paper-100 text-ink shadow-sm border border-paper-300/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850/50'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => onViewChange('studio')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'studio'
                ? 'bg-accent/15 text-accent shadow-sm border border-brand-cyan/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>GTM Studio (5 Agents)</span>
          </button>

          <button
            onClick={() => onViewChange('console')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'console'
                ? 'bg-brand-blue/15 text-brand-blue shadow-sm border border-brand-blue/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Agent Console</span>
          </button>

          <button
            onClick={() => onViewChange('integrations')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'integrations'
                ? 'bg-brand-violet/15 text-brand-violet shadow-sm border border-brand-violet/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850/50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => onViewChange('settings')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'settings'
                ? 'bg-paper-100 text-ink shadow-sm border border-paper-300/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-850/50'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>BYOK & Settings</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Active Harness Status Beacon */}
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-brand-emerald/20 text-[11px] text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono">5 Harnesses Live</span>
          </div>

          {/* Model Gateway Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setModelMenuOpen(!modelMenuOpen);
                setWsMenuOpen(false);
              }}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-obsidian-850 hover:bg-paper-100 border border-paper-300/60 text-xs text-slate-200 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline font-mono">{selectedModel}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {modelMenuOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-64 rounded-lg card bg-paper-50 border border-paper-300 shadow-2xl p-1.5 z-50">
                <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Select Agent Gateway
                </div>
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onModelChange(m.name);
                      setModelMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs text-left transition-colors ${
                      selectedModel.includes(m.name) 
                        ? 'bg-accent/15 text-accent font-medium' 
                        : 'text-slate-300 hover:bg-paper-100'
                    }`}
                  >
                    <span>{m.name}</span>
                    <span className="text-[10px] px-1 rounded bg-paper-100 text-slate-400 font-mono">{m.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <button
            onClick={() => onViewChange('studio')}
            className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-brand-cyan to-brand-blue text-ink font-semibold text-xs hover:brightness-110 shadow-glow-accent transition-all"
          >
            Launch Studio
          </button>
        </div>
      </div>
    </header>
  );
};
