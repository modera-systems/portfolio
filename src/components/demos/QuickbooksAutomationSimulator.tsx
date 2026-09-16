import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Database, 
  Layers, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck, 
  UserPlus, 
  FileText, 
  Lock, 
  Clock, 
  Send,
  AlertCircle
} from 'lucide-react';

export const QuickbooksAutomationSimulator: React.FC = () => {
  // Scenario state: 'existing' vs 'new'
  const [scenario, setScenario] = useState<'existing' | 'new'>('existing');
  
  // Step progression: 0 (idle) to 10 (completed)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Fictional Project Data specified by user prompt
  const projectData = {
    customer: scenario === 'existing' ? 'Alex Rivera' : 'Maya Patel',
    email: scenario === 'existing' ? 'alex@example.com' : 'maya@example.com',
    projectId: 'PRJ-2048',
    quoteTotal: 4250.00,
    status: 'Ready for Accounting',
    scope: 'Commercial EV Charging Hub Installation & Dual 48A Hardware',
  };

  const stepsList = [
    {
      num: 1,
      title: 'Status Reached',
      sub: 'Field Operations Platform',
      desc: `Project PRJ-2048 transitions to status 'Ready for Accounting'.`,
      actor: 'Operational System'
    },
    {
      num: 2,
      title: 'Webhook Sent',
      sub: 'Outbound HTTP POST',
      desc: 'Operational system fires outbound webhook automatically; no manual button needed.',
      actor: 'Field Operations Platform'
    },
    {
      num: 3,
      title: 'Data Received by n8n',
      sub: 'Inbound Listener',
      desc: `n8n webhook node captures payload with customer (${projectData.customer}), project ID, and quote.`,
      actor: 'n8n Workflow'
    },
    {
      num: 4,
      title: 'Data Transformed',
      sub: 'Data Transformation',
      desc: 'Transforms customer naming conventions, cleans formatting, and extracts quote total ($4,250).',
      actor: 'n8n Function Node'
    },
    {
      num: 5,
      title: 'QuickBooks Authenticated',
      sub: 'OAuth Authentication',
      desc: 'n8n authenticates with QuickBooks API via stored OAuth tokens.',
      actor: 'QuickBooks API'
    },
    {
      num: 6,
      title: 'Customer Searched by Email',
      sub: 'Customer Matching Logic',
      desc: `Queries QuickBooks customers using primary email '${projectData.email}'.`,
      actor: 'QuickBooks API'
    },
    {
      num: 7,
      title: 'Conditional Logic Evaluated',
      sub: 'n8n IF Node',
      desc: scenario === 'existing' 
        ? `Match found in QuickBooks! Branch: Existing Customer Record.`
        : `Zero matches returned. Branch: New Customer Creation required.`,
      actor: 'n8n Logic'
    },
    {
      num: 8,
      title: scenario === 'existing' ? 'Customer Record Reused' : 'Customer Created',
      sub: scenario === 'existing' ? 'Existing Account' : 'POST /v3/company/customer',
      desc: scenario === 'existing'
        ? `Reusing existing QuickBooks Customer ID 'QBO-CUST-8401' based on email match.`
        : `Created new QuickBooks customer profile for Maya Patel. Returned new ID 'QBO-CUST-9904'.`,
      actor: scenario === 'existing' ? 'n8n Workflow' : 'QuickBooks API'
    },
    {
      num: 9,
      title: 'Invoice Generated',
      sub: 'POST /v3/company/invoice',
      desc: `Created QuickBooks Invoice #INV-10928 for $4,250.00 with reference notes for PRJ-2048.`,
      actor: 'QuickBooks API'
    },
    {
      num: 10,
      title: 'Result Returned to Platform',
      sub: 'Loop Closed',
      desc: 'Automation outcome and invoice confirmation transmitted back to Field Operations Platform.',
      actor: 'Field Operations Platform'
    }
  ];

  // Automated step progression when triggered
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentStep < 10) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 700);
    } else if (currentStep >= 10) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  const handleTrigger = () => {
    setCurrentStep(1);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
  };

  const handleScenarioChange = (newScenario: 'existing' | 'new') => {
    setScenario(newScenario);
    setIsRunning(false);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Standardized Portfolio Disclosure */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          Portfolio Reconstruction — Built with fictional data based on a real workflow I designed or built. Company and customer information has been anonymized.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* START STATE: FICTIONAL PROJECT CARD & CONTROLS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Fictional Project Docket (Start State) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold">
                OPERATIONAL SOURCE RECORD (FIELD OPERATIONS PLATFORM)
              </span>
            </div>
            <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-900 border border-orange-200">
              {projectData.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Project ID</span>
              <span className="font-mono-tech font-bold text-slate-900 mt-0.5 block">{projectData.projectId}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Customer</span>
              <span className="font-semibold text-slate-900 mt-0.5 block truncate">{projectData.customer}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Email Address</span>
              <span className="font-mono-tech text-slate-700 mt-0.5 block truncate">{projectData.email}</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-mono-tech text-emerald-800 uppercase block">Quote Total</span>
              <span className="font-mono-tech font-bold text-emerald-900 mt-0.5 block">${projectData.quoteTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Milestone reached: Work completed and signed off in field.</span>
            </div>
            <span className="font-mono-tech text-[10px] text-slate-500 font-semibold">Trigger: Automatic</span>
          </div>
        </div>

        {/* Right: Interactive Controls & Scenario Switcher */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 text-white shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
              WORKFLOW TRIGGER & CONTROLS
            </span>
            <h4 className="font-display font-bold text-base sm:text-lg">
              Test Customer Scenarios
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Select whether this customer already exists in QuickBooks to watch the branching logic in action.
            </p>
          </div>

          {/* Scenario Buttons */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              disabled={isRunning}
              onClick={() => handleScenarioChange('existing')}
              className={`p-2.5 rounded-xl font-semibold transition-all flex flex-col items-center text-center gap-1 ${
                scenario === 'existing'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className={`w-4 h-4 ${scenario === 'existing' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="text-[11px] leading-tight font-bold">Existing Customer</span>
              <span className="text-[9px] font-mono-tech opacity-70">alex@example.com</span>
            </button>

            <button
              disabled={isRunning}
              onClick={() => handleScenarioChange('new')}
              className={`p-2.5 rounded-xl font-semibold transition-all flex flex-col items-center text-center gap-1 ${
                scenario === 'new'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className={`w-4 h-4 ${scenario === 'new' ? 'text-[#ea580c]' : 'text-slate-400'}`} />
              <span className="text-[11px] leading-tight font-bold">New Customer</span>
              <span className="text-[9px] font-mono-tech opacity-70">maya@example.com</span>
            </button>
          </div>

          {/* Trigger Button */}
          <div className="flex items-center gap-3 pt-1">
            {currentStep === 0 ? (
              <button
                onClick={handleTrigger}
                className="w-full py-3 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>Trigger Workflow (Status Reached)</span>
              </button>
            ) : (
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? `Step ${currentStep} of 10 Running...` : 'Reset & Test Again'}</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 10-STEP ANIMATED PROGRESSION BAR */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold">
              PIPELINE PROGRESSION
            </span>
            <span className="text-xs font-mono-tech text-slate-700 font-bold">
              {currentStep === 0 
                ? 'Standby (Ready to trigger)' 
                : currentStep === 10 
                ? 'Workflow Completed Successfully' 
                : `Step ${currentStep} of 10 in progress`}
            </span>
          </div>

          {currentStep === 10 && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono-tech text-[10px] font-bold flex items-center gap-1 self-start sm:self-auto">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Full Loop Confirmed</span>
            </span>
          )}
        </div>

        {/* 10 Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-xs">
          {stepsList.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div
                key={step.num}
                className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between min-h-[78px] ${
                  isCurrent
                    ? 'bg-orange-50 border-[#ea580c] ring-2 ring-orange-200 text-slate-950 font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50 border-emerald-300 text-slate-800'
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono-tech text-[9px] font-bold ${isCurrent ? 'text-[#ea580c]' : isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {step.num < 10 ? `0${step.num}` : step.num}
                  </span>
                  {isCompleted && <Check className="w-3 h-3 text-emerald-600" />}
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-ping"></span>}
                </div>
                <span className="text-[10px] leading-tight font-semibold mt-1">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SPLIT VIEW: STEP-BY-STEP EXECUTION LOG & LIVE STRUCTURED PAYLOAD */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Step Details & Narrative Execution */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold">
                SYSTEM EXECUTION TRACE
              </span>
              <span className="text-[10px] font-mono-tech text-slate-400">
                Event-Driven Trace
              </span>
            </div>

            {currentStep === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60 text-center space-y-3">
                <Zap className="w-8 h-8 text-[#ea580c] mx-auto opacity-70" />
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-900 text-sm">System Ready on Standby</h5>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                    Click <strong>&quot;Trigger Workflow (Status Reached)&quot;</strong> above to start the automated handoff from the Field Operations Platform to QuickBooks.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {stepsList.slice(0, currentStep).map((s) => {
                  const isCurrent = currentStep === s.num;
                  return (
                    <div
                      key={s.num}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 text-xs ${
                        isCurrent
                          ? 'bg-orange-50/70 border-orange-200 shadow-2xs'
                          : 'bg-slate-50 border-slate-200/70'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-mono-tech text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-[#ea580c] text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {s.num}
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-950 font-bold text-xs">{s.title}</strong>
                          <span className="text-[10px] font-mono-tech text-slate-500 font-medium">
                            {s.actor}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Data Inspector (Synthetic Payloads) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-950 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                DATA STATE & PAYLOAD INSPECTOR
              </span>
              <span className="text-[10px] font-mono-tech bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Synthetic Objects
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono-tech">
              {currentStep < 3 ? (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] block">// Inbound Webhook Payload</span>
                  <pre className="text-slate-200 text-[11px] leading-relaxed overflow-x-auto">{JSON.stringify({
  "event": "project.status_changed",
  "project_id": "PRJ-2048",
  "new_status": "Ready for Accounting",
  "customer": {
    "name": projectData.customer,
    "email": projectData.email
  },
  "quote_total": 4250.00
}, null, 2)}</pre>
                </div>
              ) : currentStep < 6 ? (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] block">// Normalized Data in n8n</span>
                  <pre className="text-slate-200 text-[11px] leading-relaxed overflow-x-auto">{JSON.stringify({
  "normalized": {
    "email": projectData.email,
    "displayName": projectData.customer,
    "projectRef": "PRJ-2048",
    "amount": 4250.00
  },
  "oauth": {
    "provider": "QuickBooks Online",
    "authenticated": true
  }
}, null, 2)}</pre>
                </div>
              ) : currentStep < 9 ? (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] block">// QuickBooks Lookup & Branch</span>
                  <pre className="text-slate-200 text-[11px] leading-relaxed overflow-x-auto">{JSON.stringify({
  "search_query": `SELECT * FROM Customer WHERE PrimaryEmailAddr = '${projectData.email}'`,
  "match_found": scenario === 'existing',
  "branch_taken": scenario === 'existing' ? "USE_EXISTING_RECORD" : "CREATE_NEW_CUSTOMER",
  "resolved_customer_id": scenario === 'existing' ? "QBO-CUST-8401" : "QBO-CUST-9904"
}, null, 2)}</pre>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-emerald-400 text-[10px] block">// Generated QuickBooks Invoice & Outcome</span>
                  <pre className="text-slate-200 text-[11px] leading-relaxed overflow-x-auto">{JSON.stringify({
  "invoice": {
    "invoice_number": "INV-10928",
    "customer_id": scenario === 'existing' ? "QBO-CUST-8401" : "QBO-CUST-9904",
    "amount": 4250.00,
    "description": "Commercial EV Charging Hub Installation",
    "memo": "Field Operations Platform Sync • PRJ-2048"
  },
  "return_outcome": {
    "status": "SUCCESS",
    "returned_to": "Field Operations Platform",
    "timestamp": new Date().toISOString()
  }
}, null, 2)}</pre>
                </div>
              )}
            </div>

            {/* Quick summary footer */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <strong className="text-white block">Customer Matching Logic:</strong>
              Email is used as the matching identifier. If a matching QuickBooks customer is found, the workflow reuses that record; otherwise, it creates a new customer before generating the invoice.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
