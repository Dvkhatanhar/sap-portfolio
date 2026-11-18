/**
 * portfolioData — the single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio; UI components never hard-code content.
 *
 * Source: Dev_Resume.docx (LinkedIn blocks automated fetching, so nothing was pulled from it).
 * Skill ids in `experience[].skills` and `engagements[].skills` must match `skills[].id`
 * — that link powers the cross-highlighting between the skills matrix, timeline and showcase.
 */

export type SkillCategory = 'functional' | 'technical' | 'tools';
export type EngagementCategory = 'functional' | 'technical' | 'integration';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export interface Highlight {
  text: string;
  metric?: string;
}

export interface Role {
  id: string;
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: Highlight[];
  skills: string[];
}

export interface Engagement {
  id: string;
  title: string;
  category: EngagementCategory;
  roleId: string;
  challenge: string;
  solution: string;
  modules: string[];
  impact: string;
  metric: { value: string; label: string };
  skills: string[];
}

export interface Achievement {
  value: string;
  label: string;
  detail: string;
  icon: 'rocket' | 'store' | 'receipt' | 'shield' | 'gauge' | 'award' | 'trending';
  size?: 'lg' | 'md' | 'sm';
  accent?: 'sapphire' | 'gold' | 'cyan';
}

export const portfolioData = {
  profile: {
    name: 'Dev Khatanhar',
    initials: 'DK',
    title: 'SAP Functional Analyst',
    company: 'Deloitte India',
    positioning: 'SAP SD Consultant',
    location: 'Thane, Maharashtra, India',
    email: 'dvkhatanhar@gmail.com',
    // Phone is kept here for your reference but is not rendered on the public site.
    phone: '+91 8080253605',
    linkedin: 'https://www.linkedin.com/in/dvkhatanhar/',
    // No GitHub profile appears in the resume — add your URL here and the GitHub button appears automatically.
    github: '',
    resumeUrl: './Dev_Resume.docx',
    rotatingRoles: [
      'SAP SD Analyst',
      'Order-to-Cash (O2C) Specialist',
      'S/4HANA Greenfield Implementer',
      'Pricing, Billing & Settlement',
      'Functional–Technical Bridge',
      'Business Process Optimisation',
    ],
    summary:
      'SAP SD Analyst with Big 4 experience delivering large-scale Retail Greenfield implementations in SAP S/4HANA environments. With SAP SD as a foundational base skill, offers deep expertise in Order-to-Cash (O2C), Pricing, Billing, and Master Data Management. Certified in AI methodologies, bringing cross-module proficiency across SD, MM, and SCM workflows to drive EDI integration, optimize sales processes, and deliver scalable enterprise solutions.',
    heroStats: [
      { value: '4', label: 'Greenfield Go-Lives' },
      { value: '1,000+', label: 'Retail Stores Supported' },
      { value: '50,000+', label: 'Invoices & POs Processed' },
    ],
  },

  skills: [
    // SAP Modules & Functional Areas
    { id: 'sd', name: 'SAP Sales & Distribution (SD)', category: 'functional' },
    { id: 'o2c', name: 'Order-to-Cash (O2C)', category: 'functional' },
    { id: 'pricing', name: 'Pricing', category: 'functional' },
    { id: 'billing', name: 'Billing', category: 'functional' },
    { id: 'settlement', name: 'Settlement Management', category: 'functional' },
    { id: 'chargeback', name: 'Chargeback Sales', category: 'functional' },
    { id: 'mdm', name: 'Master Data Management', category: 'functional' },
    { id: 'sdmm', name: 'SD–MM Integration', category: 'functional' },
    { id: 'scm', name: 'SAP SCM Integration', category: 'functional' },
    { id: 'requirements', name: 'Requirements Gathering', category: 'functional' },
    // SAP Technical Delivery & Testing
    { id: 'custom-reports', name: 'Custom SAP SD Reports', category: 'technical' },
    { id: 'abap-collab', name: 'ABAP Developer Collaboration', category: 'technical' },
    { id: 'logic-validation', name: 'Business Logic Validation', category: 'technical' },
    { id: 'edi', name: 'EDI Integration', category: 'technical' },
    { id: 'sit', name: 'System Integration Testing (SIT)', category: 'technical' },
    { id: 'uat', name: 'User Acceptance Testing (UAT)', category: 'technical' },
    { id: 'hypercare', name: 'Post Go-Live Support', category: 'technical' },
    // Tools, Platforms & Methodologies
    { id: 's4hana', name: 'SAP S/4HANA', category: 'tools' },
    { id: 'greenfield', name: 'Greenfield Implementations', category: 'tools' },
    { id: 'agile', name: 'Agile / Scrum', category: 'tools' },
    { id: 'azure', name: 'Microsoft Azure (Bug Tracking)', category: 'tools' },
    { id: 'SAP Reporting', name: 'SAP Reporting', category: 'tools' },
    { id: 'excel', name: 'Advanced MS Excel', category: 'tools' },
    { id: 'big4', name: 'Big 4 Consulting', category: 'tools' },
  ] as Skill[],

  skillCategories: [
    { id: 'functional', title: 'SAP Modules & Functional Areas', description: 'Core SD business processes across the sales cycle.' },
    { id: 'technical', title: 'SAP Technical Delivery & Testing', description: 'Translating business logic into validated, defect-free builds.' },
    { id: 'tools', title: 'Platforms, Tools & Methodologies', description: 'The delivery stack behind enterprise go-lives.' },
  ] as { id: SkillCategory; title: string; description: string }[],

  experience: [
    {
      id: 'deloitte-analyst',
      company: 'Deloitte India',
      title: 'SAP Functional Analyst',
      location: 'India',
      start: 'Jan 2026',
      end: 'Present',
      current: true,
      summary: 'SAP SD functional delivery on large-scale Retail Greenfield implementations in SAP S/4HANA.',
      highlights: [
        {
          text: 'Accelerated Order-to-Cash (O2C) transaction efficiency across 4 major Greenfield Go-Lives in SAP S/4HANA, supporting 1,000+ stores across India, by configuring Settlement Management systems processing 50,000+ invoices and POs for Chargeback sales.',
          metric: '4 Go-Lives · 1,000+ stores · 50,000+ docs',
        },
        {
          text: 'Achieved Zero critical post-launch defects on custom SAP SD reports by directly collaborating with offshore ABAP developers and establishing rigorous business logic validation.',
          metric: 'Zero critical defects',
        },
        {
          text: 'Led daily post-launch system support, successfully resolving critical business issues by tracking the full bug lifecycle and team tasks in Microsoft Azure.',
        },
        {
          text: 'Ensured seamless downstream integration (SD-MM) by spearheading comprehensive System Integration Testing (SIT) and User Acceptance Testing (UAT) workshops for enterprise end-users.',
        },
        {
          text: 'Enhanced executive decision-making capabilities by designing dynamic SAP SD Reports and executive line charts to visualise core sales data and defect lifecycles.',
        },
      ],
      skills: [
        'sd', 'o2c', 'pricing', 'billing', 'settlement', 'chargeback', 'sdmm', 'scm',
        'custom-reports', 'abap-collab', 'logic-validation', 'sit', 'uat', 'hypercare',
        's4hana', 'greenfield', 'agile', 'azure', 'powerbi', 'big4',
      ],
    },
    {
      id: 'deloitte-intern',
      company: 'Deloitte India',
      title: 'SAP SD Intern',
      location: 'India',
      start: 'July 2025',
      end: 'Jan 2026',
      summary: 'SAP SD project scoping, sales process requirements and configuration tracking.',
      highlights: [
        {
          text: 'Streamlined master data management workflows by effectively gathering and analysing critical sales process requirements during initial project scoping.',
        },
        {
          text: 'Decreased reporting turnaround times by 40% by refining logic, including dynamic formatting, to track configuration milestones.',
          metric: '40% faster reporting',
        },
      ],
      skills: ['sd', 'mdm', 'requirements', 'SAP Reporting', 'big4'],
    },
  ] as Role[],

  engagements: [
    {
      id: 'settlement-chargeback',
      title: 'Settlement Management for Chargeback Sales',
      category: 'functional',
      roleId: 'deloitte-analyst',
      challenge:
        'A retail rollout spanning 1,000+ stores across India needed its Order-to-Cash cycle to handle Chargeback sales at high invoice and PO volumes from day one.',
      solution:
        'Configured Settlement Management within SAP S/4HANA as part of the SD Order-to-Cash design, across 4 major Greenfield Go-Lives.',
      modules: ['SAP SD', 'S/4HANA', 'Settlement Mgmt', 'O2C'],
      impact: 'Accelerated O2C transaction efficiency, processing 50,000+ invoices and POs for Chargeback sales.',
      metric: { value: '50,000+', label: 'invoices & POs processed' },
      skills: ['sd', 'o2c', 'settlement', 'chargeback', 'billing', 'pricing', 's4hana', 'greenfield'],
    },
    {
      id: 'custom-sd-reports',
      title: 'Custom SAP SD Reporting',
      category: 'technical',
      roleId: 'deloitte-analyst',
      challenge:
        'Custom SD reports had to reflect sales business rules exactly at go-live, with development delivered by an offshore ABAP team.',
      solution:
        'Worked directly with offshore ABAP developers and established rigorous business logic validation for every custom SD report.',
      modules: ['SAP SD', 'ABAP (offshore)', 'Custom Reports'],
      impact: 'Zero critical post-launch defects on custom SAP SD reports.',
      metric: { value: 'Zero', label: 'critical post-launch defects' },
      skills: ['sd', 'custom-reports', 'abap-collab', 'logic-validation', 's4hana'],
    },
    {
      id: 'sd-mm-integration',
      title: 'SD–MM Downstream Integration Testing',
      category: 'integration',
      roleId: 'deloitte-analyst',
      challenge:
        'Sales documents flow downstream into Materials Management; any break between SD and MM disrupts procurement and fulfilment for enterprise users.',
      solution:
        'Spearheaded comprehensive System Integration Testing (SIT) and User Acceptance Testing (UAT) workshops for enterprise end-users.',
      modules: ['SAP SD', 'SAP MM', 'SIT', 'UAT'],
      impact: 'Ensured seamless downstream SD–MM integration ahead of go-live.',
      metric: { value: 'SD ⇄ MM', label: 'integration validated' },
      skills: ['sd', 'sdmm', 'scm', 'sit', 'uat', 's4hana', 'greenfield'],
    },
    {
      id: 'hypercare',
      title: 'Post Go-Live Support & Defect Lifecycle',
      category: 'functional',
      roleId: 'deloitte-analyst',
      challenge:
        'After each go-live, critical business issues had to be triaged and resolved quickly to keep retail operations running.',
      solution:
        'Led daily post-launch system support, tracking the full bug lifecycle and team tasks in Microsoft Azure.',
      modules: ['SAP SD', 'Microsoft Azure', 'Agile / Scrum'],
      impact: 'Critical business issues resolved through end-to-end bug lifecycle tracking.',
      metric: { value: 'Daily', label: 'post-launch support led' },
      skills: ['sd', 'hypercare', 'azure', 'agile'],
    },
    {
      id: 'powerbi-dashboards',
      title: 'Executive Power BI Dashboards',
      category: 'technical',
      roleId: 'deloitte-analyst',
      challenge:
        'Leadership needed a clear view of core sales data and defect lifecycles across the implementation.',
      solution:
        'Designed dynamic Power BI dashboards and executive line charts to visualise core sales data and defect lifecycles.',
      modules: ['Power BI', 'Sales Data', 'Defect Analytics'],
      impact: 'Enhanced executive decision-making capabilities.',
      metric: { value: 'Exec', label: 'decision support' },
      skills: ['powerbi', 'sd', 'hypercare'],
    },
    {
      id: 'mdm-scoping',
      title: 'Master Data & Sales Requirements Scoping',
      category: 'functional',
      roleId: 'deloitte-intern',
      challenge:
        'Initial project scoping required a clear picture of critical sales processes before master data workflows could be designed.',
      solution:
        'Gathered and analysed critical sales process requirements during initial project scoping.',
      modules: ['SAP SD', 'Master Data', 'Requirements'],
      impact: 'Streamlined master data management workflows.',
      metric: { value: 'MDM', label: 'workflows streamlined' },
      skills: ['sd', 'mdm', 'requirements'],
    },
    {
      id: 'config-tracking',
      title: 'Configuration Milestone Tracking',
      category: 'technical',
      roleId: 'deloitte-intern',
      challenge: 'Configuration milestone reporting was slow to turn around.',
      solution:
        'Built tracking with advanced MS Excel functions, including dynamic formatting and PivotTables.',
      modules: ['MS Excel', 'PivotTables', 'SAP SD Config'],
      impact: 'Decreased reporting turnaround times by 40%.',
      metric: { value: '40%', label: 'faster reporting turnaround' },
      skills: ['excel', 'sd'],
    },
  ] as Engagement[],

  engagementTabs: [
    { id: 'all', label: 'All Engagements' },
    { id: 'functional', label: 'Functional / Process' },
    { id: 'technical', label: 'Technical / Reporting & Data' },
    { id: 'integration', label: 'Integrations' },
  ] as { id: 'all' | EngagementCategory; label: string }[],

  achievements: [
    { value: '4', label: 'Greenfield Go-Lives', detail: 'Major SAP S/4HANA Retail Greenfield implementations delivered at Deloitte India.', icon: 'rocket', size: 'lg', accent: 'sapphire' },
    { value: '50,000+', label: 'Invoices & POs', detail: 'Processed for Chargeback sales through configured Settlement Management.', icon: 'receipt', size: 'md', accent: 'gold' },
    { value: '1,000+', label: 'Stores Supported', detail: 'Retail stores across India running on the O2C processes delivered.', icon: 'store', size: 'md', accent: 'cyan' },
    { value: 'ZERO', label: 'Critical Defects', detail: 'Zero critical post-launch defects on custom SAP SD reports.', icon: 'shield', size: 'sm', accent: 'cyan' },
    { value: '40%', label: 'Faster Reporting', detail: 'Reporting turnaround cut using advanced Excel and PivotTables.', icon: 'gauge', size: 'sm', accent: 'gold' },
    { value: 'Intern → Analyst', label: 'Deloitte India', detail: 'Moved from SAP SD Intern (July 2025) to SAP Functional Analyst (Jan 2026).', icon: 'trending', size: 'md', accent: 'sapphire' },
  ] as Achievement[],

  education: [
    {
      degree: 'Bachelor of Engineering in Computer Engineering',
      institution: 'Thadomal Shahani Engineering College',
      location: 'Mumbai',
      start: 'Dec 2021',
      end: 'July 2025',
    },
  ],

  certifications: [
    { name: "SAP SD Embark Training Completion", issuer: 'Deloitte' },
    { name: 'AI Generalist', issuer: '' },
    { name: 'Consulting Skills Certification', issuer: '' },
  ],

  nav: [
    { id: 'home', label: 'Home' },
    { id: 'engagements', label: 'SAP Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'impact', label: 'Impact' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
};

export type PortfolioData = typeof portfolioData;
