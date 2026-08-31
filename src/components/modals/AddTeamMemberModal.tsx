import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useProjectContext } from '../../context/ProjectContext';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const { addTeamMemberToProject } = useProjectContext();

  const [name, setName] = useState('');
  const [role, setRole] = useState('Senior Site Engineer');
  const [badge, setBadge] = useState<'Site Lead' | 'Design Lead' | 'QS Inspector' | 'Project Engineer'>('Project Engineer');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 98000 12345');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addTeamMemberToProject(projectId, {
      name,
      role,
      badge,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@valueconstructions.in`,
      phone,
      avatarInitials: name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase(),
    });

    onClose();
    setName('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Assigned Team Member" subtitle="Assign engineers or inspectors to this project site">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Er. Vikram Patil"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Designation / Role"
          placeholder="e.g. Senior Site Engineer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Lead Badge Role
          </label>
          <select
            value={badge}
            onChange={(e) => setBadge(e.target.value as any)}
            className="w-full py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <option value="Site Lead">Site Lead</option>
            <option value="Design Lead">Design Lead</option>
            <option value="QS Inspector">QS Inspector</option>
            <option value="Project Engineer">Project Engineer</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Email Address"
            placeholder="e.g. engineer@valueconstructions.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Phone Number"
            placeholder="e.g. +91 98000 12345"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Team Member
          </Button>
        </div>
      </form>
    </Modal>
  );
};
