import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { RadarAuditMetric } from '../../types/chart.types';
import { ShieldCheck, Award } from 'lucide-react';

interface ProjectHealthRadarChartProps {
  data: RadarAuditMetric[];
  overallScore?: number;
}

/**
 * Custom Radar Chart Tooltip
 */
const RadarCustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0]?.payload;

  return (
    <div className="custom-recharts-tooltip border border-white/20 bg-slate-900/90 p-3 text-xs text-white shadow-xl backdrop-blur-md">
      <div className="font-semibold text-slate-200 border-b border-white/10 pb-1 mb-1.5">
        {item.subject}
      </div>
      <div className="flex justify-between gap-4 py-0.5">
        <span className="text-orange-400">Current Score:</span>
        <span className="font-mono font-bold">{item.score}/100</span>
      </div>
      <div className="flex justify-between gap-4 py-0.5">
        <span className="text-blue-400">Industry Standard:</span>
        <span className="font-mono font-bold">{item.benchmark}/100</span>
      </div>
    </div>
  );
};

/**
 * Recharts Radar Chart: 6-Axis Enterprise Construction Performance Audit
 * Evaluates Quality, RERA Compliance, Safety, Cost, Schedule, and ESG.
 */
export const ProjectHealthRadarChart: React.FC<ProjectHealthRadarChartProps> = ({
  data,
  overallScore = 96,
}) => {
  return (
    <div className="surface-card rounded-2xl p-5 shadow-soft border border-theme-border flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-theme-text-main">
              6-Axis Governance Radar
            </h3>
            <p className="text-xs text-theme-text-muted">
              Audited by Bureau Veritas & RERA Compliance Cell
            </p>
          </div>
        </div>

        {/* Aggregate Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5" />
          {overallScore}/100 Grade A+
        </div>
      </div>

      {/* Radar Chart Canvas */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="var(--border-color, #e2e8f0)" opacity={0.7} />
            
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'var(--text-secondary, #475569)', fontSize: 11, fontWeight: 500 }}
            />
            
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'var(--text-muted, #94a3b8)', fontSize: 10 }}
            />

            <Tooltip content={<RadarCustomTooltip />} />
            
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
            />

            {/* Benchmark Polygon */}
            <Radar
              name="Industry Benchmark"
              dataKey="benchmark"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.15}
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />

            {/* Current Project Polygon */}
            <Radar
              name="Project Actuals"
              dataKey="score"
              stroke="#ea580c"
              fill="#ea580c"
              fillOpacity={0.4}
              strokeWidth={2.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Insights Footer */}
      <div className="mt-2 p-2.5 rounded-xl bg-theme-level-2 border border-theme-border flex items-center justify-between text-xs">
        <span className="text-theme-text-muted">Key Strength:</span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          Zero Safety Accidents (640k Man-Hours)
        </span>
      </div>
    </div>
  );
};
