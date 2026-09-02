import React from 'react';
import { Project } from '../../types';
import { Avatar } from '../ui/Avatar';
import { ArrowUpRight, MapPin, User, Calendar } from 'lucide-react';

interface ProjectCardGridProps {
  projects: Project[];
  onSelect: (id: string) => void;
}

/**
 * Responsive 2-Column (Mobile) Grid View layout for Projects showcase
 * Developer Help: Matches exact layout from reference screenshot (WhatsApp Image 2026-09-02 at 1.41.24 PM.jpeg).
 */
export const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({ projects, onSelect }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'On Site':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400';
      case 'Planning':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400';
      case 'Handed Over':
      case 'Completed':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      case 'On Hold':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
    }
  };

  const getAvatarVariant = (idx: number) => {
    const variants: ('blue' | 'emerald' | 'purple' | 'orange')[] = ['blue', 'emerald', 'orange', 'purple'];
    return variants[idx % variants.length];
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {projects.map((project, idx) => {
        return (
          <div
            key={project.id}
            onClick={() => onSelect(project.id)}
            className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              {/* Header: Avatar Circle & Status Pill */}
              <div className="flex items-center justify-between gap-2">
                <Avatar
                  initials={project.avatarInitials}
                  variant={getAvatarVariant(idx)}
                  size="md"
                  className="shadow-xs border border-white dark:border-slate-800"
                />
                <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold truncate ${getStatusStyle(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Title & Code */}
              <div>
                <h3 className="text-xs sm:text-base font-black text-slate-900 dark:text-white group-hover:text-[#ff7a00] transition-colors leading-snug line-clamp-2 min-h-[2rem]">
                  {project.name}
                </h3>
                <span className="font-mono text-[10px] font-bold text-slate-400 block mt-0.5">
                  {project.code}
                </span>
              </div>

              {/* Client & Location details */}
              <div className="space-y-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <div className="flex items-center gap-1.5 truncate">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{project.client}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3 h-3 text-[#ff7a00] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Progress & Action Arrow */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Progress</span>
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-mono">
                  {project.progressPercentage}%
                </span>
              </div>

              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-[#ff7a00] group-hover:text-white flex items-center justify-center font-bold text-xs transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
