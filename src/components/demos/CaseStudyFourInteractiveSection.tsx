import React, { useState } from 'react';
import { 
  Compass, 
  Globe, 
  User, 
  Calendar, 
  Shield, 
  BarChart3, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Check, 
  Clock, 
  Heart, 
  Sparkles, 
  Sliders, 
  Eye, 
  Lock, 
  Layers
} from 'lucide-react';

type SystemLens = 'all' | 'customer' | 'operations' | 'owner' | 'platform';
type RoleId = 'client' | 'sitter' | 'manager' | 'owner' | 'admin';

interface RolePerspective {
  id: RoleId;
  title: string;
  badge: string;
  badgeColor: string;
  userType: string;
  purpose: string;
  visibleData: string[];
  restrictedData: string[];
  interfaceHighlights: { label: string; value: string }[];
}

export const CaseStudyFourInteractiveSection: React.FC = () => {
  const [activeLens, setActiveLens] = useState<SystemLens>('all');
  const [selectedRole, setSelectedRole] = useState<RoleId>('owner');

  const ROLE_PERSPECTIVES: Record<RoleId, RolePerspective> = {
    client: {
      id: 'client',
      title: 'Client Experience',
      badge: 'Public & Customer Access',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      userType: 'Pet Owner / Service Customer',
      purpose: 'Self-service portal to request care, view scheduled visits, and manage household pet instructions.',
      visibleData: [
        'Personal household and pet care profiles',
        'Service request submission and status',
        'Scheduled visit dates and assigned service types',
        'Service price transparency and invoice summaries'
      ],
      restrictedData: [
        'Internal staff assignments and sitter contact info',
        'Other clients’ household or booking records',
        'Business revenue analytics or margin data',
        'Staff hourly wages or internal schedule notes'
      ],
      interfaceHighlights: [
        { label: 'Primary View', value: 'Client Portal & Service Request Form' },
        { label: 'Key Action', value: 'Submit care dates & update pet care instructions' },
        { label: 'Access Level', value: 'Isolated customer-scoped records' }
      ]
    },
    sitter: {
      id: 'sitter',
      title: 'Sitter Dashboard',
      badge: 'Field Caregiver Access',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      userType: 'Professional Pet Caregiver / Sitter',
      purpose: 'Operational view delivering vital care details, feeding schedules, access instructions, and assigned visits.',
      visibleData: [
        'Assigned upcoming visits and time windows',
        'Pet health details, behavioral notes, and vet contacts',
        'Household entry instructions (alarm codes, lockboxes)',
        'Check-in notes and visit update submission'
      ],
      restrictedData: [
        'Client billing records and total service fees',
        'Unassigned visits across the broader business',
        'Executive business dashboards or analytics',
        'Platform administration or pricing configuration'
      ],
      interfaceHighlights: [
        { label: 'Primary View', value: 'Daily Care Schedule & Visit Dossier' },
        { label: 'Key Action', value: 'Review care notes & log visit completion' },
        { label: 'Access Level', value: 'Assigned-booking field context only' }
      ]
    },
    manager: {
      id: 'manager',
      title: 'Manager Dashboard',
      badge: 'Operations & Dispatch',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200',
      userType: 'Operations Lead / Service Coordinator',
      purpose: 'Daily operational oversight, calendar scheduling, sitter assignment, and intake review.',
      visibleData: [
        'Incoming care requests and triage queue',
        'Master scheduling calendar across all sitters',
        'Household directory and pet history archive',
        'Operational visit completion status in real time'
      ],
      restrictedData: [
        'Super-admin credential management',
        'Platform configuration and audit service settings',
        'Company ownership tax or executive ledger exports'
      ],
      interfaceHighlights: [
        { label: 'Primary View', value: 'Master Schedule & Triage Queue' },
        { label: 'Key Action', value: 'Assign sitters & resolve schedule conflicts' },
        { label: 'Access Level', value: 'Full operational team coordination' }
      ]
    },
    owner: {
      id: 'owner',
      title: 'Owner Dashboard',
      badge: 'Executive Business Visibility',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
      userType: 'Business Founder & Owner',
      purpose: 'Holistic business visibility, service pricing controls, deterministic revenue analytics, and client directory.',
      visibleData: [
        'Deterministic analytics (revenue by service, repeat client rate)',
        'Active households and add-on attachment trends',
        'Service pricing and add-on fee configuration',
        'Complete operational booking and dispatch logs'
      ],
      restrictedData: [
        'None within tenant operations'
      ],
      interfaceHighlights: [
        { label: 'Primary View', value: 'Business Health Dashboard & Analytics' },
        { label: 'Key Action', value: 'Track revenue, review active households & set rates' },
        { label: 'Access Level', value: 'Complete business tenant access' }
      ]
    },
    admin: {
      id: 'admin',
      title: 'Platform Administration',
      badge: 'System Governance',
      badgeColor: 'bg-slate-200 text-slate-900 border-slate-300',
      userType: 'Platform Administrator (Modera)',
      purpose: 'Technical governance, role/permission management, staff access editing, audit detail, and persona testing.',
      visibleData: [
        'Role-based permissions and staff access rules',
        'Audit logs recording administrative modifications',
        'Persona testing harness for role validation',
        'Tenant configuration and system health'
      ],
      restrictedData: [
        'None; administrative governance level'
      ],
      interfaceHighlights: [
        { label: 'Primary View', value: 'Staff Access, Permissions & Audit Console' },
        { label: 'Key Action', value: 'Configure access rules & audit system activity' },
        { label: 'Access Level', value: 'Full platform administration' }
      ]
    }
  };

  const activeRoleData = ROLE_PERSPECTIVES[selectedRole];

  return (
    <div className="space-y-12">

      {/* ========================================================================= */}
      {/* 1. VISUAL EDITORIAL PROGRESSION: FROM CUSTOMER JOURNEY TO OPERATING WORKFLOW */}
      {/* ========================================================================= */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
              OPERATIONAL LIFECYCLE
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
              From Customer Journey to Operating Workflow
            </h3>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono-tech font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Connected Business Model
          </span>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
          A service business needs a system designed around how it actually works. This progression connects the public customer discovery experience directly into ongoing internal operations and business visibility.
        </p>

        {/* 8-Step Dual-Layer Visual Progression */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          
          {/* Top Layer Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 border-b border-slate-200 text-xs font-mono-tech">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>CUSTOMER EXPERIENCE (Steps 01 – 03)</span>
            </div>
            <div className="flex items-center gap-2 text-purple-900 font-bold">
              <Sliders className="w-4 h-4 text-[#ea580c]" />
              <span>INTERNAL OPERATIONS & VISIBILITY (Steps 04 – 08)</span>
            </div>
          </div>

          {/* Stepper Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {[
              { num: '01', title: 'Discover', zone: 'customer', desc: 'Brand, values & service discovery' },
              { num: '02', title: 'Explore Services', zone: 'customer', desc: 'Rates, how-it-works & trust' },
              { num: '03', title: 'Request Care', zone: 'customer', desc: 'Care dates & pet details submitted' },
              { num: '04', title: 'Household Context', zone: 'ops', desc: 'Medical notes & access instructions' },
              { num: '05', title: 'Schedule / Operate', zone: 'ops', desc: 'Calendar dispatch & assignment' },
              { num: '06', title: 'Deliver Service', zone: 'ops', desc: 'Sitters execute & log visits' },
              { num: '07', title: 'Client Relationship', zone: 'ops', desc: 'Portal history & repeat bookings' },
              { num: '08', title: 'Business Visibility', zone: 'ops', desc: 'Deterministic booking analytics' }
            ].map((step, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
                  step.zone === 'customer'
                    ? 'bg-blue-50/60 border-blue-200/80 text-blue-950'
                    : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono-tech text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    step.zone === 'customer' ? 'bg-blue-200/70 text-blue-900' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {step.num}
                  </span>
                  {idx < 7 && (
                    <ArrowRight className="w-3 h-3 text-slate-300 hidden lg:block" />
                  )}
                </div>
                <div>
                  <strong className="block text-xs font-bold leading-tight">{step.title}</strong>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE SYSTEM MAP: CENTERED ON THE KIND COMPANION PLATFORM */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 font-bold block">
              SYSTEM ARCHITECTURE
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
              The Kind Companion System Map
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              How the platform unites customer touchpoints, internal operations, platform administration, and cross-cutting business visibility.
            </p>
          </div>

          {/* System Lens Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-medium self-start">
            <span className="px-2.5 text-[10px] font-mono-tech uppercase font-bold text-slate-500">Lens:</span>
            {[
              { id: 'all', label: 'All Surfaces' },
              { id: 'customer', label: 'Customer Journey' },
              { id: 'operations', label: 'Operations' },
              { id: 'owner', label: 'Owner View' },
              { id: 'platform', label: 'Platform Admin' }
            ].map(lens => (
              <button
                key={lens.id}
                onClick={() => setActiveLens(lens.id as SystemLens)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                  activeLens === lens.id
                    ? 'bg-white text-slate-950 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {lens.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Layout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 border border-slate-800">
          
          {/* Central System Banner */}
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#ea580c] flex items-center justify-center text-white font-bold shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
                  CORE PLATFORM HUB
                </span>
                <h4 className="font-display text-base font-bold text-white">
                  The Kind Companion Connected Platform
                </h4>
              </div>
            </div>
            <div className="text-xs text-slate-300 font-mono-tech flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Single Unified Application Architecture</span>
            </div>
          </div>

          {/* 4 Connected Operational Quadrants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* Area 1: Public Experience */}
            <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
              activeLens === 'all' || activeLens === 'customer'
                ? 'bg-slate-800/90 border-blue-400/60 ring-1 ring-blue-400/20'
                : 'bg-slate-800/40 border-slate-800 opacity-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400 text-sm flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  1. Public Experience
                </span>
                <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  Customer
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Marketing Website & Story
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Service Presentation & Pricing
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Trust, Credentials & Reviews
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  How-It-Works Guidance
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Service Request Entry Point
                </li>
              </ul>
            </div>

            {/* Area 2: Client Experience */}
            <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
              activeLens === 'all' || activeLens === 'customer'
                ? 'bg-slate-800/90 border-cyan-400/60 ring-1 ring-cyan-400/20'
                : 'bg-slate-800/40 border-slate-800 opacity-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  2. Client Experience
                </span>
                <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Client Portal
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Structured Service Requests
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Client Self-Service Portal
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Household & Pet Dossiers
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Booking Status & History
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Emergency & Vet Contacts
                </li>
              </ul>
            </div>

            {/* Area 3: Service Operations */}
            <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
              activeLens === 'all' || activeLens === 'operations' || activeLens === 'owner'
                ? 'bg-slate-800/90 border-orange-400/60 ring-1 ring-orange-400/20'
                : 'bg-slate-800/40 border-slate-800 opacity-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#ea580c] text-sm flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  3. Service Operations
                </span>
                <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800">
                  Operations
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
                  Scheduling & Calendar Utilities
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
                  Booking Triage & Management
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
                  Owner & Manager Dashboards
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
                  Sitter Visit View & Instructions
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
                  Service Pricing Configuration
                </li>
              </ul>
            </div>

            {/* Area 4: Platform Administration */}
            <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
              activeLens === 'all' || activeLens === 'platform'
                ? 'bg-slate-800/90 border-purple-400/60 ring-1 ring-purple-400/20'
                : 'bg-slate-800/40 border-slate-800 opacity-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 text-sm flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  4. Platform Admin
                </span>
                <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Governance
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  Role-Based Permissions
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  Staff Access Management
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  Audit Functionality & Logs
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  Persona Testing Harness
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  Administrative Controls
                </li>
              </ul>
            </div>

          </div>

          {/* Cross-Cutting Layer: Business Visibility */}
          <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
            activeLens === 'all' || activeLens === 'owner'
              ? 'bg-gradient-to-r from-slate-900 to-slate-800/90 border-emerald-400/60 ring-1 ring-emerald-400/20'
              : 'bg-slate-900/40 border-slate-800 opacity-40'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400 shrink-0" />
                <strong className="text-white text-xs sm:text-sm">
                  CROSS-CUTTING LAYER: BUSINESS VISIBILITY (DERIVED FROM BOOKINGS)
                </strong>
              </div>
              <span className="text-[10px] font-mono-tech text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                Application Capability / Demo Analytics
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1 text-[11px] text-slate-300">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Metric 01</span>
                <span className="font-semibold text-white">Revenue by Service</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Metric 02</span>
                <span className="font-semibold text-white">Booking Counts</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Metric 03</span>
                <span className="font-semibold text-white">Active Households</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Metric 04</span>
                <span className="font-semibold text-white">Repeat Client Rate</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px]">Metric 05</span>
                <span className="font-semibold text-white">Add-On Attachment</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ROLE-BASED EXPERIENCE: ONE SYSTEM, DIFFERENT OPERATIONAL VIEWS */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
            ROLE ARCHITECTURE
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
            One System • Different Operational Views
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl">
            A key product decision was avoiding separate disconnected tools for customers and staff. Every role interacts with the same platform, partitioned cleanly by permissions.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'client', label: 'Client', roleName: 'Customer' },
            { id: 'sitter', label: 'Sitter', roleName: 'Field Team' },
            { id: 'manager', label: 'Manager', roleName: 'Operations' },
            { id: 'owner', label: 'Owner', roleName: 'Executive' },
            { id: 'admin', label: 'Platform Admin', roleName: 'Governance' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id as RoleId)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                selectedRole === r.id
                  ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{r.label}</span>
              <span className={`text-[10px] font-mono-tech px-1.5 py-0.5 rounded ${
                selectedRole === r.id ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {r.roleName}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Role Interactive Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6 text-xs sm:text-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold block">
                ROLE PERSPECTIVE
              </span>
              <h4 className="font-display text-lg font-bold text-slate-950">
                {activeRoleData.title}
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                User Type: {activeRoleData.userType}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-mono-tech font-bold border self-start sm:self-auto ${activeRoleData.badgeColor}`}>
              {activeRoleData.badge}
            </span>
          </div>

          <p className="text-slate-700 leading-relaxed">
            {activeRoleData.purpose}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {activeRoleData.interfaceHighlights.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold block">
                  {item.label}
                </span>
                <strong className="text-slate-900 text-xs block leading-snug">
                  {item.value}
                </strong>
              </div>
            ))}
          </div>

          {/* Partition Grid: What this Role Sees vs What is Restricted */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
            
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2.5">
              <span className="text-[10px] font-mono-tech uppercase text-emerald-800 font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                VISIBLE DATA & CAPABILITIES
              </span>
              <ul className="space-y-1.5 text-slate-700 text-[11px]">
                {activeRoleData.visibleData.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                ACCESS RESTRICTIONS & BOUNDARIES
              </span>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                {activeRoleData.restrictedData.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
