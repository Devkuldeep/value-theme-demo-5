/**
 * Unified Type Definitions for Value Constructions CRM
 * Built to strictly adhere to Indian commercial & residential construction standards.
 */

export type ProjectStatus = 'Planning' | 'On Site' | 'On Hold' | 'Handed Over' | 'Completed';

export type HealthStatus = 'Amber' | 'Green' | 'Red';

export type MilestoneStatus = 'Upcoming' | 'In Progress' | 'Completed';

export type TaskPriority = 'High' | 'Medium' | 'Low';

export type TaskCategory = 'Structural' | 'Excavation' | 'Civil' | 'Electrical' | 'MEP' | 'Finishes';

export type DocumentType = 'PDF Document' | 'Image File';

export type DocumentCategory = 'Architectural' | 'Structural' | 'Civil' | 'Site Photos';

export type ActiveModuleId = 'dashboard' | 'projects' | 'crm' | 'calendar' | 'documents' | 'financials' | 'reports';

export type DetailTabId = 'overview' | 'documents' | 'client-team' | 'financials' | 'site-logs';

export interface Task {
  id: string;
  milestoneId: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completionPercentage: number;
  taskCount: number;
  openTaskCount: number;
  doneTaskCount: number;
  owner: string;
  dueDate: string;
  status: MilestoneStatus;
  tasks: Task[];
}

export interface DocumentVersion {
  version: string;
  date: string;
  author: string;
  notes: string;
}

export interface ProjectDocument {
  id: string;
  code: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  type: DocumentType;
  category: DocumentCategory;
  version: string;
  description: string;
  versionCount: number;
  history?: DocumentVersion[];
}

export interface ClientDetails {
  name: string;
  role: string;
  email: string;
  phone: string;
  whatsapp: string;
  billingAddress: string;
  gstin: string;
  pan: string;
  preferredHours: string;
  avatarInitials: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: 'Site Lead' | 'Design Lead' | 'QS Inspector' | 'Project Engineer';
  email: string;
  phone: string;
  avatarInitials: string;
}

export interface Project {
  id: string;
  code: string; // e.g. "VC-P-999"
  name: string; // e.g. "Whitefield Commercial Hub"
  avatarInitials: string; // "WH" or "WC"
  client: string; // "Client Representative"
  city: string; // "Bengaluru", "Pune", "Chennai", "Hyderabad"
  location: string; // "Whitefield Main Road, Bengaluru"
  status: ProjectStatus;
  health: HealthStatus;
  healthSubtitle: string; // "Planning", "Optimal", "Delayed"
  
  // High-level progress & dates
  progressPercentage: number;
  currentPhase: string; // "FOUNDATION", "GROUND FLOOR"
  timelineElapsedPercentage: number;
  startDate: string; // "25 Aug 2026"
  targetDate: string; // "21 Feb 2027"
  targetMonthYear: string; // "Target: Dec 2026"
  
  // Financial metrics (in INR ₹)
  totalBudget: number; // e.g. 50000000 (₹5,00,00,000)
  spentBudget: number; // e.g. 0
  
  // Key personnel
  projectManager: string; // "Er. Rajesh Gowda"
  projectManagerRole: string; // "Site Operations"
  
  // Sub-collections
  milestones: Milestone[];
  documents: ProjectDocument[];
  clientDetails: ClientDetails;
  teamMembers: TeamMember[];
}
