import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Workflow, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Sparkles,
  Server,
  Zap
} from 'lucide-react';

interface PacketStep {
  id: string;
  name: string;
  detail: string;
  status: 'idle' | 'active' | 'passed' | 'alert';
}

export const HeroSystemVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'normal' | 'anomaly'>('normal');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);

  // Steps in the orchestration layer
  const steps: { name: string; tag: string; metric: string }[] = [
    { name: 'Auth & Handshake Verification', tag: 'Signed Request', metric: 'Verified' },
    { name: 'Schema Contract Validator', tag: 'Canonical Schema', metric: 'Valid' },
    { name: 'Deterministic State Gate', tag: 'Prerequisites', metric: 'Gated' },
    { name: 'Idempotency Lock & Queue', tag: 'FIFO Ingestion', metric: 'Queued' }
  ];

  const handleSimulate = (anomaly: boolean = false) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveTab(anomaly ? 'anomaly' : 'normal');
    setActiveStepIndex(0);

    const stepTime = 400;
    const totalSteps = anomaly ? 2 : 4;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, stepTime);
  };

  return (
    <div className="w-full rounded-2xl bg-[#090d16] text-slate-200 border border-slate-800 shadow-2xl overflow-hidden relative" id="hero-system-map">
      
      {/* Subtle architectural grid overlay */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      {/* Top Header Bar / System Telemetry Strip */}
      <div className="relative z-10 px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono-tech text-[11px] text-slate-300 font-semibold tracking-wide">
            LIVE INTEGRATION TOPOLOGY
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-[11px] text-slate-400 font-mono-tech hidden sm:inline">
            SYSTEM_ID: orch_engine_v3
          </span>
        </div>

        {/* Interactive Sandbox Triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulate(false)}
            disabled={isSimulating}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono-tech flex items-center gap-1.5 transition-all ${
              activeTab === 'normal' && isSimulating
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Send valid production event through the pipeline"
          >
            <Play className="w-3 h-3 text-emerald-400" />
            <span>Simulate Live Event</span>
          </button>

          <button
            onClick={() => handleSimulate(true)}
            disabled={isSimulating}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono-tech flex items-center gap-1.5 transition-all ${
              activeTab === 'anomaly' && isSimulating
                ? 'bg-[#ea580c] text-white font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Inject invalid schema payload to observe DLQ isolation"
          >
            <AlertTriangle className="w-3 h-3 text-[#ea580c]" />
            <span>Inject Schema Drift</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Visual Layout */}
      <div className="relative z-10 p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-stretch">
        
        {/* LEFT COLUMN (4 cols): Chaotic Operational Reality */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[11px] font-mono-tech text-amber-400/90 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                UNSTRUCTURED INPUTS
              </span>
              <span className="text-[10px] font-mono-tech text-slate-500">Business Reality</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Disparate, unversioned operational feeds where business process friction originates:
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className={`p-2.5 rounded-lg border transition-all ${
              activeTab === 'anomaly' && isSimulating
                ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                : 'bg-slate-950/70 border-slate-800 text-slate-300'
            }`}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold">Spreadsheets & CSV Trackers</span>
                <span className="text-[10px] font-mono-tech text-amber-400">No Validation</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono-tech">Multiple un-synced onboarding sheets</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold">Raw Inbound Webhooks</span>
                <span className="text-[10px] font-mono-tech text-slate-400">Untrusted Ingest</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono-tech">POST /v1/incoming/leads</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold">Legacy ERP Batch Polls</span>
                <span className="text-[10px] font-mono-tech text-slate-400">Variable Schema</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono-tech">XML & SOAP polling intervals</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono-tech text-slate-500 flex items-center justify-between">
            <span>Payload State:</span>
            <span className={activeTab === 'anomaly' ? 'text-amber-400' : 'text-slate-400'}>
              {activeTab === 'anomaly' ? '● Unsanitized Payload' : '● Asynchronous Influx'}
            </span>
          </div>
        </div>

        {/* CENTER COLUMN (5 cols): Monique's Orchestration & Verification Core */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5 p-4 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-[#ea580c]/30 shadow-lg relative">
          
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[11px] font-mono-tech text-[#ea580c] font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                ORCHESTRATION & VERIFICATION LAYER
              </span>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#ea580c]/20 text-[#ea580c]">
                Core Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Deterministic gates, boundary contracts, and state machines engineered to absorb chaos:
            </p>
          </div>

          {/* Sequential Pipeline Blocks */}
          <div className="space-y-2">
            {steps.map((st, sIdx) => {
              const isActive = isSimulating && activeStepIndex === sIdx;
              const isPast = isSimulating && activeStepIndex > sIdx;
              const isFailed = activeTab === 'anomaly' && isSimulating && sIdx === 1 && activeStepIndex === 1;

              return (
                <div
                  key={sIdx}
                  className={`p-2.5 rounded-lg border transition-all duration-300 flex items-center justify-between gap-2 ${
                    isFailed
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : isActive
                      ? 'bg-[#ea580c]/20 border-[#ea580c] text-white shadow-sm ring-1 ring-[#ea580c]'
                      : isPast
                      ? 'bg-slate-900/90 border-emerald-500/50 text-slate-200'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono-tech font-bold ${
                      isFailed
                        ? 'bg-rose-500 text-white'
                        : isActive
                        ? 'bg-[#ea580c] text-white animate-pulse'
                        : isPast
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      0{sIdx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold leading-tight">{st.name}</div>
                      <div className="text-[10px] font-mono-tech text-slate-400 mt-0.5">{st.tag}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono-tech text-[10px]">
                    {isFailed ? (
                      <span className="text-rose-400 font-bold">REJECTED → DLQ</span>
                    ) : isPast ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {st.metric}
                      </span>
                    ) : isActive ? (
                      <span className="text-[#ea580c] font-bold animate-pulse">EVALUATING</span>
                    ) : (
                      <span className="text-slate-500">Standby</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Pipeline Status Footer */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-tech text-slate-400">
            <span>Pipeline Execution Mode:</span>
            <span className="text-emerald-400 font-bold">Deterministic Verification</span>
          </div>

        </div>

        {/* RIGHT COLUMN (3 cols): Scalable Production Outputs */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[11px] font-mono-tech text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                PRODUCTION WORKFLOWS
              </span>
              <span className="text-[10px] font-mono-tech text-slate-500">Target</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Resilient, scalable business execution:
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">Audited State Store</span>
                <span className="text-[10px] font-mono-tech text-emerald-400">Relational</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Immutable audit trail</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">Client Portal</span>
                <span className="text-[10px] font-mono-tech text-emerald-400">Self-Serve</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Automated readiness checks</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">ERP Ledger Sync</span>
                <span className="text-[10px] font-mono-tech text-emerald-400">Reconciled</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Automated reconciliation</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono-tech text-slate-400 flex items-center justify-between">
            <span>Workflow Ingestion:</span>
            <span className="text-emerald-400 font-bold">Order-Preserving Delivery</span>
          </div>

        </div>

      </div>

      {/* Bottom Summary Bar: Architectural Principle */}
      <div className="px-5 sm:px-7 py-3 bg-slate-950/80 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>
            <strong className="text-slate-200">The Implementation Principle: </strong>
            Software does not fail on the happy path; it fails when unexpected edge cases hit unvetted states.
          </span>
        </div>
        <span className="font-mono-tech text-slate-500 shrink-0 text-[10px]">
          HTTP 202 Ingest • Deterministic Gates • Idempotent
        </span>
      </div>

    </div>
  );
};
