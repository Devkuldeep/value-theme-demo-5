import React from 'react';
import { ArrowLeft, MapPin, User, Calendar, Building } from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProjectHeaderBannerProps {
  project: Project;
  onBack: () => void;
}

/**
 * Top Header Banner for Project Detail View matching v10 visual skin
 */
export const ProjectHeaderBanner: React.FC<ProjectHeaderBannerProps> = ({ project, onBack }) => {
  return (
    <div className="card-v2 p-6 sm:p-8 space-y-5">
      {/* Back Button */}
      <div>
        <Button
          variant="secondary"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
        >
          Back to Projects
        </Button>
      </div>

      {/* Main Title Banner with Project Avatar & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="project-icon-box-v2">
            {project.avatarInitials}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="project-h1-title">
                {project.name}
              </h1>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-theme-muted text-theme-text-main border border-theme-border">
                {project.code}
              </span>
              <Badge variant="amber" size="md">
                {project.status}
              </Badge>
            </div>

            {/* Meta Information Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="meta-chip-v2">
                <MapPin className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                <span>{project.location}</span>
              </div>

              <div className="meta-chip-v2">
                <User className="w-3.5 h-3.5 text-theme-text-tertiary shrink-0" />
                <span>Client: <strong>{project.client}</strong></span>
              </div>

              <div className="meta-chip-v2">
                <Calendar className="w-3.5 h-3.5 text-theme-text-tertiary shrink-0" />
                <span>Target: <strong>{project.targetDate}</strong></span>
              </div>

              <div className="meta-chip-v2">
                <Building className="w-3.5 h-3.5 text-theme-text-tertiary shrink-0" />
                <span>PM: <strong>{project.projectManager}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
