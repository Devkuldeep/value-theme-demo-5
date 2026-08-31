import React from 'react';
import { Project } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';

interface OverallProgressCardProps {
  project: Project;
}

/**
 * Overall Progress & Financial Budget Card matching v10 visual skin
 */
export const OverallProgressCard: React.FC<OverallProgressCardProps> = ({ project }) => {
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="card-v2 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-theme-text-main">
          Overall Progress
        </h3>
        <span className="text-sm font-black font-mono text-theme-primary">
          {project.progressPercentage}%
        </span>
      </div>

      <ProgressBar progress={project.progressPercentage} height="md" variant="blue" />

      <div className="flex items-center justify-between text-xs pt-2 border-t border-theme-border font-mono">
        <div>
          <span className="text-theme-text-tertiary font-bold block text-[10px] uppercase">Budget</span>
          <span className="font-extrabold text-theme-text-main">
            {formatINR(project.totalBudget)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-theme-text-tertiary font-bold block text-[10px] uppercase">Spent</span>
          <span className="font-extrabold text-theme-text-secondary">
            {formatINR(project.spentBudget)}
          </span>
        </div>
      </div>
    </div>
  );
};
