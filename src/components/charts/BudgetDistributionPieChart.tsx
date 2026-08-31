import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { BudgetCategorySlice } from '../../types/chart.types';
import { CustomChartTooltip } from './CustomChartTooltip';
import { PieChart as PieIcon } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface BudgetDistributionPieChartProps {
  data: BudgetCategorySlice[];
  totalBudgetCr?: number;
}

// Active sector highlight renderer
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      {/* Central Total Indicator */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--text-primary)" className="font-bold text-lg">
        {formatINR(value)}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--text-tertiary)" className="text-[11px]">
        {payload.name}
      </text>
      
      {/* Active Sector with Outer Ring Glow */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 11}
        fill={fill}
        opacity={0.4}
      />
    </g>
  );
};

/**
 * Recharts Donut & Pie Chart: Bill of Quantities (BoQ) & Budget Distribution
 * Displays interactive category breakdowns with active hover animations.
 */
export const BudgetDistributionPieChart: React.FC<BudgetDistributionPieChartProps> = ({
  data,
  totalBudgetCr = 240,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="surface-card rounded-2xl p-5 shadow-soft border border-theme-border flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <PieIcon className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-theme-text-main">
              BoQ & Budget Distribution
            </h3>
            <p className="text-xs text-theme-text-muted">
              Total Sanctioned: <span className="font-semibold text-theme-text-main">{formatINR(totalBudgetCr)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Donut Chart Canvas */}
      <div className="h-[260px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomChartTooltip isCurrency={true} />} />
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="var(--surface-card)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Category Legend */}
      <div className="mt-2 space-y-2">
        {data.map((item, idx) => (
          <div
            key={`leg-${idx}`}
            onMouseEnter={() => setActiveIndex(idx)}
            className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
              activeIndex === idx
                ? 'bg-theme-level-2 shadow-sm font-semibold'
                : 'hover:bg-theme-level-2/50 text-theme-text-secondary'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate max-w-[150px]">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-theme-text-muted">{item.percentage}%</span>
              <span className="font-mono font-bold text-theme-text-main">
                {formatINR(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
