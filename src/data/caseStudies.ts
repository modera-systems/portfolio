import { CaseStudy } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: '01-field-service-workflow',
    number: '01',
    title: 'Designing a Distributed Field-Service Workflow',
    subtitle: 'Pre-sales solution design for an EV infrastructure company',
    clientContext: 'EV Infrastructure Company × Field Operations Platform',
    category: 'Pre-Sales Solutioning / Solutions Engineering',
    role: 'Technical Discovery + Solution Design',
    summary: 'Partnered on pre-sales technical discovery with an EV infrastructure company to design an operational deployment workflow mapping distributed charger-site intake, qualification, field work, installation, and ongoing maintenance onto an existing Field Operations Platform.',
    problem: 'The prospective customer was an EV infrastructure company managing distributed charger-site deployment and ongoing field operations. The solutioning work explored how a Field Operations Platform could support the workflow across site intake, qualification, field work, installation, operational tracking, and longer-term lifecycle activity, addressing coordination gaps between central coordinators and field teams.',
    discovery: [
      'Site Intake: How do potential charger locations enter the process?',
      'Qualification: What information is needed before a submitted site can progress?',
      'Field Work: What project information, forms, photos, notes, and updates do field teams need?',
      'Handoffs: How does work move between the people involved in intake, review, and field execution?',
      'Central Visibility: What project status and milestone information needs to remain visible as distributed work progresses?',
      'Lifecycle: How should the operating workflow continue after installation for maintenance and follow-up activity?'
    ],
    solution: 'Designed a proposed operational flow that translated the customer’s distributed operating model onto the Field Operations Platform. The proposed solution mapped out the workflow across site intake, remote review and qualification, field surveys, installation, central platform updates, and ongoing lifecycle activity—connecting different users to relevant platform capabilities.',
    workflowSteps: [
      {
        title: 'Recommend Site',
        description: 'Potential charger location enters the workflow through a simple submission experience such as a web-based entry point or lightweight form.',
        actor: 'Site Submitter / Partner'
      },
      {
        title: 'Collect Site Information',
        description: 'Remote or self-service intake gathers customer and site details needed for initial review via web form or QR-based entry.',
        actor: 'Site Submitter'
      },
      {
        title: 'Qualify / Review',
        description: 'Submitted information moves into operational review to evaluate readiness before downstream field activity.',
        actor: 'Operations Team'
      },
      {
        title: 'Field Survey',
        description: 'Field teams use the platform’s field capability to review the location, complete survey forms, capture photos, and record notes with offline synchronization.',
        actor: 'Field Team / Surveyor'
      },
      {
        title: 'Installation Workflow',
        description: 'Approved work progresses into installation planning and assignment, ensuring installers have access to relevant project information with customizable permissions.',
        actor: 'Operations Team'
      },
      {
        title: 'Field Execution',
        description: 'Assigned field users perform installation activity and record relevant project updates, photos, and notes through the field experience.',
        actor: 'Field Team / Installer'
      },
      {
        title: 'Central Platform Update',
        description: 'Field activity and updates are reflected back in the central operating workflow, supporting visibility into project progress and milestones.',
        actor: 'Field Operations Platform'
      },
      {
        title: 'Ongoing Maintenance / Lifecycle',
        description: 'The platform supports continued maintenance and lifecycle activity after installation, maintaining continuity across follow-up work.',
        actor: 'Operations & Field Teams'
      }
    ],
    platformContext: {
      proposedByMonique: [
        'Translated the customer\'s distributed operating model into a proposed platform workflow',
        'Mapped site intake and self-survey concepts into the operational process',
        'Connected review/qualification with downstream field activity',
        'Incorporated survey, installation, and maintenance workflows into the proposed solution',
        'Considered how different users would interact with the same operating process',
        'Mapped customer requirements to relevant existing platform capabilities',
        'Organized the proposed solution into a visual story that could be presented back to the prospective customer'
      ],
      platformProvided: [
        'Field tooling for surveys, installations, and maintenance',
        'Offline field capability with synchronization after connectivity returns',
        'Project information available to field users',
        'Forms',
        'Photos',
        'Notes',
        'Project updates',
        'Installation assignment',
        'Customizable access / permissions',
        'Workflow tracking'
      ]
    },
    technicalHighlights: [
      'Pre-sales technical discovery exploring operational requirements across distributed field teams',
      'Requirements translation mapping physical deployment needs to platform capabilities',
      'User and persona workflow design tailoring access and interaction across different roles',
      'Clear operational mapping showing how customer workflows connect to existing platform tooling'
    ],
    demonstratedSkills: [
      'Technical Discovery',
      'Workflow Design',
      'Pre-Sales Solutioning',
      'Requirements Translation',
      'Solution Design',
      'User / Persona Workflow Design',
      'Field Operations Alignment',
      'Technical Communication',
      'Customer Presentation',
      'Cross-Functional Coordination'
    ],
    outcome: 'The solution blueprint gave the prospective customer a concrete view of how site intake, field activity, installation, central visibility, and ongoing lifecycle work could connect through the platform. It also made the handoffs between different users visible and showed where existing platform capabilities could support the proposed operating model.',
    syntheticDisclaimer: 'Portfolio Reconstruction — Fictional scenario based on an anonymized pre-sales engagement. The underlying platform capabilities existed; my role was translating customer requirements into a proposed operating workflow.'
  },
  {
    id: '02-quickbooks-automation',
    number: '02',
    title: 'Automating Finance Operations',
    subtitle: 'Connecting a Field Operations Platform to QuickBooks through n8n',
    clientContext: 'Integration & Workflow Automation',
    category: 'Integrations / Automation',
    role: 'Solution Design + Integration Build',
    summary: 'Designed and built an automated integration connecting a Field Operations Platform to QuickBooks through n8n. Replaced repetitive manual data entry by triggering on project milestone status, transforming customer and quote information, matching existing customer records by email, handling new vs. existing customer branches, creating QuickBooks invoices, and returning the outcome back to the source platform.',
    problem: 'The finance workflow required customer, project, and quote information that already existed in the Field Operations Platform to be manually re-entered into QuickBooks to generate invoices. This manual handoff created repetitive administrative work, risked discrepancies between operational records and accounting, and required manual checking of whether a customer already existed in QuickBooks.',
    discovery: [
      'Which project milestone status indicates that a project is ready for accounting handoff?',
      'How can the workflow trigger automatically from the business process itself without requiring a separate manual button?',
      'What identifier provides reliable customer matching in QuickBooks to avoid creating duplicate customer accounts (customer email)?',
      'How must customer, project, and quote data in the Field Operations Platform be transformed to fit QuickBooks accounting schemas?',
      'How should the workflow handle branching for customers who do not yet exist in QuickBooks versus existing accounts?',
      'What result data should be sent back to the Field Operations Platform to confirm that the invoice was created?'
    ],
    solution: 'Built an integration workflow in n8n. When a project reaches the defined milestone status in the Field Operations Platform, an outbound webhook triggers the workflow. n8n extracts and formats customer, project, and quote information, connects to QuickBooks using OAuth, searches for the customer using email as the matching identifier, branches to reuse an existing customer record or create a new one, generates the invoice with project details and notes, and sends the automation outcome back to the Field Operations Platform.',
    workflowSteps: [
      {
        title: 'Project Status Reached',
        description: 'A project in the Field Operations Platform reaches the defined milestone status indicating field work is complete.',
        actor: 'Field Operations Platform'
      },
      {
        title: 'Status Trigger Webhook',
        description: 'The status transition triggers an outbound HTTP POST webhook into n8n automatically, without requiring a manual button.',
        actor: 'Field Operations Platform'
      },
      {
        title: 'Receive Operational Data',
        description: 'n8n receives the webhook payload containing relevant customer, project, and quote information.',
        actor: 'n8n'
      },
      {
        title: 'Data Cleaning & Transformation',
        description: 'Incoming customer and project fields are cleaned and structured into the format required downstream by QuickBooks.',
        actor: 'n8n Data Mapping'
      },
      {
        title: 'QuickBooks OAuth Authentication',
        description: 'n8n authenticates with QuickBooks using configured OAuth credentials to communicate with the REST API.',
        actor: 'QuickBooks API'
      },
      {
        title: 'Search Customer by Email',
        description: 'The workflow queries QuickBooks for an existing customer record using customer email as the matching identifier.',
        actor: 'QuickBooks API'
      },
      {
        title: 'Evaluate Customer Existence (Branching)',
        description: 'A conditional decision node evaluates query results: if the customer exists, reuse their ID; if not, branch to create the customer first.',
        actor: 'n8n Conditional Logic'
      },
      {
        title: 'Customer Creation (If New)',
        description: 'For new customers, creates a QuickBooks customer record using normalized naming and contact details, returning the new ID.',
        actor: 'QuickBooks API'
      },
      {
        title: 'Create QuickBooks Invoice',
        description: 'Generates the QuickBooks invoice populated with the quote amount, reference notes, and project identifier.',
        actor: 'QuickBooks API'
      },
      {
        title: 'Send Outcome to Source Platform',
        description: 'Sends the automation outcome and confirmation back to the Field Operations Platform to close the operational loop.',
        actor: 'Field Operations Platform'
      }
    ],
    platformContext: {
      proposedByMonique: [
        'Mapped the manual handoff and designed the end-to-end integration workflow',
        'Determined the project milestone status trigger so the business workflow starts the automation without a manual button',
        'Configured QuickBooks OAuth authentication and REST API communication in n8n',
        'Built the data transformation logic bridging Field Operations Platform data formats with QuickBooks schemas',
        'Used customer email matching to prevent duplicate customer accounts',
        'Implemented conditional branching to handle both existing and first-time customer records',
        'Constructed the downstream invoice generation using quote values and project reference notes',
        'Configured the outcome response to send confirmation back to the Field Operations Platform',
        'Tested the integration workflow end-to-end across both existing and new customer scenarios'
      ],
      platformProvided: [
        'Field Operations Platform project records, quote details, and milestone status transition events',
        'QuickBooks Online REST API endpoints, customer database, and invoice schema',
        'n8n workflow automation runtime and execution environment'
      ]
    },
    technicalHighlights: [
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
    ],
    demonstratedSkills: [
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
    ],
    outcome: 'Automated the handoff from project completion to invoice creation, eliminating repetitive manual data entry, avoiding duplicate customer records through email matching, and returning confirmation back to the Field Operations Platform.',
    syntheticDisclaimer: 'Portfolio Reconstruction — Built with fictional data based on a real workflow I designed or built. Company and customer information has been anonymized.'
  },
  {
    id: '03-connected-customer-portal',
    number: '03',
    title: 'Connected Customer Project Experience',
    subtitle: 'Project-aware self-service, structured customer actions, and direct installer communication',
    clientContext: 'Customer Experience & Field Operations Prototype',
    category: 'Customer Experience / Integration / Prototype',
    role: 'Solutions Engineer / Full-Stack Prototype Builder',
    timeframe: 'Technical Prototype',
    summary: 'I built a connected customer experience that gave customers access to project information, allowed supported actions such as rescheduling requests and quote review directly within the conversation, and connected questions requiring human judgment to the appropriate installer or office team.',
    problem: 'Customers needed a clearer way to access project information and communicate around active installations without relying on disconnected manual communication or generic chatbot responses. Questions about project status and quote availability needed grounding in connected project records, structured requests such as rescheduling or quote approvals needed interactive inline workflows rather than free-text dead ends, and questions requiring human judgment needed direct routing to installers or company teams.',
    discovery: [
      'How to support three distinct interaction types in a single experience: (1) project information lookup, (2) structured customer actions (rescheduling requests, quote review/approvals), and (3) human installer communication?',
      'How to enable customer project lookup by email and issue token-based access without requiring enterprise account passwords for transient installations?',
      'How to recognize scheduling/rescheduling intent and open an interactive date/time request workflow inside the conversation rather than returning a generic automated message?',
      'How to inspect project quote state, display interactive quote review cards with approve/decline controls when ready, and gracefully inform the customer when a quote is not yet available?',
      'How to route complex site questions or exceptions requiring human judgment to the installation team, display clearly labeled human responses, and reflect customer actions and communications back into the internal project activity record?'
    ],
    solution: 'Designed and implemented a full-stack connected customer project experience combining: (1) Project-Aware Self-Service: answering customer questions about installation status, schedules, or crew assignment using connected project data; (2) Structured Customer Actions: providing interactive inline workflow components directly inside the conversation for rescheduling requests (with preferred date/time selectors and internal team review) and quote review (with view, approve, and decline controls updating project state); and (3) Human Communication: routing inquiries requiring installer judgment to the human team with labeled human responses, feeding customer actions and communications back into the internal operational record.',
    workflowSteps: [
      {
        title: 'Customer Email Lookup & Access Token',
        description: 'Customer initiates project access by submitting their email; the system evaluates matches and issues a time-bound access token without requiring a password account.',
        actor: 'Customer / Express Backend'
      },
      {
        title: 'Project Data Lookup (Path 1)',
        description: 'Customer questions about status, schedule, or crew query connected project data from the Field Operations Platform, returning grounded customer-facing information.',
        actor: 'Field Operations Platform API'
      },
      {
        title: 'Interactive Reschedule Request (Path 2)',
        description: 'Rescheduling inquiries open an inline date/time picker; submitting creates a structured reschedule request for installer review (Approve, Suggest Different Time, Decline).',
        actor: 'Customer Action UI → Team Review'
      },
      {
        title: 'Interactive Quote Review & Approval (Path 2)',
        description: 'Quote queries check project quote state: displays interactive quote card with Approve/Decline actions if ready, or informs customer if still pending.',
        actor: 'Project State Engine'
      },
      {
        title: 'Human Routing & Communication (Path 3)',
        description: 'Site-specific questions requiring judgment route directly to the assigned installer or office team with clearly labeled human replies.',
        actor: 'Jordan M. (Lead Installer)'
      },
      {
        title: 'Operational Project Record Sync',
        description: 'Customer actions, reschedule requests, quote approvals/declines, and human communications feed directly into the internal project history.',
        actor: 'Project Activity Log'
      }
    ],
    platformContext: {
      proposedByMonique: [
        'Connected customer experience combining project-aware self-service, structured customer actions, and human communication',
        'Interactive inline conversation components: project status cards, calendar/date & time selectors, reschedule request cards, and interactive quote review cards',
        'Intent-based routing engine distinguishing project information lookups, structured action workflows, and human team escalations',
        'Reschedule request workflow capturing customer preferences and presenting internal review controls (Approve, Suggest Different Time, Decline)',
        'Quote lifecycle experience with interactive view, approve, and decline actions that update synthetic project state',
        'Clearly labeled human installer communication with two-way messaging in a unified thread',
        'Operational activity recording reflecting customer actions and communications into internal project history',
        'Express backend with SQLite (better-sqlite3) for session tokens, thread persistence, and quote/schedule state',
        'English and Spanish (bilingual) customer interface localization'
      ],
      platformProvided: [
        'Field Operations Platform database containing project records, installation dockets, and scheduled crew rosters',
        'REST API query endpoints for customer project search',
        'Baseline project data schemas and technical documentation'
      ]
    },
    technicalHighlights: [
      'Connected customer project experience: unites project-aware self-service, structured actions, and human communication',
      'Interactive conversational components: inline date/time pickers, reschedule request cards, and quote approval/decline controls',
      'Reschedule request workflow: customer requests preferred date/time without autonomous confirmation; routes to installer for review',
      'Interactive quote workflow: checks project state, renders quote card when ready ($4,250), and updates project state upon approval/decline',
      'Human-in-the-loop routing: passes judgment-based queries to assigned installer (Jordan M.) with clearly labeled human replies',
      'Operational project record sync: customer actions and communications feed back into the internal project activity history',
      'Token-based project access: lightweight access token model eliminating permanent passwords for transient installations',
      'Data transformation & sanitization: normalizes platform data into customer-safe context while excluding internal-only fields',
      'Bilingual localization: full support for English and Spanish customer audiences'
    ],
    demonstratedSkills: [
      'Connected Customer Experience Design',
      'Conversational Workflow UI Components',
      'Action-Oriented Request Workflows',
      'Human-in-the-Loop Routing & Communication',
      'Operational Activity Logging & Sync',
      'API & Webhook Data Transformation',
      'Token-Based Project Access',
      'State Machine & Intent Classification',
      'Full-Stack Prototyping (Express / SQLite / React)',
      'Localization (English / Spanish)'
    ],
    outcome: 'Demonstrated how a connected customer project experience gives customers instant access to project status and quotes, embeds structured workflows like rescheduling requests directly inside the conversation, and seamlessly connects questions requiring human judgment to the installer—with all customer actions and communications feeding back into the internal operational record.',
    syntheticDisclaimer: 'Portfolio Reconstruction — Built with fictional data based on a real workflow I designed or built. Company and customer information has been anonymized.'
  },
  {
    id: '04-modera-kind-companion',
    number: '04',
    title: 'From Discovery to Operating System',
    subtitle: 'Designing and building a connected service-business platform',
    clientContext: 'Modera Systems × The Kind Companion',
    category: 'Product Strategy / Solution Design / Application Build',
    role: 'Discovery + Solution Design + Product Build',
    summary: 'Partnered directly with the owner of a boutique pet-sitting and home-organization service through Modera Systems to understand how the business operates, translating discovery into a connected digital operating system spanning public customer touchpoints, booking workflows, role-based operations, and business visibility.',
    problem: 'A growing service business was managing client inquiries, booking requests, pet medical instructions, scheduling, and staff coordination through disconnected channels. The core challenge was not simply building a marketing website, but designing a digital system around how the business actually operates—from initial customer discovery through ongoing management of clients, services, scheduling, staff, and business activity.',
    discovery: [
      'Customer Journey: How does someone discover the business, understand the services, and request care?',
      'Service Model: How should different service types, pricing structures, and add-ons be represented?',
      'Scheduling: What information is needed to understand when services are requested and how work appears operationally?',
      'Customer Context: What information about a household, pet health, and access instructions needs to remain accessible after the initial request?',
      'Staff / Role Needs: What should the owner, managers, sitters, and clients each be able to see or do?',
      'Business Visibility: What does the owner need to understand about bookings and business activity without manually reconstructing it?',
      'Administration: How should access, pricing, staff permissions, and operational records be managed?'
    ],
    solution: 'Designed and built a unified operating system spanning both customer-facing touchpoints and internal operations on React, TypeScript, and Vite. The system integrates the public website and service showcase, structured service requests, client and household records, scheduling utilities, role-based views (Client, Sitter, Manager, Owner, Platform Admin), deterministic booking analytics, and administrative controls.',
    workflowSteps: [
      {
        title: 'Discover & Explore Services',
        description: 'Prospective clients explore services, business values, trust credentials, how-it-works process, reviews, and pricing transparency on the public website.',
        actor: 'Prospective Client'
      },
      {
        title: 'Request Care & Submit Details',
        description: 'Clients submit structured service requests capturing care dates, service types, pet details, care instructions, and household access notes.',
        actor: 'Client'
      },
      {
        title: 'Operations Review & Household Context',
        description: 'Requests flow into the internal operations view, associating incoming care needs with persistent household profiles, pet health records, and visit histories.',
        actor: 'Manager / Owner'
      },
      {
        title: 'Scheduling & Sitter Assignment',
        description: 'Operational calendar coordinates booking dates, service windows, and staff availability, dispatching visits with relevant care instructions.',
        actor: 'Operations / Manager'
      },
      {
        title: 'Role-Specific Service Delivery',
        description: 'Sitters view assigned visits and vital pet care notes; clients track booking information in their portal; managers oversee daily service fulfillment.',
        actor: 'Sitter & Client'
      },
      {
        title: 'Business Visibility & Analytics',
        description: 'Booking records automatically feed deterministic operational analytics—tracking revenue by service, active households, repeat clients, and add-on attachment.',
        actor: 'Owner Dashboard'
      }
    ],
    platformContext: {
      proposedByMonique: [
        'End-to-end product strategy and discovery uncovering customer journey and internal operating requirements',
        'Customer-facing experience connecting brand, service catalog, trust signals, and service-request flows',
        'Operational data models connecting intake details to persistent client and household context',
        'Role-based interface design providing tailored views for Clients, Sitters, Managers, Owners, and Platform Admins',
        'Scheduling and booking management utilities coordinating service windows and assignments',
        'Deterministic analytics derived from booking data for real-time business visibility',
        'Platform administration including role-based permissions, staff access controls, persona testing, and audit functionality'
      ],
      platformProvided: [
        'Component-based frontend architecture built in React, TypeScript, and Vite',
        'Role-based permissions and access enforcement logic',
        'Interactive scheduling and calendar management utilities',
        'Deterministic calculation engine deriving revenue, booking volume, and household activity from booking records',
        'Configurable service pricing and add-on management models',
        'Persona and role testing tools for rapid multi-perspective validation',
        'Operational audit functionality recording administrative actions'
      ]
    },
    technicalHighlights: [
      'Full-stack product design and build taking a small service business from discovery to working software',
      'Unified architecture connecting customer acquisition (public web) with backend service operations',
      'Five distinct role-based experiences (Client, Sitter, Manager, Owner, Platform Admin) on one platform',
      'Deterministic booking analytics calculating revenue by service, active households, and add-on attachment without third-party BI',
      'Informed Modera Systems repeatable operating model: Client System ↕ Modera Operating Layer'
    ],
    demonstratedSkills: [
      'Business Discovery',
      'Solution Design',
      'Product Thinking',
      'Workflow Design',
      'React / TypeScript',
      'Role-Based Experiences',
      'Operational UX',
      'Business Analytics',
      'Iterative Development',
      'End-to-End Ownership'
    ],
    outcome: 'The platform creates a connected digital operating model spanning customer discovery, service requests, client context, scheduling, role-specific operational views, and business visibility. Rather than treating the public website and internal operations as separate products, the system was designed around the full service lifecycle.',
    syntheticDisclaimer: 'Portfolio Reconstruction — Built with fictional data based on a real workflow I designed or built. Company and customer information has been anonymized.'
  }
];
