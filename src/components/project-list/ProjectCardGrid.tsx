import React from 'react';
import { Project } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { MapPin, Calendar, User } from 'lucide-react';

interface ProjectCardGridProps {
  projects: Project[];
  onSelect: (id: string) => void;
}

/**
 * Grid View layout for Projects showcase using v10 card-v2 visual skin
 */
export const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({ projects, onSelect }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'On Site':
        return 'emerald';
      case 'Planning':
        return 'amber';
      case 'Handed Over':
      case 'Completed':
        return 'purple';
      default:
        return 'blue';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project, idx) => {
        const pastelBgs = ['task-card-peach', 'task-card-blue', 'task-card-green', 'task-card-purple'];
        const currentPastel = pastelBgs[idx % pastelBgs.length];

        return (
          <div
            key={project.id}
            onClick={() => onSelect(project.id)}
            className={`${currentPastel} hover:shadow-lg transition-all cursor-pointer group space-y-4 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <Avatar
                  initials={project.avatarInitials}
                  variant="blue"
                  size="md"
                  className="shadow-xs border border-white"
                />
                <span className="status-pill-v2">
                  {project.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0084ff] transition-colors line-clamp-1">
                  {project.name}
                </h3>
                <span className="meta-chip-v2 mt-1.5 !py-0.5 !px-2.5 !text-[10px] font-mono">
                  {project.code}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2 truncate">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{project.client}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#ff7a00] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate font-mono">{project.targetMonthYear}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 space-y-1.5">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-slate-600">Progress</span>
                <span className="text-slate-900">{project.progressPercentage}%</span>
              </div>
              <div className="w-full bg-white/80 h-2 rounded-full overflow-hidden border border-slate-200/50">
                <div
                  className="bg-[#101728] h-full rounded-full transition-all duration-300"
                  style={{ width: `${project.progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
