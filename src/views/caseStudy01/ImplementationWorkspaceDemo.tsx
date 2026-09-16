import React, { useState, useMemo } from 'react';
import {
  FictionalCustomer,
  DependencyNode,
  UatScenario,
  RiskItem,
  CustomerDecision,
  ActivityEvent,
  SYNTHETIC_CUSTOMERS,
  INITIAL_DEPENDENCY_CHAIN,
  INITIAL_UAT_SCENARIOS,
  INITIAL_RISKS,
  INITIAL_DECISIONS,
  INITIAL_ACTIVITIES
} from './caseStudy01Data';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Activity,
  Filter,
  Search,
  RotateCcw,
  Check,
  X,
  Lock,
  Unlock,
  ChevronRight,
  FileCode,
  Users,
  Server,
  Zap,
  Info,
  HelpCircle,
  Play,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

export const ImplementationWorkspaceDemo: React.FC = () => {
  // Directory Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('ALL');
  const [onlyAssignedToMe, setOnlyAssignedToMe] = useState(false);

  // Active Selected Customer
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('org_northstar');
  const [activeTab, setActiveTab] = useState<'overview' | 'dependencies' | 'integrations' | 'uat' | 'risks' | 'activity' | 'logic'>('overview');

  // Interactive State for Deep Dive (Northstar focus, reactive across)
  const [dependencyChain, setDependencyChain] = useState<DependencyNode[]>(INITIAL_DEPENDENCY_CHAIN);
  const [uatScenarios, setUatScenarios] = useState<UatScenario[]>(INITIAL_UAT_SCENARIOS);
  const [activities, setActivities] = useState<ActivityEvent[]>(INITIAL_ACTIVITIES);
  const [activityFilter, setActivityFilter] = useState<string>('ALL');
  const [inspectingDependencyId, setInspectingDependencyId] = useState<string>('dep_connection');
  const [inspectingUatId, setInspectingUatId] = useState<string>('uat_03');

  // Integration Simulator State
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  const [endpointHealth, setEndpointHealth] = useState<Record<string, { status: 'healthy' | 'timeout' | 'pending'; latency: string }>>({
    'erp-connector': { status: 'timeout', latency: '408 Timeout' },
    'ingress-webhook': { status: 'healthy', latency: '24ms' },
    'sso-idp': { status: 'healthy', latency: '62ms' }
  });

  // Current customer object
  const currentCustomer = useMemo(() => {
    return SYNTHETIC_CUSTOMERS.find(c => c.id === selectedCustomerId) || SYNTHETIC_CUSTOMERS[0];
  }, [selectedCustomerId]);

  // Evaluated dynamic status of Northstar based on user interactions
  const evaluatedNorthstarStatus = useMemo(() => {
    if (selectedCustomerId !== 'org_northstar') return currentCustomer.status;

    const hasBlockedDep = dependencyChain.some(d => d.status === 'blocked');
    const hasFailedBlockingUat = uatScenarios.some(u => u.criticality === 'Blocking Launch' && (u.status === 'Failed' || u.status === 'Blocked'));

    if (hasBlockedDep || hasFailedBlockingUat) {
      return 'BLOCKED';
    }
    const hasPendingUat = uatScenarios.some(u => u.status !== 'Passed');
    if (hasPendingUat) {
      return 'NEEDS_ATTENTION';
    }
    return 'ON_TRACK';
  }, [selectedCustomerId, currentCustomer.status, dependencyChain, uatScenarios]);

  // Evaluated explanation string
  const evaluatedStatusReason = useMemo(() => {
    if (selectedCustomerId !== 'org_northstar') return currentCustomer.statusReason;

    const blockedDep = dependencyChain.find(d => d.status === 'blocked');
    if (blockedDep) {
      return `Blocked by prerequisite: "${blockedDep.title}". Downstream stages suspended.`;
    }
    const failedUat = uatScenarios.find(u => u.criticality === 'Blocking Launch' && u.status === 'Failed');
    if (failedUat) {
      return `Blocked by UAT defect: "${failedUat.title}" failed schema assertion.`;
    }
    const hasPending = dependencyChain.some(d => d.status === 'pending');
    if (hasPending) {
      return 'All upstream blockers cleared. Remaining configuration validation in progress.';
    }
    return 'All dependencies and validation checks passed. Ready for launch cutover window.';
  }, [selectedCustomerId, currentCustomer.statusReason, dependencyChain, uatScenarios]);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return SYNTHETIC_CUSTOMERS.filter(c => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          c.name.toLowerCase().includes(q) ||
          c.imOwner.toLowerCase().includes(q) ||
          c.techOwner.toLowerCase().includes(q) ||
          c.primarySystem.toLowerCase().includes(q);
        if (!match) return false;
      }
      // Status
      if (selectedStatusFilter !== 'ALL') {
        const effectiveStatus = c.id === 'org_northstar' ? evaluatedNorthstarStatus : c.status;
        if (effectiveStatus !== selectedStatusFilter) return false;
      }
      // Phase
      if (selectedPhaseFilter !== 'ALL') {
        if (c.phase !== selectedPhaseFilter) return false;
      }
      // Assigned to me (Jordan Vance simulation)
      if (onlyAssignedToMe) {
        if (c.techOwner !== 'Jordan Vance') return false;
      }
      return true;
    });
  }, [searchQuery, selectedStatusFilter, selectedPhaseFilter, onlyAssignedToMe, evaluatedNorthstarStatus]);

  // Handle Dependency Toggle in interactive simulator
  const handleToggleDependencyStatus = (nodeId: string, newStatus: 'passed' | 'blocked' | 'pending') => {
    setDependencyChain(prev => {
      const updated = prev.map(item => {
        if (item.id === nodeId) {
          return {
            ...item,
            status: newStatus,
            diagnosticNote:
              newStatus === 'passed'
                ? 'Configuration verified and signed off in staging environment.'
                : newStatus === 'blocked'
                ? 'Connection timed out. Perimeter firewall rule 402 pending approval.'
                : 'Pending upstream verification.'
          };
        }
        return item;
      });

      // Recalculate cascade: if dep_connection is blocked, subsequent items must be blocked or pending
      const connectionNode = updated.find(d => d.id === 'dep_connection');
      if (connectionNode?.status === 'blocked') {
        return updated.map(item => {
          if (item.id === 'dep_mapping' || item.id === 'dep_test' || item.id === 'dep_uat' || item.id === 'dep_readiness') {
            return {
              ...item,
              status: 'pending',
              diagnosticNote: 'Execution halted: Upstream dependency "Connection & Firewall Whitelist" is blocked.'
            };
          }
          return item;
        });
      } else if (connectionNode?.status === 'passed') {
        return updated.map(item => {
          if (item.id === 'dep_mapping' && item.status === 'pending') {
            return {
              ...item,
              status: 'passed',
              diagnosticNote: 'Canonical schema mappings verified with customer ERP test suite.'
            };
          }
          if (item.id === 'dep_test' && item.status === 'pending') {
            return {
              ...item,
              status: 'passed',
              diagnosticNote: '12 of 12 synthetic transaction cycles completed successfully.'
            };
          }
          return item;
        });
      }

      return updated;
    });

    // Also update endpoint health simulator if connection was toggled
    if (nodeId === 'dep_connection') {
      setEndpointHealth(prev => ({
        ...prev,
        'erp-connector': {
          status: newStatus === 'passed' ? 'healthy' : 'timeout',
          latency: newStatus === 'passed' ? '112ms' : '408 Timeout'
        }
      }));
    }

    // Append to synthetic activity stream
    const targetNode = dependencyChain.find(d => d.id === nodeId);
    const newActivity: ActivityEvent = {
      id: `act_${Date.now()}`,
      timestamp: 'Just now',
      type: 'dependency',
      actor: 'Jordan Vance',
      actorRole: 'Technical Implementation Engineer',
      action: 'Toggled Dependency Status',
      details: `Changed "${targetNode?.title}" status to ${newStatus.toUpperCase()}. Downstream dependency state re-evaluated.`,
      badge: newStatus === 'passed' ? 'Resolved' : newStatus === 'blocked' ? 'Blocked' : 'Updated'
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  // Handle UAT status toggle
  const handleToggleUatStatus = (scenarioId: string, nextStatus: UatScenario['status']) => {
    setUatScenarios(prev =>
      prev.map(s => (s.id === scenarioId ? { ...s, status: nextStatus, lastRun: 'Just now' } : s))
    );

    const target = uatScenarios.find(s => s.id === scenarioId);
    const newActivity: ActivityEvent = {
      id: `act_${Date.now()}`,
      timestamp: 'Just now',
      type: 'uat',
      actor: 'Devon Patel',
      actorRole: 'Customer IT Admin',
      action: 'Updated UAT Result',
      details: `Scenario "${target?.title}" set to ${nextStatus}. Launch readiness gate recalculated.`,
      badge: nextStatus === 'Passed' ? 'UAT Pass' : nextStatus === 'Failed' ? 'UAT Fail' : 'UAT Update'
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  // Reset demo states
  const handleResetDemo = () => {
    setDependencyChain(INITIAL_DEPENDENCY_CHAIN);
    setUatScenarios(INITIAL_UAT_SCENARIOS);
    setActivities(INITIAL_ACTIVITIES);
    setEndpointHealth({
      'erp-connector': { status: 'timeout', latency: '408 Timeout' },
      'ingress-webhook': { status: 'healthy', latency: '24ms' },
      'sso-idp': { status: 'healthy', latency: '62ms' }
    });
  };

  // Simulate handshake ping
  const handleTestEndpoint = (key: string) => {
    setTestingEndpoint(key);
    setTimeout(() => {
      setTestingEndpoint(null);
      if (key === 'erp-connector') {
        const isConnPassed = dependencyChain.find(d => d.id === 'dep_connection')?.status === 'passed';
        setEndpointHealth(prev => ({
          ...prev,
          'erp-connector': {
            status: isConnPassed ? 'healthy' : 'timeout',
            latency: isConnPassed ? '98ms' : '408 Connection Timeout'
          }
        }));
      }
    }, 800);
  };

  // Render Status Badge
  const renderStatusBadge = (status: FictionalCustomer['status']) => {
    switch (status) {
      case 'BLOCKED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            BLOCKED
          </span>
        );
      case 'NEEDS_ATTENTION':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            NEEDS ATTENTION
          </span>
        );
      case 'AT_RISK':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <AlertCircle className="w-3 h-3 text-purple-600" />
            AT RISK
          </span>
        );
      case 'ON_TRACK':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ON TRACK
          </span>
        );
      case 'LIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Check className="w-3 h-3 text-blue-600" />
            LIVE
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden font-sans">
      
      {/* Workspace App Bar */}
      <div className="px-5 py-3.5 bg-slate-950 text-slate-200 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ea580c] flex items-center justify-center text-white font-mono-tech font-bold text-xs shadow-sm">
            IO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech font-bold tracking-wider text-white uppercase">
                IMPLEMENTATION OPS PLATFORM
              </span>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Synthetic Portfolio Sandbox
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive technical operating model • 5 Fictional Customer Implementations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
            title="Reset simulation states to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* Main Split: Directory on Left (collapsible/switchable) + Deep Dive Workspace on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        
        {/* Left Column: Implementation Directory (4 cols on large screens) */}
        <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50/60 p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech font-bold uppercase text-slate-700 tracking-wider">
                ACTIVE IMPLEMENTATIONS ({filteredCustomers.length})
              </span>
              <button
                onClick={() => setOnlyAssignedToMe(!onlyAssignedToMe)}
                className={`text-[10px] font-mono-tech px-2 py-1 rounded transition-colors ${
                  onlyAssignedToMe
                    ? 'bg-[#ea580c] text-white font-bold'
                    : 'bg-white border border-slate-300 text-slate-600 hover:text-slate-900'
                }`}
              >
                {onlyAssignedToMe ? '✓ Assigned to Me' : 'Assigned to Me'}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter customers, owners, systems..."
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-[#ea580c] text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Quick Status Pills Filter */}
            <div className="flex flex-wrap gap-1 text-[10px] font-mono-tech">
              {['ALL', 'BLOCKED', 'NEEDS_ATTENTION', 'AT_RISK', 'ON_TRACK', 'LIVE'].map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStatusFilter(st)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    selectedStatusFilter === st
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Customer List */}
            <div className="space-y-2 pt-1">
              {filteredCustomers.map(customer => {
                const isSelected = customer.id === selectedCustomerId;
                const effectiveStatus = customer.id === 'org_northstar' ? evaluatedNorthstarStatus : customer.status;

                return (
                  <button
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomerId(customer.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-white border-[#ea580c] shadow-md ring-1 ring-[#ea580c]/20'
                        : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h4 className="font-display font-bold text-xs text-slate-900 leading-tight">
                          {customer.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block">
                          {customer.industry}
                        </span>
                      </div>
                      <div>
                        {renderStatusBadge(effectiveStatus)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 pt-1.5 border-t border-slate-100">
                      <div>
                        <span className="text-slate-400 block">PHASE</span>
                        <span className="font-semibold text-slate-800">{customer.phase}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">TARGET CUTOVER</span>
                        <span className="font-semibold text-slate-800">{customer.targetDate}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span className="truncate max-w-[160px]">
                        Tech: <span className="text-slate-700 font-medium">{customer.techOwner}</span>
                      </span>
                      <span className="font-mono-tech font-bold text-slate-700">
                        {customer.id === 'org_northstar' ? '58%' : `${customer.progressPercent}%`}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          effectiveStatus === 'BLOCKED'
                            ? 'bg-rose-500'
                            : effectiveStatus === 'AT_RISK'
                            ? 'bg-purple-500'
                            : effectiveStatus === 'NEEDS_ATTENTION'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${customer.progressPercent}%` }}
                      ></div>
                    </div>
                  </button>
                );
              })}

              {filteredCustomers.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
                  No fictional implementations match filter criteria.
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <span className="font-mono-tech font-bold text-slate-900 block text-[10px] uppercase text-[#ea580c]">
              PORTFOLIO NOTICE
            </span>
            <p className="leading-snug">
              Organizations, records, and endpoints are completely fictional representations of technical implementation operations.
            </p>
          </div>
        </div>

        {/* Right Column: Deep-Dive Workspace (8 cols on large screens) */}
        <div className="lg:col-span-8 p-5 sm:p-6 space-y-6 bg-white overflow-y-auto max-h-[820px]">
          
          {/* Implementation Header Bar */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-950">
                    {currentCustomer.name}
                  </h3>
                  <span className="text-[11px] font-mono-tech text-slate-400">
                    ({currentCustomer.id})
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {currentCustomer.summary}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {renderStatusBadge(selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status)}
                <button
                  onClick={() => setActiveTab('logic')}
                  className="text-[11px] font-mono-tech px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:text-[#ea580c] hover:border-[#ea580c] transition-colors"
                >
                  Inspect Rule Logic →
                </button>
              </div>
            </div>

            {/* Explainable Status Reason Callout */}
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
              (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'BLOCKED'
                ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                : (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'AT_RISK'
                ? 'bg-purple-50/90 border-purple-200 text-purple-950'
                : (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'NEEDS_ATTENTION'
                ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
            }`}>
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-current" />
              <div>
                <span className="font-mono-tech font-bold uppercase text-[10px] tracking-wider block mb-0.5">
                  OPERATIONAL STATUS RATIONALE:
                </span>
                <p className="font-medium leading-relaxed">
                  {selectedCustomerId === 'org_northstar' ? evaluatedStatusReason : currentCustomer.statusReason}
                </p>
              </div>
            </div>

            {/* Core Meta Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-mono-tech text-slate-400 block">CURRENT PHASE</span>
                <span className="font-bold text-slate-900">{currentCustomer.phase}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-mono-tech text-slate-400 block">TARGET CUTOVER</span>
                <span className="font-bold text-slate-900">{currentCustomer.targetDate}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-mono-tech text-slate-400 block">IM OWNER</span>
                <span className="font-bold text-slate-900">{currentCustomer.imOwner}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-mono-tech text-slate-400 block">TECH IMPLEMENTER</span>
                <span className="font-bold text-slate-900">{currentCustomer.techOwner}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-px text-xs font-mono-tech">
            {[
              { id: 'overview', label: '01. Overview' },
              { id: 'dependencies', label: '02. Dependencies (Interactive)' },
              { id: 'integrations', label: '03. Integrations' },
              { id: 'uat', label: '04. UAT Scenarios' },
              { id: 'risks', label: '05. Risks & Decisions' },
              { id: 'activity', label: '06. Event Stream' },
              { id: 'logic', label: '07. Status Logic' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#ea580c] text-[#ea580c] bg-[#ea580c]/5'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Critical Questions answered immediately */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Immediate Blockers / What is preventing progress */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono-tech font-bold uppercase text-slate-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      What is Preventing Progress?
                    </span>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">
                      Critical Path
                    </span>
                  </div>

                  {selectedCustomerId === 'org_northstar' && dependencyChain.find(d => d.status === 'blocked') ? (
                    <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-rose-900">
                        <span>{dependencyChain.find(d => d.status === 'blocked')?.title}</span>
                        <span className="text-[10px] font-mono-tech bg-rose-200 px-1.5 py-0.5 rounded text-rose-950">
                          Gate 2 Blocked
                        </span>
                      </div>
                      <p className="text-rose-800 text-[11px] leading-relaxed">
                        {dependencyChain.find(d => d.status === 'blocked')?.diagnosticNote}
                      </p>
                      <div className="text-[10px] text-rose-700 pt-1 flex items-center justify-between">
                        <span>Owner: Devon Patel (Customer IT)</span>
                        <button
                          onClick={() => setActiveTab('dependencies')}
                          className="font-bold underline hover:text-rose-950"
                        >
                          Simulate Resolution →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      No upstream technical dependencies currently blocking progress.
                    </div>
                  )}

                  {/* Immediate Next Actions partitioned by Ownership */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
                      NEXT REQUIRED ACTIONS BY OWNER:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start justify-between gap-2">
                        <div>
                          <span className="font-semibold text-slate-900 block">Customer IT Action:</span>
                          <span className="text-slate-600 text-[11px]">Authorize firewall change ticket CHG-SEC-8921 for static subnet 52.24.110.0/24</span>
                        </div>
                        <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold shrink-0">
                          Waiting on Client
                        </span>
                      </div>

                      <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start justify-between gap-2">
                        <div>
                          <span className="font-semibold text-slate-900 block">Technical Team Action:</span>
                          <span className="text-slate-600 text-[11px]">Patch canonical tax rule 104 in order return translation dictionary</span>
                        </div>
                        <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold shrink-0">
                          Jordan Vance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantitative Implementation State Summary */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono-tech font-bold uppercase text-slate-900 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#ea580c]" />
                      Implementation Readiness Metrics
                    </span>
                    <span className="text-[10px] font-mono-tech text-slate-500">Live Evaluation</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono-tech text-slate-500 block">DEPENDENCIES</span>
                      <div className="text-lg font-display font-extrabold text-slate-900 mt-1">
                        {dependencyChain.filter(d => d.status === 'passed').length} / {dependencyChain.length}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {dependencyChain.some(d => d.status === 'blocked') ? '1 Critical Blocker' : '0 Blockers'}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono-tech text-slate-500 block">UAT PASS RATE</span>
                      <div className="text-lg font-display font-extrabold text-slate-900 mt-1">
                        {uatScenarios.filter(u => u.status === 'Passed').length} / {uatScenarios.length}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {uatScenarios.some(u => u.criticality === 'Blocking Launch' && u.status === 'Failed') ? '1 Blocking Failure' : 'All Blocking Passed'}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono-tech text-slate-500 block">ACTIVE RISKS</span>
                      <div className="text-lg font-display font-extrabold text-slate-900 mt-1">
                        {INITIAL_RISKS.filter(r => r.status === 'Open').length} Open
                      </div>
                      <span className="text-[10px] text-rose-600 font-semibold">1 High Severity</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono-tech text-slate-500 block">RATIFIED DECISIONS</span>
                      <div className="text-lg font-display font-extrabold text-slate-900 mt-1">
                        {INITIAL_DECISIONS.length} Signed
                      </div>
                      <span className="text-[10px] text-slate-500">Documented in Log</span>
                    </div>
                  </div>

                  {/* Primary System Configuration */}
                  <div className="p-3 rounded-lg bg-slate-950 text-slate-200 text-xs font-mono-tech space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>INTEGRATION ARCHITECTURE</span>
                      <span className="text-emerald-400">STAGING VAULT</span>
                    </div>
                    <div className="text-xs text-white font-bold truncate">
                      {currentCustomer.primarySystem}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Ingress: /api/v1/inbound/orders • Egress: Enterprise Connector v2.4
                    </div>
                  </div>
                </div>

              </div>

              {/* Lifecycle Stage Progression Bar */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-mono-tech font-bold uppercase text-slate-800 block">
                  DEPLOYMENT LIFECYCLE PROGRESSION
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[10px] font-mono-tech text-center">
                  {[
                    { name: 'Discovery', done: true },
                    { name: 'Solution Design', done: true },
                    { name: 'Configuration', done: true },
                    { name: 'Integration', active: true },
                    { name: 'Validation / UAT', pending: true },
                    { name: 'Launch Cutover', pending: true }
                  ].map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className={`p-2 rounded-lg border ${
                        phase.done
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : phase.active
                          ? 'bg-[#ea580c]/10 border-[#ea580c] text-[#ea580c] font-bold ring-1 ring-[#ea580c]'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      {phase.done && <Check className="w-3 h-3 mx-auto mb-0.5 text-emerald-600" />}
                      {phase.active && <Activity className="w-3 h-3 mx-auto mb-0.5 text-[#ea580c] animate-pulse" />}
                      {phase.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEPENDENCIES (INTERACTIVE SIMULATOR) */}
          {activeTab === 'dependencies' && (
            <div className="space-y-6">
              
              {/* Highlight Quote Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-tech text-[#ea580c] uppercase font-bold tracking-wider">
                  CORE TECHNICAL GOVERNING PRINCIPLE
                </span>
                <p className="text-sm sm:text-base font-display font-medium text-slate-100 italic">
                  “A milestone can have a target date. A dependency determines whether it can actually happen.”
                </p>
                <p className="text-xs text-slate-400 pt-1">
                  Interact with the chain below: Toggle "Connection & Firewall Whitelist" between Blocked and Passed to observe how downstream stages react in real-time.
                </p>
              </div>

              {/* Dependency Chain Flow */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech font-bold uppercase text-slate-900">
                    INTERACTIVE TECHNICAL DEPENDENCY CHAIN
                  </span>
                  <span className="text-[10px] font-mono-tech text-slate-500">
                    Click status to simulate real-world changes
                  </span>
                </div>

                <div className="space-y-3">
                  {dependencyChain.map((node, index) => {
                    const isInspecting = inspectingDependencyId === node.id;
                    const isUpstreamBlocked =
                      node.id !== 'dep_credentials' &&
                      node.id !== 'dep_connection' &&
                      dependencyChain.find(d => d.id === 'dep_connection')?.status === 'blocked';

                    return (
                      <div
                        key={node.id}
                        className={`p-4 rounded-xl border transition-all ${
                          node.status === 'blocked'
                            ? 'bg-rose-50/70 border-rose-300'
                            : isUpstreamBlocked
                            ? 'bg-slate-50/80 border-slate-200 opacity-80'
                            : node.status === 'passed'
                            ? 'bg-white border-slate-200 hover:border-slate-300'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono-tech font-bold text-xs flex items-center justify-center shrink-0">
                              0{index + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-display font-bold text-sm text-slate-950">
                                  {node.title}
                                </h4>
                                <span className="text-[10px] font-mono-tech text-slate-500">
                                  [{node.stage}]
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5">
                                {node.technicalPrerequisite}
                              </p>
                              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono-tech mt-1">
                                <span>Owner: <strong className="text-slate-800">{node.ownerName}</strong></span>
                                <span>•</span>
                                <span>Verified: {node.lastVerified}</span>
                              </div>
                            </div>
                          </div>

                          {/* Status Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            {node.id === 'dep_connection' ? (
                              <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 shadow-xs">
                                <button
                                  onClick={() => handleToggleDependencyStatus(node.id, 'passed')}
                                  className={`px-2.5 py-1 rounded text-xs font-mono-tech font-bold transition-all ${
                                    node.status === 'passed'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  ✓ Passed
                                </button>
                                <button
                                  onClick={() => handleToggleDependencyStatus(node.id, 'blocked')}
                                  className={`px-2.5 py-1 rounded text-xs font-mono-tech font-bold transition-all ${
                                    node.status === 'blocked'
                                      ? 'bg-rose-600 text-white shadow-xs animate-pulse'
                                      : 'text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  ✕ Blocked
                                </button>
                              </div>
                            ) : (
                              <div>
                                {node.status === 'passed' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono-tech font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    <Check className="w-3 h-3" />
                                    PASSED
                                  </span>
                                )}
                                {node.status === 'blocked' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono-tech font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                    <X className="w-3 h-3" />
                                    BLOCKED
                                  </span>
                                )}
                                {node.status === 'pending' && (
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono-tech font-bold ${
                                    isUpstreamBlocked
                                      ? 'bg-slate-200 text-slate-600 border border-slate-300'
                                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                                  }`}>
                                    <Clock className="w-3 h-3" />
                                    {isUpstreamBlocked ? 'GATED BY UPSTREAM' : 'PENDING'}
                                  </span>
                                )}
                              </div>
                            )}

                            <button
                              onClick={() => setInspectingDependencyId(isInspecting ? '' : node.id)}
                              className="text-[11px] font-mono-tech px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                            >
                              {isInspecting ? 'Hide Details' : 'Inspect'}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Diagnostic Drawer */}
                        {isInspecting && (
                          <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs space-y-2 bg-slate-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-500 uppercase">
                              <span>DIAGNOSTIC LOG & CONTEXT</span>
                              <span>ID: {node.id}</span>
                            </div>
                            <p className="text-slate-800 font-mono-tech text-xs bg-white p-2 rounded border border-slate-200">
                              {node.diagnosticNote}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div>
                                <span className="font-bold text-slate-700 block">Upstream Requirements:</span>
                                <span className="text-slate-600 font-mono-tech">
                                  {node.requires.length > 0 ? node.requires.join(', ') : 'Root requirement'}
                                </span>
                              </div>
                              <div>
                                <span className="font-bold text-slate-700 block">Directly Blocks:</span>
                                <span className="text-slate-600 font-mono-tech">
                                  {node.blocks.length > 0 ? node.blocks.join(', ') : 'Terminal readiness node'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-slate-950 text-base">
                    Connected Endpoints & System Handshakes
                  </h4>
                  <p className="text-xs text-slate-600">
                    Real-time status of configured integration tiers for {currentCustomer.name}.
                  </p>
                </div>
                <span className="text-xs font-mono-tech text-slate-500">Staging Environment</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    key: 'erp-connector',
                    name: 'ERP Connector',
                    protocol: 'REST / Mutual TLS',
                    endpoint: 'https://gateway.northstar-internal.net/api/v2',
                    auth: 'OAuth 2.0 Client Credentials',
                    state: endpointHealth['erp-connector'].status,
                    latency: endpointHealth['erp-connector'].latency,
                    description: 'Authoritative financial ledger, catalog sync, and order dispatch.'
                  },
                  {
                    key: 'ingress-webhook',
                    name: 'Inbound Webhook Gateway',
                    protocol: 'HTTPS Ingress',
                    endpoint: 'https://api.portfolio.internal/v1/inbound/orders',
                    auth: 'HMAC SHA-256 Signatures',
                    state: endpointHealth['ingress-webhook'].status,
                    latency: endpointHealth['ingress-webhook'].latency,
                    description: 'Receives asynchronous partner events with timestamp replay window.'
                  },
                  {
                    key: 'sso-idp',
                    name: 'Identity Provider (SSO)',
                    protocol: 'SAML 2.0 / SCIM',
                    endpoint: 'https://idp.northstar-auth.net/saml/sso',
                    auth: 'X.509 Certificate Token',
                    state: endpointHealth['sso-idp'].status,
                    latency: endpointHealth['sso-idp'].latency,
                    description: 'Automated user provisioning and role-based access control.'
                  }
                ].map(ep => (
                  <div key={ep.key} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">
                          {ep.protocol}
                        </span>
                        <h5 className="font-bold text-sm text-slate-900">{ep.name}</h5>
                      </div>
                      <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded font-bold ${
                        ep.state === 'healthy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {ep.state.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ep.description}
                    </p>

                    <div className="p-2 rounded bg-slate-50 border border-slate-100 text-[10px] font-mono-tech text-slate-700 space-y-1">
                      <div className="truncate">URL: {ep.endpoint}</div>
                      <div>Auth: {ep.auth}</div>
                      <div>Latency: {ep.latency}</div>
                    </div>

                    <button
                      onClick={() => handleTestEndpoint(ep.key)}
                      disabled={testingEndpoint === ep.key}
                      className="w-full py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono-tech hover:bg-[#ea580c] transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {testingEndpoint === ep.key ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Probing Endpoint...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3" />
                          <span>Test Handshake</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: UAT EXPERIENCE */}
          {activeTab === 'uat' && (
            <div className="space-y-6">
              
              {/* UAT Launch Gate Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono-tech text-[#ea580c] uppercase font-bold tracking-wider block">
                    PRODUCTION VALIDATION GATE
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {uatScenarios.some(u => u.criticality === 'Blocking Launch' && (u.status === 'Failed' || u.status === 'Blocked')) ? (
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-display">
                        <Lock className="w-4 h-4 text-rose-500" />
                        <span>LAUNCH GATE LOCKED: 1 or more critical UAT scenarios failing</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-display">
                        <Unlock className="w-4 h-4 text-emerald-400" />
                        <span>LAUNCH GATE UNLOCKED: All critical UAT assertions satisfied</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs font-mono-tech text-slate-300">
                  <span>Passed: {uatScenarios.filter(u => u.status === 'Passed').length} / {uatScenarios.length}</span>
                  <div className="text-[10px] text-slate-400">Zero-defect policy on launch-critical tier</div>
                </div>
              </div>

              {/* Scenarios Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech font-bold uppercase text-slate-900">
                    TEST SCENARIOS & LIVE ASSERTIONS
                  </span>
                  <span className="text-[10px] font-mono-tech text-slate-500">
                    Toggle statuses to test launch gate gating
                  </span>
                </div>

                <div className="space-y-3">
                  {uatScenarios.map(uat => {
                    const isInspecting = inspectingUatId === uat.id;

                    return (
                      <div
                        key={uat.id}
                        className={`p-4 rounded-xl border transition-all ${
                          uat.status === 'Failed'
                            ? 'bg-rose-50/60 border-rose-300'
                            : uat.status === 'Blocked'
                            ? 'bg-amber-50/60 border-amber-300'
                            : uat.status === 'Passed'
                            ? 'bg-white border-slate-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded font-bold ${
                                uat.criticality === 'Blocking Launch'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {uat.criticality}
                              </span>
                              <span className="text-xs text-slate-400 font-mono-tech">
                                {uat.category}
                              </span>
                            </div>
                            <h5 className="font-display font-bold text-sm text-slate-900 mt-1">
                              {uat.title}
                            </h5>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {uat.description}
                            </p>
                          </div>

                          {/* Toggle status control */}
                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={uat.status}
                              onChange={e => handleToggleUatStatus(uat.id, e.target.value as any)}
                              className={`text-xs font-mono-tech font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                                uat.status === 'Passed'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                  : uat.status === 'Failed'
                                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                                  : uat.status === 'Blocked'
                                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                                  : 'bg-white border-slate-300 text-slate-700'
                              }`}
                            >
                              <option value="Passed">Passed</option>
                              <option value="Failed">Failed</option>
                              <option value="Blocked">Blocked</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Not Started">Not Started</option>
                            </select>

                            <button
                              onClick={() => setInspectingUatId(isInspecting ? '' : uat.id)}
                              className="text-[11px] font-mono-tech px-2 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                            >
                              {isInspecting ? 'Close' : 'Details'}
                            </button>
                          </div>
                        </div>

                        {/* Detailed assertion & diagnostic output */}
                        {isInspecting && (
                          <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-2 bg-slate-50 p-3 rounded-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <span className="font-mono-tech font-bold uppercase text-[10px] text-slate-500 block mb-0.5">
                                  VALIDATION ASSERTION:
                                </span>
                                <p className="text-slate-800 font-medium">
                                  {uat.assertion}
                                </p>
                              </div>
                              <div>
                                <span className="font-mono-tech font-bold uppercase text-[10px] text-slate-500 block mb-0.5">
                                  DIAGNOSTIC TELEMETRY:
                                </span>
                                <p className="text-slate-700 font-mono-tech text-[11px] bg-white p-1.5 rounded border border-slate-200">
                                  {uat.diagnosticOutput}
                                </p>
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono-tech pt-1">
                              Tested by: {uat.testedBy} • Last evaluated: {uat.lastRun}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RISKS & DECISIONS */}
          {activeTab === 'risks' && (
            <div className="space-y-6">
              
              {/* Risks Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech font-bold uppercase text-slate-900 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#ea580c]" />
                    ACTIVE OPERATIONAL RISKS ({INITIAL_RISKS.length})
                  </span>
                  <span className="text-xs text-slate-500 font-mono-tech">
                    Risk-adjusted mitigation roadmap
                  </span>
                </div>

                <div className="space-y-3">
                  {INITIAL_RISKS.map(risk => (
                    <div key={risk.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded font-bold uppercase ${
                              risk.severity === 'High'
                                ? 'bg-rose-100 text-rose-800'
                                : risk.severity === 'Medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {risk.severity} Severity
                            </span>
                            <span className="text-xs text-slate-500 font-mono-tech">
                              {risk.category}
                            </span>
                          </div>
                          <h5 className="font-bold text-sm text-slate-900 mt-1">{risk.title}</h5>
                        </div>
                        <span className="text-[10px] font-mono-tech px-2 py-1 rounded bg-slate-100 text-slate-700 font-semibold">
                          {risk.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                        <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                          <span className="font-bold text-slate-700 block text-[10px] uppercase text-slate-500">
                            OPERATIONAL IMPACT:
                          </span>
                          <p className="text-slate-800 text-[11px] mt-0.5">{risk.impact}</p>
                        </div>
                        <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                          <span className="font-bold text-slate-700 block text-[10px] uppercase text-slate-500">
                            MITIGATION STRATEGY:
                          </span>
                          <p className="text-slate-800 text-[11px] mt-0.5">{risk.mitigationPlan}</p>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono-tech text-slate-400 pt-1">
                        Assigned Owner: <strong className="text-slate-700">{risk.owner}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratified Customer Decisions */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech font-bold uppercase text-slate-900 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-emerald-600" />
                    RATIFIED ARCHITECTURAL & CUSTOMER DECISIONS ({INITIAL_DECISIONS.length})
                  </span>
                  <span className="text-xs text-slate-500 font-mono-tech">
                    Immutable governance log
                  </span>
                </div>

                <div className="space-y-3">
                  {INITIAL_DECISIONS.map(dec => (
                    <div key={dec.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h5 className="font-bold text-sm text-slate-900">{dec.title}</h5>
                        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 shrink-0">
                          {dec.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong className="text-slate-900">Rationale:</strong> {dec.rationale}
                      </p>
                      <div className="p-2.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700">
                        <span className="font-mono-tech font-bold text-[10px] text-emerald-700 block uppercase mb-0.5">
                          TECHNICAL & ARCHITECTURAL IMPLICATION:
                        </span>
                        {dec.downstreamImplication}
                      </div>
                      <div className="text-[10px] font-mono-tech text-slate-400">
                        Ratified by: <strong className="text-slate-700">{dec.decidedBy}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: ACTIVITY EVENT STREAM */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-display font-bold text-slate-950 text-base">
                    Synthetic Implementation Event History
                  </h4>
                  <p className="text-xs text-slate-600">
                    Chronological audit stream recording dependency state mutations, test runs, and governance changes.
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono-tech">
                  {['ALL', 'dependency', 'uat', 'risk', 'decision'].map(f => (
                    <button
                      key={f}
                      onClick={() => setActivityFilter(f)}
                      className={`px-2 py-1 rounded transition-colors ${
                        activityFilter === f
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {activities
                  .filter(a => activityFilter === 'ALL' || a.type === activityFilter)
                  .map(act => (
                    <div key={act.id} className="relative pl-9 space-y-1">
                      <div className="absolute left-2 top-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#ea580c]"></div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{act.action}</span>
                          <span className="text-[10px] font-mono-tech text-slate-400">{act.timestamp}</span>
                        </div>
                        <p className="text-slate-700 text-xs leading-relaxed">
                          {act.details}
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-500 pt-1 border-t border-slate-100">
                          <span>By: <strong className="text-slate-800">{act.actor}</strong> ({act.actorRole})</span>
                          {act.badge && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                              {act.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 7: STATUS LOGIC INSPECTOR */}
          {activeTab === 'logic' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800">
                <span className="text-[10px] font-mono-tech text-[#ea580c] uppercase font-bold tracking-wider">
                  DETERMINISTIC EVALUATION LOGIC
                </span>
                <h4 className="font-display text-lg font-bold text-slate-100">
                  Explainable Rules-Based Health Engine (No Black-Box Scores)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rather than calculating arbitrary "readiness percentages", the platform evaluates unambiguous boolean rules derived directly from dependency state, customer decisions, and UAT assertions.
                </p>
              </div>

              {/* Rules Evaluation Matrix */}
              <div className="space-y-3">
                {[
                  {
                    status: 'BLOCKED',
                    rule: 'Critical path prerequisite or blocking UAT scenario in Failed or Blocked state.',
                    currentCustomerMatch: (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'BLOCKED',
                    diagnosticDetail: 'Active blocker: Perimeter firewall ingress whitelist rule 402 is unresolved.'
                  },
                  {
                    status: 'AT_RISK',
                    rule: 'Target cutover within 14 calendar days with unresolved dependencies or open High-severity risk.',
                    currentCustomerMatch: (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'AT_RISK',
                    diagnosticDetail: 'Evaluated when target cutover window is imminent and unresolved dependencies remain.'
                  },
                  {
                    status: 'NEEDS_ATTENTION',
                    rule: 'Blocked on external customer action (e.g. credential submission, maintenance window sign-off).',
                    currentCustomerMatch: (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'NEEDS_ATTENTION',
                    diagnosticDetail: 'Customer executive sponsor approval or IT sign-off required to advance stage.'
                  },
                  {
                    status: 'ON_TRACK',
                    rule: 'All upstream prerequisites passing. Active work progressing within planned schedule.',
                    currentCustomerMatch: (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'ON_TRACK',
                    diagnosticDetail: 'No open Severity-1 risks; all upstream dependency gates verified.'
                  },
                  {
                    status: 'LIVE',
                    rule: 'All 6 lifecycle gates certified. Cutover executed. 14-day post-launch stabilization window running.',
                    currentCustomerMatch: (selectedCustomerId === 'org_northstar' ? evaluatedNorthstarStatus : currentCustomer.status) === 'LIVE',
                    diagnosticDetail: 'Implementation completed; production reconciliation verified.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-xs transition-all ${
                      item.currentCustomerMatch
                        ? 'bg-[#ea580c]/5 border-[#ea580c] ring-1 ring-[#ea580c]/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {renderStatusBadge(item.status as any)}
                        <span className="font-mono-tech text-[10px] text-slate-400">Rule #{idx + 1}</span>
                      </div>
                      {item.currentCustomerMatch && (
                        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#ea580c] text-white font-bold">
                          ✓ ACTIVE FOR {currentCustomer.name.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {item.rule}
                    </p>
                    {item.currentCustomerMatch && (
                      <p className="mt-2 p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-600 font-mono-tech">
                        Reason: {selectedCustomerId === 'org_northstar' ? evaluatedStatusReason : currentCustomer.statusReason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
