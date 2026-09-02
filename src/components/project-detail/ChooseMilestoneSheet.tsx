import React, { useEffect, useState } from 'react';
import { Project, Milestone } from '../../types';
import { useProjectContext } from '../../context/ProjectContext';
import {
  X,
  Check,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  ArrowUp,
  ArrowDown,
  Archive,
  Trash2,
} from 'lucide-react';

interface ChooseMilestoneSheetProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onEditMilestone: (milestone: Milestone) => void;
}

/**
 * "Choose Milestone" bottom sheet with per-milestone overflow actions
 * matching the mobile reference design.
 */
export const ChooseMilestoneSheet: React.FC<ChooseMilestoneSheetProps> = ({
  project,
  isOpen,
  onClose,
  onEditMilestone,
}) => {
  const {
    selectedMilestoneId,
    setSelectedMilestoneId,
    duplicateMilestone,
    moveMilestone,
    toggleArchiveMilestone,
    deleteMilestone,
  } = useProjectContext();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const visibleMilestones = project.milestones.filter((m) => !m.archived);
  const activeId = selectedMilestoneId || visibleMilestones[0]?.id;

  const handleSelect = (id: string) => {
    setSelectedMilestoneId(id);
    onClose();
  };

  const menuAction = (ms: Milestone, action: string) => {
    setOpenMenuId(null);
    switch (action) {
      case 'view':
        handleSelect(ms.id);
        break;
      case 'edit':
        onEditMilestone(ms);
        onClose();
        break;
      case 'duplicate':
        duplicateMilestone(project.id, ms.id);
        break;
      case 'up':
        moveMilestone(project.id, ms.id, 'up');
        break;
      case 'down':
        moveMilestone(project.id, ms.id, 'down');
        break;
      case 'archive':
        toggleArchiveMilestone(project.id, ms.id);
        break;
      case 'delete':
        deleteMilestone(project.id, ms.id);
        break;
    }
  };

  const menuItems = [
    { id: 'view', label: 'View Details', icon: Eye },
    { id: 'edit', label: 'Edit Milestone', icon: Pencil },
    { id: 'duplicate', label: 'Duplicate', icon: Copy },
    { id: 'up', label: 'Move Up', icon: ArrowUp },
    { id: 'down', label: 'Move Down', icon: ArrowDown },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'delete', label: 'Delete', icon: Trash2, danger: true },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fadeIn"
      onClick={() => {
        setOpenMenuId(null);
        onClose();
      }}
    >
      <div
        className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[82vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
            Choose Milestone
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Milestone List */}
        <div className="overflow-y-auto p-4 space-y-2.5">
          {visibleMilestones.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              No milestones available for this project.
            </p>
          ) : (
            visibleMilestones.map((ms) => {
              const isSelected = ms.id === activeId;
              return (
                <div
                  key={ms.id}
                  className={`relative flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {/* Radio */}
                  <button
                    onClick={() => handleSelect(ms.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 text-transparent hover:border-indigo-400'
                    }`}
                  >
                    <Check className="w-3 h-3" strokeWidth={3.5} />
                  </button>

                  {/* Meta */}
                  <button
                    onClick={() => handleSelect(ms.id)}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <h4
                      className={`text-xs font-black uppercase tracking-wide truncate ${
                        isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {ms.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 truncate mt-0.5">
                      {ms.taskCount || ms.tasks.length} tasks · {ms.owner}
                    </p>
                  </button>

                  {/* Percentage */}
                  <span className="font-mono text-xs font-black text-indigo-600 dark:text-indigo-400 shrink-0">
                    {ms.completionPercentage}%
                  </span>

                  {/* Overflow Menu */}
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === ms.id ? null : ms.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {openMenuId === ms.id && (
                      <div className="absolute right-0 top-9 z-20 w-44 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 animate-fadeIn">
                        {menuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => menuAction(ms, item.id)}
                              className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                                item.danger
                                  ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
