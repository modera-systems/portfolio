import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Calendar, 
  Users, 
  Clock, 
  Heart, 
  TrendingUp, 
  RefreshCw, 
  FileCheck, 
  Building, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  AlertCircle, 
  DollarSign, 
  MapPin, 
  Phone, 
  Key, 
  Sliders
} from 'lucide-react';

type SimulationStep = 1 | 2 | 3 | 4 | 5 | 6;
type ActiveRoleView = 'client' | 'sitter' | 'manager' | 'owner';

export const SmallBusinessOperationsFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>(1);
  const [selectedRoleView, setSelectedRoleView] = useState<ActiveRoleView>('manager');

  // Synthetic Booking Data for Maya Thompson
  const syntheticBooking = {
    requestId: 'REQ-TKC-804',
    bookingId: 'BKG-2026-104',
    client: {
      name: 'Maya Thompson',
      email: 'maya.t@example.synthetic',
      phone: '(555) 019-4829',
      address: '742 Evergreen Terrace, Unit B',
      householdNotes: 'Gate code #4492. Lockbox on back patio railing (code 1084).'
    },
    service: {
      type: 'Weekend Pet Sitting & Home Care',
      category: 'Pet Care',
      dates: 'Fri Oct 24 – Sun Oct 26, 2026',
      serviceWindows: [
        'Fri Oct 24: Evening Visit (6:00 PM - 7:00 PM)',
        'Sat Oct 25: Morning (8:00 AM) & Evening (6:00 PM)',
        'Sun Oct 26: Morning (8:00 AM) & Afternoon Departure (3:00 PM)'
      ],
      duration: '3 Days / 5 Total Check-in Visits',
      baseFee: 240,
      addOns: [
        { name: 'Administer oral medication (Pepper)', price: 25 },
        { name: 'Indoor plant care (living room)', price: 15 }
      ],
      totalPrice: 280
    },
    pets: [
      {
        name: 'Oliver',
        type: 'Golden Retriever (Age 5)',
        diet: '1.5 cups kibble twice daily. Treats in pantry jar.',
        healthNotes: 'Friendly, leash-trained. Prefers 20-min neighborhood route.'
      },
      {
        name: 'Pepper',
        type: 'Domestic Shorthair Cat (Age 8)',
        diet: 'Wet food can at 8:00 AM. Dry bowl accessible.',
        healthNotes: 'Daily joint chew tablet crushed into wet food. Indoor only.'
      }
    ],
    vetInfo: {
      clinic: 'River Valley Animal Hospital',
      phone: '(555) 014-9921',
      emergencyAuthorized: true
    },
    assignedStaff: {
      sitterName: 'Elena Ramos',
      sitterRole: 'Senior Caregiver',
      assignedAt: 'Wed Oct 22, 11:30 AM'
    }
  };

  const stepsList = [
    { num: 1, label: '1. Customer Request', desc: 'Public intake form' },
    { num: 2, label: '2. Request Received', desc: 'Operations triage queue' },
    { num: 3, label: '3. Household Context', desc: 'Pet & access profile' },
    { num: 4, label: '4. Scheduling View', desc: 'Calendar & assignment' },
    { num: 5, label: '5. Role-Specific Views', desc: 'Client, Sitter, Manager, Owner' },
    { num: 6, label: '6. Business Visibility', desc: 'Business reporting' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Simulation Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                BUILD 04 • INTERACTIVE SIMULATION
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-100 text-emerald-800 font-bold">
                Synthetic Data
              </span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950">
              Small Business Operations Flow
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Follow one fictional care request through a connected small-business operating system — from public intake and internal triage through scheduling, role-specific views, and business reporting.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentStep(prev => (prev < 6 ? ((prev + 1) as SimulationStep) : 1))}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <span>{currentStep < 6 ? `Next Step (0${currentStep + 1}) →` : 'Restart Flow ↺'}</span>
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Reset to Step 1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6-Step Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {stepsList.map(st => (
            <button
              key={st.num}
              onClick={() => setCurrentStep(st.num as SimulationStep)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                currentStep === st.num
                  ? 'bg-orange-50/70 border-[#ea580c] shadow-2xs font-bold text-slate-950 ring-1 ring-[#ea580c]/30'
                  : currentStep > st.num
                  ? 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                  : 'bg-slate-50 border-slate-200/60 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono-tech text-[10px] font-bold ${
                  currentStep === st.num ? 'text-[#ea580c]' : 'text-slate-400'
                }`}>
                  0{st.num}
                </span>
                {currentStep > st.num && (
                  <Check className="w-3 h-3 text-emerald-600" />
                )}
              </div>
              <strong className="block text-xs mt-1 leading-snug">{st.label.replace(/^\d+\.\s*/, '')}</strong>
              <span className="text-[10px] text-slate-500 block truncate">{st.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Dynamic Step Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm">
        
        {/* ======================================================= */}
        {/* STEP 1: CUSTOMER REQUEST (Public Intake) */}
        {/* ======================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                  STEP 01 OF 06 • PUBLIC SERVICE REQUEST
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-slate-950">
                  Prospective Client Submits Care Request
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-blue-100 text-blue-900 border border-blue-200 font-semibold">
                Client-Facing Web Intake
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Maya Thompson visits the public website, reviews the transparent service pricing, and completes the structured intake form for weekend care.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 max-w-2xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-950 text-xs">Form Submission Payload (Simulated)</span>
                <span className="font-mono-tech text-[10px] text-slate-500">ID: {syntheticBooking.requestId}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Client Contact</span>
                  <p className="font-bold text-slate-900">{syntheticBooking.client.name}</p>
                  <p className="text-slate-600 text-[11px]">{syntheticBooking.client.email}</p>
                  <p className="text-slate-600 text-[11px]">{syntheticBooking.client.phone}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Requested Service</span>
                  <p className="font-bold text-slate-900">{syntheticBooking.service.type}</p>
                  <p className="text-slate-600 text-[11px]">{syntheticBooking.service.dates}</p>
                  <p className="text-[#ea580c] font-mono-tech font-bold text-[11px]">${syntheticBooking.service.totalPrice}.00 Total</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Selected Care Add-ons</span>
                <div className="flex flex-wrap gap-2">
                  {syntheticBooking.service.addOns.map((addon, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-medium">
                      + {addon.name} (${addon.price})
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <span>Transmit to Operations Queue →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 2: REQUEST RECEIVED (Triage Queue) */}
        {/* ======================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                  STEP 02 OF 06 • INTAKE & OPERATIONS TRIAGE
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-slate-950">
                  Request Enters Internal Triage Queue
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-orange-100 text-orange-900 border border-orange-200 font-semibold">
                Status: Pending Triage
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Rather than getting lost in an email inbox, the submission immediately generates a structured operational ticket in the owner/manager triage dashboard.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold block">1. Operational Verification</span>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>Dates Available in Service Radius</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>Pet Health Instructions Captured</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>Household Entry Details Attached</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold block">2. Pricing Computation</span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Weekend Rate:</span>
                    <span className="font-mono-tech font-semibold">${syntheticBooking.service.baseFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Selected Add-ons (2):</span>
                    <span className="font-mono-tech font-semibold">+$40</span>
                  </div>
                  <div className="pt-1 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>Total Calculated:</span>
                    <span className="font-mono-tech text-[#ea580c]">${syntheticBooking.service.totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase text-orange-900 font-bold block">3. Triage Action</span>
                  <p className="text-xs text-slate-700 mt-1">Associate with household profile and convert to confirmed booking.</p>
                </div>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>Link Household & Confirm →</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 3: HOUSEHOLD / CLIENT CONTEXT */}
        {/* ======================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                  STEP 03 OF 06 • PERSISTENT HOUSEHOLD CONTEXT
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-slate-950">
                  Associating Booking with Persistent Client & Pet Profiles
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-cyan-100 text-cyan-900 border border-cyan-200 font-semibold">
                Client 360 Record
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              The booking links directly to Maya's persistent household record, maintaining critical medical protocols and access codes across repeat visits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pet Profiles */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#ea580c]" />
                  Pet Care Profiles ({syntheticBooking.pets.length})
                </span>
                <div className="space-y-3">
                  {syntheticBooking.pets.map((pet, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold text-xs">{pet.name}</strong>
                        <span className="text-[10px] font-mono-tech text-slate-500">{pet.type}</span>
                      </div>
                      <p className="text-slate-600 text-[11px]"><strong className="text-slate-700">Diet:</strong> {pet.diet}</p>
                      <p className="text-slate-600 text-[11px]"><strong className="text-slate-700">Health:</strong> {pet.healthNotes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Household & Access Instructions */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-600" />
                  Household Access & Security
                </span>
                
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Service Address</span>
                  <p className="font-semibold text-slate-900">{syntheticBooking.client.address}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1 text-xs">
                  <span className="text-[10px] font-mono-tech text-amber-900 font-bold uppercase">Entry & Alarm Notes</span>
                  <p className="text-slate-800 text-[11px]">{syntheticBooking.client.householdNotes}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Designated Veterinary Clinic</span>
                  <p className="font-semibold text-slate-900">{syntheticBooking.vetInfo.clinic} — {syntheticBooking.vetInfo.phone}</p>
                  <span className="text-[10px] text-emerald-700 font-medium">✓ Emergency treatment authorization on file</span>
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2"
              >
                <span>View Operational Schedule →</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 4: SCHEDULING / OPERATIONAL VIEW */}
        {/* ======================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                  STEP 04 OF 06 • SCHEDULING & DISPATCH
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-slate-950">
                  Confirmed Booking Slotted on the Operational Calendar
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-purple-100 text-purple-900 border border-purple-200 font-semibold">
                Booking: {syntheticBooking.bookingId}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              The booking is now scheduled on the company's dispatch board. Staff assignment distributes the specific care dates and visit windows directly to senior caregiver Elena Ramos.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#ea580c]" />
                  <strong className="text-slate-950 text-xs sm:text-sm">Service Schedule: {syntheticBooking.service.dates}</strong>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Assigned Sitter:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-semibold font-mono-tech">
                    {syntheticBooking.assignedStaff.sitterName} ({syntheticBooking.assignedStaff.sitterRole})
                  </span>
                </div>
              </div>

              {/* Service Windows Breakdown */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold block">
                  Scheduled Check-In Windows ({syntheticBooking.service.serviceWindows.length} Visits)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {syntheticBooking.service.serviceWindows.map((win, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <span className="font-mono-tech text-[10px] text-[#ea580c] font-bold">Visit 0{idx + 1}</span>
                      <p className="text-slate-800 font-medium text-[11px] leading-snug">{win}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStep(5)}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2"
              >
                <span>Compare Role-Specific Views →</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 5: ROLE VIEW (Toggle: Client, Sitter, Manager, Owner) */}
        {/* ======================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                  STEP 05 OF 06 • ROLE-BASED OPERATIONAL PERSPECTIVES
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-slate-950">
                  How the Exact Same Booking Appears to Each Stakeholder
                </h4>
              </div>
              <span className="text-xs font-mono-tech font-bold text-slate-500">
                1 Event → 4 Tailored Interfaces
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Select a role below to see how the single booking record automatically renders differently to protect client privacy, provide caregivers with needed instructions, and give leadership business oversight:
            </p>

            {/* Role Switcher */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'client', label: 'Client Perspective', tag: 'Self-Service' },
                { id: 'sitter', label: 'Sitter Perspective', tag: 'Care Delivery' },
                { id: 'manager', label: 'Manager Perspective', tag: 'Dispatch' },
                { id: 'owner', label: 'Owner Perspective', tag: 'Business Health' }
              ].map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleView(role.id as ActiveRoleView)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                    selectedRoleView === role.id
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{role.label}</span>
                  <span className="text-[10px] font-mono-tech opacity-70">({role.tag})</span>
                </button>
              ))}
            </div>

            {/* Dynamic Role Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              
              {selectedRoleView === 'client' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Client Portal View (Maya Thompson)</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-blue-100 text-blue-900 font-bold">
                      Customer Scope
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Booking Reference:</span>
                      <span className="font-mono-tech font-bold text-slate-900">{syntheticBooking.bookingId}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Service:</span>
                      <span className="font-semibold text-slate-900">{syntheticBooking.service.type}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Dates:</span>
                      <span className="text-slate-800">{syntheticBooking.service.dates}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Total Billed:</span>
                      <span className="font-mono-tech font-bold text-emerald-700">${syntheticBooking.service.totalPrice}.00 (Paid via Portal)</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Note: The client sees their visit confirmation and invoice summary, but does not see internal sitter hourly costs or staff scheduling queues.
                  </p>
                </div>
              )}

              {selectedRoleView === 'sitter' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Sitter Field App (Elena Ramos)</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-100 text-emerald-900 font-bold">
                      Caregiver Scope
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                      ⚠️ Medical alert: Pepper requires oral chew tablet crushed into morning wet food (8:00 AM).
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 block text-[11px]">Household Access Instructions:</span>
                      <p className="font-mono-tech text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        {syntheticBooking.client.householdNotes}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 block text-[11px]">Emergency Veterinary Contact:</span>
                      <p className="text-slate-800 font-medium">{syntheticBooking.vetInfo.clinic} • {syntheticBooking.vetInfo.phone}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Note: The sitter receives critical medical and entry instructions to perform high-trust care, but financial pricing margins are hidden.
                  </p>
                </div>
              )}

              {selectedRoleView === 'manager' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Manager Dispatch Board</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-orange-100 text-orange-900 font-bold">
                      Operations Scope
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Assigned Sitter:</span>
                      <span className="font-semibold text-slate-900">{syntheticBooking.assignedStaff.sitterName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Dispatch Status:</span>
                      <span className="font-mono-tech text-emerald-700 font-bold">Confirmed & Acknowledged</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Total Visits Scheduled:</span>
                      <span className="font-mono-tech text-slate-800">5 check-ins over 3 days</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Note: The manager coordinates team capacity, verifies schedule conflicts, and monitors visit check-ins across all sitters.
                  </p>
                </div>
              )}

              {selectedRoleView === 'owner' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Owner Executive Dashboard</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-purple-100 text-purple-900 font-bold">
                      Full Business Visibility
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Gross Revenue</span>
                      <span className="font-mono-tech font-bold text-slate-950 text-base">${syntheticBooking.service.totalPrice}.00</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Add-on Contribution</span>
                      <span className="font-mono-tech font-bold text-[#ea580c] text-base">+16.6%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Client Status</span>
                      <span className="font-semibold text-emerald-700 block text-xs mt-1">Repeat Household</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Note: The owner evaluates revenue margins, service category demand, add-on attachment rates, and household retention.
                  </p>
                </div>
              )}

            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStep(6)}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2"
              >
                <span>View Business Visibility Analytics →</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 6: BUSINESS VISIBILITY (Operational Analytics) */}
        {/* ======================================================= */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold">
                  STEP 06 OF 06 • OPERATIONAL ANALYTICS & BUSINESS REPORTING
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-slate-950">
                  Operational Visibility Derived Directly from Booking Records
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold">
                Application Capability / Demo Data
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Instead of paying for complex third-party business intelligence tools or calculating metrics by hand, the platform derives key operational metrics directly from booking records:
            </p>

            {/* Live Synthetic Metrics Display */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-900 space-y-1">
                <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Revenue by Service</span>
                <div className="font-mono-tech text-lg font-bold text-white">$1,520</div>
                <span className="text-[10px] text-slate-400 block">Pet Sitting (Demo Week)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-900 space-y-1">
                <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Active Households</span>
                <div className="font-mono-tech text-lg font-bold text-white">14</div>
                <span className="text-[10px] text-emerald-400 block">+ Maya Thompson</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-900 space-y-1">
                <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Repeat Client Rate</span>
                <div className="font-mono-tech text-lg font-bold text-white">78.5%</div>
                <span className="text-[10px] text-slate-400 block">Derived from history</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-900 space-y-1">
                <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Add-On Attachment</span>
                <div className="font-mono-tech text-lg font-bold text-[#ea580c]">42.8%</div>
                <span className="text-[10px] text-slate-400 block">Medication & plant care</span>
              </div>

            </div>

            {/* Grounded Disclosure */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
                <span>Portfolio Disclosure (Demonstration Capability):</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                These numbers reflect business reporting calculations in the application logic using synthetic demo records. They demonstrate the platform&apos;s ability to aggregate operational data for small business owners without external reporting tools.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-medium">Flow complete: One business event → Connected operational visibility.</span>
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restart Simulation</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
