import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  highlight?: boolean;
}

/**
 * Metric Stat Card Component
 * Styled with subtle elevation, token-based surfaces, and trend pills.
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-orange-500/10',
  iconColor = 'text-orange-600 dark:text-orange-400',
  trend,
  highlight = false,
}) => {
  return (
    <div
      className={`surface-card rounded-2xl p-5 shadow-soft border ${
        highlight
          ? 'border-theme-primary ring-1 ring-theme-primary/20 bg-theme-level-2/30'
          : 'border-theme-border'
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-theme-text-muted">{title}</span>
        <div className={`p-2.5 rounded-xl ${iconBgColor} ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2">
        <div className="text-2xl font-black tracking-tight text-theme-text-main font-mono">
          {value}
        </div>
        {subtitle && (
          <p className="mt-0.5 text-xs text-theme-text-secondary truncate">
            {subtitle}
          </p>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded font-bold ${
              trend.isPositive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400'
            }`}
          >
            {trend.value}
          </span>
          {trend.label && (
            <span className="text-theme-text-muted text-[11px]">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
};
