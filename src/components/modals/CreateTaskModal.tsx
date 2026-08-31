import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useProjectContext } from '../../context/ProjectContext';
import { TaskCategory, TaskPriority } from '../../types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  milestoneId: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  projectId,
  milestoneId,
}) => {
  const { addTaskToMilestone } = useProjectContext();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Civil');
  const [priority, setPriority] = useState<TaskPriority>('High');
  const [assignedTo, setAssignedTo] = useState('Er. Rajesh Gowda');
  const [dueDate, setDueDate] = useState('2026-09-25');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addTaskToMilestone(projectId, milestoneId, {
      title,
      category,
      priority,
      assignedTo,
      dueDate,
      completed: false,
    });

    onClose();
    setTitle('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Milestone Task" subtitle="Assign task item to project milestone">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Description / Title"
          placeholder="e.g. Substructure Concrete Pouring (C50 Mix)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <option value="Structural">Structural</option>
              <option value="Excavation">Excavation</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
              <option value="MEP">MEP</option>
              <option value="Finishes">Finishes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
