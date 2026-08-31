/**
 * Recharts Visualization Data Types
 * Typed data structures for S-Curve Area Charts, Budget Pie Charts, Multi-axis Radar Charts, and Radial Bar Gauges.
 */

export interface SCurveDataPoint {
  month: string;
  monthIndex: number;
  plannedProgress: number; // 0-100%
  actualProgress: number | null; // 0-100%
  plannedCumulativeSpendCr: number; // in INR Crores
  actualCumulativeSpendCr: number | null; // in INR Crores
  milestoneAnnotation?: string;
}

export interface BudgetCategorySlice {
  name: string;
  value: number; // In INR Crores
  percentage: number;
  color: string;
  utilizationRate: number;
}

export interface RadarAuditMetric {
  subject: string; // e.g. "Structural Quality", "Schedule Adherence", "RERA Compliance", "Safety Index", "Cost Discipline", "ESG & Green Concrete"
  score: number; // 0-100
  benchmark: number; // 0-100 benchmark
  fullMark: number;
}

export interface RadialProgressMetric {
  name: string;
  progress: number; // 0-100%
  fill: string;
  category: string;
  statusText: string;
}

export interface MonthlyCashFlowPoint {
  month: string;
  plannedExpense: number; // INR Crores
  actualExpense: number; // INR Crores
  procurementCost: number; // INR Crores
}
