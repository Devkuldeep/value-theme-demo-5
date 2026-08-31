import React from 'react';

interface ProgressBarProps {
  progress: number;
  variant?: 'blue' | 'emerald' | 'amber' | 'orange' | 'purple';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-600',
};

const heightMap = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

/**
 * Reusable Atomic Progress Bar Component
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'blue',
  height = 'md',
  showLabel = false,
  className = '',
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Completion</span>
          <span className="font-mono">{normalizedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${heightMap[height]}`}>
        <div
          className={`h-full transition-all duration-500 rounded-full ${colorMap[variant]}`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};
