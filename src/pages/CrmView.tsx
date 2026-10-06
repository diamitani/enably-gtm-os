import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  ExternalLink, 
  Share2, 
  RefreshCw, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Building,
  Target,
  Send,
  Plus
} from 'lucide-react';
import { INITIAL_LEADS, generateLeadOutreachSequence } from '../lib/crm-store';
import { LeadRecord } from '../types';

interface CrmViewProps {
  onDirectToStudio: (prompt: string) => void;
}

export const CrmView: React.FC<CrmViewProps> = ({ onDirectToStudio }) => {
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(INITIAL_LEADS[0]);
  const [isEnriching, setIsEnriching] = useState<boolean>(false);
  const [filterTier, setFilterTier] = useState<string>('All');

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'All' || l.icpTier.includes(filterTier);
    return matchesSearch && matchesTier;
  });

  const handleEnrichLead = (leadId: string) => {
    setIsEnriching(true);
    setTimeout(() => {
      setLeads(prev => prev.map(l => {
        if (l.id === leadId) {
          return {
            ...l,
            enrichmentStatus: 'verified',
            icpScore: Math.min(100, l.icpScore + 5),
            signals: [...l.signals, 'Clay waterfall phone & work email verified']
          };
        }
        return l;
      }));
      setIsEnriching(false);
    }, 1200);
  };

  const handleGenerateCadence = (lead: LeadRecord) => {
    const sequence = generateLeadOutreachSequence(lead);
    const prompt = `Direct SDR Copilot to execute outbound cadence for ${lead.fullName} (${lead.title} at ${lead.company}):
- Email 1 Subject: ${sequence[0].subject}
- Email 1 Body: ${sequence[0].body}
- LinkedIn Touch: ${sequence[1].body}`;
    onDirectToStudio(prompt);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-obsidian-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            <Users className="h-4 w-4" />
            <span>Lead Studio & Account Intelligence CRM</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Target Accounts & Prospect Directory
          </h1>
          <p className="text-xs text-obsidian-400 mt-1">
            Automated waterfall enrichment, ICP scoring, account briefs, and 1-click sequence dispatching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEnrichLead(leads[0].id)}
            disabled={isEnriching}
            className="flex items-center gap-2 rounded-xl bg-brand-cyan px-4 py-2.5 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 transition-colors shadow-glow-cyan"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isEnriching ? 'animate-spin' : ''}`} />
            <span>{isEnriching ? 'Enriching...' : 'Run Clay Waterfall Batch'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, companies, domains..."
            className="w-full rounded-xl border border-obsidian-700 bg-obsidian-900 pl-10 pr-4 py-2 text-xs text-white placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'ICP-1', 'ICP-2', 'ICP-3'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterTier === tier
                  ? 'bg-brand-cyan text-obsidian-950 font-bold'
                  : 'bg-obsidian-900 text-obsidian-400 hover:text-white border border-obsidian-800'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Leads Table (Left) + Selected Account Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Leads Table */}
        <div className="lg:col-span-7 rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-5 shadow-glass-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-obsidian-800 text-xs font-semibold text-obsidian-400">
            <span>Contact & Company</span>
            <span>ICP Score</span>
          </div>

          <div className="space-y-2.5">
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand-cyan bg-obsidian-900 shadow-glow-cyan'
                      : 'border-obsidian-800/80 bg-obsidian-950/60 hover:border-obsidian-700 hover:bg-obsidian-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lead.fullName}</span>
                        <span className="rounded bg-obsidian-800 px-1.5 py-0.5 text-[10px] font-mono text-brand-cyan">
                          {lead.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-obsidian-400 mt-1">
                        <Building className="h-3 w-3" />
                        <span>{lead.company}</span>
                        <span>•</span>
                        <span>{lead.companySize}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 px-2.5 py-1 text-xs font-mono font-bold text-brand-emerald">
                        <Target className="h-3 w-3" />
                        <span>{lead.icpScore}/100</span>
                      </div>
                      <div className="text-[10px] text-obsidian-500 font-mono mt-1">
                        {lead.enrichmentStatus.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-obsidian-800/80">
                    {lead.signals.slice(0, 2).map((sig, i) => (
                      <span key={i} className="rounded bg-obsidian-900 px-2 py-0.5 text-[10px] font-mono text-obsidian-300 border border-obsidian-800">
                        ⚡ {sig}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Account Intelligence Dossier */}
        <div className="lg:col-span-5 rounded-2xl border border-obsidian-800 bg-obsidian-900/80 p-6 shadow-glass-card space-y-5">
          {selectedLead ? (
            <>
              <div className="flex items-start justify-between pb-4 border-b border-obsidian-800">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedLead.fullName}</h3>
                  <p className="text-xs text-brand-cyan font-mono">{selectedLead.title} @ {selectedLead.company}</p>
                  <p className="text-[11px] text-obsidian-400 mt-0.5">{selectedLead.location} • {selectedLead.industry}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={selectedLead.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-obsidian-800 p-2 text-obsidian-300 hover:text-white">
                    <Share2 className="h-4 w-4" />
                  </a>
                  <a href={`mailto:${selectedLead.email}`} className="rounded-lg bg-obsidian-800 p-2 text-obsidian-300 hover:text-white">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Account Brief */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  AI Account Intelligence Brief
                </span>
                <div className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-3.5 text-xs text-obsidian-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedLead.generatedAccountBrief}
                </div>
              </div>

              {/* Buying Signals */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Verified Trigger Signals
                </span>
                <div className="space-y-1.5">
                  {selectedLead.signals.map((sig, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-brand-cyan bg-obsidian-950 p-2 rounded-lg border border-obsidian-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-emerald" />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1-Click Outbound Sequence Dispatcher */}
              <div className="pt-4 border-t border-obsidian-800 space-y-3">
                <button
                  onClick={() => handleGenerateCadence(selectedLead)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue py-3 text-xs font-bold text-obsidian-950 hover:opacity-95 shadow-glow-cyan transition-all"
                >
                  <Send className="h-4 w-4 fill-obsidian-950" />
                  <span>Execute Sequence in Studio</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8 text-obsidian-500 text-xs">
              Select a lead from the directory to inspect account intelligence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
