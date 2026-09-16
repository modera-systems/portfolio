import React from 'react';
import { CaseStudy } from '../types';
import { ArrowUpRight, CheckCircle2, Shield, Layers, Server, Cpu, Database, Bot, Zap, MapPin, Workflow } from 'lucide-react';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  layoutVariant?: 'wide-featured' | 'split-technical' | 'compact-architecture' | 'full-preview';
  onSelect: (id: string) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  layoutVariant = 'wide-featured',
  onSelect
}) => {
  return (
    <article
      onClick={() => onSelect(caseStudy.id)}
      id={`case-study-card-${caseStudy.id}`}
      className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 hover:border-[#ea580c]/60 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      {/* Top Bar: Number + Category */}
      <div className="p-6 sm:p-7 pb-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xl sm:text-2xl font-bold text-slate-400 group-hover:text-[#ea580c] transition-colors">
              {caseStudy.number}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
              {caseStudy.category}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#ea580c] flex items-center justify-center text-slate-600 group-hover:text-white transition-all duration-200 shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Title & One-liner */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors tracking-tight leading-snug">
          {caseStudy.title}
        </h3>
        
        <p className="mt-2 text-slate-600 text-sm leading-relaxed font-normal">
          {caseStudy.subtitle || caseStudy.summary}
        </p>
      </div>

      {/* Visual Element Based on Project */}
      <div className="px-6 sm:px-7 py-3">
        {(caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design') && (
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-[11px] font-mono-tech space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="text-[#ea580c] font-bold">FIELD SERVICE WORKFLOW</span>
              <span>8-Stage Deployment Blueprint</span>
            </div>
            <div className="flex items-center gap-2 text-xs overflow-x-auto whitespace-nowrap text-slate-300">
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300">
                1. Site Intake
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300">
                2. Qualify / Review
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2 py-0.5 rounded bg-[#ea580c]/20 border border-[#ea580c] text-[#ea580c]">
                3. Field Survey
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-500 text-blue-300">
                4. Dispatch & Install
              </span>
            </div>
          </div>
        )}

        {caseStudy.id === '02-quickbooks-automation' && (
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-[11px] font-mono-tech space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="text-emerald-400 font-bold">EVENT-DRIVEN WEBHOOK</span>
              <span>n8n → QuickBooks</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>POST /v3/company/invoice</span>
              <span className="text-emerald-400">HTTP 200 Created</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              Match Key: PrimaryEmailAddr • Customer Deduplicated
            </div>
          </div>
        )}

        {caseStudy.id === '03-connected-customer-portal' && (
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-[11px] font-mono-tech space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="text-purple-400 font-bold">SELF-SERVICE ACCESS</span>
              <span>Customer Status Tracker</span>
            </div>
            <div className="text-slate-300 text-[11px] truncate">
              token: tok_live_... → <span className="text-emerald-400">AUTHENTICATED</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Internal-only fields excluded • Customer-facing project status
            </div>
          </div>
        )}

        {caseStudy.id === '04-modera-kind-companion' && (
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-[11px] font-mono-tech space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="text-amber-400 font-bold">OPERATING SYSTEM</span>
              <span>Modera × Kind Companion</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Service Lifecycle:</span>
              <span className="text-emerald-400 font-semibold">Lead → Triage → Booking → Visit</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Consulting Control Center connected to client operations
            </div>
          </div>
        )}
      </div>

      {/* Bottom Metadata & Skills Tags */}
      <div className="p-6 sm:p-7 pt-3 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {(caseStudy.demonstratedSkills || []).slice(0, 4).map((skill, sIdx) => (
            <span
              key={sIdx}
              className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
          <span className="text-slate-500 font-medium text-xs">
            Role: <span className="text-slate-800 font-semibold">{caseStudy.role.split('/')[0]}</span>
          </span>
          <span className="font-semibold text-slate-900 group-hover:text-[#ea580c] flex items-center gap-1 transition-colors">
            Read Case Study
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

    </article>
  );
};
