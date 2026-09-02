import React, { useState, useEffect } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { ProjectHeader } from '../components/project-list/ProjectHeader';
import { ProjectFilterBar } from '../components/project-list/ProjectFilterBar';
import { ProjectListItem } from '../components/project-list/ProjectListItem';
import { ProjectCardGrid } from '../components/project-list/ProjectCardGrid';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { CreateProjectModal } from '../components/modals/CreateProjectModal';

export const ProjectListPage: React.FC = () => {
  const {
    projects,
    viewMode,
    searchQuery,
    statusFilter,
    cityFilter,
    sortOption,
    selectProject,
  } = useProjectContext();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsCreateModalOpen(true);
    window.addEventListener('open-create-project-modal', handleOpen);
    return () => window.removeEventListener('open-create-project-modal', handleOpen);
  }, []);

  // Filter projects based on user controls
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : p.status === statusFilter;

    const matchesCity =
      cityFilter === 'All Cities' ? true : p.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === 'Progress (High-Low)') {
      return b.progressPercentage - a.progressPercentage;
    }
    if (sortOption === 'Budget (High-Low)') {
      return b.totalBudget - a.totalBudget;
    }
    return 0;
  });

  return (
    <div className="space-y-5 main-container-layout">
      {/* Top Header */}
      <ProjectHeader />

      {/* Main Container Card Shell */}
      <div className="bg-white/90 backdrop-blur-md rounded-[28px] p-4 border border-slate-200/70 shadow-sm space-y-4">
        {/* Filter Bar */}
        <ProjectFilterBar />

        {/* Project Display List / Grid */}
        {sortedProjects.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">
              No projects found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search criteria or create a new project.
            </p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-2.5 pt-1">
            {sortedProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
                onSelect={selectProject}
              />
            ))}
          </div>
        ) : (
          <div className="pt-1">
            <ProjectCardGrid projects={sortedProjects} onSelect={selectProject} />
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
