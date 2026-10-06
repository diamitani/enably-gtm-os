import React from 'react';
import { Sparkles, ShieldCheck, Terminal, Heart, ExternalLink } from 'lucide-react';
import { ViewMode } from '../../types';

interface FooterProps {
  onViewChange: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="w-full border-t border-paper-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-brand-cyan to-brand-blue p-[1px]">
              <div className="w-full h-full bg-white rounded-[5px] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </div>
            </div>
            <span className="font-bold text-ink text-sm">Enably GTM OS</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper-100 text-slate-300 border border-paper-300">
              v1.0.0
            </span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            The autonomous Go-To-Market Operating System. Orchestrate 5 specialized AI agent harnesses to discover ICPs, craft sales playbooks, generate high-converting sequences, and uncover real-time buyer intelligence.
          </p>
          <div className="flex items-center space-x-3 text-slate-500 font-mono text-[11px]">
            <span className="flex items-center space-x-1 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
            <span>•</span>
            <span>SOC2 Type II Ready</span>
            <span>•</span>
            <span>AWS Bedrock AgentCore</span>
          </div>
        </div>

        {/* Column 1: Agent Suite */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
            5-Agent Suite
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onViewChange('studio')} className="hover:text-accent transition-colors">
                GTM Master Architect
              </button>
            </li>
            <li>
              <button onClick={() => onViewChange('studio')} className="hover:text-accent transition-colors">
                ICP & Persona Discovery
              </button>
            </li>
            <li>
              <button onClick={() => onViewChange('studio')} className="hover:text-accent transition-colors">
                Sales Playbook Builder
              </button>
            </li>
            <li>
              <button onClick={() => onViewChange('studio')} className="hover:text-accent transition-colors">
                Outreach & Messaging Studio
              </button>
            </li>
            <li>
              <button onClick={() => onViewChange('studio')} className="hover:text-accent transition-colors">
                Research & Account Intel
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Platform & Arch */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
            Platform & Engine
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onViewChange('console')} className="hover:text-accent transition-colors">
                Multi-Agent Live Console
              </button>
            </li>
            <li>
              <button onClick={() => onViewChange('integrations')} className="hover:text-accent transition-colors">
                Skills & MCP Catalog
              </button>
            </li>
            <li>
              <button onClick={() => onViewChange('settings')} className="hover:text-accent transition-colors">
                BYOK & Gateway Settings
              </button>
            </li>
            <li>
              <span className="text-slate-500">ROSTR v2 Architecture</span>
            </li>
            <li>
              <span className="text-slate-500">FastAPI Bedrock Harnesses</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Trust & Legal */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
            Security & Governance
          </h4>
          <ul className="space-y-2">
            <li>
              <span className="hover:text-slate-200 cursor-pointer">Zero Data Retention</span>
            </li>
            <li>
              <span className="hover:text-slate-200 cursor-pointer">VPC Isolation & KMS</span>
            </li>
            <li>
              <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            </li>
            <li>
              <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            </li>
            <li>
              <span className="hover:text-slate-200 cursor-pointer">Compliance & DPA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-paper-200/60 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
        <p>© 2026 Enably Technologies Inc. Built for revenue teams worldwide.</p>
        <p className="mt-2 sm:mt-0">Governed by Site Empire OS and ROSTR v2 Orchestration.</p>
      </div>
    </footer>
  );
};
