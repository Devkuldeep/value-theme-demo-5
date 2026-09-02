import React from 'react';
import {
  Building2,
  Search,
  LayoutDashboard,
  Users,
  FolderKanban,
  Calendar,
  FileText,
  Receipt,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';
import { ActiveModuleId } from '../../types';

/**
 * Main Application Sidebar Navigation for Value Constructions India CRM
 * Formatted with v10 Borderless & Shadowless Pastel Surface Hierarchy.
 */
export const Sidebar: React.FC = () => {
  const {
    isSidebarCollapsed,
    toggleSidebar,
    activeModule,
    setActiveModule,
    selectProject
  } = useProjectContext();

  const coreModules: { id: ActiveModuleId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'crm', label: 'CRM Leads', icon: Users },
    { id: 'calendar', label: 'Site Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const collabFinanceModules: { id: ActiveModuleId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'financials', label: 'Invoicing & BoQ', icon: Receipt },
    { id: 'reports', label: 'RERA & Safety', icon: BarChart3 },
  ];

  const handleModuleClick = (id: ActiveModuleId) => {
    if (id === 'projects') {
      selectProject(null);
    }
    setActiveModule(id);
  };

  return (
    <aside
      className={`hidden md:flex sticky top-0 h-screen shrink-0 overflow-y-auto scrollbar-none bg-white/80 backdrop-blur-md border-r border-slate-200/70 shadow-[0_4px_20px_rgba(15,23,42,0.03)] flex-col transition-all duration-300 z-40 ${
        isSidebarCollapsed ? 'w-[64px] p-2.5 items-center' : 'w-64 p-4'
      }`}
    >
      {/* Header Logo Area */}
      <div className={`flex items-center justify-between ${isSidebarCollapsed ? 'mb-4' : 'mb-3 pb-3 border-b border-slate-100'}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#101728] text-white flex items-center justify-center font-black shrink-0 shadow-md">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <h2 className="text-xs font-black text-slate-900 truncate leading-tight uppercase tracking-wide">
                Value Constructions
              </h2>
              <p className="text-[9px] font-bold text-[#ff7a00] truncate uppercase tracking-widest mt-0.5">
                India Private Limited
              </p>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors hidden md:flex cursor-pointer"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Module Search Input */}
      {!isSidebarCollapsed && (
        <div className="mb-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 text-slate-900 rounded-full border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto space-y-5 w-full">
        {/* Core Modules */}
        <div>
          {!isSidebarCollapsed && (
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Core Modules
            </div>
          )}
          <nav className="space-y-1.5 w-full">
            {coreModules.map((m) => {
              const Icon = m.icon;
              const isSelected = activeModule === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleModuleClick(m.id)}
                  className={`w-full flex items-center gap-3 transition-all cursor-pointer ${isSidebarCollapsed
                    ? 'w-11 h-11 mx-auto rounded-full justify-center'
                    : 'px-3.5 py-2.5 rounded-full text-xs font-semibold'
                    } ${isSelected
                      ? 'bg-[#101728] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  title={m.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span>{m.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Collaboration & Finance */}
        <div>
          {!isSidebarCollapsed && (
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Finance & Compliance
            </div>
          )}
          <nav className="space-y-1.5 w-full">
            {collabFinanceModules.map((m) => {
              const Icon = m.icon;
              const isSelected = activeModule === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleModuleClick(m.id)}
                  className={`w-full flex items-center gap-3 transition-all cursor-pointer ${isSidebarCollapsed
                    ? 'w-11 h-11 mx-auto rounded-full justify-center'
                    : 'px-3.5 py-2.5 rounded-full text-xs font-semibold'
                    } ${isSelected
                      ? 'bg-[#101728] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  title={m.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span>{m.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings */}
        <div>
          {!isSidebarCollapsed && (
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Settings & Admin
            </div>
          )}
          <button
            className={`w-full flex items-center gap-3 text-slate-600 hover:bg-slate-100 transition-all cursor-pointer ${isSidebarCollapsed
              ? 'w-11 h-11 mx-auto rounded-full justify-center'
              : 'px-3.5 py-2.5 rounded-full text-xs font-semibold'
              }`}
            title="Settings"
          >
            <Settings className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Settings</span>}
          </button>
        </div>
      </div>

      {/* User Footer */}
      <div className={`mt-auto pt-3 ${isSidebarCollapsed ? '' : 'border-t border-slate-100'}`}>
        <div className={`flex items-center gap-3 p-1.5 rounded-full ${isSidebarCollapsed ? 'justify-center' : 'bg-slate-50 border border-slate-200/60'}`}>
          <div className="w-9 h-9 rounded-full bg-[#ff7a00] text-white flex items-center justify-center shrink-0 font-extrabold text-xs shadow-xs">
            VC
          </div>
          {!isSidebarCollapsed && (
            <div className="min-w-0 pr-2">
              <div className="text-xs font-bold text-slate-900 truncate">
                Er. Rajesh Gowda
              </div>
              <div className="text-[10px] text-slate-500 truncate font-medium">
                Project Operations Lead
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
