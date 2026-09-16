import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Check, 
  Layers, 
  MessageSquare, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Clock, 
  AlertCircle,
  Database,
  Terminal,
  Activity,
  User,
  Wrench,
  Radio,
  FileText,
  UserCheck,
  Calendar,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { ConnectedProjectExperienceSimulator } from './ConnectedProjectExperienceSimulator';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'system' | 'human';
  text: string;
  timestamp: string;
  authorTitle?: string;
  category?: string;
  isProjectData?: boolean;
}

interface ProjectActivityEntry {
  id: string;
  timestamp: string;
  title: string;
  detail: string;
  handler: string;
  type: 'customer_lookup' | 'project_data_query' | 'human_support' | 'field_note';
}

export const CaseStudyThreeInteractiveSection: React.FC = () => {
  // Simulator State for Customer Email lookup
  const [testEmail, setTestEmail] = useState<'alex' | 'jamie' | 'unknown'>('alex');
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [activeTab, setActiveTab] = useState<'flow' | 'transform' | 'messaging' | 'analytics'>('flow');

  // Real-time Chat simulator state (Dual-Path: Project Data vs Human Support)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'system',
      text: 'Project access verified via time-bound token. Connected to Project PRJ-9942.',
      timestamp: 'Today, 9:00 AM',
      category: 'System Access'
    },
    {
      id: 'm-2',
      sender: 'customer',
      text: "What's the status of my installation?",
      timestamp: 'Today, 9:02 AM',
      category: 'Project Data Lookup'
    },
    {
      id: 'm-3',
      sender: 'system',
      isProjectData: true,
      text: 'Your project is currently in Installation Scheduling (Ready for Installation). Scheduled arrival: Tomorrow between 10:00 AM – 1:00 PM with West Crew #04.',
      timestamp: 'Today, 9:02 AM',
      category: 'Retrieved Project Context'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [internalUnreadCount, setInternalUnreadCount] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState('Today, 9:02 AM');
  const [isRoutingToHuman, setIsRoutingToHuman] = useState(false);

  // Synthetic Project Activity & Operational Notes docket (reflects communication back to internal platform)
  const [projectActivityLog, setProjectActivityLog] = useState<ProjectActivityEntry[]>([
    {
      id: 'act-1',
      timestamp: 'Today, 9:00 AM',
      title: 'Customer Session Initiated',
      detail: 'Alex Rivera verified access token via email lookup.',
      handler: 'System Token Service',
      type: 'customer_lookup'
    },
    {
      id: 'act-2',
      timestamp: 'Today, 9:02 AM',
      title: 'Project Information Query',
      detail: 'Customer queried installation status. Returned normalized stage: Ready for Installation.',
      handler: 'Field Operations Platform API (Auto)',
      type: 'project_data_query'
    }
  ]);

  // Email scenarios
  const scenarios = {
    alex: {
      email: 'alex@example.com',
      matchType: 'Single Project Match (1 Found)',
      sourceProject: {
        raw_id: 'proj_rec_9942',
        project_status: 'INSTALL_READY',
        customer_email: 'alex@example.com',
        customer_name: 'Alex Rivera',
        address_line: '742 Evergreen Terrace, Springfield',
        assigned_team: {
          crew_code: 'CREW-WEST-04',
          lead_electrician: 'Jordan M. (Master Lic. #4802)',
          internal_phone: '555-0192'
        },
        internal_fields: {
          internal_cost_code: 'CC-ELEC-409',
          labor_budget_hours: 14.5,
          internal_routing_notes: 'Crew routing West Sector dispatch zone.'
        },
        scheduled_window: 'Tomorrow, 10:00 AM - 1:00 PM'
      },
      normalizedCustomerView: {
        projectStatus: lang === 'en' ? 'Ready for Installation' : 'Listo para Instalación',
        nextStep: lang === 'en' ? 'Installation arrival & hardware mounting' : 'Llegada de instalación y montaje',
        assignedTeam: lang === 'en' ? 'Installation Crew (Jordan M.)' : 'Equipo de Instalación (Jordan M.)',
        scheduledWindow: 'Tomorrow, 10:00 AM - 1:00 PM',
        timeline: [
          { name: lang === 'en' ? 'Site Assessment' : 'Evaluación del Sitio', status: 'completed' },
          { name: lang === 'en' ? 'Permits & Clearances' : 'Permisos y Autorizaciones', status: 'completed' },
          { name: lang === 'en' ? 'Installation' : 'Instalación', status: 'current' },
          { name: lang === 'en' ? 'Commissioning' : 'Puesta en Servicio', status: 'upcoming' }
        ]
      }
    },
    jamie: {
      email: 'jamie@example.com',
      matchType: 'Multiple Projects Match (2 Found)',
      sourceProject: {
        raw_id: 'proj_rec_8810',
        project_status: 'PERMIT_REVIEW',
        customer_email: 'jamie@example.com',
        customer_name: 'Jamie Taylor',
        address_line: '104 Industrial Pkwy (Fleet Bay 1)',
        assigned_team: {
          crew_code: 'COMMERCIAL-ENG-02',
          lead_electrician: 'Elena Rostova',
          internal_phone: '555-0844'
        },
        internal_fields: {
          internal_cost_code: 'CC-ENG-910',
          labor_budget_hours: 32.0,
          internal_routing_notes: 'Commercial meter panel upgrade pending utility review.'
        },
        scheduled_window: 'Estimated Oct 4, 2026'
      },
      normalizedCustomerView: {
        projectStatus: lang === 'en' ? 'Permit Under Municipal Review' : 'Permiso en Revisión Municipal',
        nextStep: lang === 'en' ? 'Utility engineering sign-off' : 'Aprobación de ingeniería de servicios',
        assignedTeam: lang === 'en' ? 'Commercial Engineering Team' : 'Equipo de Ingeniería Comercial',
        scheduledWindow: 'Pending municipal review',
        timeline: [
          { name: lang === 'en' ? 'Site Assessment' : 'Evaluación del Sitio', status: 'completed' },
          { name: lang === 'en' ? 'Permits & Clearances' : 'Permisos y Autorizaciones', status: 'current' },
          { name: lang === 'en' ? 'Installation' : 'Instalación', status: 'upcoming' },
          { name: lang === 'en' ? 'Commissioning' : 'Puesta en Servicio', status: 'upcoming' }
        ]
      }
    },
    unknown: {
      email: 'unknown@example.com',
      matchType: 'Zero Projects Match (0 Found)',
      sourceProject: null,
      normalizedCustomerView: null
    }
  };

  const currentScenario = scenarios[testEmail];

  // Helper to classify and route queries along Path A (Project Data Retrieval) or Path B (Human Support)
  const processCustomerMessage = (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'customer',
      text,
      timestamp: 'Just now',
      category: 'Customer Message'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setLastActivityTime('Just now');

    const lower = text.toLowerCase();
    
    // Path A: Grounded project data queries (status, schedule/window, crew/team, permits, next steps)
    const isProjectInfoQuery = 
      lower.includes('status') || 
      lower.includes('when') || 
      lower.includes('time') || 
      lower.includes('eta') || 
      lower.includes('window') || 
      lower.includes('date') || 
      lower.includes('who') || 
      lower.includes('crew') || 
      lower.includes('installer') || 
      lower.includes('permit') || 
      lower.includes('stage') ||
      lower.includes('progress') ||
      lower.includes('next step') ||
      lower.includes('cuándo') ||
      lower.includes('hora') ||
      lower.includes('estado');

    // Path B: Requests requiring human judgment, approvals, or exceptions (rescheduling, cancellation, custom questions)
    const isHumanEscalation = 
      lower.includes('reschedule') || 
      lower.includes('change date') || 
      lower.includes('cancel') || 
      lower.includes('postpone') || 
      lower.includes('speak') || 
      lower.includes('human') || 
      lower.includes('person') || 
      lower.includes('representative') || 
      lower.includes('gate code') || 
      lower.includes('dog') || 
      lower.includes('access') ||
      lower.includes('reprogramar') ||
      lower.includes('cambiar') ||
      lower.includes('cancelar') ||
      !isProjectInfoQuery;

    if (isProjectInfoQuery && !isHumanEscalation) {
      // PATH A: Self-Service Project Data Lookup (Retrieves directly from Field Operations Platform data)
      setTimeout(() => {
        let replyContent = '';
        if (lower.includes('status') || lower.includes('stage') || lower.includes('progress') || lower.includes('estado')) {
          replyContent = lang === 'en'
            ? `Your project PRJ-9942 status: "${currentScenario.normalizedCustomerView?.projectStatus || 'Ready for Installation'}". Next step: ${currentScenario.normalizedCustomerView?.nextStep || 'Crew arrival and hardware mounting'}.`
            : `Estado de su proyecto PRJ-9942: "${currentScenario.normalizedCustomerView?.projectStatus || 'Listo para Instalación'}". Próximo paso: ${currentScenario.normalizedCustomerView?.nextStep || 'Llegada de la cuadrilla y montaje del equipo'}.`;
        } else if (lower.includes('when') || lower.includes('time') || lower.includes('eta') || lower.includes('window') || lower.includes('date') || lower.includes('cuándo')) {
          replyContent = lang === 'en'
            ? `According to current operational records for PRJ-9942, your scheduled window is: ${currentScenario.normalizedCustomerView?.scheduledWindow || 'Tomorrow, 10:00 AM – 1:00 PM'}.`
            : `Según los registros operativos para PRJ-9942, su ventana de instalación programada es: ${currentScenario.normalizedCustomerView?.scheduledWindow || 'Mañana, 10:00 AM – 1:00 PM'}.`;
        } else if (lower.includes('who') || lower.includes('crew') || lower.includes('installer') || lower.includes('cuadrilla')) {
          replyContent = lang === 'en'
            ? `Assigned team: ${currentScenario.normalizedCustomerView?.assignedTeam || 'West Electrical Crew #04 (Jordan M., Lead)'}.`
            : `Equipo asignado: ${currentScenario.normalizedCustomerView?.assignedTeam || 'Cuadrilla Eléctrica Oeste #04 (Jordan M., Líder)'}.`;
        } else {
          replyContent = lang === 'en'
            ? `Retrieved Project Information (PRJ-9942): Status is ${currentScenario.normalizedCustomerView?.projectStatus || 'Ready for Installation'}, scheduled for ${currentScenario.normalizedCustomerView?.scheduledWindow || 'Tomorrow, 10:00 AM – 1:00 PM'}.`
            : `Información del Proyecto (PRJ-9942): El estado es ${currentScenario.normalizedCustomerView?.projectStatus || 'Listo para Instalación'}, programado para ${currentScenario.normalizedCustomerView?.scheduledWindow || 'Mañana, 10:00 AM – 1:00 PM'}.`;
        }

        const systemDataMsg: ChatMessage = {
          id: `sys-data-${Date.now()}`,
          sender: 'system',
          isProjectData: true,
          authorTitle: lang === 'en' ? 'Field Operations Platform (Auto-Retrieved)' : 'Plataforma de Operaciones de Campo (Auto-Recuperado)',
          text: replyContent,
          timestamp: 'Just now',
          category: 'Path A: Project Data Lookup'
        };

        setChatMessages(prev => [...prev, systemDataMsg]);

        // Reflect into internal project activity docket
        setProjectActivityLog(prev => [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            title: 'Project Data Lookup (Customer Self-Service)',
            detail: `Customer queried project context: "${text.length > 40 ? text.substring(0, 40) + '...' : text}". Grounded platform context returned automatically.`,
            handler: 'Field Operations Platform API (Auto)',
            type: 'project_data_query'
          },
          ...prev
        ]);
      }, 700);

    } else {
      // PATH B: Human Support Routing (Routes to Installer / Operations Team)
      setIsRoutingToHuman(true);
      setInternalUnreadCount(prev => prev + 1);

      // System notification indicating the request has been routed to the human team
      setTimeout(() => {
        const routeAckMsg: ChatMessage = {
          id: `sys-route-${Date.now()}`,
          sender: 'system',
          text: lang === 'en'
            ? '⚡ Notice: Your request requires field confirmation or scheduling adjustments. It has been routed directly to your assigned installer & office dispatch team.'
            : '⚡ Aviso: Su solicitud requiere confirmación en campo o ajustes de programación. Ha sido canalizada directamente a su cuadrilla y equipo de despacho.',
          timestamp: 'Just now',
          category: 'Path B: Routed to Human Team'
        };

        setChatMessages(prev => [...prev, routeAckMsg]);

        // Reflect message into operational activity history
        setProjectActivityLog(prev => [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            title: 'Customer Inquiry Routed to Human Team',
            detail: `Customer submitted: "${text.length > 45 ? text.substring(0, 45) + '...' : text}". Flagged in internal thread for technician / dispatch review.`,
            handler: 'Routing Engine → Jordan M. (Installer) / Dispatch',
            type: 'human_support'
          },
          ...prev
        ]);
        setIsRoutingToHuman(false);
      }, 600);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const text = inputMsg;
    setInputMsg('');
    processCustomerMessage(text);
  };

  // Simulates a human team member (installer or office dispatcher) responding directly to a routed inquiry
  const handleSimulateHumanReply = (presetReply: string) => {
    const humanMsg: ChatMessage = {
      id: `human-${Date.now()}`,
      sender: 'human',
      authorTitle: 'Jordan M. (Lead Installer / West Crew #04)',
      text: presetReply,
      timestamp: 'Just now',
      category: 'Path B: Human Installer Reply'
    };

    setChatMessages(prev => [...prev, humanMsg]);
    setInternalUnreadCount(0);
    setLastActivityTime('Just now');

    // Reflect into internal project notes
    setProjectActivityLog(prev => [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Installer Response Sent & Logged',
        detail: `Jordan M. replied: "${presetReply.length > 45 ? presetReply.substring(0, 45) + '...' : presetReply}". Logged to project thread.`,
        handler: 'Jordan M. (Lead Installer)',
        type: 'field_note'
      },
      ...prev
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Interactive Exploration Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
              INTERACTIVE ARCHITECTURAL RECONSTRUCTION
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              System Demonstration: Access, Data Transformation & Real-Time Messaging
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Explore how customer email lookups trigger the n8n webhook and Field Operations Platform search, how platform-oriented data is transformed into customer-facing project status and relevant project context while excluding internal-only fields, and how real-time communication operates with Socket.IO.
            </p>
          </div>

          {/* Language Toggle for English/Spanish Localization */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl self-start sm:self-auto">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <span className="text-[10px] font-mono-tech text-slate-400 mr-1">Locale:</span>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                lang === 'en' ? 'bg-[#ea580c] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                lang === 'es' ? 'bg-[#ea580c] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Español
            </button>
          </div>
        </div>

        {/* Tab Controls for Different Architectural Facets */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {[
            { id: 'flow', label: '1. End-to-End System Topology' },
            { id: 'transform', label: '2. Source Data → Customer Transformation' },
            { id: 'messaging', label: '3. Connected Communication Simulator (3 Interaction Paths)' },
            { id: 'analytics', label: '4. Prototype Operational Visibility' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SYSTEM TOPOLOGY & EMAIL LOOKUP */}
      {/* ========================================================================= */}
      {activeTab === 'flow' && (
        <div className="space-y-6">
          {/* Email Scenario Picker */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
                  STEP 1: TEST SYNTHETIC CUSTOMER LOOKUP
                </span>
                <h4 className="font-display text-base font-bold text-slate-950">
                  Select a synthetic customer scenario to test access matching:
                </h4>
              </div>
              <span className="text-xs font-mono-tech text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                {currentScenario.matchType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setTestEmail('alex')}
                className={`p-3.5 rounded-2xl border text-left transition-all text-xs space-y-1 ${
                  testEmail === 'alex'
                    ? 'border-2 border-[#ea580c] bg-orange-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold block">Alex Rivera</strong>
                  <span className="font-mono-tech text-[10px] text-emerald-600 font-bold">1 Project</span>
                </div>
                <span className="font-mono-tech text-slate-500 text-[11px] block">alex@example.com</span>
                <span className="text-[10px] text-slate-600 block">Status: Install Ready (Single record match)</span>
              </button>

              <button
                onClick={() => setTestEmail('jamie')}
                className={`p-3.5 rounded-2xl border text-left transition-all text-xs space-y-1 ${
                  testEmail === 'jamie'
                    ? 'border-2 border-[#ea580c] bg-orange-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold block">Jamie Taylor</strong>
                  <span className="font-mono-tech text-[10px] text-blue-600 font-bold">2 Projects</span>
                </div>
                <span className="font-mono-tech text-slate-500 text-[11px] block">jamie@example.com</span>
                <span className="text-[10px] text-slate-600 block">Status: Multi-match selection prompt</span>
              </button>

              <button
                onClick={() => setTestEmail('unknown')}
                className={`p-3.5 rounded-2xl border text-left transition-all text-xs space-y-1 ${
                  testEmail === 'unknown'
                    ? 'border-2 border-[#ea580c] bg-orange-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold block">Unregistered User</strong>
                  <span className="font-mono-tech text-[10px] text-slate-500 font-bold">0 Matches</span>
                </div>
                <span className="font-mono-tech text-slate-500 text-[11px] block">unknown@example.com</span>
                <span className="text-[10px] text-slate-600 block">Status: Graceful not-found messaging</span>
              </button>
            </div>
          </div>

          {/* System Diagram: Multi-tier Flow */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#fafbfc] border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-500 font-bold">
                SYSTEM ARCHITECTURAL TOPOLOGY (ACCESS, DUAL-PATH COMMUNICATION & LOGGING)
              </span>
              <span className="text-[11px] font-mono-tech text-slate-400">
                Verified Multi-Tier Architecture
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              {/* Node 1 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <span className="font-mono-tech text-[10px] text-slate-400 font-bold">TIER 1</span>
                <strong className="text-slate-900 block font-bold text-xs">Customer Experience</strong>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  React + TypeScript frontend. User inputs email, reviews status, and initiates communication.
                </p>
                <div className="p-1.5 rounded bg-slate-100 font-mono-tech text-[10px] text-slate-700 truncate">
                  email: {currentScenario.email}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-slate-300 font-mono-tech font-bold text-lg">
                →
              </div>

              {/* Node 2 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <span className="font-mono-tech text-[10px] text-[#ea580c] font-bold">TIER 2</span>
                <strong className="text-slate-900 block font-bold text-xs">Express, SQLite & Socket.IO</strong>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Express service manages session tokens, coordinates dual-path routing, and logs project notes.
                </p>
                <div className="p-1.5 rounded bg-orange-50 font-mono-tech text-[10px] text-orange-950 truncate border border-orange-200">
                  Dual-Path Routing & Notes
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-slate-300 font-mono-tech font-bold text-lg">
                →
              </div>

              {/* Node 3 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <span className="font-mono-tech text-[10px] text-blue-600 font-bold">TIER 3</span>
                <strong className="text-slate-900 block font-bold text-xs">n8n Workflow Engine</strong>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Orchestrates webhook queries, transforms platform data, and syncs project activity notes.
                </p>
                <div className="p-1.5 rounded bg-blue-50 font-mono-tech text-[10px] text-blue-950 truncate border border-blue-200">
                  Webhook → REST Search
                </div>
              </div>
            </div>

            {/* Target System & Dual-Path Routing Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#ea580c]" />
                  <strong className="text-white font-semibold text-xs">Target System: Field Operations Platform</strong>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Internal system of record containing operational project data, technician assignment codes, and chronological activity notes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <strong className="text-white font-semibold text-xs">Dual-Path Communication Grounding</strong>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  <span className="text-blue-300 font-medium">Path A:</span> Data queries retrieve grounded project context. <span className="text-orange-300 font-medium">Path B:</span> Reschedules/cancellations route to installer/office, reflecting into internal notes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DATA TRANSFORMATION (SOURCE VS CUSTOMER VIEW) */}
      {/* ========================================================================= */}
      {activeTab === 'transform' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Synthetic Illustration of Data Transformation:</strong> Transforms platform-oriented project data into the customer-facing information needed for the experience while excluding internal-only fields.
            </div>
          </div>

          {currentScenario.sourceProject ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Source System Raw Response (Synthetic) */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    SOURCE SYSTEM (FIELD OPERATIONS PLATFORM)
                  </span>
                  <span className="text-[10px] font-mono-tech text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                    Contains Internal-Only Fields
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono-tech text-[11px] overflow-x-auto border border-slate-900 shadow-md">
                  <pre className="whitespace-pre-wrap leading-relaxed">
{JSON.stringify(currentScenario.sourceProject, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Right Column: Normalized Customer Experience View */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#ea580c] font-bold">
                    CUSTOMER EXPERIENCE (CUSTOMER-FACING CONTEXT)
                  </span>
                  <span className="text-[10px] font-mono-tech text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    Internal-Only Fields Excluded
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono-tech uppercase text-slate-400 block">
                        {lang === 'en' ? 'Project Status' : 'Estado del Proyecto'}
                      </span>
                      <strong className="text-sm font-bold text-slate-950">
                        {currentScenario.normalizedCustomerView?.projectStatus}
                      </strong>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold bg-emerald-100 text-emerald-800">
                      Token Access Active
                    </span>
                  </div>

                  {/* 4-Stage Pathway */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
                      {lang === 'en' ? 'PROJECT PATHWAY' : 'PROGRESO DEL PROYECTO'}
                    </span>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                      {currentScenario.normalizedCustomerView?.timeline.map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-xl border text-[10px] ${
                            step.status === 'completed'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : step.status === 'current'
                              ? 'bg-orange-50 border-orange-300 text-orange-950 font-bold ring-1 ring-[#ea580c]'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          {step.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Context Rows */}
                  <div className="space-y-2 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600">{lang === 'en' ? 'Next Step:' : 'Siguiente Paso:'}</span>
                      <strong className="text-slate-900">{currentScenario.normalizedCustomerView?.nextStep}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600">{lang === 'en' ? 'Assigned Team:' : 'Equipo Asignado:'}</span>
                      <span className="font-semibold text-slate-900">{currentScenario.normalizedCustomerView?.assignedTeam}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600">{lang === 'en' ? 'Arrival Window:' : 'Ventana de Llegada:'}</span>
                      <span className="font-mono-tech text-slate-800">{currentScenario.normalizedCustomerView?.scheduledWindow}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 space-y-2">
              <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
              <strong className="block text-slate-900 text-sm">No Project Records Found</strong>
              <p>The workflow returns an empty match, allowing the frontend to present a helpful message to contact support.</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CONNECTED CUSTOMER COMMUNICATION (3 INTERACTION PATHS) */}
      {/* ========================================================================= */}
      {activeTab === 'messaging' && (
        <div className="space-y-6">
          <ConnectedProjectExperienceSimulator />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: OPERATIONAL VISIBILITY & ENGAGEMENT METRICS */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
                PROTOTYPE OPERATIONAL VISIBILITY
              </span>
              <h4 className="font-display text-base font-bold text-slate-950">
                Engagement & Communication Metrics Built Into the Prototype
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                The prototype included built-in operational tracking to observe how customers interacted with access links, message categories, and response timing.
              </p>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 text-[11px] block">Access Links Sent</span>
                <span className="font-display text-2xl font-bold text-slate-950 block">142</span>
                <span className="text-[10px] font-mono-tech text-slate-500">Synthetic telemetry</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 text-[11px] block">Customer Open Rate</span>
                <span className="font-display text-2xl font-bold text-emerald-600 block">89.4%</span>
                <span className="text-[10px] font-mono-tech text-slate-500">127 unique visits</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 text-[11px] block">Median Response Time</span>
                <span className="font-display text-2xl font-bold text-[#ea580c] block">6.2 min</span>
                <span className="text-[10px] font-mono-tech text-slate-500">Installer response</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 text-[11px] block">Messages Logged</span>
                <span className="font-display text-2xl font-bold text-slate-950 block">418</span>
                <span className="text-[10px] font-mono-tech text-slate-500">Active threads</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="p-4 rounded-2xl bg-[#fafafa] border border-slate-200 space-y-2 text-xs">
              <span className="font-mono-tech text-[10px] uppercase text-slate-500 font-bold block">
                MESSAGE CATEGORIZATION DISTRIBUTION
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>Arrival & Scheduling</span>
                    <span>48%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#ea580c] h-full rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>Access Codes & Site Prep</span>
                    <span>32%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>Post-Install & Questions</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
