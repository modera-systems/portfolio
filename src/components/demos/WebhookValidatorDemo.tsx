import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, ArrowRight, RefreshCw, Lock, Zap } from 'lucide-react';

export const WebhookValidatorDemo: React.FC = () => {
  const [eventType, setEventType] = useState<'stripe_invoice' | 'shopify_order' | 'custom_erp'>('stripe_invoice');
  const [signatureStatus, setSignatureStatus] = useState<'valid' | 'invalid'>('valid');
  const [timestampStatus, setTimestampStatus] = useState<'fresh' | 'expired'>('fresh');
  const [idempotencyStatus, setIdempotencyStatus] = useState<'unique' | 'duplicate'>('unique');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{
    httpCode: number;
    status: string;
    message: string;
    latencyMs: number;
    steps: { name: string; passed: boolean; note: string }[];
  } | null>(null);

  const handleTestIngress = () => {
    setIsRunning(true);
    setResult(null);

    setTimeout(() => {
      const step1Passed = signatureStatus === 'valid';
      const step2Passed = step1Passed && timestampStatus === 'fresh';
      const step3Passed = step2Passed && idempotencyStatus === 'unique';

      let code = 202;
      let status = 'ENQUEUED_FOR_PROCESSING';
      let message = 'Event envelope verified and queued to asynchronous worker buffer.';

      if (!step1Passed) {
        code = 401;
        status = 'SIGNATURE_VERIFICATION_FAILED';
        message = 'Signature header mismatch. Event dropped at network edge.';
      } else if (!step2Passed) {
        code = 400;
        status = 'REPLAY_ATTACK_WINDOW_EXPIRED';
        message = 'Event timestamp is outside acceptable delta. Replay prevention triggered.';
      } else if (!step3Passed) {
        code = 409;
        status = 'IDEMPOTENT_DUPLICATE_IGNORED';
        message = 'Idempotency key already committed in store. Acknowledged without re-executing side-effects.';
      }

      setResult({
        httpCode: code,
        status,
        message,
        latencyMs: 0,
        steps: [
          {
            name: '1. Request Signature Verification',
            passed: step1Passed,
            note: step1Passed ? 'Computed signature matches request header.' : 'Signature mismatch: Possible payload tampering.'
          },
          {
            name: '2. Timestamp Freshness Window',
            passed: step2Passed,
            note: timestampStatus === 'fresh' ? 'Timestamp within acceptable window.' : 'Timestamp outside acceptable window: Replay rejected.'
          },
          {
            name: '3. Idempotency Key Lock',
            passed: step3Passed,
            note: idempotencyStatus === 'unique' ? 'Key not seen in recent window: Lock acquired.' : 'Key already stored with cached receipt.'
          },
          {
            name: '4. Durable Message Queue Dispatch',
            passed: step3Passed,
            note: step3Passed ? 'Published to asynchronous worker queue.' : 'Skipped queue publish due to prior gate error.'
          }
        ]
      });
      setIsRunning(false);
    }, 450);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 text-xs font-mono-tech text-slate-200">
      
      {/* Simulation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#ea580c] font-bold block">
            LIVE WEBHOOK INGESTION SANDBOX
          </span>
          <span className="text-slate-400 text-[11px]">
            Test edge security headers, replay prevention, and idempotency guarantees.
          </span>
        </div>
        <button
          onClick={handleTestIngress}
          disabled={isRunning}
          id="btn-trigger-webhook-test"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold shadow transition-all disabled:opacity-50 shrink-0"
        >
          {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
          <span>Send Inbound Webhook</span>
        </button>
      </div>

      {/* Test Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-[11px]">
        
        {/* Param 1: Event Type */}
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <label className="text-slate-400 block mb-1.5 font-bold">Event Payload</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-200 text-xs focus:outline-none focus:border-[#ea580c]"
          >
            <option value="stripe_invoice">Payment Gateway: invoice.paid</option>
            <option value="shopify_order">E-Commerce: order.created</option>
            <option value="custom_erp">ERP: inventory.updated</option>
          </select>
        </div>

        {/* Param 2: HMAC Header */}
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <label className="text-slate-400 block mb-1.5 font-bold">Request Signature</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSignatureStatus('valid')}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                signatureStatus === 'valid' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              Valid Hash
            </button>
            <button
              onClick={() => setSignatureStatus('invalid')}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                signatureStatus === 'invalid' ? 'bg-rose-950/80 border border-rose-500 text-rose-300 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              Tampered
            </button>
          </div>
        </div>

        {/* Param 3: Idempotency State */}
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <label className="text-slate-400 block mb-1.5 font-bold">Idempotency Key</label>
          <div className="flex gap-2">
            <button
              onClick={() => setIdempotencyStatus('unique')}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                idempotencyStatus === 'unique' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              Fresh Key
            </button>
            <button
              onClick={() => setIdempotencyStatus('duplicate')}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                idempotencyStatus === 'duplicate' ? 'bg-amber-950/80 border border-amber-500 text-amber-300 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              Duplicate Key
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Pipeline Gates Result */}
      {result ? (
        <div className="mt-2 pt-4 border-t border-slate-800 space-y-3">
          
          {/* HTTP Status Banner */}
          <div className={`p-3 rounded-lg border flex items-center justify-between ${
            result.httpCode >= 200 && result.httpCode < 300
              ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
              : result.httpCode === 409
              ? 'bg-amber-950/40 border-amber-600/60 text-amber-200'
              : 'bg-rose-950/40 border-rose-600/60 text-rose-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold px-2 py-0.5 rounded bg-slate-900/80 border border-current">
                HTTP {result.httpCode}
              </span>
              <span className="font-semibold">{result.status}</span>
            </div>
            <span className="text-[10px] text-slate-400">Deterministic Edge Evaluation</span>
          </div>

          <p className="text-slate-300 text-xs">{result.message}</p>

          {/* Stepper Breakdown */}
          <div className="space-y-1.5 pt-2">
            {result.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded bg-slate-950/70 border border-slate-800/80"
              >
                {step.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-white block">{step.name}</span>
                  <span className="text-slate-400 text-[10px]">{step.note}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="mt-3 p-6 text-center text-slate-500 bg-slate-950/50 rounded-lg border border-dashed border-slate-800">
          Click "Send Inbound Webhook" above to execute the edge verification sequence.
        </div>
      )}

    </div>
  );
};
