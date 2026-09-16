import React from 'react';
import { CaseStudy } from '../types';
import { 
  ArrowUpRight, 
  Network, 
  Bot, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  RefreshCw 
} from 'lucide-react';

interface AsymmetricalCaseStudiesProps {
  caseStudies: CaseStudy[]; // Expects [02, 03, 04]
  onSelect: (id: string) => void;
}

export const AsymmetricalCaseStudies: React.FC<AsymmetricalCaseStudiesProps> = ({
  caseStudies,
  onSelect
}) => {
  const cs02 = caseStudies.find(c => c.id === '02-api-integration-workflow') || caseStudies[0];
  const cs03 = caseStudies.find(c => c.id === '03-ai-customer-support-experience') || caseStudies[1];
  const cs04 = caseStudies.find(c => c.id === '04-smb-ops-platform') || caseStudies[2];

  return (
    <div className="space-y-6" id="asymmetrical-case-studies-stream">
      
      {/* CASE STUDY 02: Horizontal Architectural Pipeline Corridor */}
      {cs02 && (
        <article
          onClick={() => onSelect(cs02.id)}
          id={`case-study-corridor-${cs02.id}`}
          className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 hover:border-[#ea580c] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Narrative & Problem Statement (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs font-bold text-[#ea580c]">
                  02 / API & SYSTEMS INTEGRATION
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-700">
                  {cs02.category}
                </span>
              </div>

              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors tracking-tight">
                  {cs02.title}
                </h4>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                  {cs02.shortDescription}
                </p>
              </div>

              {/* Specific Engineering Decisions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="font-mono-tech text-[#ea580c] font-bold text-[10px] block mb-0.5">
                    REQUEST VERIFICATION
                  </span>
                  <span className="text-slate-700 font-medium">Replay protection & timestamp expiry</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="font-mono-tech text-emerald-700 font-bold text-[10px] block mb-0.5">
                    IDEMPOTENT WORKER QUEUE
                  </span>
                  <span className="text-slate-700 font-medium">Prevents duplicate execution on webhook retries</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1 text-xs font-medium text-slate-500">
                <span>Role: <strong className="text-slate-800">{cs02.role}</strong></span>
                <span>•</span>
                <span className="text-slate-900 font-semibold group-hover:text-[#ea580c] flex items-center gap-1 transition-colors">
                  Inspect Integration Blueprint
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Right Live HTTP Telemetry Simulation Strip (5 cols) */}
            <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono-tech text-[11px] space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  INGESTION CONTRACT
                </span>
                <span className="text-slate-500">HTTP/1.1 over TLS</span>
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#ea580c]">POST /v1/webhooks/orders</span>
                  <span className="text-emerald-400">202 Accepted</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Headers: X-Signature • Idempotency-Key
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 space-y-0.5">
                <div>Payload Status: <span className="text-emerald-400 font-bold">Validated via Canonical Schema</span></div>
                <div>Queue Dispatch: <span className="text-slate-200">Asynchronous Queue → Background Worker</span></div>
                <div>Backoff Policy: <span className="text-slate-200">Exponential (1s, 2s, 4s, 8s)</span></div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>Event Ingest: Active</span>
                <span className="text-emerald-400">Order-Preserving Ingest</span>
              </div>
            </div>

          </div>
        </article>
      )}

      {/* ASYMMETRICAL 2-COLUMN PAIR: CASE STUDY 03 & 04 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CASE STUDY 03 (7 cols): AI Workflow & Deterministic Policy Gate */}
        {cs03 && (
          <article
            onClick={() => onSelect(cs03.id)}
            id={`case-study-card-${cs03.id}`}
            className="lg:col-span-7 group cursor-pointer rounded-2xl bg-[#090d16] text-white border border-slate-800 hover:border-purple-500/60 shadow-lg hover:shadow-purple-950/20 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-xs font-bold text-purple-400">
                    03 / AI & DETERMINISTIC POLICY
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] font-mono-tech px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300">
                    LLM Function Calling
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-800 group-hover:bg-purple-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <h4 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                {cs03.title}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Taming non-deterministic generative models with rigid API schemas. AI agents cannot invoke business refunds without passing through explicit policy guardrails and database permission checks.
              </p>
            </div>

            {/* Visual Function Gate Block */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono-tech space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
                <span className="text-purple-400 font-bold">STRUCTURED TOOL CONTRACT</span>
                <span>Deterministic Gate</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                <span className="text-slate-500">tool:</span> checkReturnEligibility(<span className="text-purple-300">orderId, sku</span>) → <span className="text-emerald-400 font-bold">ALLOW_EXCHANGE</span>
              </div>
              <div className="text-[10px] text-slate-500">
                Deterministic policy evaluation enforced at runtime schema boundary
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono-tech text-[11px] text-slate-400">
                Role: <span className="text-slate-200">{cs03.role}</span>
              </span>
              <span className="text-purple-400 group-hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors">
                View AI Guardrail Spec
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        )}

        {/* CASE STUDY 04 (5 cols): Small-Business Operations Platform */}
        {cs04 && (
          <article
            onClick={() => onSelect(cs04.id)}
            id={`case-study-card-${cs04.id}`}
            className="lg:col-span-5 group cursor-pointer rounded-2xl bg-white border border-slate-200/90 hover:border-amber-500/80 shadow-xs hover:shadow-xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-xs font-bold text-amber-700">
                    04 / SYSTEMS DEPLOYMENT
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-semibold text-slate-600">
                    Field Ops
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-amber-600 flex items-center justify-center text-slate-600 group-hover:text-white transition-all shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors tracking-tight">
                {cs04.title}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Replacing paper work-orders and manual bookkeeping with an offline-first mobile dispatch system and automated accounting ledger sync.
              </p>
            </div>

            {/* Offline Sync State Block */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-[11px] font-mono-tech space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1.5 border-b border-slate-200">
                <span className="text-amber-700 font-bold">OFFLINE-FIRST SYNC ENGINE</span>
                <span>Local Storage → Cloud</span>
              </div>
              <div className="flex items-center justify-between text-slate-800">
                <span>Dispatch Status:</span>
                <span className="text-emerald-700 font-semibold">Tech Sign-Off Verified</span>
              </div>
              <div className="text-[10px] text-slate-600">
                Bidirectional ledger reconciliation designed to prevent double-entry errors
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono-tech text-[11px] text-slate-600">
                Role: <span className="text-slate-900 font-semibold">{cs04.role.split('&')[0]}</span>
              </span>
              <span className="text-amber-800 group-hover:text-amber-900 font-semibold flex items-center gap-1 transition-colors">
                Inspect Field Ops Spec
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        )}

      </div>

    </div>
  );
};
