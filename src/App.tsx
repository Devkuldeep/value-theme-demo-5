import React from 'react';
import { ProjectProvider, useProjectContext } from './context/ProjectContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
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
 * Developer Help: Responsive desktop/mobile shell with bottom navigation bar.
 */
const MainAppContent: React.FC = () => {
  const { isAuthenticated, activeModule, activeProjectId, projects } = useProjectContext();

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
    <div className="app-viewport h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="panze-shell flex h-full overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Main Viewport Container */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Navigation Header */}
          <Header />

          {/* Dynamic Scrollable Main Content Container */}
          <main className="flex-1 w-full overflow-y-auto space-y-6 pb-20 md:pb-6 p-3 sm:p-6">
            {renderActiveModule()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
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
