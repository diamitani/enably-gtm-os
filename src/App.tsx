import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { MarketingView } from './pages/MarketingView';
import { StudioView } from './pages/StudioView';
import { MarketplaceView } from './pages/MarketplaceView';
import { AcademyView } from './pages/AcademyView';
import { CrmView } from './pages/CrmView';
import { DashboardView } from './pages/DashboardView';
import { IntegrationsView } from './pages/IntegrationsView';
import { SettingsView } from './pages/SettingsView';
import { WorkspaceConfig, PluginPack } from './types';
import { INITIAL_PLUGINS } from './lib/plugins-store';
import { Key, ShieldCheck, Check } from 'lucide-react';

const INITIAL_WORKSPACE: WorkspaceConfig = {
  id: 'ws-enably-primary',
  name: '6th Agent Alpha Workspace',
  slug: 'enably-alpha',
  plan: 'Professional',
  seats: 5,
  creditsUsed: 1420,
  creditsLimit: 5000,
  byokKeys: {
    openai: 'sk-proj-••••••••••••••••••••••••••••',
    anthropic: 'sk-ant-••••••••••••••••••••••••••••',
    gemini: 'AIzaSy••••••••••••••••••••••••••••'
  },
  members: [
    {
      id: 'usr-1',
      name: 'Patrick Diamitani',
      email: 'patrick@6thagent.ai',
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    },
    {
      id: 'usr-2',
      name: 'Sarah Chen',
      email: 'sarah@6thagent.ai',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ]
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('marketing');
  const [workspace, setWorkspace] = useState<WorkspaceConfig>(INITIAL_WORKSPACE);
  const [plugins, setPlugins] = useState<PluginPack[]>(INITIAL_PLUGINS);
  const [studioPrompt, setStudioPrompt] = useState<string>('');
  const [showByokModal, setShowByokModal] = useState<boolean>(false);
  const [tempOpenAiKey, setTempOpenAiKey] = useState<string>(workspace.byokKeys.openai || '');
  const [tempClaudeKey, setTempClaudeKey] = useState<string>(workspace.byokKeys.anthropic || '');
  const [keySaved, setKeySaved] = useState<boolean>(false);

  const installedCount = plugins.filter(p => p.isInstalled).length;

  const handleLaunchStudioWithPrompt = (prompt?: string) => {
    if (prompt) setStudioPrompt(prompt);
    setCurrentView('studio');
  };

  const handleInstallPlugin = (plugin: PluginPack) => {
    setPlugins(prev => prev.map(p => p.id === plugin.id ? { ...p, isInstalled: true } : p));
  };

  const handleSaveByok = () => {
    setWorkspace(prev => ({
      ...prev,
      byokKeys: {
        ...prev.byokKeys,
        openai: tempOpenAiKey,
        anthropic: tempClaudeKey
      }
    }));
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowByokModal(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink selection:bg-accent/20 selection:text-accent">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        workspace={workspace}
        onOpenByokModal={() => setShowByokModal(true)}
      />

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (shown on desktop except for marketing view when desired, or across all) */}
        {currentView !== 'marketing' && (
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            installedCount={installedCount}
          />
        )}

        {/* View Router */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'marketing' && (
            <MarketingView
              onLaunchStudio={handleLaunchStudioWithPrompt}
              setCurrentView={setCurrentView}
            />
          )}

          {currentView === 'studio' && (
            <StudioView
              initialPrompt={studioPrompt}
              onOpenByokModal={() => setShowByokModal(true)}
            />
          )}

          {currentView === 'marketplace' && (
            <MarketplaceView
              onInstallPlugin={handleInstallPlugin}
              onOpenByokModal={() => setShowByokModal(true)}
            />
          )}

          {currentView === 'crm' && (
            <CrmView onDirectToStudio={handleLaunchStudioWithPrompt} />
          )}

          {currentView === 'academy' && (
            <AcademyView />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              onDirectToStudio={handleLaunchStudioWithPrompt}
              setCurrentView={setCurrentView}
            />
          )}

          {currentView === 'integrations' && (
            <IntegrationsView />
          )}

          {currentView === 'settings' && (
            <SettingsView
              workspace={workspace}
              onUpdateWorkspace={setWorkspace}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      {currentView === 'marketing' && <Footer setCurrentView={setCurrentView} />}

      {/* BYOK / AI Gateway Modal */}
      {showByokModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg card p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-paper-200">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-accent" />
                <h3 className="text-base font-bold text-ink">Configure BYOK AI Gateway</h3>
              </div>
              <button
                onClick={() => setShowByokModal(false)}
                className="text-ink-soft hover:text-ink text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-ink-soft leading-relaxed">
              Connect your private API keys. Requests route directly through Vercel AI Gateway with AES-256 client-side masking and zero server-side retention.
            </p>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="label">OpenAI API Key (GPT-4o / O3)</label>
                <input
                  type="password"
                  value={tempOpenAiKey}
                  onChange={(e) => setTempOpenAiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="field font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="label">Anthropic Claude API Key (Claude 3.7 / 3.5)</label>
                <input
                  type="password"
                  value={tempClaudeKey}
                  onChange={(e) => setTempClaudeKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="field font-mono"
                />
              </div>
            </div>

            {keySaved && (
              <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                <Check className="h-4 w-4" />
                <span>Keys safely encrypted and connected!</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-paper-200">
              <button
                onClick={() => setShowByokModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveByok}
                className="btn-accent shadow-glow-cyan"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
