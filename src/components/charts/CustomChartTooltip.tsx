import React from 'react';
import { formatINR, formatPercentage } from '../../utils/formatters';

interface CustomChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    color?: string;
    fill?: string;
    unit?: string;
    payload?: any;
  }>;
  label?: string;
  isCurrency?: boolean;
}

/**
 * Award-Winning Custom Glassmorphism Tooltip for Recharts
 * Supports multi-series values, milestone tags, and INR ₹ formatting.
 */
export const CustomChartTooltip: React.FC<CustomChartTooltipProps> = ({
  active,
  payload,
  label,
  isCurrency = false,
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const rawData = payload[0]?.payload;

  return (
    <div className="custom-recharts-tooltip min-w-[200px] border border-white/20 bg-slate-900/90 p-3.5 text-xs text-white shadow-2xl backdrop-blur-md transition-all duration-200">
      {/* Tooltip Header / Period */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <span className="font-semibold text-slate-200">{label || rawData?.name || 'Milestone Period'}</span>
        {rawData?.milestoneAnnotation && (
          <span className="ml-2 rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-medium text-orange-400 border border-orange-500/30">
            {rawData.milestoneAnnotation}
          </span>
        )}
      </div>

      {/* Series Items */}
      <div className="space-y-1.5">
        {payload.map((item, idx) => {
          const val = item.value;
          const displayVal = typeof val === 'number' 
            ? (isCurrency ? formatINR(val) : `${val}%`)
            : val;

          return (
            <div key={`tt-item-${idx}`} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: item.color || item.fill || '#ea580c' }}
                />
                <span className="text-slate-300 capitalize">{item.name}</span>
              </div>
              <span className="font-mono font-bold text-white tracking-wide">
                {displayVal}
              </span>
            </div>
          );
        })}
      </div>

      {/* Extra Metadata if available */}
      {rawData?.statusText && (
        <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-slate-400">
          Status: <span className="text-emerald-400 font-medium">{rawData.statusText}</span>
        </div>
      )}
    </div>
  );
};
