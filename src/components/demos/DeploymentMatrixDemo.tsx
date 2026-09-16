import React, { useState } from 'react';
import { CheckSquare, Square, AlertCircle, ShieldCheck, ArrowRight, RefreshCw, Activity } from 'lucide-react';

interface MilestoneItem {
  id: string;
  name: string;
  category: 'Security' | 'Network' | 'Identity' | 'ERP' | 'Training';
  completed: boolean;
  requiredPrereqs: string[];
  daysPending: number;
}

export const DeploymentMatrixDemo: React.FC = () => {
  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    { id: 'm1', name: 'Information Security Questionnaire', category: 'Security', completed: true, requiredPrereqs: [], daysPending: 0 },
    { id: 'm2', name: 'Network & Firewall Whitelisting', category: 'Network', completed: true, requiredPrereqs: ['m1'], daysPending: 0 },
    { id: 'm3', name: 'Identity Provider SSO Metadata Exchange', category: 'Identity', completed: false, requiredPrereqs: ['m2'], daysPending: 12 },
    { id: 'm4', name: 'Automated User Provisioning Sync', category: 'Identity', completed: false, requiredPrereqs: ['m3'], daysPending: 12 },
    { id: 'm5', name: 'ERP Connector Sandbox Authentication', category: 'ERP', completed: false, requiredPrereqs: ['m2'], daysPending: 4 },
    { id: 'm6', name: 'End-to-End Pilot UAT Sign-Off', category: 'Training', completed: false, requiredPrereqs: ['m3', 'm5'], daysPending: 0 }
  ]);

  const toggleMilestone = (id: string) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        // Check if prereqs are satisfied
        const unfulfilled = m.requiredPrereqs.filter(reqId => {
          const reqItem = prev.find(item => item.id === reqId);
          return !reqItem?.completed;
        });

        if (unfulfilled.length > 0 && !m.completed) {
          // Cannot complete without prereqs
          return m;
        }

        const nextCompleted = !m.completed;
        return {
          ...m,
          completed: nextCompleted,
          daysPending: nextCompleted ? 0 : 7
        };
      }
      return m;
    }));
  };

  // Calculate live deployment metrics
  const total = milestones.length;
  const completedCount = milestones.filter(m => m.completed).length;
  const percentComplete = Math.round((completedCount / total) * 100);
  
  // High risk if any item has daysPending > 10 and not completed
  const hasStalledMilestone = milestones.some(m => !m.completed && m.daysPending >= 10);
  const riskStatus = hasStalledMilestone ? 'ELEVATED RISK' : percentComplete > 60 ? 'HEALTHY' : 'NORMAL ON-TRACK';

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 text-xs font-mono-tech text-slate-200">
      
      {/* Header with Risk Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#ea580c] font-bold block">
            IMPLEMENTATION DEPENDENCY DAG & RISK MATRIX
          </span>
          <span className="text-slate-400 text-[11px]">
            Interactive milestone dependency solver. Downstream steps are gated by upstream technical prerequisites.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">DEPLOYMENT HEALTH</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              riskStatus === 'ELEVATED RISK' 
                ? 'bg-rose-950 border border-rose-500 text-rose-300' 
                : 'bg-emerald-950 border border-emerald-500 text-emerald-300'
            }`}>
              {riskStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="py-3">
        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
          <span>Prerequisites Satisfied: {completedCount} of {total}</span>
          <span className="text-white font-bold">{percentComplete}% Complete</span>
        </div>
        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-[#ea580c] to-amber-500 transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
      </div>

      {/* Interactive Milestones Table */}
      <div className="space-y-2 pt-2">
        {milestones.map((m) => {
          const unfulfilledPrereqs = m.requiredPrereqs.filter(reqId => {
            const req = milestones.find(item => item.id === reqId);
            return !req?.completed;
          });
          const isGated = unfulfilledPrereqs.length > 0;

          return (
            <div
              key={m.id}
              onClick={() => !isGated && toggleMilestone(m.id)}
              className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                m.completed
                  ? 'bg-slate-950/90 border-slate-800 text-slate-300'
                  : isGated
                  ? 'bg-slate-950/40 border-slate-900 text-slate-500 cursor-not-allowed opacity-60'
                  : 'bg-slate-950 border-slate-800 hover:border-[#ea580c] text-white cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  disabled={isGated}
                  className="mt-0.5 text-[#ea580c] focus:outline-none"
                >
                  {m.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${m.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {m.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {m.category}
                    </span>
                  </div>

                  {isGated ? (
                    <span className="text-[10px] text-amber-400/90 block mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Blocked by: {unfulfilledPrereqs.map(reqId => milestones.find(i => i.id === reqId)?.name).join(', ')}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {m.completed ? 'Prerequisite verified' : 'Ready for verification — click to sign off'}
                    </span>
                  )}
                </div>
              </div>

              {/* Stalled days indicator */}
              <div className="text-right shrink-0">
                {!m.completed && m.daysPending > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono-tech ${
                    m.daysPending >= 10 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Stalled: {m.daysPending} days
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
        <span>💡 Gating logic strictly prohibits signing off downstream tasks until prerequisites resolve.</span>
        <button
          onClick={() => {
            setMilestones(prev => prev.map(m => ({ ...m, completed: m.id === 'm1' || m.id === 'm2' })));
          }}
          className="hover:text-white underline"
        >
          Reset
        </button>
      </div>

    </div>
  );
};
