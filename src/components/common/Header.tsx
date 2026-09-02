import React from 'react';
import { Search, Info, Bell, Plus, Building2, ChevronRight, Menu } from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from '../ui/Button';

interface HeaderProps {
  onOpenNewProjectModal?: () => void;
}

/**
 * Main Application Top Navigation Bar
 * Developer Help: Responsive desktop/mobile header supporting menu toggles and quick project creation.
 */
export const Header: React.FC<HeaderProps> = ({ onOpenNewProjectModal }) => {
  const { activeProjectId, projects, selectProject, activeModule } = useProjectContext();
  const activeProject = projects.find((p) => p.id === activeProjectId);

  const handleOpenModal = () => {
    if (onOpenNewProjectModal) {
      onOpenNewProjectModal();
    } else {
      window.dispatchEvent(new Event('open-create-project-modal'));
    }
  };

  const dispatchMobileMenu = () => {
    window.dispatchEvent(new Event('open-mobile-menu'));
  };

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.03)] px-3 sm:px-4 flex items-center justify-between gap-2.5">
      {/* Left: Mobile Menu Trigger & Title / Breadcrumbs */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={dispatchMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {activeProject ? (
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 min-w-0">
            <button
              onClick={() => selectProject(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 shrink-0 text-[11px]"
            >
              Projects
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-slate-900 dark:text-white font-extrabold truncate bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-[11px]">
              {activeProject.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ff7a00]/10 text-[#ff7a00] flex items-center justify-center font-extrabold shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white tracking-tight truncate capitalize">
                {activeModule === 'projects' ? 'Projects' : activeModule}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-[#ff7a00] font-extrabold text-[10px] sm:text-xs shrink-0">
                {projects.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Center: Search & Command Shortcut (Desktop) */}
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
        <div className="search-pill-wrapper w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search workspace or blueprint... ⌘K"
            className="search-pill-input"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications & New Project Button */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        <div className="hidden sm:block">
          <ThemeSwitcher />
        </div>

        <button className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative" title="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff7a00]" />
        </button>

        {/* User Profile Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          <div className="w-6 h-6 rounded-full bg-[#101728] text-white text-[10px] font-black flex items-center justify-center">
            SA
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Super Admin
          </span>
        </div>

        {/* New Project CTA Button */}
        <button
          onClick={handleOpenModal}
          className="bg-[#ff7a00] hover:bg-[#e06c00] text-white font-extrabold text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xs flex items-center gap-1 cursor-pointer transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>
    </header>
  );
};
