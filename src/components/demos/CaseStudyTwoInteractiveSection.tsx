import React, { useState } from 'react';
import { 
  Zap, 
  Database, 
  Layers, 
  Check, 
  ArrowRight, 
  ArrowDown, 
  Search, 
  ShieldCheck, 
  GitBranch, 
  CheckCircle2, 
  UserCheck, 
  UserPlus, 
  FileText, 
  Send, 
  Lock, 
  Code2, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const CaseStudyTwoInteractiveSection: React.FC = () => {
  // Scenario state: 'existing' (Alex Rivera) vs 'new' (Maya Patel)
  const [activeScenario, setActiveScenario] = useState<'existing' | 'new'>('existing');
  const [activeView, setActiveView] = useState<'architecture' | 'transformation' | 'decision'>('architecture');

  return (
    <div className="space-y-10 pt-6">
      
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
          </span>
          <span className="font-mono-tech uppercase tracking-[0.16em] text-xs font-bold text-slate-700">
            WORKFLOW ARCHITECTURE & INTEGRATION LOGIC
          </span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Data Moving Through the System
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          An event-driven pipeline bridging the Field Operations Platform and QuickBooks via n8n. Explore the node topology, test the conditional branching logic, and inspect how data is transformed between operational and accounting conventions.
        </p>

        {/* Honest synthetic disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2.5 max-w-3xl">
          <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Synthetic Reconstruction:</strong> Interactive visualization based on an integration workflow I built in a professional environment. Payloads and customer details use fictional records.
          </div>
        </div>
      </div>

      {/* Sub-view Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'architecture', label: '1. Node-Based Workflow Topology', icon: GitBranch },
          { id: 'transformation', label: '2. Data Transformation Pattern', icon: Layers },
          { id: 'decision', label: '3. Customer Matching & Branch Logic', icon: Search }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. NODE-BASED WORKFLOW TOPOLOGY */}
      {/* ========================================================================= */}
      {activeView === 'architecture' && (
        <div className="space-y-6">
          
          {/* Scenario Selector Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
                INTERACTIVE SCENARIO SELECTOR
              </span>
              <h4 className="font-bold text-slate-950 text-sm sm:text-base">
                Toggle Customer State to Observe Branch Execution
              </h4>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setActiveScenario('existing')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeScenario === 'existing'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${activeScenario === 'existing' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>Scenario A: Existing Customer</span>
              </button>

              <button
                onClick={() => setActiveScenario('new')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeScenario === 'new'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <UserPlus className={`w-3.5 h-3.5 ${activeScenario === 'new' ? 'text-[#ea580c]' : 'text-slate-400'}`} />
                <span>Scenario B: New Customer</span>
              </button>
            </div>
          </div>

          {/* Canvas View */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#fafbfc] border border-slate-200 shadow-xs space-y-8">
            
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div className="space-y-0.5">
                <span className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                  SYSTEM PIPELINE TOPOLOGY
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {activeScenario === 'existing' 
                    ? 'Active Path: Alex Rivera (alex@example.com) → Match Found → Reuse Record' 
                    : 'Active Path: Maya Patel (maya@example.com) → No Match → Create Record First'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono-tech font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Branch Live</span>
              </div>
            </div>

            {/* Step-by-Step Node Chain */}
            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-3">
              
              {/* NODE 1: Field Operations Platform */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  01
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">Field Operations Platform</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-slate-400">Source System</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Customer and project details reside in operational database.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 2: Project Status Reached */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  02
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">Project Status Reached</h5>
                    <span className="text-[10px] font-mono-tech uppercase bg-orange-50 text-orange-800 px-2 py-0.5 rounded font-semibold">
                      Milestone Event
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Project transitions to <strong>&apos;Ready for Accounting&apos;</strong>. No manual trigger button required.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 3: Webhook */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  03
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">Webhook Outbound</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-slate-400">HTTP POST</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Event emits JSON payload containing project ID, customer info, and quote total.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 4: n8n Orchestrator */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  04
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">n8n Workflow Engine</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-orange-700 bg-orange-50 px-2 py-0.5 rounded font-semibold">
                      Orchestrator
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Receives webhook, initializes workflow execution instance, and tracks state.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 5: Get Data */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  05
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">Extract Customer + Project + Quote Data</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-slate-400">Data Parsing</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Extracts customer names, contact email, project ID, and quote total ($4,250.00).
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 6: Transform Data */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  06
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">Transform Data Conventions</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-blue-800 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                      Schema Normalization
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Normalizes whitespace, combines name strings, and prepares structured data needed downstream.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 7: QuickBooks OAuth */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  07
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">QuickBooks OAuth Authentication</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      OAuth Handshake
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Authenticates REST API access using OAuth token headers.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 8: Search Customer by Email */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  08
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">Search Customer by Email</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-slate-400">
                      Primary Identifier
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Queries QuickBooks using email as matching key to prevent duplicate customer accounts.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* ========================================================================= */}
              {/* CONDITIONAL BRANCH NODE (VISUAL STANDOUT MOMENT) */}
              {/* ========================================================================= */}
              <div className="w-full my-3 p-5 rounded-3xl bg-amber-50 border-2 border-amber-300/80 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                      ?
                    </span>
                    <h5 className="font-bold text-amber-950 text-sm">
                      CONDITIONAL DECISION: Customer Exists in QuickBooks?
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono-tech font-bold uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                    n8n IF Node
                  </span>
                </div>

                <p className="text-xs text-amber-900 leading-relaxed">
                  Evaluates whether the search query returned an existing record matching the customer&apos;s email address.
                </p>

                {/* Two Distinct Branch Cards Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  
                  {/* LEFT BRANCH: YES (EXISTING) */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    activeScenario === 'existing'
                      ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-white/60 border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>YES — Match Found</span>
                      </span>
                      {activeScenario === 'existing' && (
                        <span className="text-[10px] font-mono-tech bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                          Active Branch
                        </span>
                      )}
                    </div>
                    <div className="text-xs space-y-1">
                      <strong className="text-slate-900 block">Use Existing Customer Record</strong>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Reuses ID <code className="font-mono-tech bg-slate-100 px-1 py-0.5 rounded">QBO-CUST-8401</code>. Prevents duplicate record creation.
                      </p>
                    </div>
                  </div>

                  {/* RIGHT BRANCH: NO (NEW) */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    activeScenario === 'new'
                      ? 'bg-white border-[#ea580c] ring-2 ring-[#ea580c]/20 shadow-sm'
                      : 'bg-white/60 border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#ea580c] flex items-center gap-1.5">
                        <UserPlus className="w-4 h-4 text-[#ea580c]" />
                        <span>NO — Zero Matches</span>
                      </span>
                      {activeScenario === 'new' && (
                        <span className="text-[10px] font-mono-tech bg-orange-100 text-orange-900 px-2 py-0.5 rounded font-bold">
                          Active Branch
                        </span>
                      )}
                    </div>
                    <div className="text-xs space-y-1">
                      <strong className="text-slate-900 block">Create Customer Record First</strong>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Transforms customer fields and posts to QuickBooks to create new profile, returning new ID.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Converging Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 9: Create Invoice */}
              <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  09
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-950">Create QuickBooks Invoice</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      Transaction Posted
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Attaches resolved customer ID, populates quote cost ($4,250.00), and adds project notes.
                  </p>
                </div>
              </div>

              {/* Connector Down */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
              </div>

              {/* NODE 10: Return Result to Field Operations Platform */}
              <div className="w-full p-4 rounded-2xl bg-slate-950 text-white shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-mono-tech text-xs font-bold">
                  10
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white">Return Result to Source Platform</h5>
                    <span className="text-[10px] font-mono-tech uppercase text-emerald-400 font-bold">
                      Loop Closed
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Sends automation outcome and invoice confirmation back to Field Operations Platform.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DATA TRANSFORMATION PATTERN */}
      {/* ========================================================================= */}
      {activeView === 'transformation' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
              DATA CLEANING & SCHEMA TRANSLATION
            </span>
            <h4 className="font-bold text-slate-950 text-base">
              Synthetic Reconstruction of the Transformation Pattern
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              The operational Field Operations Platform stored customer, project, and quote details in formats optimized for field technicians. The workflow extracted, normalized, and mapped these fields to satisfy QuickBooks Online accounting conventions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Raw Source Payload */}
            <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold">
                    FIELD OPS SOURCE PAYLOAD
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    Inbound Webhook
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Raw payload emitted when project PRJ-2048 reached milestone status.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono-tech text-xs overflow-x-auto leading-relaxed border border-slate-900">
                <pre>{JSON.stringify({
  "customer": {
    "first_name": "Alex",
    "last_name": "Rivera",
    "email": "alex@example.com"
  },
  "project": {
    "project_id": "PRJ-2048"
  },
  "quote": {
    "total": 4250
  }
}, null, 2)}</pre>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1 pt-1">
                <div>• Separate first/last names</div>
                <div>• Flat quote total integer</div>
                <div>• Raw operational identifier</div>
              </div>
            </div>

            {/* Middle: Transformation Rules (n8n Node) */}
            <div className="lg:col-span-4 rounded-2xl bg-orange-50/40 border border-orange-200/80 shadow-2xs p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-orange-200/60 pb-2">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                    TRANSFORMATION LOGIC
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-orange-100 text-orange-900 font-bold">
                    n8n Function Node
                  </span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Logic configured to bridge operational structures into accounting requirements:
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-orange-200/60 space-y-1">
                  <span className="font-bold text-slate-900 block text-[11px]">1. Customer Identity & Naming</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Trims whitespace and concatenates <code className="font-mono-tech bg-slate-100 px-1 py-0.5 rounded">first_name</code> + <code className="font-mono-tech bg-slate-100 px-1 py-0.5 rounded">last_name</code> into standardized display name.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-orange-200/60 space-y-1">
                  <span className="font-bold text-slate-900 block text-[11px]">2. Deterministic Email Key</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Lowercases and validates email address as the authoritative lookup key for QuickBooks.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-orange-200/60 space-y-1">
                  <span className="font-bold text-slate-900 block text-[11px]">3. Quote & Notes Packaging</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Formats quote amount as floating point currency and attaches project ID to transaction reference notes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#ea580c] font-semibold pt-1">
                <ArrowRight className="w-4 h-4" />
                <span>Maps cleanly to QuickBooks objects</span>
              </div>
            </div>

            {/* Right: Synthetic QuickBooks-Ready Schema */}
            <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold">
                    QUICKBOOKS-READY STRUCTURE
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                    Normalized Schema
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Cleaned representation ready for customer lookup and invoice endpoints.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono-tech text-xs overflow-x-auto leading-relaxed border border-slate-900">
                <pre>{JSON.stringify({
  "customerLookup": {
    "email": "alex@example.com",
    "normalizedDisplayName": "Alex Rivera"
  },
  "invoiceData": {
    "projectReference": "PRJ-2048",
    "amount": 4250.00,
    "memo": "Field Operations Platform Sync • Ref: PRJ-2048"
  }
}, null, 2)}</pre>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1 pt-1">
                <div>• Cleaned display name</div>
                <div>• Verified email lookup string</div>
                <div>• Decimalized billable amount</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CUSTOMER LOOKUP & BRANCHING LOGIC */}
      {/* ========================================================================= */}
      {activeView === 'decision' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
              DETERMINISTIC LOOKUP COMPARISON
            </span>
            <h4 className="font-bold text-slate-950 text-base">
              Comparing Existing Customer vs. New Customer Execution
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              To prevent duplicate records in QuickBooks, customer email served as the authoritative identifier. The workflow dynamically branched depending on search query results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Scenario A Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    A
                  </span>
                  <div>
                    <h5 className="font-bold text-slate-950 text-sm">SCENARIO A — EXISTING CUSTOMER</h5>
                    <span className="text-[10px] font-mono-tech text-slate-500">Query Returns Matching Account</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  Match Found
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-mono-tech text-[11px]">Customer Email:</span>
                  <span className="font-mono-tech font-bold text-slate-900">alex@example.com</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-mono-tech text-[11px]">QuickBooks Search:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Match Found (1 record)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-mono-tech text-[11px]">Branch Action:</span>
                  <span className="font-semibold text-slate-800">Use Existing Customer Record</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-900 font-mono-tech text-[11px]">Resolved Customer ID:</span>
                  <code className="font-mono-tech font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    QBO-CUST-8401
                  </code>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold block">
                    INVOICE CREATION OUTCOME
                  </span>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    Invoice generated immediately using customer ID <code className="font-mono-tech bg-white px-1 py-0.5 rounded">QBO-CUST-8401</code> with quote amount $4,250. No duplicate customer record created.
                  </p>
                </div>
              </div>
            </div>

            {/* Scenario B Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold text-xs">
                    B
                  </span>
                  <div>
                    <h5 className="font-bold text-slate-950 text-sm">SCENARIO B — NEW CUSTOMER</h5>
                    <span className="text-[10px] font-mono-tech text-slate-500">Query Returns 0 Matches</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech bg-orange-50 text-orange-800 px-2 py-0.5 rounded font-bold border border-orange-200">
                  No Match
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-mono-tech text-[11px]">Customer Email:</span>
                  <span className="font-mono-tech font-bold text-slate-900">maya@example.com</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-mono-tech text-[11px]">QuickBooks Search:</span>
                  <span className="text-orange-700 font-bold flex items-center gap-1">
                    <UserPlus className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span>No Match (0 records)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-mono-tech text-[11px]">Branch Action:</span>
                  <span className="font-semibold text-slate-800">Create Customer Record First</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50 border border-orange-200">
                  <span className="text-orange-900 font-mono-tech text-[11px]">New Customer ID Returned:</span>
                  <code className="font-mono-tech font-bold text-orange-900 bg-white px-2 py-0.5 rounded border border-orange-200">
                    QBO-CUST-9904
                  </code>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold block">
                    INVOICE CREATION OUTCOME
                  </span>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    Customer record created with normalized name and contact email, then invoice generated using the returned ID <code className="font-mono-tech bg-white px-1 py-0.5 rounded">QBO-CUST-9904</code>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MONIQUE'S ROLE IN THE INTEGRATION */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
            MY CONTRIBUTION
          </span>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
            What I Solutioned & Built
          </h4>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
            This project required translating business operations into automated technical logic, configuring API handshakes, and building resilient branching without relying on manual steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {[
            {
              title: 'Understanding the Manual Workflow',
              desc: 'Mapped the manual steps finance staff were taking to copy completed operational projects into QuickBooks.'
            },
            {
              title: 'Determining the Automation Trigger',
              desc: 'Selected the project milestone status ("Ready for Accounting") so the business process triggers the flow automatically without a separate button.'
            },
            {
              title: 'Connecting Systems via n8n',
              desc: 'Orchestrated the multi-step integration between the Field Operations Platform webhook emitter and QuickBooks REST API.'
            },
            {
              title: 'Configuring QuickBooks OAuth',
              desc: 'Handled OAuth authentication and credential security for reliable REST API communication.'
            },
            {
              title: 'Transforming Data Conventions',
              desc: 'Wrote the data mapping logic to clean, format, and normalize incoming operational records for accounting schemas.'
            },
            {
              title: 'Designing Customer Matching Logic',
              desc: 'Identified customer email as the authoritative identifier to search QuickBooks and prevent duplicate accounts.'
            },
            {
              title: 'Implementing Conditional Branching',
              desc: 'Engineered the workflow decision node to dynamically handle both existing accounts and first-time customer creation.'
            },
            {
              title: 'Invoice Generation & Loop Closure',
              desc: 'Constructed the invoice creation payload using quote costs and notes, and returned the outcome back to the Field Operations Platform.'
            },
            {
              title: 'End-to-End Integration Testing',
              desc: 'Validated execution paths across both existing customer and new customer test scenarios to verify deterministic behavior.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center font-mono-tech text-[10px] shrink-0 mt-0.5 font-bold">
                {idx + 1}
              </span>
              <div className="space-y-0.5">
                <strong className="text-slate-900 block text-xs">{item.title}</strong>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Capabilities Pill Grid */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
        <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
          VERIFIED TECHNICAL CAPABILITIES PROVEN IN THIS WORKFLOW
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            'Workflow Automation',
            'REST API Integration',
            'Webhooks',
            'OAuth',
            'JSON / Data Transformation',
            'Conditional Logic',
            'System Integration',
            'n8n',
            'QuickBooks Integration',
            'End-to-End Testing'
          ].map((skill, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200 shadow-2xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
