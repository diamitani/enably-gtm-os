import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Settings, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Brain, 
  Lock, 
  Sparkles, 
  FileText, 
  Upload, 
  Check, 
  X, 
  ArrowRight, 
  Play, 
  Pause, 
  ShieldCheck, 
  Edit3, 
  ChevronRight,
  TrendingUp,
  Sliders,
  DollarSign,
  Zap,
  MessageSquare
} from 'lucide-react';
import { SEED_TEAMS, seedActivity, SKILLS, TOOLS, ROLES, MODELS, memberFromRole, uid } from '../lib/team-catalog';
import { AgentTeam, AgentMember, ToolAccess, KnowledgeSource } from '../types/team';

interface DashboardViewProps {
  onDirectToStudio: (prompt: string) => void;
  setCurrentView: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onDirectToStudio, setCurrentView }) => {
  const [teams, setTeams] = useState<AgentTeam[]>(SEED_TEAMS);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(SEED_TEAMS[0].id);
  const [activities, setActivities] = useState(seedActivity(SEED_TEAMS));
  
  // Modals & Edit Drawers
  const [editingAgent, setEditingAgent] = useState<AgentMember | null>(null);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState<boolean>(false);
  const [isHireMemberOpen, setIsHireMemberOpen] = useState<boolean>(false);
  const [showApprovalDrawer, setShowApprovalDrawer] = useState<boolean>(false);

  // New Team Form State
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDept, setNewTeamDept] = useState<'marketing' | 'sales' | 'support' | 'research'>('marketing');
  const [newTeamGoal, setNewTeamGoal] = useState('');

  // Selected Active Team
  const currentTeam = teams.find(t => t.id === selectedTeamId) || teams[0];

  const totalAgents = teams.reduce((acc, t) => acc + t.members.length, 0);
  const totalSpent = teams.reduce((acc, t) => acc + t.members.reduce((mAcc, m) => mAcc + m.spent, 0), 0);
  const pendingApprovals = activities.filter(a => a.kind === 'approval');

  // Helper to update an agent
  const handleSaveAgent = (updated: AgentMember) => {
    setTeams(prev => prev.map(team => {
      if (team.id === selectedTeamId) {
        const exists = team.members.some(m => m.id === updated.id);
        const members = exists 
          ? team.members.map(m => m.id === updated.id ? updated : m)
          : [...team.members, updated];
        return { ...team, members };
      }
      return team;
    }));
    setEditingAgent(null);
    setIsHireMemberOpen(false);
  };

  // Helper to create a new team
  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return;
    const initialRole = newTeamDept === 'marketing' ? 'cmo' : newTeamDept === 'sales' ? 'sdr' : 'support';
    const leader = memberFromRole(initialRole, 0);
    leader.status = 'active';

    const newTeam: AgentTeam = {
      id: uid('team'),
      name: newTeamName,
      department: newTeamDept,
      goal: newTeamGoal || 'Drive operational excellence.',
      members: [leader],
      createdAt: new Date().toISOString(),
      approvalPolicy: 'external_only',
    };

    setTeams(prev => [...prev, newTeam]);
    setSelectedTeamId(newTeam.id);
    setIsCreateTeamOpen(false);
    setNewTeamName('');
    setNewTeamGoal('');
  };

  const handleApproveAction = (actId: string) => {
    setActivities(prev => prev.map(a => a.id === actId ? { ...a, kind: 'done' } : a));
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 bg-white min-h-screen">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-paper-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mb-1 font-semibold">
            <Users className="h-4 w-4" />
            <span>Agent Squad Control Panel</span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink tracking-tight">
            Workspace Command Center
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Manage your AI teams, train members, configure tool permissions and govern executions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {pendingApprovals.length > 0 && (
            <button
              onClick={() => setShowApprovalDrawer(true)}
              className="flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
            >
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span>{pendingApprovals.length} Approval Pending</span>
            </button>
          )}

          <button
            onClick={() => setIsHireMemberOpen(true)}
            className="btn-secondary text-xs py-2 px-4"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Hire Agent Member</span>
          </button>

          <button
            onClick={() => setIsCreateTeamOpen(true)}
            className="btn-accent text-xs py-2 px-4 shadow-glow-cyan"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create New Team</span>
          </button>
        </div>
      </div>

      {/* TOP KPI STATS (THE MOAT METRICS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
            <span>Active Agent Teams</span>
            <Users className="h-4 w-4 text-accent" />
          </div>
          <div className="text-2xl font-extrabold text-ink">{teams.length} Squads</div>
          <div className="text-[11px] text-ink-faint mt-1">Managed Workspaces</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
            <span>Total Specialist Members</span>
            <Brain className="h-4 w-4 text-accent" />
          </div>
          <div className="text-2xl font-extrabold text-ink">{totalAgents} Members</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% Policy Compliant</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
            <span>Monthly Budget Used</span>
            <DollarSign className="h-4 w-4 text-accent" />
          </div>
          <div className="text-2xl font-extrabold text-ink">${totalSpent}</div>
          <div className="text-[11px] text-ink-faint mt-1">of $1,500 total quota</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
            <span>ROSTR Execution Layer</span>
            <Zap className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">Active</div>
          <div className="text-[11px] text-ink-faint mt-1">0 stalls / 0 failures</div>
        </div>
      </div>

      {/* TEAM SELECTOR TABS & GOAL BAR */}
      <div className="card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-paper-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTeamId(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedTeamId === t.id
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-paper-100 text-ink-muted hover:text-ink hover:bg-paper-200'
                }`}
              >
                <span>{t.name}</span>
                <span className={`chip text-[9px] ${selectedTeamId === t.id ? 'bg-white/20 text-white' : 'bg-paper-200 text-ink-muted'}`}>
                  {t.members.length}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="chip text-[11px] bg-accent-soft text-accent-ink border-accent-ring">
              Approval: {currentTeam.approvalPolicy.replace('_', ' ')}
            </span>
            <button
              onClick={() => setIsHireMemberOpen(true)}
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
            >
              + Add Member to {currentTeam.name}
            </button>
          </div>
        </div>

        {/* Team Details Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-paper-50 p-4 rounded-xl border border-paper-200">
          <div>
            <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Current Squad Goal</span>
            <div className="text-sm font-bold text-ink mt-0.5">{currentTeam.goal}</div>
          </div>
          <button
            onClick={() => onDirectToStudio(`Work on squad goal for ${currentTeam.name}: ${currentTeam.goal}`)}
            className="btn-accent text-xs py-2 px-4"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Open Chat Workbench for Team</span>
          </button>
        </div>

        {/* TEAM ROSTER MEMBER CARDS */}
        <div>
          <h3 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
            <span>Squad Member Roster</span>
            <span className="text-xs font-normal text-ink-muted">({currentTeam.members.length} members active)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTeam.members.map((member) => {
              const role = ROLES.find(r => r.id === member.roleId);
              const toolKeys = Object.keys(member.tools);

              return (
                <div key={member.id} className="card p-5 hover:shadow-float transition-all flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-ink text-white font-bold text-sm flex items-center justify-center shadow-sm">
                          {role?.initials || member.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-ink">{member.name}</div>
                          <div className="text-xs text-ink-muted">{member.title}</div>
                        </div>
                      </div>

                      <span className={`chip text-[10px] capitalize ${
                        member.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        member.status === 'training' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-paper-200 text-ink-muted'
                      }`}>
                        {member.status}
                      </span>
                    </div>

                    {/* System Instructions Summary */}
                    <div className="text-xs text-ink-muted bg-paper-50 p-3 rounded-lg border border-paper-200 line-clamp-2 leading-relaxed mb-4">
                      "{member.instructions}"
                    </div>

                    {/* Skills Chips */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] font-mono text-ink-faint uppercase">Assigned Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((sId) => {
                          const s = SKILLS.find(sk => sk.id === sId);
                          return (
                            <span key={sId} className="chip text-[10px] py-0.5 px-2 bg-paper-100 border-paper-200">
                              {s?.name || sId}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tools & Access Gates */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] font-mono text-ink-faint uppercase">Tools & Permissions</div>
                      <div className="flex flex-wrap gap-1.5">
                        {toolKeys.length === 0 ? (
                          <span className="text-[11px] text-ink-faint">No tool access granted</span>
                        ) : (
                          toolKeys.map((tId) => {
                            const access = member.tools[tId];
                            const toolDef = TOOLS.find(tl => tl.id === tId);
                            return (
                              <span
                                key={tId}
                                className={`chip text-[10px] py-0.5 px-2 font-mono ${
                                  access === 'approval' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                  access === 'write' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                  access === 'read' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                  'bg-paper-200 text-ink-muted'
                                }`}
                                title={`${toolDef?.name || tId}: ${access} mode`}
                              >
                                {toolDef?.name || tId} [{access}]
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Knowledge Docs */}
                    {member.knowledge.length > 0 && (
                      <div className="space-y-1 mb-4">
                        <div className="text-[10px] font-mono text-ink-faint uppercase">Knowledge Vault</div>
                        {member.knowledge.map((k) => (
                          <div key={k.id} className="flex items-center gap-1.5 text-[11px] text-ink-soft">
                            <FileText className="h-3 w-3 text-accent" />
                            <span className="truncate">{k.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Stats & Configure Button */}
                  <div className="pt-3 border-t border-paper-200 flex items-center justify-between mt-2">
                    <div className="text-[11px] text-ink-faint">
                      <span>${member.spent} spent</span> · <span className="font-semibold text-ink">{member.tasksDone} tasks</span>
                    </div>

                    <button
                      onClick={() => setEditingAgent(member)}
                      className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      <span>Configure</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY LOG */}
      <div className="card p-6">
        <h3 className="text-sm font-bold text-ink mb-4">Team Execution Activity (ROSTR Log)</h3>
        <div className="divide-y divide-paper-200 text-xs">
          {activities.map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${
                  act.kind === 'done' ? 'bg-emerald-500' :
                  act.kind === 'approval' ? 'bg-amber-500 animate-pulse' :
                  act.kind === 'running' ? 'bg-accent animate-pulse' : 'bg-rose-500'
                }`} />
                <div>
                  <span className="font-bold text-ink">{act.action}: </span>
                  <span className="text-ink-soft">{act.target}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {act.kind === 'approval' && (
                  <button
                    onClick={() => handleApproveAction(act.id)}
                    className="btn-accent py-1 px-3 text-[11px]"
                  >
                    Approve Action
                  </button>
                )}
                <span className="text-ink-faint font-mono text-[11px]">{act.at}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: EDIT / CONFIGURE AGENT MEMBER */}
      {editingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl card p-6 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-float">
            <div className="flex items-center justify-between pb-3 border-b border-paper-200">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                <h3 className="text-base font-bold text-ink">Configure Agent Member: {editingAgent.name}</h3>
              </div>
              <button onClick={() => setEditingAgent(null)} className="text-ink-muted hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Agent Name</label>
                  <input
                    type="text"
                    value={editingAgent.name}
                    onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                    className="field"
                  />
                </div>
                <div>
                  <label className="label">Title / Role</label>
                  <input
                    type="text"
                    value={editingAgent.title}
                    onChange={(e) => setEditingAgent({ ...editingAgent, title: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label className="label">System Instructions & Persona</label>
                <textarea
                  rows={3}
                  value={editingAgent.instructions}
                  onChange={(e) => setEditingAgent({ ...editingAgent, instructions: e.target.value })}
                  className="field font-sans"
                />
              </div>

              {/* Skills Selector */}
              <div>
                <label className="label">Assigned Skills</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SKILLS.map((sk) => {
                    const isSelected = editingAgent.skills.includes(sk.id);
                    return (
                      <button
                        key={sk.id}
                        type="button"
                        onClick={() => {
                          const skills = isSelected 
                            ? editingAgent.skills.filter(s => s !== sk.id)
                            : [...editingAgent.skills, sk.id];
                          setEditingAgent({ ...editingAgent, skills });
                        }}
                        className={`p-2 rounded-xl text-left border text-xs transition-all ${
                          isSelected ? 'border-accent bg-accent-soft/40 font-semibold text-accent-ink' : 'border-paper-200 bg-paper-50 text-ink-muted'
                        }`}
                      >
                        <div className="font-bold">{sk.name}</div>
                        <div className="text-[10px] text-ink-faint truncate">{sk.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tools & Permissions Matrix */}
              <div>
                <label className="label">Tool Access Permissions</label>
                <div className="space-y-2 border border-paper-200 rounded-xl p-3 bg-paper-50">
                  {TOOLS.slice(0, 6).map((tl) => {
                    const currentAccess: ToolAccess = editingAgent.tools[tl.id] || 'off';
                    return (
                      <div key={tl.id} className="flex items-center justify-between text-xs py-1 border-b border-paper-200 last:border-0">
                        <div>
                          <span className="font-bold text-ink">{tl.name}</span>
                          <span className="text-ink-faint ml-2 text-[10px]">({tl.category})</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {(['off', 'read', 'write', 'approval'] as ToolAccess[]).map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => {
                                const tools = { ...editingAgent.tools, [tl.id]: mode };
                                setEditingAgent({ ...editingAgent, tools });
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-mono capitalize ${
                                currentAccess === mode
                                  ? mode === 'approval' ? 'bg-amber-600 text-white font-bold' :
                                    mode === 'write' ? 'bg-blue-600 text-white font-bold' :
                                    mode === 'read' ? 'bg-emerald-600 text-white font-bold' :
                                    'bg-ink text-white font-bold'
                                  : 'bg-paper-200 text-ink-muted hover:bg-paper-300'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-paper-200">
              <button onClick={() => setEditingAgent(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={() => handleSaveAgent(editingAgent)} className="btn-accent shadow-glow-cyan">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HIRE NEW MEMBER */}
      {isHireMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg card p-6 space-y-5 shadow-float">
            <div className="flex items-center justify-between pb-3 border-b border-paper-200">
              <h3 className="text-base font-bold text-ink">Hire Agent Member to {currentTeam.name}</h3>
              <button onClick={() => setIsHireMemberOpen(false)} className="text-ink-muted hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-ink-muted">Select a role template to add to your team.</p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {ROLES.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    const newM = memberFromRole(r.id, currentTeam.members.length);
                    handleSaveAgent(newM);
                  }}
                  className="p-3 rounded-xl border border-paper-200 hover:border-accent hover:bg-accent-soft/30 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-ink">{r.title}</div>
                    <div className="text-[11px] text-ink-muted">{r.summary}</div>
                  </div>
                  <span className="btn-accent text-[11px] py-1 px-3">Hire</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE TEAM */}
      {isCreateTeamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md card p-6 space-y-5 shadow-float">
            <div className="flex items-center justify-between pb-3 border-b border-paper-200">
              <h3 className="text-base font-bold text-ink">Create New Agent Squad</h3>
              <button onClick={() => setIsCreateTeamOpen(false)} className="text-ink-muted hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="label">Squad / Team Name</label>
                <input
                  type="text"
                  placeholder="e.g. Content Marketing Cell"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="field"
                />
              </div>

              <div>
                <label className="label">Department</label>
                <select
                  value={newTeamDept}
                  onChange={(e) => setNewTeamDept(e.target.value as any)}
                  className="field"
                >
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="research">Research</option>
                </select>
              </div>

              <div>
                <label className="label">Primary Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Publish 2 articles and 10 social posts weekly."
                  value={newTeamGoal}
                  onChange={(e) => setNewTeamGoal(e.target.value)}
                  className="field"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-paper-200">
              <button onClick={() => setIsCreateTeamOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleCreateTeam} className="btn-accent">
                Assemble & Launch Squad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
