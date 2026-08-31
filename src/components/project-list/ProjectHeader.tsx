import React from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';

/**
 * Project Header component showing count, description, and list/grid layout toggle
 */
export const ProjectHeader: React.FC = () => {
  const { projects } = useProjectContext();

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Our Projects
        </h1>
        <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 font-extrabold text-xs inline-flex items-center justify-center min-w-[24px]">
          {projects.length}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
        Project directory and execution tracking across active sites in India.
      </p>
    </div>
  );
};
