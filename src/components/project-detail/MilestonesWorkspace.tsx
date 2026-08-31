import React, { useState } from 'react';
import { Project, Milestone } from '../../types';
import { useProjectContext } from '../../context/ProjectContext';
import { Plus, CheckCircle2, Circle, Search, Calendar, User, Tag, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface MilestonesWorkspaceProps {
  project: Project;
  onOpenAddMilestone: () => void;
  onOpenAddTask: () => void;
}

/**
 * Split Milestones & Individual Task List Workspace matching v10 visual skin
 */
export const MilestonesWorkspace: React.FC<MilestonesWorkspaceProps> = ({
  project,
  onOpenAddMilestone,
  onOpenAddTask,
}) => {
  const { selectedMilestoneId, setSelectedMilestoneId, toggleTaskCompletion } = useProjectContext();
  const [taskSearchQuery, setTaskSearchQuery] = useState('');

  // Fallback to first milestone if none selected
  const activeMilestone: Milestone | undefined =
    project.milestones.find((m) => m.id === selectedMilestoneId) || project.milestones[0];

  const filteredTasks = (activeMilestone?.tasks || []).filter((t) =>
    t.title.toLowerCase().includes(taskSearchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT COLUMN: MILESTONES LIST (4 cols on lg) */}
      <div className="lg:col-span-4 card-v2 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-theme-border">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-theme-text-main uppercase tracking-wider">
              Milestones
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-theme-muted text-theme-text-secondary font-mono text-[10px] font-bold">
              {project.milestones.length}
            </span>
          </div>
          <button
            onClick={onOpenAddMilestone}
            className="p-1.5 rounded-xl bg-theme-primary-soft text-theme-primary hover:bg-theme-muted transition-colors cursor-pointer"
            title="Add Milestone"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Milestone List */}
        <div className="space-y-2.5">
          {project.milestones.length === 0 ? (
            <p className="text-xs text-theme-text-tertiary py-4 text-center">No milestones created yet.</p>
          ) : (
            project.milestones.map((ms) => {
              const isSelected = activeMilestone?.id === ms.id;
              return (
                <div
                  key={ms.id}
                  onClick={() => setSelectedMilestoneId(ms.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-theme-primary-soft border-theme-primary shadow-xs ring-1 ring-theme-primary/30'
                      : 'bg-theme-muted border-theme-border hover:bg-theme-nested-hover'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? 'bg-theme-primary' : 'bg-theme-text-tertiary'
                        }`}
                      />
                      <h4 className="text-xs font-black text-theme-text-main uppercase tracking-wide">
                        {ms.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-theme-text-tertiary">
                      {ms.completionPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-theme-text-tertiary pl-4">
                    <span>{ms.taskCount || ms.tasks.length} tasks</span>
                    <span className="font-mono text-[10px]">{ms.dueDate}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: MILESTONE DETAIL & INDIVIDUAL TASK LIST (8 cols on lg) */}
      <div className="lg:col-span-8 card-v2 p-6 space-y-6">
        {activeMilestone ? (
          <>
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-theme-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-black text-theme-text-main uppercase tracking-tight">
                    {activeMilestone.title}
                  </h2>
                  <Badge variant="blue" size="sm">
                    {activeMilestone.completionPercentage}% complete
                  </Badge>
                </div>
                <p className="text-xs font-medium text-theme-text-tertiary">
                  {activeMilestone.description}
                </p>
                <div className="flex items-center gap-4 pt-1 text-[11px] text-theme-text-tertiary">
                  <span>Owner: <strong className="text-theme-text-main">{activeMilestone.owner}</strong></span>
                  <span>•</span>
                  <span>Due: <strong className="text-theme-text-main">{activeMilestone.dueDate}</strong></span>
                </div>
              </div>

              {/* Milestone Stats Mini Grid */}
              <div className="grid grid-cols-4 gap-2 bg-theme-muted p-2.5 rounded-2xl border border-theme-border shrink-0 font-mono text-center">
                <div>
                  <span className="text-[9px] uppercase font-bold text-theme-text-tertiary block">TOTAL TASKS</span>
                  <span className="text-xs font-black text-theme-text-main">{activeMilestone.taskCount || activeMilestone.tasks.length}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-theme-text-tertiary block">OPEN</span>
                  <span className="text-xs font-black text-amber-600">{activeMilestone.openTaskCount}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-theme-text-tertiary block">DONE</span>
                  <span className="text-xs font-black text-emerald-600">{activeMilestone.doneTaskCount}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-theme-text-tertiary block">STATUS</span>
                  <span className="text-[10px] font-bold text-theme-primary block truncate">{activeMilestone.status}</span>
                </div>
              </div>
            </div>

            {/* Individual Task List Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-theme-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={taskSearchQuery}
                  onChange={(e) => setTaskSearchQuery(e.target.value)}
                  placeholder="Search tasks in milestone..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs font-medium bg-theme-input text-theme-text-main rounded-xl border border-theme-border focus:outline-none"
                />
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={onOpenAddTask}
              >
                Add Task
              </Button>
            </div>

            {/* Task Items */}
            <div className="space-y-2">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-theme-border rounded-2xl">
                  <p className="text-xs text-theme-text-tertiary font-medium">No tasks found for this milestone.</p>
                </div>
              ) : (
                filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      t.completed
                        ? 'bg-theme-muted border-theme-border opacity-60'
                        : 'bg-theme-card border-theme-border hover:bg-theme-muted'
                    }`}
                  >
                    {/* Left: Checkbox & Title */}
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        onClick={() => toggleTaskCompletion(project.id, activeMilestone.id, t.id)}
                        className="mt-0.5 text-theme-primary hover:scale-110 transition-transform shrink-0 cursor-pointer"
                      >
                        {t.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-5 h-5 text-theme-text-tertiary hover:text-theme-primary" />
                        )}
                      </button>

                      <div className="space-y-1 min-w-0">
                        <h4
                          className={`text-xs font-extrabold text-theme-text-main leading-snug ${
                            t.completed ? 'line-through text-theme-text-tertiary' : ''
                          }`}
                        >
                          {t.title}
                        </h4>

                        <div className="flex items-center gap-2 flex-wrap text-[10px] font-semibold text-theme-text-tertiary">
                          <span className="flex items-center gap-1 text-theme-primary bg-theme-primary-soft px-2 py-0.5 rounded-md">
                            <Tag className="w-3 h-3" />
                            {t.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-theme-text-tertiary" />
                            {t.assignedTo}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3 h-3 text-theme-text-tertiary" />
                            Due {t.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Priority Badge */}
                    <div className="shrink-0 flex items-center justify-end">
                      <Badge
                        variant={t.priority === 'High' ? 'red' : t.priority === 'Medium' ? 'amber' : 'gray'}
                        size="sm"
                        icon={<AlertCircle className="w-3 h-3" />}
                      >
                        {t.priority}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-theme-text-tertiary">Select a milestone to view tasks.</div>
        )}
      </div>
    </div>
  );
};
