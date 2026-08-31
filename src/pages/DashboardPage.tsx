import React from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { formatINR, formatCr } from '../utils/formatters';
import { Building2, TrendingUp, ShieldCheck, Activity, ArrowRight, MapPin } from 'lucide-react';
import { BudgetDistributionPieChart } from '../components/charts/BudgetDistributionPieChart';
import { SCurveAreaChart } from '../components/charts/SCurveAreaChart';
import { SCurveDataPoint, BudgetCategorySlice } from '../types/chart.types';

const sampleSCurveData: SCurveDataPoint[] = [
  { month: 'Jan', monthIndex: 1, plannedProgress: 10, actualProgress: 10, plannedCumulativeSpendCr: 15, actualCumulativeSpendCr: 15 },
  { month: 'Feb', monthIndex: 2, plannedProgress: 22, actualProgress: 20, plannedCumulativeSpendCr: 30, actualCumulativeSpendCr: 28 },
  { month: 'Mar', monthIndex: 3, plannedProgress: 35, actualProgress: 32, plannedCumulativeSpendCr: 50, actualCumulativeSpendCr: 45 },
  { month: 'Apr', monthIndex: 4, plannedProgress: 50, actualProgress: 48, plannedCumulativeSpendCr: 75, actualCumulativeSpendCr: 70 },
  { month: 'May', monthIndex: 5, plannedProgress: 68, actualProgress: 66, plannedCumulativeSpendCr: 110, actualCumulativeSpendCr: 105 },
  { month: 'Jun', monthIndex: 6, plannedProgress: 82, actualProgress: 80, plannedCumulativeSpendCr: 150, actualCumulativeSpendCr: 140 },
  { month: 'Jul', monthIndex: 7, plannedProgress: 95, actualProgress: 90, plannedCumulativeSpendCr: 190, actualCumulativeSpendCr: 180 },
];

const sampleBudgetData: BudgetCategorySlice[] = [
  { name: 'Structural & RCC', value: 95000000, percentage: 40, color: 'var(--color-primary, #3b82f6)', utilizationRate: 85 },
  { name: 'Finishes & Joinery', value: 55000000, percentage: 25, color: 'var(--color-success, #10b981)', utilizationRate: 70 },
  { name: 'MEP & HVAC', value: 40000000, percentage: 18, color: 'var(--color-warning, #f59e0b)', utilizationRate: 90 },
  { name: 'Land & Approvals', value: 25000000, percentage: 12, color: '#8b5cf6', utilizationRate: 100 },
  { name: 'Safety & Quality', value: 10000000, percentage: 5, color: '#ec4899', utilizationRate: 80 },
];

/**
 * Executive Portfolio CRM Dashboard Page matching v10 visual skin & theme tokens
 */
export const DashboardPage: React.FC = () => {
  const { projects, selectProject, setActiveModule } = useProjectContext();

  const totalPortfolioBudget = projects.reduce((sum, p) => sum + p.totalBudget, 0);
  const activeProjectsCount = projects.filter((p) => p.status === 'On Site' || p.status === 'Planning').length;
  const avgProgress = projects.length === 0 ? 0 : Math.round(projects.reduce((sum, p) => sum + p.progressPercentage, 0) / projects.length);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#101728] via-[#1e293b] to-[#0f172a] text-white rounded-[32px] p-6 sm:p-8 relative overflow-hidden shadow-md border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15 backdrop-blur-md">
            <Building2 className="w-3.5 h-3.5 text-[#ff7a00]" />
            <span>Value Constructions India · Executive Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Executive Construction Portfolio Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Managing commercial IT parks, high-rise luxury towers, and infra developments across Bengaluru, Hyderabad, Pune & Chennai.
          </p>
        </div>
      </div>

      {/* Metric Cards Row matching kpi-card-v2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Portfolio Value */}
        <div className="kpi-card-v2">
          <div className="flex items-center justify-between">
            <small>Portfolio Sanctioned</small>
            <div className="kpi-icon-badge">
              <Building2 className="w-4 h-4 text-[#0084ff]" />
            </div>
          </div>
          <div>
            <strong>
              {formatINR(totalPortfolioBudget)}
            </strong>
            <span>
              {formatCr(totalPortfolioBudget / 10000000)} Capital Under Mgmt
            </span>
          </div>
        </div>

        {/* Active Sites */}
        <div className="kpi-card-v2">
          <div className="flex items-center justify-between">
            <small>Active Workspaces</small>
            <div className="kpi-icon-badge kpi-green">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
            </div>
          </div>
          <div>
            <strong className="!text-[#10b981]">
              {activeProjectsCount} Projects
            </strong>
            <span>Across 5 Major Metros</span>
          </div>
        </div>

        {/* Portfolio Average Progress */}
        <div className="kpi-card-v2">
          <div className="flex items-center justify-between">
            <small>Avg Physical Completion</small>
            <div className="kpi-icon-badge kpi-orange">
              <Activity className="w-4 h-4 text-[#ff7a00]" />
            </div>
          </div>
          <div>
            <strong>
              {avgProgress}%
            </strong>
            <div className="kpi-progress-bar">
              <i style={{ width: `${avgProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Safety Record */}
        <div className="kpi-card-v2">
          <div className="flex items-center justify-between">
            <small>Safety Index</small>
            <div className="kpi-icon-badge">
              <ShieldCheck className="w-4 h-4 text-[#0084ff]" />
            </div>
          </div>
          <div>
            <strong className="!text-[#0084ff]">
              100% EHS
            </strong>
            <span>412 Days Zero Incident</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* S-Curve Expenditure Chart */}
        <SCurveAreaChart data={sampleSCurveData} />

        {/* Metro Capital Distribution Pie Chart */}
        <BudgetDistributionPieChart data={sampleBudgetData} />
      </div>

      {/* Active Construction Workspaces Directory Preview */}
      <div className="card-panze p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-black text-slate-900">
            Active Construction Workspaces
          </h3>
          <button
            onClick={() => setActiveModule('projects')}
            className="pill-btn active !text-xs !py-1.5 !px-4"
          >
            <span>View All Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((project, idx) => {
            const pastelClasses = ['task-card-peach', 'task-card-blue', 'task-card-green'];
            const currentPastel = pastelClasses[idx % pastelClasses.length];
            return (
              <div
                key={project.id}
                onClick={() => selectProject(project.id)}
                className={`${currentPastel} hover:shadow-md transition-all cursor-pointer space-y-3`}
              >
                {/* Project Header Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-700 truncate">
                    {project.code}
                  </span>
                  <span className="status-pill-v2">
                    {project.status}
                  </span>
                </div>

                {/* Project Name and Location */}
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 line-clamp-1">
                    {project.name}
                  </h4>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{project.location}</span>
                  </p>
                </div>

                {/* Physical Completion Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Progress</span>
                    <span>{project.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-white/70 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <div
                      className="bg-[#101728] h-full rounded-full transition-all duration-300"
                      style={{ width: `${project.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Total Project Sanctioned Budget */}
                <div className="text-sm font-black text-slate-900 pt-1">
                  {formatINR(project.totalBudget)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
