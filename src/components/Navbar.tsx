import React, { useState } from 'react';
import { Key, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './brand/Logo';
import { WorkspaceConfig } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  workspace: WorkspaceConfig;
  onOpenByokModal: () => void;
}

const MARKETING_LINKS = [
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'academy', label: 'Academy' },
  { id: 'crm', label: 'Directory' },
  { id: 'dashboard', label: 'Dashboard' },
];

const APP_LINKS = [
  { id: 'dashboard', label: 'Home' },
  { id: 'studio', label: 'Agent Chat' },
  { id: 'crm', label: 'Directory' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'academy', label: 'Academy' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'settings', label: 'Settings' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  workspace,
  onOpenByokModal,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMarketing = currentView === 'marketing';
  const creditPct = Math.min(100, Math.round((workspace.creditsUsed / workspace.creditsLimit) * 100));
  const links = isMarketing ? MARKETING_LINKS : APP_LINKS;

  const go = (id: string) => {
    setCurrentView(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-paper-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
        <button
          id="nav-home"
          onClick={() => go('marketing')}
          aria-label="6th Agent home"
          className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        >
          <Logo size="sm" showTagline={false} />
        </button>

        {/* Marketing links (desktop) */}
        {isMarketing && (
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <button
                key={l.id}
                id={`nav-${l.id}`}
                onClick={() => go(l.id)}
                className="rounded-full px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:bg-paper-50 hover:text-ink"
              >
                {l.label}
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {isMarketing ? (
            <>
              <button
                id="nav-signin"
                onClick={() => go('dashboard')}
                className="hidden rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink sm:block"
              >
                Sign in
              </button>
              <button
                id="nav-start"
                onClick={() => go('studio')}
                className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform hover:bg-ink-soft active:scale-[0.98]"
              >
                Start free
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-paper-200 bg-paper-50/70 py-1.5 pl-3 pr-4 md:flex">
                <span className="max-w-[160px] truncate text-xs font-medium text-ink">{workspace.name}</span>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent">
                  {workspace.plan}
                </span>
                <div className="flex items-center gap-2" title={`${workspace.creditsUsed} of ${workspace.creditsLimit} credits used`}>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-paper-200">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${creditPct}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-ink-soft">{creditPct}%</span>
                </div>
              </div>
              <button
                id="nav-byok"
                onClick={onOpenByokModal}
                className="btn-secondary !px-3.5 !py-2 !text-xs"
              >
                <Key className="h-3.5 w-3.5 text-accent" />
                <span className="hidden sm:inline">AI Gateway</span>
              </button>
            </>
          )}

          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="rounded-lg p-2 text-ink-soft hover:text-ink md:hidden lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile" className="border-t border-paper-200 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                currentView === l.id ? 'bg-paper-50 text-ink' : 'text-ink-soft'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
