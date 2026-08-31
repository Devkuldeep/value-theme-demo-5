import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { RadialProgressMetric } from '../../types/chart.types';
import { Gauge, CheckCircle2 } from 'lucide-react';

interface MilestoneRadialBarChartProps {
  data: RadialProgressMetric[];
  compositeScore?: number;
}

/**
 * Custom Radial Tooltip
 */
const RadialCustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0]?.payload;

  return (
    <div className="custom-recharts-tooltip border border-white/20 bg-slate-900/90 p-3 text-xs text-white shadow-xl backdrop-blur-md">
      <div className="font-semibold text-slate-200 border-b border-white/10 pb-1 mb-1.5 flex items-center justify-between gap-4">
        <span>{item.name}</span>
        <span className="font-mono font-bold text-orange-400">{item.progress}%</span>
      </div>
      <div className="text-[11px] text-slate-300">
        Classification: <span className="text-white font-medium">{item.category}</span>
      </div>
      <div className="text-[11px] text-emerald-400 font-medium mt-1">
        {item.statusText}
      </div>
    </div>
  );
};

/**
 * Recharts Radial Bar Chart: Concentric KPI Progress Rings
 * Visualizes stage completion, safety velocity, budget pacing, and QA metrics.
 */
export const MilestoneRadialBarChart: React.FC<MilestoneRadialBarChartProps> = ({
  data,
  compositeScore = 88.5,
}) => {
  return (
    <div className="surface-card rounded-2xl p-5 shadow-soft border border-theme-border flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Gauge className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-theme-text-main">
              Execution Velocity Rings
            </h3>
            <p className="text-xs text-theme-text-muted">
              Real-Time IoT Site Feeds & Drone Verification
            </p>
          </div>
        </div>
      </div>

      {/* Radial Bar Chart Canvas */}
      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="100%"
            barSize={12}
            data={data}
            startAngle={180}
            endAngle={-180}
          >
            <Tooltip content={<RadialCustomTooltip />} />
            <RadialBar
              background={{ fill: 'var(--surface-nested, #f1f5f9)' }}
              dataKey="progress"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Central Composite Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-theme-text-main font-mono">
            {compositeScore}%
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-theme-text-muted">
            Efficiency
          </span>
        </div>
      </div>

      {/* Metric Breakdown Badges */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map((item, idx) => (
          <div
            key={`rad-${idx}`}
            className="p-2 rounded-xl bg-theme-level-2 border border-theme-border flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-theme-text-secondary truncate text-[11px]">
                {item.name}
              </span>
            </div>
            <span className="font-mono font-bold text-theme-text-main shrink-0 text-[11px]">
              {item.progress}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
