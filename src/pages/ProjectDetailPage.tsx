import React, { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { ProjectHeaderBanner } from '../components/project-detail/ProjectHeaderBanner';
import { ProjectTabsNav } from '../components/project-detail/ProjectTabsNav';
import { KpiMetricsRow } from '../components/project-detail/KpiMetricsRow';
import { ProjectTimelineCard } from '../components/project-detail/ProjectTimelineCard';
import { OverallProgressCard } from '../components/project-detail/OverallProgressCard';
import { MilestonesWorkspace } from '../components/project-detail/MilestonesWorkspace';
import { TabDocumentsBlueprints } from '../components/project-detail/TabDocumentsBlueprints';
import { TabClientTeam } from '../components/project-detail/TabClientTeam';
import { TabFinancialsBoQ } from '../components/project-detail/TabFinancialsBoQ';
import { TabSiteAuditLogs } from '../components/project-detail/TabSiteAuditLogs';

import { CreateMilestoneModal } from '../components/modals/CreateMilestoneModal';
import { CreateTaskModal } from '../components/modals/CreateTaskModal';
import { UploadDocumentModal } from '../components/modals/UploadDocumentModal';
import { AddTeamMemberModal } from '../components/modals/AddTeamMemberModal';

export const ProjectDetailPage: React.FC = () => {
  const {
    projects,
    activeProjectId,
    selectProject,
    activeDetailTab,
    setActiveDetailTab,
    selectedMilestoneId,
  } = useProjectContext();

  const [isAddMilestoneOpen, setAddMilestoneOpen] = useState(false);
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [isUploadDocOpen, setUploadDocOpen] = useState(false);
  const [isAddTeamMemberOpen, setAddTeamMemberOpen] = useState(false);

  const project = projects.find((p) => p.id === activeProjectId) || projects[0];

  if (!project) {
    return (
      <div className="p-8 text-center text-slate-500">
        Project not found. Please select a valid project from the directory.
      </div>
    );
  }

  const activeMilestoneId =
    selectedMilestoneId || (project.milestones[0] ? project.milestones[0].id : '');

  return (
    <div className="space-y-6 p-4">
      {/* Top Banner */}
      <ProjectHeaderBanner project={project} onBack={() => selectProject(null)} />

      {/* Tabs Navigation */}
      <ProjectTabsNav
        activeTab={activeDetailTab}
        onTabChange={setActiveDetailTab}
      />

      {/* Tab 1: Overview & Workspace */}
      {activeDetailTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 5 KPI Metrics Cards Row */}
          <KpiMetricsRow project={project} />

          {/* Timeline and Overall Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectTimelineCard project={project} />
            <OverallProgressCard project={project} />
          </div>

          {/* Milestones & Individual Task List Split Workspace */}
          <MilestonesWorkspace
            project={project}
            onOpenAddMilestone={() => setAddMilestoneOpen(true)}
            onOpenAddTask={() => setAddTaskOpen(true)}
          />
        </div>
      )}

      {/* Tab 2: Documents & Blueprints */}
      {activeDetailTab === 'documents' && (
        <TabDocumentsBlueprints
          project={project}
          onOpenUploadModal={() => setUploadDocOpen(true)}
        />
      )}

      {/* Tab 3: Client & Team */}
      {activeDetailTab === 'client-team' && (
        <TabClientTeam
          project={project}
          onOpenAddMemberModal={() => setAddTeamMemberOpen(true)}
        />
      )}

      {/* Tab 4: Financials & BoQ */}
      {activeDetailTab === 'financials' && (
        <TabFinancialsBoQ project={project} />
      )}

      {/* Tab 5: Site Audits & Logs */}
      {activeDetailTab === 'site-logs' && (
        <TabSiteAuditLogs project={project} />
      )}

      {/* Modals */}
      <CreateMilestoneModal
        isOpen={isAddMilestoneOpen}
        onClose={() => setAddMilestoneOpen(false)}
        projectId={project.id}
      />

      <CreateTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setAddTaskOpen(false)}
        projectId={project.id}
        milestoneId={activeMilestoneId}
      />

      <UploadDocumentModal
        isOpen={isUploadDocOpen}
        onClose={() => setUploadDocOpen(false)}
        projectId={project.id}
      />

      <AddTeamMemberModal
        isOpen={isAddTeamMemberOpen}
        onClose={() => setAddTeamMemberOpen(false)}
        projectId={project.id}
      />
    </div>
  );
};
