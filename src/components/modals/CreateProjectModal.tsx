import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useProjectContext } from '../../context/ProjectContext';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const { addProject } = useProjectContext();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [client, setClient] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [location, setLocation] = useState('');
  const [totalBudget, setTotalBudget] = useState(50000000);
  const [projectManager, setProjectManager] = useState('Er. Rajesh Gowda');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    addProject({
      name,
      code,
      client: client || 'Client Representative',
      city,
      location: location || `${city} Main Road, ${city}`,
      status: 'Planning',
      health: 'Amber',
      healthSubtitle: 'Planning',
      progressPercentage: 0,
      currentPhase: 'PLANNING',
      timelineElapsedPercentage: 0,
      startDate: '01 Sep 2026',
      targetDate: '30 Aug 2027',
      targetMonthYear: 'Target: Aug 2027',
      totalBudget: Number(totalBudget),
      spentBudget: 0,
      projectManager,
      projectManagerRole: 'Site Operations',
      avatarInitials: name.substring(0, 2).toUpperCase(),
    });

    onClose();
    setName('');
    setCode('');
    setLocation('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project" subtitle="Add a new construction site project to the directory">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name"
          placeholder="e.g. Whitefield Commercial Hub"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Project Code"
            placeholder="e.g. VC-P-999"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Input
            label="Client Name"
            placeholder="e.g. Client Representative"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          <Input
            label="Total Budget (INR ₹)"
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
          />
        </div>

        <Input
          label="Location Address"
          placeholder="e.g. Whitefield Main Road, Bengaluru"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Input
          label="Project Manager"
          value={projectManager}
          onChange={(e) => setProjectManager(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};
