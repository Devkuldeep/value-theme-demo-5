import React from 'react';
import { ProjectProvider, useProjectContext } from './context/ProjectContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { ProjectListPage } from './pages/ProjectListPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { CrmLeadsPage } from './pages/CrmLeadsPage';
import { SiteCalendarPage } from './pages/SiteCalendarPage';
import { CentralDocumentVaultPage } from './pages/CentralDocumentVaultPage';
import { FinancialsLedgerPage } from './pages/FinancialsLedgerPage';
import { ReraReportsPage } from './pages/ReraReportsPage';

/**
 * Main Application Showcase Container with Full Indian Construction Module Routing
 */
const MainAppContent: React.FC = () => {
  const { isAuthenticated, isSidebarCollapsed, activeModule, activeProjectId, projects } = useProjectContext();

  const selectedProject = projects.find((p) => p.id === activeProjectId);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardPage />;
      case 'crm':
        return <CrmLeadsPage />;
      case 'calendar':
        return <SiteCalendarPage />;
      case 'documents':
        return <CentralDocumentVaultPage />;
      case 'financials':
        return <FinancialsLedgerPage />;
      case 'reports':
        return <ReraReportsPage />;
      case 'projects':
      default:
        return activeProjectId && selectedProject ? <ProjectDetailPage /> : <ProjectListPage />;
    }
  };

  return (
    <div className="app-viewport h-screen overflow-hidden">
      <div className="panze-shell flex h-full overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Fixed Header */}
          <Header />

          {/* Dynamic Scrollable Page Container */}
          <main className="flex-1 w-full overflow-y-auto space-y-6">
            {renderActiveModule()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ProjectProvider>
      <MainAppContent />
    </ProjectProvider>
  );
}
