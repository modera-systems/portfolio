export interface FictionalCustomer {
  id: string;
  name: string;
  industry: string;
  phase: string;
  status: 'BLOCKED' | 'NEEDS_ATTENTION' | 'AT_RISK' | 'ON_TRACK' | 'LIVE';
  statusReason: string;
  targetDate: string;
  progressPercent: number;
  imOwner: string;
  techOwner: string;
  primarySystem: string;
  lastActivity: string;
  summary: string;
  primaryBlocker?: string;
  dependenciesSummary: {
    total: number;
    completed: number;
    blocked: number;
    pending: number;
  };
  uatSummary: {
    total: number;
    passed: number;
    failed: number;
    blocked: number;
    notStarted: number;
  };
}

export interface DependencyNode {
  id: string;
  title: string;
  stage: string;
  ownerType: 'Customer IT' | 'Technical Implementation' | 'Joint / Security';
  ownerName: string;
  status: 'passed' | 'blocked' | 'in_progress' | 'pending';
  requires: string[];
  blocks: string[];
  diagnosticNote: string;
  technicalPrerequisite: string;
  lastVerified?: string;
}

export interface UatScenario {
  id: string;
  title: string;
  category: 'Order Processing' | 'Inventory & Catalog' | 'Accounting & Ledger' | 'Security & Auth';
  description: string;
  status: 'Passed' | 'Failed' | 'Blocked' | 'In Progress' | 'Not Started';
  criticality: 'Blocking Launch' | 'High' | 'Medium';
  testedBy: string;
  lastRun: string;
  assertion: string;
  diagnosticOutput?: string;
}

export interface RiskItem {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  category: 'Technical' | 'Customer Timeline' | 'Data Quality' | 'Security';
  owner: string;
  impact: string;
  mitigationPlan: string;
  status: 'Open' | 'Mitigating' | 'Resolved';
}

export interface CustomerDecision {
  id: string;
  title: string;
  decidedBy: string;
  date: string;
  rationale: string;
  downstreamImplication: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'dependency' | 'uat' | 'decision' | 'risk' | 'milestone' | 'integration';
  actor: string;
  actorRole: string;
  action: string;
  details: string;
  badge?: string;
}

export const SYNTHETIC_CUSTOMERS: FictionalCustomer[] = [
  {
    id: 'org_northstar',
    name: 'Northstar Distribution',
    industry: 'Wholesale & Regional Logistics',
    phase: 'Integration',
    status: 'BLOCKED',
    statusReason: 'Production ERP token exchange blocked by network firewall whitelist requirement at customer data center.',
    targetDate: 'Nov 12, 2026',
    progressPercent: 58,
    imOwner: 'Maya Lin',
    techOwner: 'Jordan Vance',
    primarySystem: 'Enterprise ERP & Inbound Webhooks',
    lastActivity: '24m ago',
    summary: 'Multi-branch logistics distributor synchronizing regional fulfillment centers with real-time dispatch and catalog feeds.',
    primaryBlocker: 'Customer IT security has not added outbound static IPs to perimeter firewall rule 402.',
    dependenciesSummary: {
      total: 6,
      completed: 2,
      blocked: 1,
      pending: 3
    },
    uatSummary: {
      total: 6,
      passed: 2,
      failed: 1,
      blocked: 2,
      notStarted: 1
    }
  },
  {
    id: 'org_atlas',
    name: 'Atlas Equipment',
    industry: 'Industrial Heavy Machinery',
    phase: 'Validation / UAT',
    status: 'AT_RISK',
    statusReason: 'UAT return authorization flow failed schema check; customer UAT testing team scheduled for sign-off in 48 hours.',
    targetDate: 'Oct 28, 2026',
    progressPercent: 74,
    imOwner: 'Marcus Thorne',
    techOwner: 'Elena Rostova',
    primarySystem: 'Inventory Restlet & SAML SSO',
    lastActivity: '3h ago',
    summary: 'Heavy equipment rental operation standardizing telematics asset tracking across 42 depots.',
    primaryBlocker: 'Return transaction validation error in staging sandbox.',
    dependenciesSummary: {
      total: 6,
      completed: 4,
      blocked: 0,
      pending: 2
    },
    uatSummary: {
      total: 6,
      passed: 4,
      failed: 1,
      blocked: 0,
      notStarted: 1
    }
  },
  {
    id: 'org_summit',
    name: 'Summit Industrial',
    industry: 'Precision Component Manufacturing',
    phase: 'Configuration',
    status: 'ON_TRACK',
    statusReason: 'Schema mappings approved by customer solution team; environment staging setup completed on schedule.',
    targetDate: 'Dec 15, 2026',
    progressPercent: 35,
    imOwner: 'Sarah Chen',
    techOwner: 'Jordan Vance',
    primarySystem: 'B2B Catalog Feed & SCIM Sync',
    lastActivity: '1d ago',
    summary: 'Specialized aerospace fastener manufacturer configuring automated partner quotes and customer catalog feeds.',
    dependenciesSummary: {
      total: 6,
      completed: 2,
      blocked: 0,
      pending: 4
    },
    uatSummary: {
      total: 6,
      passed: 0,
      failed: 0,
      blocked: 0,
      notStarted: 6
    }
  },
  {
    id: 'org_bluepeak',
    name: 'BluePeak Supply',
    industry: 'Commercial Facility Supplies',
    phase: 'Launch Readiness',
    status: 'NEEDS_ATTENTION',
    statusReason: 'Customer Executive Sponsor sign-off required for final cutover window; technical dependencies are green.',
    targetDate: 'Oct 18, 2026',
    progressPercent: 88,
    imOwner: 'Maya Lin',
    techOwner: 'Liam Kross',
    primarySystem: 'Warehouse Management Connector',
    lastActivity: '45m ago',
    summary: 'Commercial facilities supplier consolidating 3 regional distribution centers into single unified inventory system.',
    primaryBlocker: 'Customer maintenance window approval pending VP Operations sign-off.',
    dependenciesSummary: {
      total: 6,
      completed: 5,
      blocked: 0,
      pending: 1
    },
    uatSummary: {
      total: 6,
      passed: 5,
      failed: 0,
      blocked: 0,
      notStarted: 1
    }
  },
  {
    id: 'org_harbor',
    name: 'Harbor Mechanical',
    industry: 'Commercial HVAC & Mechanical',
    phase: 'Go-Live',
    status: 'LIVE',
    statusReason: 'Cutover completed successfully. 14-day stabilization window active with automated reconciliation running.',
    targetDate: 'Completed',
    progressPercent: 100,
    imOwner: 'Marcus Thorne',
    techOwner: 'Elena Rostova',
    primarySystem: 'Field Service Dispatch & Billing',
    lastActivity: '2d ago',
    summary: 'Mechanical contractor managing 180 field service technicians with mobile dispatch and synchronized billing ledger.',
    dependenciesSummary: {
      total: 6,
      completed: 6,
      blocked: 0,
      pending: 0
    },
    uatSummary: {
      total: 6,
      passed: 6,
      failed: 0,
      blocked: 0,
      notStarted: 0
    }
  }
];

export const INITIAL_DEPENDENCY_CHAIN: DependencyNode[] = [
  {
    id: 'dep_credentials',
    title: 'API Credentials & Auth Handshake',
    stage: 'Integration Gate 1',
    ownerType: 'Customer IT',
    ownerName: 'Devon Patel (Client IT Admin)',
    status: 'passed',
    requires: [],
    blocks: ['dep_connection'],
    diagnosticNote: 'Client OAuth client ID and mutual TLS certificate received in staging vault.',
    technicalPrerequisite: 'TLS 1.3 key exchange and Client ID registration in staging environment.',
    lastVerified: '2026-09-12 14:15 UTC'
  },
  {
    id: 'dep_connection',
    title: 'Connection & Firewall Whitelist',
    stage: 'Integration Gate 2',
    ownerType: 'Joint / Security',
    ownerName: 'Jordan Vance (Tech Implementation)',
    status: 'blocked',
    requires: ['dep_credentials'],
    blocks: ['dep_mapping'],
    diagnosticNote: 'Connection timeout (HTTP 408 / TCP SYN Drop). Customer gateway perimeter firewall rule 402 pending approval.',
    technicalPrerequisite: 'Static IP ingress whitelisting (52.24.110.0/24) on customer perimeter reverse proxy.',
    lastVerified: '2026-09-13 18:20 UTC'
  },
  {
    id: 'dep_mapping',
    title: 'Canonical Data Mapping Confirmed',
    stage: 'Integration Gate 3',
    ownerType: 'Technical Implementation',
    ownerName: 'Jordan Vance (Tech Implementation)',
    status: 'pending',
    requires: ['dep_connection'],
    blocks: ['dep_test'],
    diagnosticNote: 'Awaiting connection verification to run schema test suite against live staging API.',
    technicalPrerequisite: 'JSON schema validation contract signed off between client order payload and canonical schema.',
    lastVerified: 'Pending upstream'
  },
  {
    id: 'dep_test',
    title: 'Integration Test Passed',
    stage: 'Integration Gate 4',
    ownerType: 'Technical Implementation',
    ownerName: 'Jordan Vance (Tech Implementation)',
    status: 'pending',
    requires: ['dep_mapping'],
    blocks: ['dep_uat'],
    diagnosticNote: 'End-to-end automated sandbox test harness queued.',
    technicalPrerequisite: 'Successful execution of 12 synthetic transaction cycles with 0 HTTP 5xx errors.',
    lastVerified: 'Pending upstream'
  },
  {
    id: 'dep_uat',
    title: 'UAT Scenarios Available in Sandbox',
    stage: 'Validation Gate 5',
    ownerType: 'Joint / Security',
    ownerName: 'Maya Lin (Implementation Mgr)',
    status: 'pending',
    requires: ['dep_test'],
    blocks: ['dep_readiness'],
    diagnosticNote: 'Staging seed data awaiting validated pipeline before customer testers begin scenarios.',
    technicalPrerequisite: 'Sandbox pre-seeded with customer staging customer records, SKU catalog, and tax codes.',
    lastVerified: 'Pending upstream'
  },
  {
    id: 'dep_readiness',
    title: 'Production Launch Readiness Gate',
    stage: 'Readiness Gate 6',
    ownerType: 'Joint / Security',
    ownerName: 'Joint Sign-off (IM & Client VP)',
    status: 'pending',
    requires: ['dep_uat'],
    blocks: [],
    diagnosticNote: 'All upstream technical prerequisites, UAT assertions, and rollback plans must be certified.',
    technicalPrerequisite: '100% of blocking dependencies passed, 0 unresolved Severity-1 issues, rollback plan approved.',
    lastVerified: 'Pending upstream'
  }
];

export const INITIAL_UAT_SCENARIOS: UatScenario[] = [
  {
    id: 'uat_01',
    title: 'Create Transaction via Inbound Webhook',
    category: 'Order Processing',
    description: 'Simulates customer checkout event firing signed webhook to ingestion gateway.',
    status: 'Passed',
    criticality: 'Blocking Launch',
    testedBy: 'Devon Patel (Client Tester)',
    lastRun: '2026-09-12 16:30 UTC',
    assertion: 'Returns HTTP 202 Accepted; order created in staging with canonical ID.',
    diagnosticOutput: 'Order #ORD-99120 ingested and validated against schema v2.0.'
  },
  {
    id: 'uat_02',
    title: 'Update Existing Order & Inventory Allocation',
    category: 'Inventory & Catalog',
    description: 'Tests optimistic locking when customer customer service amends quantity on active picking slip.',
    status: 'Passed',
    criticality: 'Blocking Launch',
    testedBy: 'Maya Lin (IM)',
    lastRun: '2026-09-12 17:10 UTC',
    assertion: 'Version incremented; row lock prevents race condition with warehouse pick.',
    diagnosticOutput: 'Allocation adjusted from 40 to 35 units without inventory drift.'
  },
  {
    id: 'uat_03',
    title: 'Process Return & Issue Staging Credit Memo',
    category: 'Accounting & Ledger',
    description: 'Validates automated reconciliation between warehouse return receipt and accounting ledger.',
    status: 'Failed',
    criticality: 'Blocking Launch',
    testedBy: 'Devon Patel (Client Tester)',
    lastRun: '2026-09-13 11:20 UTC',
    assertion: 'Tax code field mismatch on partial credit calculation; rejected by ERP rule 104.',
    diagnosticOutput: 'Error 104: Field "TaxExemptExemptionCode" cannot be null for non-taxable lines.'
  },
  {
    id: 'uat_04',
    title: 'Validate Customer Account Status & Tax Nexus',
    category: 'Accounting & Ledger',
    description: 'Verifies real-time tax nexus rate calculation across multi-state shipping addresses.',
    status: 'Blocked',
    criticality: 'High',
    testedBy: 'Elena Rostova (Tech)',
    lastRun: '2026-09-13 13:00 UTC',
    assertion: 'Depends on ERP connection whitelist (dep_connection).',
    diagnosticOutput: 'Execution halted: Upstream dependency "Connection & Firewall Whitelist" is blocked.'
  },
  {
    id: 'uat_05',
    title: 'Confirm Warehouse Dispatch & Tracking Number Sync',
    category: 'Order Processing',
    description: 'Validates carrier webhook tracking ingestion and automatic status transition to Dispatched.',
    status: 'Blocked',
    criticality: 'Blocking Launch',
    testedBy: 'Elena Rostova (Tech)',
    lastRun: '2026-09-13 13:00 UTC',
    assertion: 'Depends on live connector endpoint availability.',
    diagnosticOutput: 'Execution halted: Upstream dependency "Connection & Firewall Whitelist" is blocked.'
  },
  {
    id: 'uat_06',
    title: 'Verify Error Handling on Malformed Ingestion',
    category: 'Security & Auth',
    description: 'Deliberately sends missing signature and corrupt payload to verify graceful DLQ routing.',
    status: 'In Progress',
    criticality: 'High',
    testedBy: 'Jordan Vance (Tech)',
    lastRun: '2026-09-13 15:45 UTC',
    assertion: 'Returns HTTP 401 on bad signature; payload persisted to dead-letter queue.',
    diagnosticOutput: 'Negative testing in progress with automated Postman regression suite.'
  }
];

export const INITIAL_RISKS: RiskItem[] = [
  {
    id: 'risk_01',
    title: 'Customer Security Team Firewall Approval Window',
    severity: 'High',
    category: 'Technical',
    owner: 'Devon Patel (Client IT)',
    impact: 'Halts live integration testing and blocks remaining 3 UAT scenarios.',
    mitigationPlan: 'Escalated to Client VP Operations on Sept 12. Expedited change request submitted for Tuesday maintenance board.',
    status: 'Open'
  },
  {
    id: 'risk_02',
    title: 'Partial Credit Tax Code Schema Mismatch',
    severity: 'Medium',
    category: 'Data Quality',
    owner: 'Jordan Vance (Tech Implementation)',
    impact: 'Return processing fails ERP validation on tax-exempt line items.',
    mitigationPlan: 'Patch canonical mapping layer with default fallback tax rule for exemption code 99.',
    status: 'Mitigating'
  },
  {
    id: 'risk_03',
    title: 'Lead Warehouse Technician Training Availability',
    severity: 'Low',
    category: 'Customer Timeline',
    owner: 'Maya Lin (Implementation Mgr)',
    impact: 'Warehouse team shift rotation overlaps with scheduled training block.',
    mitigationPlan: 'Recorded async walk-through module provided with mandatory interactive comprehension check.',
    status: 'Open'
  }
];

export const INITIAL_DECISIONS: CustomerDecision[] = [
  {
    id: 'dec_01',
    title: 'Adopt REST Ingestion over Legacy SFTP Batch Feed',
    decidedBy: 'Marcus Vance (Client VP Operations)',
    date: '2026-08-28',
    rationale: 'Batch SFTP processing introduced 4-hour latency on order visibility; real-time REST API ensures sub-minute inventory accuracy.',
    downstreamImplication: 'Required implementing signed webhook verification and deduplication queue on the ingress tier.'
  },
  {
    id: 'dec_02',
    title: 'Enforce Pre-Go-Live UAT Zero-Defect Policy on Tier-1 Scenarios',
    decidedBy: 'Joint Steering Committee',
    date: '2026-09-04',
    rationale: 'Past cutover attempts without deterministic gating caused billing errors in live ERP.',
    downstreamImplication: 'Launch Readiness status cannot transition to approved while any Blocking Launch scenario remains Failed or Blocked.'
  },
  {
    id: 'dec_03',
    title: 'Sandbox Tenant Provisioning Strategy',
    decidedBy: 'Jordan Vance & Devon Patel',
    date: '2026-09-08',
    rationale: 'Client requested isolated sandbox tenant mirroring production database schema without live customer PII.',
    downstreamImplication: 'Synthetic anonymization script executed on customer catalog and test order records.'
  }
];

export const INITIAL_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act_01',
    timestamp: '24m ago',
    type: 'dependency',
    actor: 'Jordan Vance',
    actorRole: 'Technical Implementation',
    action: 'Updated Dependency Status',
    details: 'Flagged "Connection & Firewall Whitelist" as BLOCKED after connection timeout during handshake test.',
    badge: 'Blocked'
  },
  {
    id: 'act_02',
    timestamp: '2h ago',
    type: 'uat',
    actor: 'Devon Patel',
    actorRole: 'Customer IT Admin',
    action: 'Logged UAT Execution Result',
    details: 'UAT Scenario "Process Return & Issue Staging Credit Memo" marked FAILED: Tax code field mismatch.',
    badge: 'UAT Failed'
  },
  {
    id: 'act_03',
    timestamp: '4h ago',
    type: 'risk',
    actor: 'Maya Lin',
    actorRole: 'Implementation Manager',
    action: 'Created Operational Risk Record',
    details: 'Logged High-severity risk for customer perimeter firewall approval lag impacting target launch date.',
    badge: 'Risk Logged'
  },
  {
    id: 'act_04',
    timestamp: '1d ago',
    type: 'decision',
    actor: 'Joint Steering Committee',
    actorRole: 'Project Governance',
    action: 'Recorded Architectural Decision',
    details: 'Ratified zero-defect launch policy: all Tier-1 UAT tests must pass before cutover window opens.',
    badge: 'Decision'
  },
  {
    id: 'act_05',
    timestamp: '2d ago',
    type: 'dependency',
    actor: 'Devon Patel',
    actorRole: 'Customer IT Admin',
    action: 'Completed Dependency Milestone',
    details: 'Passed "API Credentials & Auth Handshake" with verified TLS 1.3 mutual certificate exchange.',
    badge: 'Verified'
  },
  {
    id: 'act_06',
    timestamp: '3d ago',
    type: 'integration',
    actor: 'Jordan Vance',
    actorRole: 'Technical Implementation',
    action: 'Configured Ingress Webhook Endpoint',
    details: 'Staging webhook listener deployed at /api/v1/inbound/orders with request signature verification.',
    badge: 'Endpoint'
  }
];

export const TECHNICAL_ARTIFACT_JSON = `{
  "dependencyId": "dep_connection_402",
  "implementationId": "imp_northstar_dist_01",
  "name": "Perimeter Firewall Ingress Whitelist",
  "category": "network_security",
  "status": "BLOCKED",
  "impact": "CRITICAL_PATH",
  "ownership": {
    "primaryOwner": {
      "name": "Devon Patel",
      "role": "Customer IT Security Admin",
      "organization": "Northstar Distribution"
    },
    "technicalLead": {
      "name": "Jordan Vance",
      "role": "Technical Implementation Engineer",
      "organization": "Implementation Services"
    }
  },
  "dependencyChain": {
    "requires": ["dep_credentials_auth"],
    "blocks": [
      "dep_canonical_mapping",
      "dep_integration_test_harness",
      "uat_scenario_04_tax_nexus",
      "uat_scenario_05_carrier_sync",
      "milestone_production_readiness"
    ]
  },
  "diagnostics": {
    "targetHost": "https://gateway.northstar-internal.net/api/v2",
    "lastProbeTimestamp": "2026-09-13T18:20:14Z",
    "probeResult": "TCP_SYN_TIMEOUT",
    "httpEquivalent": 408,
    "firewallRuleTicket": "CHG-SEC-8921",
    "requiredSubnet": "52.24.110.0/24",
    "port": 443
  },
  "operationalGate": {
    "blocksDownstreamExecution": true,
    "automaticRollbackRequired": false,
    "stateEvaluationMessage": "Downstream schema validation and UAT suites suspended until perimeter connectivity probe yields HTTP 200/202."
  },
  "lastUpdated": "2026-09-13T18:24:00Z"
}`;
