import React, { useState } from 'react';
import { 
  Search, 
  Key, 
  ExternalLink, 
  Check, 
  Clock, 
  MapPin, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  FolderKanban, 
  MessageSquare, 
  Send, 
  Radio, 
  Globe, 
  Database, 
  Layers, 
  AlertCircle 
} from 'lucide-react';
import { ConnectedProjectExperienceSimulator } from './ConnectedProjectExperienceSimulator';

interface SyntheticProject {
  id: string;
  projectName: string;
  address: string;
  stage: 'Survey' | 'Permit Review' | 'Scheduled Installation' | 'Commissioned';
  technicianName: string;
  scheduledDate: string;
  permitStatus: 'Approved' | 'Pending Municipal Review' | 'Filed';
  internalCostCode: string; // demonstrates excluding internal-only fields
  customerSafeSummary: string;
  nextStep: string;
}

const SYNTHETIC_DATABASE: Record<string, SyntheticProject[]> = {
  'alex@example.com': [
    {
      id: 'PRJ-9942',
      projectName: 'Rivera Residential Dual Level 2 Charger',
      address: '742 Evergreen Terrace, Springfield',
      stage: 'Scheduled Installation',
      technicianName: 'Jordan M. (Master Lic. #4802)',
      scheduledDate: 'Tomorrow, 10:00 AM - 1:00 PM',
      permitStatus: 'Approved',
      internalCostCode: 'CC-ELEC-409',
      customerSafeSummary: 'Permits cleared. Crew dispatched for panel connection and charger mounting.',
      nextStep: 'Installation arrival & hardware mounting'
    }
  ],
  'jamie@example.com': [
    {
      id: 'PRJ-8810',
      projectName: 'Fleet Charging Hub (Bay A - Rapid DC)',
      address: '104 Industrial Pkwy (Fleet Bay 1)',
      stage: 'Permit Review',
      technicianName: 'Elena Rostova (Commercial Engineering)',
      scheduledDate: 'Estimated Oct 4, 2026',
      permitStatus: 'Pending Municipal Review',
      internalCostCode: 'CC-ENG-910',
      customerSafeSummary: 'Engineering load calculations submitted to municipal building department.',
      nextStep: 'Municipal permit sign-off'
    },
    {
      id: 'PRJ-8814',
      projectName: 'Fleet Depot Solar Canopy Interface',
      address: '104 Industrial Pkwy (Bay B Auxiliary)',
      stage: 'Survey',
      technicianName: 'Site Survey Specialist Team',
      scheduledDate: 'Completed Last Friday',
      permitStatus: 'Filed',
      internalCostCode: 'CC-SURV-102',
      customerSafeSummary: 'Topographical electrical survey completed and logged.',
      nextStep: 'Utility interconnect study'
    }
  ]
};

export const CustomerProjectAccessFlow: React.FC = () => {
  // Test presets
  const [emailInput, setEmailInput] = useState<string>('alex@example.com');
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [activeSubView, setActiveSubView] = useState<'access' | 'chat'>('access');

  // Search state machine
  const [queryState, setQueryState] = useState<'idle' | 'searching' | 'results' | 'authenticated'>('idle');
  const [matchedProjects, setMatchedProjects] = useState<SyntheticProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<SyntheticProject | null>(null);
  const [tokenGenerated, setTokenGenerated] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: 'customer' | 'installer' | 'system';
    text: string;
    time: string;
  }>>([
    {
      id: 'c1',
      sender: 'system',
      text: 'Token verified. Connected to active project PRJ-9942 thread.',
      time: '9:00 AM'
    },
    {
      id: 'c2',
      sender: 'installer',
      text: 'Hello Alex! We are on schedule for your charger installation tomorrow morning.',
      time: '9:05 AM'
    }
  ]);
  const [msgInput, setMsgInput] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  const handleSearch = (emailToQuery: string) => {
    setQueryState('searching');
    setSelectedProject(null);
    setTokenGenerated(null);
    setCurrentStepIndex(1); // Webhook trigger

    setTimeout(() => {
      setCurrentStepIndex(2); // Search Field Operations Platform
    }, 300);

    setTimeout(() => {
      setCurrentStepIndex(3); // Normalize
    }, 600);

    setTimeout(() => {
      const records = SYNTHETIC_DATABASE[emailToQuery.trim().toLowerCase()] || [];
      setMatchedProjects(records);
      setQueryState('results');
      setCurrentStepIndex(4); // Finished

      if (records.length === 1) {
        setSelectedProject(records[0]);
        setTokenGenerated(`tok_access_${Math.random().toString(36).substring(2, 11)}`);
      }
    }, 850);
  };

  const handleSelectProject = (project: SyntheticProject) => {
    setSelectedProject(project);
    setTokenGenerated(`tok_access_${Math.random().toString(36).substring(2, 11)}`);
    setQueryState('authenticated');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    const userText = msgInput;
    setMsgInput('');

    const newMsg = {
      id: `usr_${Date.now()}`,
      sender: 'customer' as const,
      text: userText,
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setUnreadCount(prev => prev + 1);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: `inst_${Date.now()}`,
          sender: 'installer',
          text: lang === 'en' 
            ? 'Got it! The electrical installer team has flagged this note in your project docket.' 
            : '¡Recibido! El equipo de electricistas ha registrado esta nota en su expediente.',
          time: 'Just now'
        }
      ]);
      setUnreadCount(0);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Sub-Navigation */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
              BUILD 03 • CONNECTED CUSTOMER PROJECT EXPERIENCE
            </span>
            <h4 className="font-display font-bold text-slate-950 text-base sm:text-lg">
              Project Access, Structured Actions & Human-in-the-Loop Communication
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Explore a connected customer experience designed around a field-service platform. Customers can retrieve project information, complete structured actions, or communicate directly with the team when a request requires human judgment.
            </p>
          </div>

          {/* Bilingual Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                lang === 'en' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                lang === 'es' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Español
            </button>
          </div>
        </div>

        {/* View Switcher: Access Flow vs Real-time Messaging */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveSubView('access')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubView === 'access'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>1. Customer Project Access Flow</span>
          </button>

          <button
            onClick={() => setActiveSubView('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubView === 'chat'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>2. Real-Time Connected Experience Simulator (3 Interaction Paths)</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-VIEW 1: ACCESS FLOW SIMULATOR */}
      {/* ========================================================================= */}
      {activeSubView === 'access' && (
        <div className="space-y-6">
          {/* Email Input Bar */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
              ENTER CUSTOMER EMAIL
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="alex@example.com, jamie@example.com, unknown@example.com"
                  className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                />
              </div>

              <button
                onClick={() => handleSearch(emailInput)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Query Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Test Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 text-[11px]">Test scenarios:</span>
              <button
                onClick={() => {
                  setEmailInput('alex@example.com');
                  handleSearch('alex@example.com');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono-tech text-[11px]"
              >
                1 Match: alex@example.com
              </button>
              <button
                onClick={() => {
                  setEmailInput('jamie@example.com');
                  handleSearch('jamie@example.com');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono-tech text-[11px]"
              >
                Multiple Matches: jamie@example.com
              </button>
              <button
                onClick={() => {
                  setEmailInput('unknown@example.com');
                  handleSearch('unknown@example.com');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono-tech text-[11px]"
              >
                0 Matches: unknown@example.com
              </button>
            </div>
          </div>

          {/* n8n Orchestration Pipeline Visualizer */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 text-xs">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
              AUTOMATION PIPELINE EXECUTION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
              {[
                { title: 'Customer Email', desc: 'POST Webhook trigger' },
                { title: 'Platform Query', desc: 'REST Search against Field Ops' },
                { title: 'Transform & Filter', desc: 'Exclude internal fields' },
                { title: 'Token-Based Access', desc: 'Issue customer context' }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border transition-all ${
                    currentStepIndex > idx || queryState === 'results'
                      ? 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200'
                      : currentStepIndex === idx && queryState === 'searching'
                      ? 'bg-orange-950/60 border-orange-500 text-orange-200 animate-pulse'
                      : 'bg-slate-800/60 border-slate-700 text-slate-500'
                  }`}
                >
                  <span className="font-mono-tech text-[9px] block opacity-70">Step 0{idx + 1}</span>
                  <strong className="block font-semibold">{step.title}</strong>
                  <span className="text-[10px] opacity-80">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results: Zero Matches */}
          {queryState === 'results' && matchedProjects.length === 0 && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h5 className="font-display font-bold text-slate-900 text-sm">
                No active project records found for {emailInput}
              </h5>
              <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                The lookup safely evaluates to 0 records. The customer interface provides guidance to contact the installation support team rather than failing with an error.
              </p>
            </div>
          )}

          {/* Results: Multiple Matches Picker */}
          {queryState === 'results' && matchedProjects.length > 1 && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-blue-600 font-bold block">
                    MULTI-PROJECT MATCH
                  </span>
                  <h5 className="font-display font-bold text-slate-900 text-sm">
                    {matchedProjects.length} Projects Found for {emailInput}
                  </h5>
                </div>
                <span className="text-xs text-slate-500">Select a project to inspect:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => handleSelectProject(proj)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      selectedProject?.id === proj.id
                        ? 'border-[#ea580c] bg-orange-50/40 ring-1 ring-[#ea580c]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono-tech text-[10px] font-bold text-slate-500">{proj.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                        {proj.stage}
                      </span>
                    </div>
                    <strong className="text-slate-900 text-xs block">{proj.projectName}</strong>
                    <span className="text-slate-500 text-[11px] block">{proj.address}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Single or Selected Project Details */}
          {selectedProject && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Customer View */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-5 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">
                      {lang === 'en' ? 'Project Reference' : 'Referencia de Proyecto'}
                    </span>
                    <strong className="text-sm font-bold text-slate-900">{selectedProject.projectName}</strong>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold bg-emerald-100 text-emerald-800">
                    {selectedProject.stage}
                  </span>
                </div>

                {/* 4-Step Milestone Tracker */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
                    {lang === 'en' ? 'PROJECT PATHWAY' : 'PROGRESO DEL PROYECTO'}
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    {[
                      { name: lang === 'en' ? 'Survey' : 'Evaluación', done: true },
                      { name: lang === 'en' ? 'Permits' : 'Permisos', done: selectedProject.stage !== 'Survey' },
                      { name: lang === 'en' ? 'Installation' : 'Instalación', done: selectedProject.stage === 'Scheduled Installation' || selectedProject.stage === 'Commissioned' },
                      { name: lang === 'en' ? 'Commissioned' : 'Puesta en Marcha', done: selectedProject.stage === 'Commissioned' }
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl border ${
                          step.done
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        {step.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Normalized Attributes */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">{lang === 'en' ? 'Assigned Crew:' : 'Equipo Asignado:'}</span>
                    <strong className="text-slate-900">{selectedProject.technicianName}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">{lang === 'en' ? 'Schedule Window:' : 'Ventana de Horario:'}</span>
                    <span className="font-mono-tech font-semibold text-slate-900">{selectedProject.scheduledDate}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">{lang === 'en' ? 'Next Step:' : 'Siguiente Paso:'}</span>
                    <strong className="text-slate-900">{selectedProject.nextStep}</strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 text-slate-800">
                    <span className="font-bold block text-[#ea580c] mb-0.5">
                      {lang === 'en' ? 'Customer Safe Summary:' : 'Resumen para el Cliente:'}
                    </span>
                    <p className="text-[11px] leading-relaxed">{selectedProject.customerSafeSummary}</p>
                  </div>
                </div>
              </div>

              {/* Data Hygiene & Token Card */}
              <div className="lg:col-span-5 space-y-4">
                {/* Token Card */}
                <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-2 text-xs border border-slate-900 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] text-[#ea580c] font-bold uppercase">
                      TOKEN-BASED PROJECT ACCESS
                    </span>
                    <span className="text-[10px] font-mono-tech text-slate-400">Valid: 24h</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono-tech text-emerald-400 text-xs break-all">
                    {tokenGenerated || 'tok_access_live_session'}
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Token-based access links project context directly to verified customer sessions without requiring an enterprise account password.
                  </p>
                </div>

                {/* Transformation Proof */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Data Transformation Verification</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Transforms platform-oriented project data into the customer-facing information needed for the experience while excluding internal-only fields (such as internal cost code <strong>{selectedProject.internalCostCode}</strong>).
                  </p>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px]">
                    ✓ <strong>Transformation Applied:</strong> Internal fields and technician dispatch codes are excluded before delivering customer-facing project status and relevant project context.
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 2: REAL-TIME CONNECTED EXPERIENCE SIMULATOR */}
      {/* ========================================================================= */}
      {activeSubView === 'chat' && (
        <div className="space-y-6">
          <ConnectedProjectExperienceSimulator />
        </div>
      )}

    </div>
  );
};
