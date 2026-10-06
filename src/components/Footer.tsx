import React from 'react';
import { Logo } from './brand/Logo';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Agent Chat', view: 'studio' },
      { label: 'Dashboard', view: 'dashboard' },
      { label: 'Directory & CRM', view: 'crm' },
      { label: 'Integrations', view: 'integrations' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Marketplace', view: 'marketplace' },
      { label: 'Academy', view: 'academy' },
      { label: 'Settings', view: 'settings' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Security', href: '/security' },
      { label: 'Contact', href: 'mailto:hello@6thagent.ai' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="border-t border-obsidian-800/80 bg-obsidian-950">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo size="sm" />
          <p className="max-w-xs text-sm leading-relaxed text-obsidian-400">
            Specialist AI agents that plan, research and run your go-to-market, with you approving every move.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {'view' in link && link.view ? (
                    <button
                      onClick={() => {
                        setCurrentView(link.view);
                        window.scrollTo({ top: 0 });
                      }}
                      className="text-sm text-obsidian-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={(link as { href: string }).href} className="text-sm text-obsidian-400 transition-colors hover:text-white">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-obsidian-900">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-6 text-xs text-obsidian-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} 6th Agent. All rights reserved.</span>
          <span className="font-mono">Built on Vercel AI SDK · Supabase · Stripe</span>
        </div>
      </div>
    </footer>
  );
};
