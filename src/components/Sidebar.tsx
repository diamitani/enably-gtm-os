import React from 'react';
import {
  LayoutDashboard,
  MessagesSquare,
  Users,
  Store,
  GraduationCap,
  Plug,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  installedCount: number;
}

const GROUPS = [
  {
    label: 'Workspace',
    items: [
      { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
      { id: 'studio', label: 'Agent Chat', icon: MessagesSquare },
      { id: 'crm', label: 'Directory & CRM', icon: Users },
    ],
  },
  {
    label: 'Build',
    items: [
      { id: 'marketplace', label: 'Marketplace', icon: Store },
      { id: 'academy', label: 'Academy', icon: GraduationCap },
      { id: 'integrations', label: 'Integrations', icon: Plug },
    ],
  },
  {
    label: 'Account',
    items: [{ id: 'settings', label: 'Settings', icon: Settings }],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, installedCount }) => {
  return (
    <aside
      aria-label="App navigation"
      className="hidden w-60 shrink-0 flex-col border-r border-obsidian-800/80 bg-obsidian-950 px-3 py-6 md:flex"
    >
      <nav className="flex-1 space-y-6">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-3 pb-2 text-[11px] font-medium text-obsidian-500">{group.label}</div>
            <ul className="space-y-0.5">
              {group.items.map(({ id, label, icon: Icon }) => {
                const active = currentView === id;
                return (
                  <li key={id}>
                    <button
                      id={`sidebar-${id}`}
                      onClick={() => setCurrentView(id)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors active:scale-[0.98] ${
                        active
                          ? 'bg-obsidian-900 text-white shadow-[inset_0_0_0_1px_rgba(0,240,255,0.25)]'
                          : 'text-obsidian-400 hover:bg-obsidian-900/60 hover:text-obsidian-100'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${active ? 'text-brand-cyan' : ''}`} strokeWidth={1.75} />
                      <span className="flex-1 text-left">{label}</span>
                      {id === 'marketplace' && installedCount > 0 && (
                        <span className="rounded-full bg-obsidian-800 px-2 py-0.5 text-[10px] font-mono text-obsidian-300">
                          {installedCount}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-6 rounded-xl border border-obsidian-800 bg-obsidian-900/60 p-4">
        <div className="text-xs font-semibold text-white">Runtime healthy</div>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-obsidian-400">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
          Gateway, sandbox and memory online
        </div>
      </div>
    </aside>
  );
};
