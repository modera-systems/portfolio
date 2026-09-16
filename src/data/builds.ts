import { BuildSimulation } from '../types';

export const buildsData: BuildSimulation[] = [
  {
    id: 'build-01-solution-design-lab',
    number: '01',
    title: 'Solution Design Lab',
    category: 'Pre-Sales Solutioning / Solutions Engineering',
    tagline: 'Pre-Sales Requirement → Capability Mapping',
    description: 'Explore how customer requirements map into a distributed field-service workflow. Test how an EV infrastructure company\'s operational needs connect to existing platform capabilities and trace how solutions engineering translates business discovery into a coherent proposed workflow.',
    demonstrates: [
      'Discovery translation: mapping 6 operational needs to existing platform capabilities',
      'Pre-sales solution decisions: leveraging existing product features vs. custom engineering',
      'Live workflow stage illumination across the 8-stage deployment blueprint',
      'Persona perspective analysis across 4 stakeholder roles',
      'Fit-gap analysis distinguishing product configuration from custom application builds',
      'End-to-end technical storytelling for prospective enterprise customers'
    ],
    disclaimer: 'Portfolio Reconstruction — Fictional scenario based on an anonymized pre-sales engagement. The underlying platform capabilities existed; my role was translating customer requirements into a proposed operating workflow.'
  },
  {
    id: 'build-02-quickbooks-simulator',
    number: '02',
    title: 'Finance Automation Simulator',
    category: 'Integrations / Automation',
    tagline: 'Field Operations Platform → n8n → QuickBooks',
    description: 'An interactive simulation of the integration workflow connecting the Field Operations Platform to QuickBooks through n8n. Watch a project reaching "Ready for Accounting" trigger the webhook, observe data transformation, test conditional customer lookup (existing vs. new customer), and verify invoice creation and outcome return.',
    demonstrates: [
      'Business status-triggered webhook execution (no separate manual button)',
      'Transforming operational data into the format required by QuickBooks',
      'QuickBooks authentication and API requests',
      'Customer lookup using email as the matching identifier',
      'Conditional logic (use existing customer vs create customer first)',
      'Invoice payload generation with operational quotes & notes',
      'Returning automation outcome to the source platform'
    ],
    disclaimer: 'Portfolio Reconstruction — Built with fictional data based on a real workflow I designed or built. Company and customer information has been anonymized.'
  },
  {
    id: 'build-03-customer-portal-flow',
    number: '03',
    title: 'Connected Customer Experience',
    category: 'Customer Experience & Interactive Workflow Prototype',
    tagline: 'Project Information + Customer Actions + Human Communication',
    description: 'Explore a connected customer experience designed around a field-service platform. Customers can retrieve project information, complete structured actions, or communicate directly with the team when a request requires human judgment.',
    demonstrates: [
      'Project-aware self-service',
      'Structured customer actions',
      'Human-in-the-loop communication',
      'Customer-safe data transformation',
      'Token-based project access'
    ],
    disclaimer: 'Portfolio Reconstruction — Built with fictional data based on a real workflow I designed or built. Company and customer information has been anonymized.'
  },
  {
    id: 'build-04-operations-workflow',
    number: '04',
    title: 'Small Business Operations Flow',
    category: 'End-to-End System & Operations Design',
    tagline: 'Customer Request → Connected Operational Views',
    description: 'Follow one fictional care request through a connected small-business operating system — from public intake and internal triage through scheduling, role-specific views, and business reporting.',
    demonstrates: [
      'Connected lifecycle: Public request → Operations triage → Household context → Scheduling → Role views → Operational analytics',
      'One business event rendering distinct operational perspectives for Clients, Sitters, Managers, and Owners',
      'Structured intake capturing care notes, feeding schedules, and household access instructions',
      'Operational analytics derived directly from booking records without external BI',
      'End-to-end small business software architecture built on React, TypeScript, and Vite'
    ],
    disclaimer: 'Interactive Prototype — Fictional data used for demonstration.'
  }
];
