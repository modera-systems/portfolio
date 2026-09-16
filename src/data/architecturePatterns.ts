import { ArchitectureFlow } from '../types';

export const architectureFlowsData: ArchitectureFlow[] = [
  {
    id: 'arch-01-voltpost',
    number: '01',
    title: 'Distributed Field-Service Deployment Architecture',
    category: 'Pre-Sales Solutioning / Solutions Engineering',
    tagline: 'Pre-sales operational solution mapping field requirements to Field Operations Platform stages',
    overview: 'This architecture represents the pre-sales solution design mapping an EV infrastructure company\'s field delivery requirements onto the Field Operations Platform. It maps the candidate site lifecycle from initial intake and qualification through field surveys, contractor dispatch, platform synchronization, and ongoing maintenance, distinguishing customer workflow design from platform primitives.',
    statusLabel: 'Proposed Pre-Sales Architecture',
    contextNote: 'Designed in a pre-sales solutions capacity to map distributed field deployment requirements to Field Operations Platform capabilities.',
    nodes: [
      {
        id: 'vp-node-1',
        label: 'Site Intake',
        sublabel: 'Initial Candidate Location',
        type: 'trigger',
        input: 'Candidate installation location submission, site photos, and preliminary placement notes.',
        action: 'Captures candidate site data and registers a new site record for evaluation.',
        output: 'Structured site intake record with location coordinates and preliminary site attributes.',
        purpose: 'Establishes a standardized initial intake channel for candidate charging locations.'
      },
      {
        id: 'vp-node-2',
        label: 'Site Qualification',
        sublabel: 'Desktop Feasibility Review',
        type: 'action',
        input: 'Candidate location record and deployment criteria.',
        action: 'Evaluates site details against project prerequisites to determine deployment feasibility prior to dispatch.',
        output: 'Qualified candidate site with preliminary notes ready for on-site survey.',
        purpose: 'Screens out unviable locations early, preventing unnecessary field truck rolls.'
      },
      {
        id: 'vp-node-3',
        label: 'Field Survey',
        sublabel: 'On-Site Technical Evaluation',
        type: 'data',
        input: 'Survey task assigned to field technician with site checklist.',
        action: 'Technician conducts physical survey, recording electrical panel details, conduit pathways, and site photos.',
        output: 'Completed survey documentation package and technical measurements.',
        purpose: 'Standardizes the collection of technical and electrical data needed to prepare the installation scope.'
      },
      {
        id: 'vp-node-4',
        label: 'Review & Work Authorization',
        sublabel: 'Scope & Requirement Check',
        type: 'branch',
        input: 'Survey data package and municipal or utility review requirements.',
        action: 'Reviewers evaluate survey findings and confirm the project is authorized for installation.',
        output: 'Approved installation scope ready for contractor assignment.',
        purpose: 'Ensures technical and regulatory requirements are confirmed before releasing the project for physical installation.'
      },
      {
        id: 'vp-node-5',
        label: 'Contractor Dispatch & Installation',
        sublabel: 'Field Physical Installation',
        type: 'action',
        input: 'Work authorization package, equipment specifications, and contractor assignment.',
        action: 'Contractor performs hardware mounting, electrical connection, and equipment energization.',
        output: 'Installed hardware and technician field completion checklist.',
        purpose: 'Coordinates licensed electrical contractors with verified project specifications and checklists.'
      },
      {
        id: 'vp-node-6',
        label: 'Project Status & Platform Update',
        sublabel: 'Field Operations Platform Record',
        type: 'output',
        input: 'Field completion sign-off and installation photo verification.',
        action: 'Updates the Field Operations Platform project record and marks the installation complete.',
        output: 'Updated Field Operations Platform project record reflecting live deployment status.',
        purpose: 'Provides central stakeholders with verified status and records of completed installations.'
      }
    ]
  },
  {
    id: 'arch-02-quickbooks',
    number: '02',
    title: 'Field Operations Platform → QuickBooks Integration Pipeline',
    category: 'Integrations / Automation',
    tagline: 'Event-driven n8n workflow connecting project milestones to QuickBooks invoicing',
    overview: 'An automated webhook workflow built in n8n. When a project reaches a defined workflow status in the Field Operations Platform ("Ready for Accounting"), an outbound webhook triggers the n8n integration. The workflow cleans incoming customer and quote data, queries QuickBooks using customer email, branches to reuse an existing customer or create a new customer first, generates the invoice with quote details and notes, and returns the outcome to the Field Operations Platform.',
    statusLabel: 'Production Integration Flow',
    contextNote: 'Built and configured by Monique using n8n, Field Operations Platform webhooks, and QuickBooks Online REST APIs.',
    nodes: [
      {
        id: 'qb-node-1',
        label: 'Project Status Trigger',
        sublabel: 'Field Operations Platform',
        type: 'trigger',
        input: 'Project reaches defined status ("Ready for Accounting") in Field Operations Platform.',
        action: 'Emits an outbound HTTP POST webhook payload containing customer info, project ID, and quote details without requiring a manual button.',
        output: 'Webhook payload received by n8n webhook listener node.',
        purpose: 'Initiates financial invoicing immediately upon operational project milestone completion.'
      },
      {
        id: 'qb-node-2',
        label: 'Data Cleaning & Transformation',
        sublabel: 'n8n Data Mapping Node',
        type: 'data',
        input: 'Raw incoming customer, project, and quote payload.',
        action: 'Normalizes customer naming conventions, trims whitespace, standardizes email formatting, and extracts quote total and project notes.',
        output: 'Cleaned, structured data object formatted for downstream QuickBooks accounting workflow.',
        purpose: 'Ensures predictable, compliant data structures before interacting with QuickBooks APIs.'
      },
      {
        id: 'qb-node-3',
        label: 'QuickBooks Customer Query',
        sublabel: 'OAuth REST API Call',
        type: 'action',
        input: 'Normalized customer email address.',
        action: 'Authenticates via OAuth and searches QuickBooks for an existing customer using email as the matching identifier.',
        output: 'Query response indicating customer records matching the provided email address.',
        purpose: 'Uses customer email as the authoritative matching key to prevent duplicate customer accounts.'
      },
      {
        id: 'qb-node-4',
        label: 'Customer Branching Decision',
        sublabel: 'Conditional IF Node',
        type: 'branch',
        input: 'QuickBooks query result array.',
        action: 'Evaluates whether a matching customer was found: branches to reuse existing customer record if found, or creates a new customer if not found.',
        output: 'Resolved QuickBooks Customer ID ready for invoice attachment.',
        purpose: 'Eliminates duplicate account creation by dynamically handling both existing and first-time customers.'
      },
      {
        id: 'qb-node-5',
        label: 'Invoice Creation',
        sublabel: 'POST /v3/company/invoice',
        type: 'action',
        input: 'Resolved Customer ID, quote cost, and project reference notes.',
        action: 'Constructs and posts the QuickBooks invoice payload with appropriate quote cost and relevant notes from the operational workflow.',
        output: 'Created QuickBooks Invoice with Invoice Number and transaction status.',
        purpose: 'Automates invoice generation populated directly with verified project milestone data.'
      },
      {
        id: 'qb-node-6',
        label: 'Return Result to Source Platform',
        sublabel: 'Field Operations Platform Sync',
        type: 'output',
        input: 'QuickBooks invoice confirmation and status details.',
        action: 'Sends the automation outcome back to the Field Operations Platform to close the operational loop.',
        output: 'Field Operations Platform project record updated with invoice creation outcome.',
        purpose: 'Closes the loop between the operational platform and accounting, confirming successful invoice generation.'
      }
    ]
  },
  {
    id: 'arch-03-portal',
    number: '03',
    title: 'Connected Customer Project Experience Topology',
    category: 'Customer Experience & Real-Time Integration Prototype',
    tagline: 'Multi-tier architecture: React Client → Express & Socket.IO → Dual-Path Routing (Project Data vs Human Support) → Field Operations Platform',
    overview: 'A connected customer communication architecture combining project-aware self-service with direct human communication. Informational queries retrieve grounded context from the Field Operations Platform; requests requiring judgment or action (reschedule, cancellation) route to the installer/office team; and all exchanges reflect back into the project\'s operational record.',
    statusLabel: 'Technical Prototype',
    contextNote: 'Prototyped using React, TypeScript, Express, SQLite (better-sqlite3), Socket.IO, and n8n to connect field operations data with a project-aware customer communication experience.',
    nodes: [
      {
        id: 'cp-node-1',
        label: 'Customer Experience Client',
        sublabel: 'React + TypeScript + Vite',
        type: 'client',
        input: 'Customer enters email or clicks a secure token link; submits questions or service requests.',
        action: 'Renders customer-facing project status, bilingual interface (English / Spanish), and unified message feed.',
        output: 'Interactive client view with real-time WebSocket connection.',
        purpose: 'Provides direct self-service visibility and two-way human messaging without permanent password accounts.'
      },
      {
        id: 'cp-node-2',
        label: 'Express Service & SQLite',
        sublabel: 'Backend, Session & Activity Logging',
        type: 'system',
        input: 'Client queries, token requests, and message events.',
        action: 'Manages token validation, dual-path message routing, SQLite (better-sqlite3) persistence, and project activity logging.',
        output: 'Validated project access tokens, synchronized message threads, and internal activity notes.',
        purpose: 'Serves as the application server coordinating client access, automated lookup, and installer escalation.'
      },
      {
        id: 'cp-node-3',
        label: 'Dual-Path Communication Engine',
        sublabel: 'Path A: Data Lookup | Path B: Human Routing',
        type: 'logic',
        input: 'Customer questions and requests.',
        action: 'Differentiates project data questions (status/window) from human-judgment requests (cancel/reschedule). Queries platform for Path A; routes to installer/office for Path B; logs to project notes.',
        output: 'Grounded project data responses or clearly labeled human installer replies.',
        purpose: 'Human-in-the-loop communication: automation handles data retrieval, humans handle decisions and actions.'
      },
      {
        id: 'cp-node-4',
        label: 'n8n Workflow Integration',
        sublabel: 'Webhook & Data Transformation',
        type: 'automation',
        input: 'Webhook request triggered by customer lookup.',
        action: 'Executes REST search against Field Operations Platform, evaluates single/multi-match scenarios, and transforms platform data into customer-facing context while excluding internal-only fields.',
        output: 'Customer-facing project status and relevant project context payload.',
        purpose: 'Orchestrates external platform queries and excludes internal-only fields before customer delivery.'
      },
      {
        id: 'cp-node-5',
        label: 'Field Operations Platform',
        sublabel: 'Core System of Record & Activity History',
        type: 'database',
        input: 'REST search requests and updated communication/activity notes.',
        action: 'Returns internal project records, receives logged customer communication notes and handling team records.',
        output: 'Raw project records and updated internal project docket.',
        purpose: 'Underlying operational platform containing enterprise field dispatch data and project history.'
      }
    ]
  },
  {
    id: 'arch-04-modera',
    number: '04',
    title: 'Modera Systems × The Kind Companion Operational Flow',
    category: 'End-to-End System & Operations Design',
    tagline: 'Coordinated operational flow: Consulting Governance (Modera) + Client Operations (Kind Companion)',
    overview: 'An end-to-end digital operations architecture designed for a boutique pet care service business. Combines the Modera Control Center consulting framework (discovery through implementation hand-off) with The Kind Companion client operating system (public intake, triage queue, booking, caregiver dispatch, and owner metrics).',
    statusLabel: 'Production Consulting & Implemented System',
    contextNote: 'Designed and implemented by Monique under Modera Systems for The Kind Companion. Transparently delineates built workflows from prototypes and roadmap items.',
    nodes: [
      {
        id: 'mod-node-1',
        label: 'Discovery & Workflow Scoping',
        sublabel: 'Modera Control Center Stage 1',
        type: 'trigger',
        input: 'Interviews with business owner, review of existing paper logs and text message practices.',
        action: 'Documents current operational friction, identifies recurring data fields, and defines system requirements.',
        output: 'Operational requirements document and workflow blueprint.',
        purpose: 'Establishes structured business requirements before configuring software.'
      },
      {
        id: 'mod-node-2',
        label: 'Public Intake Form',
        sublabel: 'Client Care Submission',
        type: 'data',
        input: 'Prospective client completes structured intake with pet info, behavioral notes, and access instructions.',
        action: 'Validates required care information and registers incoming request into operational pipeline.',
        output: 'Structured care request record in new lead queue.',
        purpose: 'Replaces unstructured text messaging with organized, consistent client and pet information.'
      },
      {
        id: 'mod-node-3',
        label: 'Request Triage',
        sublabel: 'Owner Evaluation Queue',
        type: 'branch',
        input: 'Incoming care request and owner availability calendar.',
        action: 'Owner reviews pet medical requirements, evaluates capacity, and confirms service feasibility.',
        output: 'Triaged request ready for schedule booking or client clarification.',
        purpose: 'Ensures care requirements are reviewed before committing staff and schedule.'
      },
      {
        id: 'mod-node-4',
        label: 'Booking & Schedule Management',
        sublabel: 'Operational Calendar',
        type: 'action',
        input: 'Confirmed service details, dates, and recurring frequencies.',
        action: 'Converts request to a confirmed booking, creates scheduled visits, and adds to master calendar.',
        output: 'Confirmed booking record with visit schedule.',
        purpose: 'Replaces paper calendars with an organized, searchable scheduling system.'
      },
      {
        id: 'mod-node-5',
        label: 'Caregiver Visit Assignment',
        sublabel: 'Staff Dispatch & Care Notes',
        type: 'action',
        input: 'Scheduled visits and caregiver availability.',
        action: 'Assigns visits to caregivers with relevant pet behavioral notes, feeding instructions, and access details.',
        output: 'Assigned visit on caregiver schedule with necessary care details.',
        purpose: 'Ensures caregivers have complete pet medical notes and entry instructions for every visit.'
      },
      {
        id: 'mod-node-6',
        label: 'Owner Dashboard & Metrics',
        sublabel: 'Operational Visibility',
        type: 'output',
        input: 'Active bookings, completed visit records, and service rates.',
        action: 'Calculates active client counts, weekly visit volume, and estimated revenue totals.',
        output: 'Real-time operational dashboard for business owner decision-making.',
        purpose: 'Provides the owner with clear operational visibility into business health and service volume.'
      }
    ]
  }
];
