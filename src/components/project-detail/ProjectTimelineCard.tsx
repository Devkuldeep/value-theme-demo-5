import React from 'react';
import { Calendar } from 'lucide-react';
import { Project } from '../../types';

interface ProjectTimelineCardProps {
  project: Project;
}

/**
 * Timeline Card showing Project Start and Target dates matching v10 timeline-panel-v2 skin
 */
export const ProjectTimelineCard: React.FC<ProjectTimelineCardProps> = ({ project }) => {
  return (
    <div className="card-v2 p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs font-extrabold text-theme-text-main">
        <Calendar className="w-4 h-4 text-theme-primary" />
        <span>Project Timeline</span>
      </div>

      <div className="flex items-center justify-between gap-4 p-3 bg-theme-muted rounded-xl border border-theme-border font-mono text-xs">
        <div>
          <span className="text-[10px] font-bold text-theme-text-tertiary block uppercase">START</span>
          <span className="font-extrabold text-theme-text-main">{project.startDate}</span>
        </div>

        <div className="h-1.5 flex-1 bg-theme-nested rounded-full mx-2 relative overflow-hidden">
          <div 
            className="h-full bg-theme-primary rounded-full transition-all duration-500" 
            style={{ width: `${project.timelineElapsedPercentage}%` }}
          />
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold text-theme-text-tertiary block uppercase">TARGET</span>
          <span className="font-extrabold text-theme-primary">{project.targetDate}</span>
        </div>
      </div>
    </div>
  );
};
