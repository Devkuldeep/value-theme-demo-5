import React from 'react';
import { Search, Info, Bell, Plus, Building2, ChevronRight } from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from '../ui/Button';

interface HeaderProps {
  onOpenNewProjectModal?: () => void;
}

/**
 * Main Application Top Navigation Bar
 * Formatted with v10 Borderless & Shadowless Pastel Surface Hierarchy.
 */
export const Header: React.FC<HeaderProps> = ({ onOpenNewProjectModal }) => {
  const { activeProjectId, projects, selectProject } = useProjectContext();
  const activeProject = projects.find((p) => p.id === activeProjectId);

  const handleOpenModal = () => {
    if (onOpenNewProjectModal) {
      onOpenNewProjectModal();
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-[0_4px_20px_rgba(15,23,42,0.03)] px-4 flex items-center justify-between gap-4">
      {/* Left: Title & Breadcrumbs */}
      <div className="flex items-center gap-2 min-w-0">
        {activeProject ? (
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <button
              onClick={() => selectProject(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs"
            >
              Projects
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-extrabold truncate bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
              {activeProject.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#0084ff]/10 text-[#0084ff] flex items-center justify-center font-extrabold shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Executive Workspace
            </h1>
          </div>
        )}
      </div>

      {/* Center: Search & Command Shortcut */}
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
        <div className="search-pill-wrapper">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search workspace or blueprint... ⌘K"
            className="search-pill-input"
          />
        </div>
      </div>

      {/* Right: Actions, Badges, Profile & New Project Button */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-xs font-bold border border-slate-200 shadow-xs">
          <span>Projects</span>
          <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">⌘P</span>
        </button>

        <ThemeSwitcher />

        <button className="card-circle-btn" title="Info">
          <Info className="w-4 h-4" />
        </button>

        <button className="card-circle-btn relative" title="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff7a00]" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

        {/* User Profile */}
        <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
          <div className="w-6 h-6 rounded-full bg-[#101728] text-white text-[10px] font-black flex items-center justify-center">
            SA
          </div>
          <span className="text-xs font-bold text-slate-800">
            Super Admin
          </span>
        </div>

        {/* New Project CTA */}
        {onOpenNewProjectModal && (
          <Button
            variant="primary"
            size="sm"
            className="rounded-full shadow-md px-5"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={handleOpenModal}
          >
            New Project
          </Button>
        )}
      </div>
    </header>
  );
};
