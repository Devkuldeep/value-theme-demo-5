import React from 'react';
import { Project } from '../../types';
import { ShieldAlert, User, Building, Layers, Clock } from 'lucide-react';

interface KpiMetricsRowProps {
  project: Project;
}

/**
 * 5 Metric Cards Row for Project Overview Tab matching v10 kpi-card-v2 skin
 */
export const KpiMetricsRow: React.FC<KpiMetricsRowProps> = ({ project }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Project Health */}
      <div className="kpi-card-v2">
        <div className="flex items-center gap-1.5">
          <small>Project Health</small>
          <div className="kpi-icon-badge !bg-amber-50 !text-amber-600">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <strong className="!text-sm">
              {project.health} ({project.healthSubtitle})
            </strong>
          </div>
        </div>
      </div>

      {/* 2. Client */}
      <div className="kpi-card-v2">
        <div className="flex items-center gap-1.5">
          <small>Client</small>
          <div className="kpi-icon-badge">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <strong className="!text-sm truncate">
            {project.client}
          </strong>
          <span>Primary Owner</span>
        </div>
      </div>

      {/* 3. Project Manager */}
      <div className="kpi-card-v2">
        <div className="flex items-center gap-1.5">
          <small>Project Manager</small>
          <div className="kpi-icon-badge !bg-theme-muted !text-theme-text-secondary">
            <Building className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <strong className="!text-sm truncate">
            {project.projectManager}
          </strong>
          <span className="truncate">{project.projectManagerRole}</span>
        </div>
      </div>

      {/* 4. Current Phase */}
      <div className="kpi-card-v2">
        <div className="flex items-center gap-1.5">
          <small>Current Phase</small>
          <div className="kpi-icon-badge">
            <Layers className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <strong className="!text-sm text-theme-primary font-mono">
            {project.currentPhase}
          </strong>
          <span>{project.progressPercentage}% Complete</span>
        </div>
      </div>

      {/* 5. Timeline Schedule */}
      <div className="kpi-card-v2">
        <div className="flex items-center gap-1.5">
          <small>Timeline Schedule</small>
          <div className="kpi-icon-badge !bg-purple-50 !text-purple-600">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <strong className="!text-sm font-mono">
            {project.timelineElapsedPercentage}% Elapsed
          </strong>
          <span className="truncate">{project.targetMonthYear}</span>
        </div>
      </div>
    </div>
  );
};
