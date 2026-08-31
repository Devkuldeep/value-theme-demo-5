import React from 'react';
import { Project } from '../../types';

interface ProjectListItemProps {
  project: Project;
  onSelect: (id: string) => void;
}

/**
 * Single Row Component for Project List matching v10 reference screenshot
 */
export const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, onSelect }) => {
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'On Site':
        return 'bg-emerald-100 text-emerald-700';
      case 'Planning':
        return 'bg-orange-100 text-orange-700';
      case 'Handed Over':
      case 'Completed':
        return 'bg-slate-100 text-slate-700';
      case 'On Hold':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getAvatarStyle = (initials: string) => {
    const charCode = initials.charCodeAt(0) || 65;
    const styles = [
      'bg-blue-100 text-blue-700',
      'bg-emerald-100 text-emerald-700',
      'bg-purple-100 text-purple-700',
      'bg-orange-100 text-orange-700',
      'bg-rose-100 text-rose-700',
    ];
    return styles[charCode % styles.length];
  };

  return (
    <div
      onClick={() => onSelect(project.id)}
      className=" p-2  hover:bg-slate-100 w-full border-b border-slate-200/60   transition-all cursor-pointer group flex items-center justify-between gap-4"
    >
      {/* Left: Avatar & Project Info */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 ${getAvatarStyle(
            project.avatarInitials
          )}`}
        >
          {project.avatarInitials}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 transition-colors truncate">
              {project.name}
            </h3>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 shrink-0">
              {project.code}
            </span>
          </div>

          <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
            {project.client} <span className="text-slate-300">·</span> {project.location}
          </p>
        </div>
      </div>

      {/* Right: Status Pill & Completion Percentage */}
      <div className="flex flex-col items-end shrink-0">
        <span
          className={`px-3.5 py-1 rounded-full text-xs font-extrabold ${getStatusBadgeStyle(
            project.status
          )}`}
        >
          {project.status}
        </span>
        <span className="text-[11px] font-mono font-medium text-slate-400 mt-1">
          {project.progressPercentage}% completed
        </span>
      </div>
    </div>
  );
};
