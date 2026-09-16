import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Check, 
  Layers, 
  MessageSquare, 
  Send, 
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
  HelpCircle,
  ChevronRight,
  DollarSign,
  FileCheck,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'system' | 'human';
  text?: string;
  timestamp: string;
  authorTitle?: string;
  category?: 'Path 1: Project Information' | 'Path 2: Customer Action' | 'Path 3: Human Communication' | 'System Access';
  type?: 'text' | 'reschedule_form' | 'reschedule_submitted' | 'quote_card' | 'quote_not_ready' | 'human_routed';
  quoteData?: {
    title: string;
    amount: number;
    status: 'ready' | 'approved' | 'declined';
    breakdown?: string;
  };
  rescheduleData?: {
    currentDate: string;
    currentTime: string;
    requestedDate?: string;
    requestedTime?: string;
    status?: 'awaiting_review' | 'approved' | 'counter_suggested' | 'declined';
  };
}

export interface ProjectActivityEntry {
  id: string;
  timestamp: string;
  title: string;
  detail: string;
  handler: string;
  type: 'customer_lookup' | 'project_data_query' | 'customer_action' | 'human_support' | 'field_note';
}

export interface RescheduleRequest {
  id: string;
  customerName: string;
  currentSlot: string;
  requestedDate: string;
  requestedTime: string;
  status: 'awaiting_review' | 'approved' | 'counter_suggested' | 'declined';
  note?: string;
}

export const ConnectedProjectExperienceSimulator: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [quoteState, setQuoteState] = useState<'ready' | 'approved' | 'declined'>('ready');
  const [quoteAmount] = useState<number>(4250);
  const [currentAppointmentDate, setCurrentAppointmentDate] = useState<string>('Tuesday, October 6');
  const [currentAppointmentTime, setCurrentAppointmentTime] = useState<string>('10:00 AM');

  // Input & state
  const [inputMsg, setInputMsg] = useState('');
  const [isRoutingToHuman, setIsRoutingToHuman] = useState(false);

  // Active Reschedule Form draft state
  const [selectedRescheduleDate, setSelectedRescheduleDate] = useState<string>('Oct 8');
  const [selectedRescheduleTime, setSelectedRescheduleTime] = useState<string>('1:00 PM');

  // Active Pending Reschedule Requests on Internal Team side
  const [internalRescheduleRequests, setInternalRescheduleRequests] = useState<RescheduleRequest[]>([
    {
      id: 'req-init',
      customerName: 'Alex Rivera',
      currentSlot: 'Oct 6 · 10:00 AM',
      requestedDate: 'Oct 8',
      requestedTime: '1:00 PM',
      status: 'awaiting_review',
      note: 'Customer requested afternoon installation window due to work schedule.'
    }
  ]);

  // Initial Chat Messages demonstrating the 3 interaction pathways
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'system',
      text: 'Project access verified via time-bound token. Connected to Project PRJ-9942 (Alex Rivera).',
      timestamp: '9:00 AM',
      category: 'System Access',
      type: 'text'
    },
    {
      id: 'm-1',
      sender: 'customer',
      text: "What's the status of my project?",
      timestamp: '9:02 AM',
      category: 'Path 1: Project Information',
      type: 'text'
    },
    {
      id: 'm-2',
      sender: 'system',
      text: 'Your project PRJ-9942 status is: "Ready for Installation". Current scheduled arrival is Tuesday, October 6 at 10:00 AM with West Electrical Crew #04 (Jordan M., Lead).',
      timestamp: '9:02 AM',
      authorTitle: 'Field Operations Platform (Project Data)',
      category: 'Path 1: Project Information',
      type: 'text'
    }
  ]);

  // Internal Project Activity Log
  const [projectActivityLog, setProjectActivityLog] = useState<ProjectActivityEntry[]>([
    {
      id: 'act-1',
      timestamp: 'Today, 9:00 AM',
      title: 'Customer Session Initiated',
      detail: 'Alex Rivera accessed project PRJ-9942 via token verification.',
      handler: 'Token Access Service',
      type: 'customer_lookup'
    },
    {
      id: 'act-2',
      timestamp: 'Today, 9:02 AM',
      title: 'Project Information Retrieved',
      detail: 'Customer queried status. Retrieved normalized project status: Ready for Installation.',
      handler: 'Field Operations Platform API (Auto)',
      type: 'project_data_query'
    }
  ]);

  // ---------------------------------------------------------------------------
  // INTENT CLASSIFICATION & MESSAGE ROUTING ENGINE
  // ---------------------------------------------------------------------------
  const processMessage = (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    // Add customer message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'customer',
      text,
      timestamp: 'Just now',
      type: 'text'
    };
    setChatMessages(prev => [...prev, userMsg]);

    const lower = text.toLowerCase();

    // -------------------------------------------------------------------------
    // PATH 2A: RESCHEDULING INTENT
    // -------------------------------------------------------------------------
    if (
      lower.includes('reschedule') ||
      lower.includes('change appointment') ||
      lower.includes('change date') ||
      lower.includes('change my appointment') ||
      lower.includes('pick another day') ||
      lower.includes('another day') ||
      lower.includes('different day') ||
      lower.includes('move appointment') ||
      lower.includes('reprogramar')
    ) {
      setTimeout(() => {
        const rescheduleFormMsg: ChatMessage = {
          id: `resched-ui-${Date.now()}`,
          sender: 'system',
          timestamp: 'Just now',
          category: 'Path 2: Customer Action',
          type: 'reschedule_form',
          rescheduleData: {
            currentDate: currentAppointmentDate,
            currentTime: currentAppointmentTime,
            status: 'awaiting_review'
          }
        };
        setChatMessages(prev => [...prev, rescheduleFormMsg]);
      }, 400);
      return;
    }

    // -------------------------------------------------------------------------
    // PATH 2B: QUOTE INTENT
    // -------------------------------------------------------------------------
    if (
      lower.includes('quote') ||
      lower.includes('price') ||
      lower.includes('cost') ||
      lower.includes('estimate') ||
      lower.includes('presupuesto') ||
      lower.includes('cotización')
    ) {
      setTimeout(() => {
        // Check synthetic quote state
        if (quoteState === 'ready' || quoteState === 'approved' || quoteState === 'declined') {
          const quoteCardMsg: ChatMessage = {
            id: `quote-card-${Date.now()}`,
            sender: 'system',
            timestamp: 'Just now',
            category: 'Path 2: Customer Action',
            type: 'quote_card',
            quoteData: {
              title: 'Installation Project — Level 2 EV Charger',
              amount: quoteAmount,
              status: quoteState,
              breakdown: 'Includes 50A dedicated conduit run, panel interconnect breaker, and hardware mounting.'
            }
          };
          setChatMessages(prev => [...prev, quoteCardMsg]);

          // Reflect into internal project record
          setProjectActivityLog(prev => [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              title: 'Quote Viewed by Customer',
              detail: `Customer inspected project quote ($${quoteAmount.toLocaleString()}). Status: ${quoteState === 'approved' ? 'Approved' : quoteState === 'declined' ? 'Declined' : 'Customer reviewing'}.`,
              handler: 'Customer Action UI',
              type: 'customer_action'
            },
            ...prev
          ]);
        } else {
          // Quote not ready scenario
          const quoteNotReadyMsg: ChatMessage = {
            id: `quote-not-ready-${Date.now()}`,
            sender: 'system',
            text: lang === 'en'
              ? "Your quote isn't available yet. Our estimating engineering team is finalizing load calculations."
              : 'Su cotización aún no está disponible. Nuestro equipo está finalizando los cálculos de carga.',
            timestamp: 'Just now',
            category: 'Path 1: Project Information',
            type: 'quote_not_ready'
          };
          setChatMessages(prev => [...prev, quoteNotReadyMsg]);
        }
      }, 400);
      return;
    }

    // -------------------------------------------------------------------------
    // PATH 1: PROJECT INFORMATION LOOKUP
    // -------------------------------------------------------------------------
    if (
      lower.includes('status') ||
      lower.includes('what happens next') ||
      lower.includes('next step') ||
      lower.includes('arrival') ||
      lower.includes('when') ||
      lower.includes('time') ||
      lower.includes('who is') ||
      lower.includes('electrician') ||
      lower.includes('crew') ||
      lower.includes('permit') ||
      lower.includes('estado')
    ) {
      setTimeout(() => {
        let answer = '';
        if (lower.includes('next') || lower.includes('what happens')) {
          answer = lang === 'en'
            ? 'According to your project records (PRJ-9942), the next step is: Installation arrival & hardware mounting. Electrical permits have already been cleared by municipal inspectors.'
            : 'Según su proyecto (PRJ-9942), el próximo paso es: Llegada de instalación y montaje de equipo. Los permisos han sido aprobados.';
        } else if (lower.includes('who') || lower.includes('electrician') || lower.includes('crew')) {
          answer = lang === 'en'
            ? 'Your assigned team is West Electrical Crew #04. Master Electrician Lead: Jordan M. (License #4802).'
            : 'Su equipo asignado es la Cuadrilla Eléctrica Oeste #04. Electricista a cargo: Jordan M. (Lic. #4802).';
        } else {
          answer = lang === 'en'
            ? `Your project PRJ-9942 status: "Ready for Installation". Confirmed appointment: ${currentAppointmentDate} at ${currentAppointmentTime}. Next step: Crew arrival & panel tie-in.`
            : `Estado de su proyecto PRJ-9942: "Listo para Instalación". Cita confirmada: ${currentAppointmentDate} a las ${currentAppointmentTime}.`;
        }

        const infoMsg: ChatMessage = {
          id: `info-${Date.now()}`,
          sender: 'system',
          text: answer,
          authorTitle: 'Field Operations Platform (Project Data)',
          timestamp: 'Just now',
          category: 'Path 1: Project Information',
          type: 'text'
        };
        setChatMessages(prev => [...prev, infoMsg]);

        // Reflect into project record
        setProjectActivityLog(prev => [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            title: 'Project Information Query',
            detail: `Customer asked: "${text.length > 40 ? text.substring(0, 40) + '...' : text}". Retrieved connected project context.`,
            handler: 'Field Operations Platform API (Auto)',
            type: 'project_data_query'
          },
          ...prev
        ]);
      }, 400);
      return;
    }

    // -------------------------------------------------------------------------
    // PATH 3: HUMAN COMMUNICATION (Specific site questions, exceptions, or general judgment)
    // -------------------------------------------------------------------------
    const isHumanQuestion = 
      lower.includes('charger') ||
      lower.includes('other side') ||
      lower.includes('garage') ||
      lower.includes('call me') ||
      lower.includes('special instruction') ||
      lower.includes('question about something') ||
      lower.includes('speak') ||
      lower.includes('human') ||
      lower.includes('person') ||
      lower.includes('talk to') ||
      lower.includes('installer') ||
      lower.includes('gate code') ||
      lower.includes('panel') ||
      lower.includes('wire');

    if (isHumanQuestion) {
      setIsRoutingToHuman(true);

      setTimeout(() => {
        // System notice
        const routingNotice: ChatMessage = {
          id: `route-${Date.now()}`,
          sender: 'system',
          text: lang === 'en' 
            ? '⚡ Sent to Installation Team — Your question requires site judgment and has been routed directly to your lead installer.'
            : '⚡ Enviado al Equipo de Instalación — Su pregunta requiere evaluación en sitio y ha sido canalizada al electricista.',
          timestamp: 'Just now',
          category: 'Path 3: Human Communication',
          type: 'human_routed'
        };
        setChatMessages(prev => [...prev, routingNotice]);

        // Reflect message routed into project record
        setProjectActivityLog(prev => [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            title: 'Customer Message Routed to Installation Team',
            detail: `Customer sent: "${text}". Queued for Jordan M. (Lead Installer).`,
            handler: 'Routing Engine → Jordan M. (Installer)',
            type: 'human_support'
          },
          ...prev
        ]);

        // Simulate human response
        setTimeout(() => {
          let humanText = '';
          if (lower.includes('other side') || lower.includes('garage')) {
            humanText = lang === 'en'
              ? "Thanks, Alex. I saw your note. Can you send me a photo of the area you're referring to? We'll inspect conduit run clearance when we arrive."
              : 'Gracias, Alex. Vi tu nota. ¿Puedes enviarme una foto del área que mencionas? Revisaremos el espacio de la tubería al llegar.';
          } else if (lower.includes('call')) {
            humanText = lang === 'en'
              ? "Hi Alex, this is Jordan from the West Crew. I'll give you a call from our dispatch phone in about 15 minutes before we head over."
              : 'Hola Alex, soy Jordan de la Cuadrilla Oeste. Te llamaré desde el teléfono de despacho en unos 15 minutos.';
          } else {
            humanText = lang === 'en'
              ? "Thanks, Alex. I saw your note on the job docket. Our crew will review this during on-site staging tomorrow."
              : 'Gracias, Alex. Vi tu nota en el expediente. Nuestro equipo lo revisará al iniciar los trabajos mañana.';
          }

          const humanReply: ChatMessage = {
            id: `human-${Date.now()}`,
            sender: 'human',
            authorTitle: 'Jordan M. · Lead Installer (West Crew #04)',
            text: humanText,
            timestamp: 'Just now',
            category: 'Path 3: Human Communication',
            type: 'text'
          };

          setChatMessages(prev => [...prev, humanReply]);
          setIsRoutingToHuman(false);

          // Reflect human response into internal record
          setProjectActivityLog(prev => [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              title: 'Human Response Sent to Customer',
              detail: `Jordan M. replied: "${humanText.substring(0, 50)}...". Logged in active project conversation.`,
              handler: 'Jordan M. (Lead Installer)',
              type: 'field_note'
            },
            ...prev
          ]);
        }, 900);

      }, 400);
      return;
    }

    // -------------------------------------------------------------------------
    // UNKNOWN / UNSUPPORTED REQUEST — Do NOT fabricate an answer. Offer human assistance.
    // -------------------------------------------------------------------------
    setTimeout(() => {
      const unsupportedNotice: ChatMessage = {
        id: `unsupported-${Date.now()}`,
        sender: 'system',
        text: lang === 'en'
          ? "I can send this to your installation team. Your installer or office coordinator can answer specific site questions or non-standard inquiries."
          : 'Puedo enviar esto a su equipo de instalación. Su instalador o coordinador de oficina puede responder preguntas específicas de la obra.',
        timestamp: 'Just now',
        category: 'Path 3: Human Communication',
        type: 'text'
      };
      setChatMessages(prev => [...prev, unsupportedNotice]);

      setProjectActivityLog(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Unrecognized Query Handled via Human Fallback',
          detail: `Customer asked: "${text}". Automated lookup safely declined; offered human escalation.`,
          handler: 'Routing Engine (Safe Fallback)',
          type: 'human_support'
        },
        ...prev
      ]);
    }, 400);
  };

  // ---------------------------------------------------------------------------
  // SUBMIT RESCHEDULE REQUEST (Customer Action)
  // ---------------------------------------------------------------------------
  const handleSubmitReschedule = (newDate: string, newTime: string) => {
    // Add submission confirmation in chat
    const submittedMsg: ChatMessage = {
      id: `resched-sub-${Date.now()}`,
      sender: 'system',
      text: lang === 'en'
        ? `Reschedule request sent to your installation team. Preferred time: ${newDate} at ${newTime}. Awaiting team review.`
        : `Solicitud de reprogramación enviada al equipo de instalación. Horario preferido: ${newDate} a las ${newTime}. En espera de revisión.`,
      timestamp: 'Just now',
      category: 'Path 2: Customer Action',
      type: 'reschedule_submitted',
      rescheduleData: {
        currentDate: currentAppointmentDate,
        currentTime: currentAppointmentTime,
        requestedDate: newDate,
        requestedTime: newTime,
        status: 'awaiting_review'
      }
    };
    setChatMessages(prev => [...prev, submittedMsg]);

    // Push new request to internal team review
    const newReq: RescheduleRequest = {
      id: `req-${Date.now()}`,
      customerName: 'Alex Rivera',
      currentSlot: `${currentAppointmentDate} · ${currentAppointmentTime}`,
      requestedDate: newDate,
      requestedTime: newTime,
      status: 'awaiting_review',
      note: 'Customer submitted preferred reschedule window via conversation.'
    };
    setInternalRescheduleRequests(prev => [newReq, ...prev]);

    // Reflect into internal project record
    setProjectActivityLog(prev => [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Customer Requested Reschedule',
        detail: `Preferred date: ${newDate} · ${newTime}. Current: ${currentAppointmentDate} · ${currentAppointmentTime}. Status: Awaiting team review.`,
        handler: 'Customer Action UI → Dispatch Queue',
        type: 'customer_action'
      },
      ...prev
    ]);
  };

  // ---------------------------------------------------------------------------
  // INTERNAL TEAM ACTIONS ON RESCHEDULE REQUEST
  // ---------------------------------------------------------------------------
  const handleInternalReview = (reqId: string, action: 'approve' | 'suggest' | 'decline') => {
    setInternalRescheduleRequests(prev => prev.map(req => {
      if (req.id !== reqId) return req;
      if (action === 'approve') return { ...req, status: 'approved' };
      if (action === 'suggest') return { ...req, status: 'counter_suggested' };
      return { ...req, status: 'declined' };
    }));

    const targetReq = internalRescheduleRequests.find(r => r.id === reqId);
    const reqDate = targetReq ? targetReq.requestedDate : 'Oct 8';
    const reqTime = targetReq ? targetReq.requestedTime : '1:00 PM';

    if (action === 'approve') {
      setCurrentAppointmentDate(reqDate);
      setCurrentAppointmentTime(reqTime);

      // Add clearly labeled human installer confirmation message
      const humanApprovalMsg: ChatMessage = {
        id: `human-appr-${Date.now()}`,
        sender: 'human',
        authorTitle: 'Jordan M. · Lead Installer (West Crew #04)',
        text: lang === 'en'
          ? `Alex, I reviewed your reschedule request and approved it on our dispatch schedule. Your new confirmed installation time is ${reqDate} at ${reqTime}.`
          : `Alex, revisé tu solicitud y la aprobé en nuestro calendario de despacho. Tu nueva fecha confirmada es ${reqDate} a las ${reqTime}.`,
        timestamp: 'Just now',
        category: 'Path 3: Human Communication',
        type: 'text'
      };
      setChatMessages(prev => [...prev, humanApprovalMsg]);

      // Reflect in internal record
      setProjectActivityLog(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Reschedule Request Approved by Installer',
          detail: `Jordan M. approved move from original appointment to ${reqDate} at ${reqTime}. Updated confirmed project appointment.`,
          handler: 'Jordan M. (Lead Installer)',
          type: 'field_note'
        },
        ...prev
      ]);
    } else if (action === 'suggest') {
      const suggestMsg: ChatMessage = {
        id: `human-sug-${Date.now()}`,
        sender: 'human',
        authorTitle: 'Jordan M. · Lead Installer (West Crew #04)',
        text: lang === 'en'
          ? `Hi Alex, our afternoon route on ${reqDate} is already at capacity with another panel upgrade. Could we do ${reqDate} at 9:00 AM instead?`
          : `Hola Alex, nuestra ruta de la tarde del ${reqDate} ya está completa. ¿Podríamos hacer el ${reqDate} a las 9:00 AM?`,
        timestamp: 'Just now',
        category: 'Path 3: Human Communication',
        type: 'text'
      };
      setChatMessages(prev => [...prev, suggestMsg]);

      setProjectActivityLog(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Counter-Proposal Sent for Reschedule',
          detail: `Jordan M. suggested alternate slot: ${reqDate} at 9:00 AM due to route capacity.`,
          handler: 'Jordan M. (Lead Installer)',
          type: 'field_note'
        },
        ...prev
      ]);
    } else {
      const declineMsg: ChatMessage = {
        id: `human-dec-${Date.now()}`,
        sender: 'human',
        authorTitle: 'Dispatch Office · Operations Team',
        text: lang === 'en'
          ? `Hello Alex, we could not accommodate that specific window due to permit inspection timing on that date. Our office will reach out shortly with alternative dates.`
          : `Hola Alex, no pudimos asignar ese horario debido a la inspección municipal de esa fecha. Nuestra oficina te contactará con opciones.`,
        timestamp: 'Just now',
        category: 'Path 3: Human Communication',
        type: 'text'
      };
      setChatMessages(prev => [...prev, declineMsg]);

      setProjectActivityLog(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Reschedule Request Declined by Office',
          detail: `Declined requested slot due to permit inspection constraints. Scheduled follow-up.`,
          handler: 'Dispatch Office',
          type: 'field_note'
        },
        ...prev
      ]);
    }
  };

  // ---------------------------------------------------------------------------
  // QUOTE ACTIONS (Approve / Decline)
  // ---------------------------------------------------------------------------
  const handleQuoteAction = (action: 'approve' | 'decline') => {
    if (action === 'approve') {
      setQuoteState('approved');
      const actionMsg: ChatMessage = {
        id: `quote-act-${Date.now()}`,
        sender: 'system',
        text: lang === 'en'
          ? '✓ Quote Approved. Synthetic project state updated to "Quote Approved". Installation team has been notified to stage hardware.'
          : '✓ Cotización Aprobada. Estado del proyecto actualizado a "Cotización Aprobada".',
        timestamp: 'Just now',
        category: 'Path 2: Customer Action',
        type: 'text'
      };
      setChatMessages(prev => [...prev, actionMsg]);

      setProjectActivityLog(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Quote Approved by Customer',
          detail: `Customer approved installation quote ($${quoteAmount.toLocaleString()}). Project state set to: Quote Approved.`,
          handler: 'Customer Action UI → Operations Platform',
          type: 'customer_action'
        },
        ...prev
      ]);
    } else {
      setQuoteState('declined');
      const actionMsg: ChatMessage = {
        id: `quote-act-${Date.now()}`,
        sender: 'system',
        text: lang === 'en'
          ? 'Quote Declined. We have routed your file to our estimating team to review scope adjustments.'
          : 'Cotización Declinada. Hemos enviado el archivo al equipo de estimación.',
        timestamp: 'Just now',
        category: 'Path 2: Customer Action',
        type: 'text'
      };
      setChatMessages(prev => [...prev, actionMsg]);

      setProjectActivityLog(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Quote Declined by Customer',
          detail: `Customer declined quote ($${quoteAmount.toLocaleString()}). Routed to estimating team for follow-up.`,
          handler: 'Customer Action UI → Estimating Team',
          type: 'customer_action'
        },
        ...prev
      ]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const t = inputMsg;
    setInputMsg('');
    processMessage(t);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Architectural Grounding */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
              CONNECTED CUSTOMER PROJECT EXPERIENCE
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Interactive Simulator: 3 Types of Customer Interaction
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Experience the three interaction types: (1) project information lookup, (2) structured customer actions (interactive rescheduling requests & quote review/approval), and (3) direct human installer communication.
            </p>
          </div>

          {/* Locale & Quote state toggle */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
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
        </div>

        {/* 3 Interaction Paths Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-900/60 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-300">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>1. Project Information</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Customer queries status, schedule, or team → system retrieves grounded project context. No fabricated data.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-orange-950/40 border border-orange-900/60 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-orange-300">
              <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>2. Structured Customer Actions</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Interactive inline components for rescheduling requests and quote review (Approve / Decline), updating project state.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>3. Human Communication</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Judgment questions route to the installer or office team with clearly labeled human replies in the same thread.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Test Prompt Selector */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold block">
            TEST INTERACTION PATHWAYS (CLICK TO SIMULATE CUSTOMER INTENT):
          </span>
          <span className="text-[10px] font-mono-tech text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
            Interactive Workflows
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Path 1 Prompts */}
          <button
            type="button"
            onClick={() => processMessage("What's the status of my project?")}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>&quot;What&apos;s the status of my project?&quot;</span>
            <span className="text-[10px] font-mono-tech text-blue-700 font-bold bg-blue-100 px-1.5 py-0.5 rounded">Path 1</span>
          </button>

          <button
            type="button"
            onClick={() => processMessage("What happens next?")}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>&quot;What happens next?&quot;</span>
            <span className="text-[10px] font-mono-tech text-blue-700 font-bold bg-blue-100 px-1.5 py-0.5 rounded">Path 1</span>
          </button>

          {/* Path 2 Prompts: Reschedule & Quote */}
          <button
            type="button"
            onClick={() => processMessage("I need to reschedule.")}
            className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-950 border-2 border-[#ea580c]/50 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>&quot;I need to reschedule.&quot;</span>
            <span className="text-[10px] font-mono-tech text-orange-950 font-bold bg-orange-200/80 px-1.5 py-0.5 rounded">Path 2: Reschedule UI</span>
          </button>

          <button
            type="button"
            onClick={() => processMessage("Can I see my quote?")}
            className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-950 border-2 border-[#ea580c]/50 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>&quot;Can I see my quote?&quot;</span>
            <span className="text-[10px] font-mono-tech text-orange-950 font-bold bg-orange-200/80 px-1.5 py-0.5 rounded">Path 2: Quote UI</span>
          </button>

          {/* Path 3 Prompts: Human Communication */}
          <button
            type="button"
            onClick={() => processMessage("Can the electrician install the charger on the other side of my garage?")}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>&quot;Install charger on other side of garage?&quot;</span>
            <span className="text-[10px] font-mono-tech text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">Path 3: Human</span>
          </button>

          <button
            type="button"
            onClick={() => processMessage("I need someone to call me.")}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>&quot;I need someone to call me.&quot;</span>
            <span className="text-[10px] font-mono-tech text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">Path 3: Human</span>
          </button>
        </div>
      </div>

      {/* Main Split Interface: Left = Customer Conversation View; Right = Internal Operations & Team View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ===================================================================== */}
        {/* LEFT COLUMN: CUSTOMER CONVERSATION VIEW (WITH EMBEDDED WORKFLOW CARDS) */}
        {/* ===================================================================== */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col h-[640px]">
          
          {/* Header */}
          <div className="p-4 bg-slate-950 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#ea580c] text-white flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs leading-tight">
                  {lang === 'en' ? 'Customer Project Experience' : 'Experiencia de Proyecto del Cliente'}
                </h5>
                <span className="text-[10px] font-mono-tech text-emerald-400">
                  Alex Rivera • Project PRJ-9942 • Live Session
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                Connected Experience
              </span>
            </div>
          </div>

          {/* Current Confirmed Banner */}
          <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] shrink-0">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Confirmed Appointment: <strong>{currentAppointmentDate}</strong> at <strong>{currentAppointmentTime}</strong></span>
            </div>
            <span className="font-mono-tech text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
              Quote: {quoteState === 'approved' ? 'Approved ($4,250)' : quoteState === 'declined' ? 'Declined' : 'Ready ($4,250)'}
            </span>
          </div>

          {/* Scrollable Conversation Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'customer'
                    ? 'items-end'
                    : msg.sender === 'system' && msg.type === 'text' && !msg.authorTitle
                    ? 'items-center'
                    : 'items-start'
                }`}
              >
                {/* 1. Customer Message */}
                {msg.sender === 'customer' && (
                  <div className="p-3.5 rounded-2xl max-w-[85%] space-y-1 shadow-2xs bg-slate-950 text-white rounded-br-none">
                    <p className="leading-relaxed text-xs">{msg.text}</p>
                    <div className="flex items-center justify-between gap-2 text-[9px] opacity-70">
                      <span>Customer</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                )}

                {/* 2. System Access Notice */}
                {msg.sender === 'system' && msg.category === 'System Access' && (
                  <div className="p-2 px-3 rounded-full bg-slate-200/90 text-slate-700 text-[10px] font-mono-tech border border-slate-300/80">
                    {msg.text}
                  </div>
                )}

                {/* 3. Path 1: Project Information Retrieved */}
                {msg.sender === 'system' && msg.category === 'Path 1: Project Information' && (
                  <div className="p-3.5 rounded-2xl max-w-[90%] space-y-1.5 shadow-2xs bg-blue-50/90 border border-blue-200 text-blue-950 rounded-bl-none">
                    <div className="flex items-center justify-between text-[10px] font-mono-tech font-bold text-blue-700 pb-1 border-b border-blue-200/60">
                      <span className="flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-blue-600" />
                        <span>PROJECT INFORMATION</span>
                      </span>
                      <span className="text-blue-500 font-normal">Grounded Data</span>
                    </div>
                    <p className="leading-relaxed text-xs">{msg.text}</p>
                    <div className="flex items-center justify-between gap-2 text-[9px] text-blue-600 pt-0.5">
                      <span>Field Operations Platform (PRJ-9942)</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                )}

                {/* 4. Path 2A: EMBEDDED RESCHEDULE WORKFLOW COMPONENT */}
                {msg.type === 'reschedule_form' && (
                  <div className="w-full max-w-[95%] p-4 rounded-2xl bg-white border-2 border-[#ea580c] shadow-sm space-y-3 rounded-bl-none">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#ea580c]" />
                        <strong className="font-display font-bold text-slate-950 text-xs sm:text-sm">
                          RESCHEDULE INSTALLATION
                        </strong>
                      </div>
                      <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] bg-orange-50 px-2 py-0.5 rounded font-bold">
                        Interactive Action
                      </span>
                    </div>

                    {/* Current Appointment */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="text-slate-500">Current appointment:</span>
                      <strong className="text-slate-900">{currentAppointmentDate} · {currentAppointmentTime}</strong>
                    </div>

                    {/* Date Selector */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">
                        Choose a preferred new date:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Oct 8', 'Oct 9', 'Oct 12'].map(dateOption => (
                          <button
                            key={dateOption}
                            type="button"
                            onClick={() => setSelectedRescheduleDate(dateOption)}
                            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                              selectedRescheduleDate === dateOption
                                ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {dateOption}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selector */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">
                        Choose a preferred time:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['9:00 AM', '1:00 PM', '3:30 PM'].map(timeOption => (
                          <button
                            key={timeOption}
                            type="button"
                            onClick={() => setSelectedRescheduleTime(timeOption)}
                            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                              selectedRescheduleTime === timeOption
                                ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {timeOption}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleSubmitReschedule(selectedRescheduleDate, selectedRescheduleTime)}
                        className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-[#ea580c] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Reschedule Request</span>
                      </button>
                      <span className="text-[10px] text-slate-500 block text-center mt-1.5">
                        *This submits a request to your installation team for review. It does not automatically confirm appointment changes.
                      </span>
                    </div>
                  </div>
                )}

                {/* 5. Path 2A: Reschedule Request Submitted Notice */}
                {msg.type === 'reschedule_submitted' && (
                  <div className="p-3.5 rounded-2xl max-w-[90%] space-y-1.5 shadow-2xs bg-orange-50 border border-orange-200 text-orange-950 rounded-bl-none">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-tech font-bold text-[#ea580c]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c]" />
                      <span>RESCHEDULE REQUEST SUBMITTED</span>
                    </div>
                    <p className="leading-relaxed text-xs">{msg.text}</p>
                    <div className="p-2 rounded-lg bg-white/80 border border-orange-200/80 text-[11px] font-mono-tech text-slate-800">
                      Requested: {msg.rescheduleData?.requestedDate} · {msg.rescheduleData?.requestedTime} (Status: Awaiting Team Review)
                    </div>
                  </div>
                )}

                {/* 6. Path 2B: EMBEDDED QUOTE WORKFLOW COMPONENT */}
                {msg.type === 'quote_card' && (
                  <div className="w-full max-w-[95%] p-4 rounded-2xl bg-white border-2 border-emerald-500/80 shadow-sm space-y-3 rounded-bl-none">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <strong className="font-display font-bold text-slate-950 text-xs sm:text-sm">
                          YOUR QUOTE
                        </strong>
                      </div>
                      <span className={`text-[10px] font-mono-tech uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                        quoteState === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : quoteState === 'declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {quoteState === 'approved' ? 'Quote Approved' : quoteState === 'declined' ? 'Quote Declined' : 'Available for Review'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 text-xs">{msg.quoteData?.title}</span>
                        <strong className="font-display text-lg text-slate-950 font-extrabold">
                          ${msg.quoteData?.amount.toLocaleString()}
                        </strong>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {msg.quoteData?.breakdown}
                      </p>
                    </div>

                    {/* Customer Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      {quoteState === 'ready' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleQuoteAction('approve')}
                            className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                          >
                            Approve Quote
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuoteAction('decline')}
                            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <div className="w-full p-2.5 rounded-xl bg-slate-100 text-center text-xs font-semibold text-slate-700 flex items-center justify-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Status: {quoteState === 'approved' ? 'Quote Approved' : 'Quote Declined'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 7. Path 3: Routing Notice */}
                {msg.type === 'human_routed' && (
                  <div className="p-2.5 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] max-w-md">
                    {msg.text}
                  </div>
                )}

                {/* 8. Path 3: Clearly Labeled Human Team Response */}
                {msg.sender === 'human' && (
                  <div className="p-3.5 rounded-2xl max-w-[90%] space-y-1.5 shadow-2xs bg-white border-2 border-emerald-500/40 text-slate-900 rounded-bl-none">
                    <div className="flex items-center justify-between text-[10px] font-mono-tech font-bold text-emerald-800 pb-1 border-b border-emerald-100">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{msg.authorTitle}</span>
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        Human Response
                      </span>
                    </div>
                    <p className="leading-relaxed text-xs">{msg.text}</p>
                    <div className="flex items-center justify-between gap-2 text-[9px] text-slate-400 pt-0.5">
                      <span>Direct Team Communication</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                )}

                {/* Other standard text */}
                {msg.sender === 'system' && msg.type === 'text' && msg.category !== 'Path 1: Project Information' && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs max-w-[90%]">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={lang === 'en' ? "Ask about status, quote, reschedule, or send note..." : "Pregunte sobre estado, cotización, reprogramación..."}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-slate-950 hover:bg-[#ea580c] text-white transition-colors"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: INTERNAL OPERATIONS & TEAM CONSOLE */}
        {/* ===================================================================== */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white shadow-2xs p-5 space-y-4 text-xs h-[640px] flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#ea580c]" />
              <strong className="font-display font-bold text-slate-950 text-sm">
                Internal Team Operations Console
              </strong>
            </div>
            <span className="font-mono-tech text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
              PRJ-9942 Docket
            </span>
          </div>

          {/* Internal Reschedule Review Component */}
          <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#ea580c] font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                RESCHEDULE REQUESTS (INTERNAL REVIEW)
              </span>
              <span className="text-[10px] font-mono-tech text-slate-500">Installer / Dispatcher</span>
            </div>

            {internalRescheduleRequests.length > 0 ? (
              <div className="space-y-2">
                {internalRescheduleRequests.slice(0, 1).map(req => (
                  <div key={req.id} className="p-3 rounded-xl bg-white border border-orange-200/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>Customer: {req.customerName}</span>
                      <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded uppercase font-bold ${
                        req.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'counter_suggested'
                          ? 'bg-blue-100 text-blue-800'
                          : req.status === 'declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-0.5">
                      <div>Current: <span className="font-mono-tech text-slate-800 font-semibold">{req.currentSlot}</span></div>
                      <div>Requested: <span className="font-mono-tech text-[#ea580c] font-bold">{req.requestedDate} · {req.requestedTime}</span></div>
                    </div>

                    {req.status === 'awaiting_review' ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => handleInternalReview(req.id, 'approve')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInternalReview(req.id, 'suggest')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] transition-colors"
                        >
                          Suggest Different Time
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInternalReview(req.id, 'decline')}
                          className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-[11px] transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-500 italic">
                        Team action recorded: {req.status.replace('_', ' ')}. Customer conversation updated.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-slate-500 italic">
                No pending reschedule requests.
              </div>
            )}
          </div>

          {/* Project Activity Log (Internal Audit Record) */}
          <div className="flex-1 flex flex-col overflow-hidden space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                <FileText className="w-3 h-3" />
                PROJECT ACTIVITY RECORD (INTERNAL LOG)
              </span>
              <span className="text-[10px] font-mono-tech text-emerald-600 font-semibold">
                Live Audit History
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {projectActivityLog.map(act => (
                <div
                  key={act.id}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1 text-[11px]"
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className={`flex items-center gap-1.5 ${
                      act.type === 'customer_action'
                        ? 'text-[#ea580c] font-bold'
                        : act.type === 'human_support' 
                        ? 'text-purple-900 font-bold' 
                        : act.type === 'field_note'
                        ? 'text-emerald-900 font-bold'
                        : 'text-slate-900'
                    }`}>
                      {act.type === 'customer_action' && <Calendar className="w-3 h-3 text-[#ea580c]" />}
                      {act.type === 'human_support' && <UserCheck className="w-3 h-3 text-purple-600" />}
                      {act.type === 'project_data_query' && <Database className="w-3 h-3 text-blue-600" />}
                      {act.type === 'field_note' && <Check className="w-3 h-3 text-emerald-600" />}
                      {act.title}
                    </span>
                    <span className="text-[10px] font-mono-tech text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{act.detail}</p>
                  <div className="text-[10px] font-mono-tech text-slate-500">
                    Handler: <span className="font-medium text-slate-700">{act.handler}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Footnote */}
          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-snug shrink-0">
            <span className="font-bold text-slate-700">Operational Integration:</span> Demonstrates that conversation serves as an interface to workflows—customer actions and communications directly update project records and installer dockets.
          </div>
        </div>

      </div>
    </div>
  );
};
