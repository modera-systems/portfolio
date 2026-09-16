export type PageId = 'home' | 'case-studies' | 'case-study-detail' | 'architecture' | 'builds' | 'about';

export type CaseStudyCategory = 
  | 'Pre-Sales Solutioning / Solutions Engineering'
  | 'Integrations / Automation'
  | 'Customer Experience / Integration / Prototype'
  | 'End-to-End Solution Design'
  | 'Product Strategy / Solution Design / Application Build';

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  clientContext: string;
  category: CaseStudyCategory;
  role: string;
  timeframe?: string;
  summary: string;
  problem: string;
  discovery: string[];
  solution: string;
  workflowSteps: {
    title: string;
    description: string;
    details?: string;
    actor?: string;
  }[];
  platformContext?: {
    proposedByMonique: string[];
    platformProvided?: string[];
  };
  technicalHighlights: string[];
  demonstratedSkills: string[];
  outcome: string;
  syntheticDisclaimer?: string;
}

export type ArchitectureNodeType = 'trigger' | 'system' | 'action' | 'branch' | 'data' | 'output' | 'client' | 'api' | 'logic' | 'automation' | 'database' | 'ai' | 'external';

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  type: ArchitectureNodeType;
  input?: string;
  action?: string;
  output?: string;
  purpose?: string;
  syntheticExample?: string;
  description?: string;
  tech?: string;
  status?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  protocol?: string;
  animated?: boolean;
}

export interface ArchitectureFlow {
  id: string;
  number: string;
  title: string;
  category?: string;
  tagline: string;
  statusLabel: string;
  overview: string;
  nodes: ArchitectureNode[];
  contextNote: string;
}

export interface SolutionArchitectureFlow {
  id: string;
  number: string;
  title: string;
  tagline: string;
  statusLabel: string;
  overview: string;
  nodes: ArchitectureNode[];
  connections: { from: string; to: string; label?: string }[];
  contextNote: string;
}

export interface BuildSimulation {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  demonstrates: string[];
  disclaimer: string;
}

export interface CareerRole {
  role: string;
  company: string;
  period: string;
  badge?: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

export interface ToolkitSkill {
  name: string;
  note: string;
  badge?: string;
}

export interface ToolkitCategory {
  category: string;
  description: string;
  skills: ToolkitSkill[];
}
