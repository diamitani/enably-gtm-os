import React, { useState } from 'react';
import { ViewMode, AgentId, Artifact } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OverviewView } from './components/views/OverviewView';
import { GtmStudioView } from './components/views/GtmStudioView';
import { ConsoleView } from './components/views/ConsoleView';
import { IntegrationsView } from './components/views/IntegrationsView';
import { SettingsView } from './components/views/SettingsView';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>('enably_master');
  const [selectedModel, setSelectedModel] = useState<string>('Claude 3.7 Sonnet');
  const [activeWorkspace, setActiveWorkspace] = useState<string>('Acme Growth Inc.');

  // Workspace Saved Artifacts Library
  const [artifacts, setArtifacts] = useState<Artifact[]>([
    {
      id: 'art-init-1',
      title: 'Tier-1 ICP Matrix: Enterprise B2B SaaS',
      type: 'icp_matrix',
      agentId: 'enably_icp',
      createdAt: new Date().toISOString(),
      version: 'v1.0.0',
      content: `# Tier-1 Ideal Customer Profile (ICP)\n\n- Target: Enterprise Cloud Infrastructure (150-1,000 FTEs)\n- Target ACV: $45,000\n- Primary Trigger: Cloud migration & SOC2 compliance renewal.`,
      tags: ['ICP', 'Series-B', 'Enterprise'],
    },
    {
      id: 'art-init-2',
      title: 'MEDDPICC Sales Playbook & Kill Sheets',
      type: 'sales_playbook',
      agentId: 'enably_playbook',
      createdAt: new Date().toISOString(),
      version: 'v1.0.0',
      content: `# Sales Methodology Playbook\n\n- Discovery Stage: Uncover cost of manual audit ticketing.\n- Competitive Kill-Shot: Zero-agent architecture vs legacy daemons.`,
      tags: ['Playbook', 'MEDDPICC', 'Sales Enablement'],
    },
  ]);

  const handleSaveArtifact = (artifact: Artifact) => {
    setArtifacts((prev) => [artifact, ...prev]);
  };

  const handleDeleteArtifact = (id: string) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col justify-between selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Background Matrix & Subtle Gradient Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-subtle-grid opacity-30"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand-cyan/5 via-brand-blue/5 to-transparent blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Global Navigation Header */}
        <Navbar
          currentView={currentView}
          onViewChange={setCurrentView}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          activeWorkspace={activeWorkspace}
          onWorkspaceChange={setActiveWorkspace}
        />

        {/* Dynamic View Routing */}
        <main className="flex-1">
          {currentView === 'overview' && (
            <OverviewView
              onViewChange={setCurrentView}
              onSelectAgent={(agentId) => {
                setSelectedAgentId(agentId);
                setCurrentView('studio');
              }}
            />
          )}

          {currentView === 'studio' && (
            <GtmStudioView
              selectedAgentId={selectedAgentId}
              onSelectAgent={setSelectedAgentId}
              onSaveArtifact={handleSaveArtifact}
            />
          )}

          {currentView === 'console' && (
            <ConsoleView onSaveArtifact={handleSaveArtifact} />
          )}

          {currentView === 'integrations' && <IntegrationsView />}

          {currentView === 'settings' && (
            <SettingsView
              artifacts={artifacts}
              onDeleteArtifact={handleDeleteArtifact}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer onViewChange={setCurrentView} />
      </div>
    </div>
  );
}

export default App;
