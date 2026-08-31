import React from 'react';
import { DetailTabId } from '../../types';
import { LayoutDashboard, FileText, Users, Receipt, HardHat } from 'lucide-react';

interface ProjectTabsNavProps {
  activeTab: DetailTabId;
  onTabChange: (tab: DetailTabId) => void;
}

const tabs: { id: DetailTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview & Workspace', icon: LayoutDashboard },
  { id: 'documents', label: 'Documents & Blueprints', icon: FileText },
  { id: 'client-team', label: 'Client & Team', icon: Users },
  { id: 'financials', label: 'Financials & BoQ', icon: Receipt },
  { id: 'site-logs', label: 'Site Audits & Logs', icon: HardHat },
];

/**
 * 5-Tab Navigation Bar for Project Details View matching v10 tabs-nav-v2
 */
export const ProjectTabsNav: React.FC<ProjectTabsNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs-nav-v2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-nav-btn-v2 flex items-center gap-2 ${isActive ? 'active' : ''}`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
