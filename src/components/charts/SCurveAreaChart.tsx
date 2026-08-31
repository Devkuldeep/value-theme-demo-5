import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SCurveDataPoint } from '../../types/chart.types';
import { CustomChartTooltip } from './CustomChartTooltip';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface SCurveAreaChartProps {
  data: SCurveDataPoint[];
  projectName?: string;
  totalBudgetCr?: number;
}

/**
 * Recharts Area Chart: Planned vs Actual Physical & Financial S-Curve Progression
 * Renders smooth cubic bezier gradients with interactive metric switching.
 */
export const SCurveAreaChart: React.FC<SCurveAreaChartProps> = ({
  data,
  projectName = 'Current Project',
  totalBudgetCr = 240,
}) => {
  const [metricMode, setMetricMode] = useState<'progress' | 'spend'>('progress');

  const isCurrency = metricMode === 'spend';
  const plannedKey = isCurrency ? 'plannedCumulativeSpendCr' : 'plannedProgress';
  const actualKey = isCurrency ? 'actualCumulativeSpendCr' : 'actualProgress';

  return (
    <div className="surface-card rounded-2xl p-5 shadow-soft border border-theme-border">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-theme-text-main">
                {isCurrency ? 'Cumulative Financial Cashflow (INR ₹ Cr)' : 'Physical Execution S-Curve Progression'}
              </h3>
              <p className="text-xs text-theme-text-muted">
                {projectName} • Baseline Target vs Site Actuals
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center bg-theme-level-2 p-1 rounded-xl border border-theme-border">
          <button
            onClick={() => setMetricMode('progress')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              metricMode === 'progress'
                ? 'bg-theme-card text-theme-primary shadow-sm'
                : 'text-theme-text-muted hover:text-theme-text-main'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Progress %
          </button>
          <button
            onClick={() => setMetricMode('spend')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              metricMode === 'spend'
                ? 'bg-theme-card text-theme-primary shadow-sm'
                : 'text-theme-text-muted hover:text-theme-text-main'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Spend (₹ Cr)
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <defs>
              {/* Planned Gradient */}
              <linearGradient id="gradientPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              {/* Actual Gradient (Terracotta / Orange) */}
              <linearGradient id="gradientActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ea580c" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-color, #e2e8f0)"
              opacity={0.6}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: 'var(--border-color, #e2e8f0)' }}
              tick={{ fill: 'var(--text-tertiary, #64748b)', fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              domain={isCurrency ? [0, totalBudgetCr] : [0, 100]}
              tickFormatter={(val) => (isCurrency ? `₹${val}Cr` : `${val}%`)}
              tick={{ fill: 'var(--text-tertiary, #64748b)', fontSize: 12 }}
            />

            <Tooltip
              content={<CustomChartTooltip isCurrency={isCurrency} />}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 15, fontSize: 12 }}
            />

            {/* Planned S-Curve Area */}
            <Area
              type="monotone"
              dataKey={plannedKey}
              name="Planned Target Baseline"
              stroke="#3b82f6"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#gradientPlanned)"
              dot={{ r: 3, fill: '#3b82f6' }}
              activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
            />

            {/* Actual S-Curve Area */}
            <Area
              type="monotone"
              dataKey={actualKey}
              name="Actual Site Execution"
              stroke="#ea580c"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#gradientActual)"
              dot={{ r: 4, fill: '#ea580c' }}
              activeDot={{ r: 7, stroke: '#ffffff', strokeWidth: 2 }}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Summary Metrics */}
      <div className="mt-4 pt-3 border-t border-theme-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
        <div>
          <span className="text-[11px] text-theme-text-muted">Target Milestone Date</span>
          <p className="text-xs font-semibold text-theme-text-main">31 Dec 2026</p>
        </div>
        <div>
          <span className="text-[11px] text-theme-text-muted">Planned S-Curve</span>
          <p className="text-xs font-semibold text-blue-600">68.0% Completed</p>
        </div>
        <div>
          <span className="text-[11px] text-theme-text-muted">Actual Site Work</span>
          <p className="text-xs font-semibold text-orange-600">66.0% Verified</p>
        </div>
        <div>
          <span className="text-[11px] text-theme-text-muted">Variance Status</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
            -2.0% (Within Normal Range)
          </span>
        </div>
      </div>
    </div>
  );
};
