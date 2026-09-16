import { ToolkitCategory } from '../types';

export const TOOLKIT_DATA: ToolkitCategory[] = [
  {
    category: 'Integrations',
    description: 'Connecting disparate SaaS, legacy, and custom systems into resilient data pipelines.',
    skills: [
      { name: 'REST APIs', note: 'Contract design, idempotency keys, OAuth 2.0, rate limiting', badge: 'Core' },
      { name: 'Webhooks', note: 'HMAC signature verification, replay protection, retry backoff', badge: 'Protocol' },
      { name: 'JSON & JSON Schema', note: 'Declarative validation, recursive nesting, payload shaping', badge: 'Data' },
      { name: 'EDI & Legacy Formats', note: 'EDI X12 (850, 856), SOAP XML, fixed-width parsing', badge: 'Enterprise' },
      { name: 'Postman & Insomnia', note: 'Automated test suites, environment orchestration, mock servers', badge: 'Tooling' }
    ]
  },
  {
    category: 'Automation',
    description: 'Orchestrating multi-step business logic across asynchronous event boundaries.',
    skills: [
      { name: 'n8n', note: 'Self-hosted workflow automation, custom Node development', badge: 'Platform' },
      { name: 'Zapier & Make', note: 'Rapid GTM prototyping, enterprise webhook triggers', badge: 'No/Low Code' },
      { name: 'Workflow Orchestration', note: 'State machine design, conditional branches, human-in-the-loop gates', badge: 'Architecture' },
      { name: 'Event-Driven Workflows', note: 'Pub/sub message passing, FIFO queues, dead letter handling', badge: 'Systems' }
    ]
  },
  {
    category: 'AI & LLMs',
    description: 'Constraining generative AI with deterministic logic and structured operational tooling.',
    skills: [
      { name: 'LLM Function Calling', note: 'Structured JSON schemas for reliable tool execution', badge: 'Core AI' },
      { name: 'Claude & ChatGPT', note: 'System prompt engineering, multi-turn reasoning workflows', badge: 'Models' },
      { name: 'Google AI Studio', note: 'Gemini multimodal prototyping, context window optimization', badge: 'Tooling' },
      { name: 'Prompt Architecture', note: 'Few-shot framing, guardrail defenses, injection mitigation', badge: 'Engineering' },
      { name: 'AI Workflow Prototyping', note: 'Building end-to-end interactive prototypes with real API hooks', badge: 'Delivery' }
    ]
  },
  {
    category: 'Data & Modeling',
    description: 'Structuring, verifying, and transforming operational payloads without data loss.',
    skills: [
      { name: 'SQL & Relational Stores', note: 'PostgreSQL, transactional indexing, row-level locks, views', badge: 'Database' },
      { name: 'Structured Data Mapping', note: 'Translating heterogeneous third-party schemas into canonical models', badge: 'Modeling' },
      { name: 'Validation & Hygiene', note: 'Zod, Ajv, edge case sanitization, null pointer protection', badge: 'Reliability' },
      { name: 'ETL & Transformation', note: 'Asynchronous event stream transformation, batch normalization', badge: 'Pipeline' }
    ]
  },
  {
    category: 'Implementation & Delivery',
    description: 'Navigating technical discovery, stakeholder alignment, and production cutover.',
    skills: [
      { name: 'Technical Discovery', note: 'Uncovering unstated dependencies, data latency limits, security mandates', badge: 'GTM / Pre-Sales' },
      { name: 'Requirements Translation', note: 'Translating fuzzy business pain into precise engineering specifications', badge: 'Architecture' },
      { name: 'User Acceptance Testing (UAT)', note: 'Creating rigorous test scripts, client dry-runs, sign-off criteria', badge: 'Delivery' },
      { name: 'Solution Design (HLD & LLD)', note: 'System blueprints, sequence diagrams, integration contracts', badge: 'Design' },
      { name: 'Technical Implementation', note: 'Hands-on configuration, scripting, middleware build, API staging', badge: 'Execution' },
      { name: 'Stakeholder Communication', note: 'Speaking the language of both VP business sponsors and staff engineers', badge: 'Consulting' }
    ]
  }
];
