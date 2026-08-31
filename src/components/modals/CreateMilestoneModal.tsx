import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useProjectContext } from '../../context/ProjectContext';

interface CreateMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export const CreateMilestoneModal: React.FC<CreateMilestoneModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const { addMilestoneToProject } = useProjectContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('Er. Rajesh Gowda');
  const [dueDate, setDueDate] = useState('30 Dec 2026');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addMilestoneToProject(projectId, {
      title: title.toUpperCase(),
      description: description || 'Construction phase milestone execution',
      completionPercentage: 0,
      taskCount: 0,
      owner,
      dueDate,
      status: 'Upcoming',
    });

    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Project Milestone" subtitle="Create execution phase stage for milestone tracking">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Milestone Title (Phase Name)"
          placeholder="e.g. SECOND FLOOR MASONRY"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="Description"
          placeholder="e.g. Block masonry and MEP conduit installations"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Milestone Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <Input
            label="Target Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Milestone
          </Button>
        </div>
      </form>
    </Modal>
  );
};
