/**
 * Project and Enterprise Construction Types
 * Comprehensive data schema structured for Indian commercial & infrastructure projects.
 */

export type ProjectCategory = 
  | 'Commercial IT Park'
  | 'Luxury High-Rise'
  | 'Industrial Logistics'
  | 'Infrastructure & Metro'
  | 'Smart Township';

export type ProjectCity = 'Bengaluru' | 'Mumbai' | 'GIFT City' | 'Delhi-NCR' | 'Hyderabad' | 'Pune';

export type ProjectStatus = 
  | 'PLANNING'
  | 'SITE_MOBILIZATION'
  | 'STRUCTURAL_RCC'
  | 'MEP_FITOUTS'
  | 'FACADE_GLAZING'
  | 'HANDOVER_RERA'
  | 'IN_PROGRESS'
  | 'COMPLETED';

export type HealthStatus = 'HEALTHY' | 'MODERATE' | 'CRITICAL';

export interface Milestone {
  id: string;
  title: string;
  stage: string;
  targetDate: string;
  actualDate?: string;
  completionPercentage: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  assignedContractor: string;
  inspectedBy: string;
  reraMilestoneLinked: boolean;
}

export interface BoQItem {
  id: string;
  code: string;
  description: string;
  category: 'Civil & RCC' | 'Steel & Reinforcement' | 'MEP & HVAC' | 'Finishes & Glazing' | 'Approvals & Liasoning';
  allocatedCr: number; // In INR Crores
  utilizedCr: number;
  variancePercentage: number;
  gstRate: number; // e.g. 18%
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  entity: string; // e.g. "L&T Construction", "Shapoorji Pallonji", "Tata Consulting Engineers"
  email: string;
  phone: string;
  avatar: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  type: 'RERA_SANCTION' | 'STRUCTURAL_BLUEPRINT' | 'ENVIRONMENTAL_NOC' | 'BOQ_SHEET' | 'FIRE_NOC';
  fileSize: string;
  uploadDate: string;
  verified: boolean;
}

export interface ProjectDetail {
  id: string;
  code: string; // e.g. "VC-BLR-099"
  name: string;
  tagline: string;
  client: string; // e.g. "Infosys Tech Hubs India Ltd."
  city: ProjectCity;
  state: string;
  locationDetails: string;
  category: ProjectCategory;
  status: ProjectStatus;
  health: HealthStatus;
  
  // Financial metrics (in INR Crores)
  totalBudgetCr: number;
  sanctionedBudgetCr: number;
  spentToDateCr: number;
  projectedCostCr: number;
  pendingInvoicesCr: number;
  
  // Progress & Execution metrics
  plannedProgressPercentage: number;
  actualProgressPercentage: number;
  progressVariance: number;
  targetCompletionDate: string;
  startDate: string;
  daysRemaining: number;
  
  // Compliance & Regulatory
  reraNumber: string;
  gstin: string;
  municipalSanctionNo: string;
  safetyScore: number; // 0-100
  esgScore: number; // 0-100
  manHoursZeroAccident: number;
  
  // Collections
  milestones: Milestone[];
  boqDistribution: BoQItem[];
  stakeholders: Stakeholder[];
  documents: ProjectDocument[];
}

export interface ProjectSummary {
  id: string;
  code: string;
  name: string;
  client: string;
  city: string;
  category: ProjectCategory;
  status: ProjectStatus;
  health: HealthStatus;
  totalBudgetCr: number;
  spentToDateCr: number;
  plannedProgressPercentage: number;
  actualProgressPercentage: number;
  targetCompletionDate: string;
  reraNumber: string;
  leadEngineer: string;
  bannerImage: string;
}
