import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { buildsData } from '../data/builds';
import { SolutionDesignLabDemo } from '../components/demos/SolutionDesignLabDemo';
import { QuickbooksAutomationSimulator } from '../components/demos/QuickbooksAutomationSimulator';
import { CustomerProjectAccessFlow } from '../components/demos/CustomerProjectAccessFlow';
import { SmallBusinessOperationsFlow } from '../components/demos/SmallBusinessOperationsFlow';
import { 
  ArrowRight, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  Check, 
  RefreshCw,
  Info
} from 'lucide-react';

interface BuildsViewProps {
  onNavigate: (page: PageId, caseStudyId?: string) => void;
  initialBuildId?: string;
}

export const BuildsView: React.FC<BuildsViewProps> = ({ onNavigate, initialBuildId }) => {
  const [activeBuildId, setActiveBuildId] = useState<string>(initialBuildId || buildsData[0].id);

  useEffect(() => {
    if (initialBuildId && buildsData.some(b => b.id === initialBuildId)) {
      setActiveBuildId(initialBuildId);
    }
  }, [initialBuildId]);

  const activeBuild = buildsData.find(b => b.id === activeBuildId) || buildsData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
          </span>
          <span className="font-mono-tech uppercase tracking-[0.16em] text-xs font-bold text-slate-700">
            INTERACTIVE BUILDS & WORKFLOW SIMULATORS
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          Test the System Logic.
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Interactive reconstructions of workflows, solutions, and prototypes I&apos;ve designed or built. Explore how I translate requirements into system logic, connect platforms, automate workflows, and design experiences around real operational problems.
        </p>
      </div>

      {/* Selector Tabs for the 4 Approved Builds */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-200 pb-4">
        {buildsData.map((build) => {
          const isSelected = build.id === activeBuildId;
          return (
            <button
              key={build.id}
              onClick={() => setActiveBuildId(build.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300'
              }`}
            >
              <span className="font-mono-tech text-[10px] text-orange-400 font-bold">{build.number}</span>
              <span>{build.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Build Banner & Synthetic Disclaimer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
              BUILD {activeBuild.number} • {activeBuild.category}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
              {activeBuild.title}
            </h2>
            <p className="text-xs font-mono-tech text-slate-500">
              {activeBuild.tagline}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-bold bg-orange-100 text-orange-900 border border-orange-200 self-start sm:self-auto">
            Interactive Demonstration
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
          {activeBuild.description}
        </p>

        {/* Standardized Portfolio Disclosure */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            {activeBuild.disclaimer}
          </div>
        </div>

        {/* What this teaches */}
        <div className="pt-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold block mb-2">
            WHAT THIS INTERACTION DEMONSTRATES:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {activeBuild.demonstrates.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render Active Simulation Component */}
      <div className="pt-4">
        {activeBuild.id === 'build-01-solution-design-lab' && (
          <SolutionDesignLabDemo />
        )}

        {activeBuild.id === 'build-02-quickbooks-simulator' && (
          <QuickbooksAutomationSimulator />
        )}

        {activeBuild.id === 'build-03-customer-portal-flow' && (
          <CustomerProjectAccessFlow />
        )}

        {activeBuild.id === 'build-04-operations-workflow' && (
          <SmallBusinessOperationsFlow />
        )}
      </div>

      {/* Bottom Cross-Navigation */}
      <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('case-studies')}
          className="text-xs font-semibold text-slate-700 hover:text-[#ea580c] flex items-center gap-1.5"
        >
          <span>← Back to Case Studies</span>
        </button>

        <button
          onClick={() => onNavigate('architecture')}
          className="px-4 py-2 rounded-full border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-semibold"
        >
          View System Architectures →
        </button>
      </div>

    </div>
  );
};
