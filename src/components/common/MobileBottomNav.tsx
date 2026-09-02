import React, { useEffect, useState } from 'react';
import {
  Home,
  Building2,
  Users,
  User,
  Menu as MenuIcon,
  Calendar,
  FileText,
  Receipt,
  BarChart3,
} from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';
import { ActiveModuleId } from '../../types';

/**
 * Mobile bottom navigation bar (Dashboard / Projects / Leads / Profile / Menu)
 * shown on small screens in place of the desktop sidebar.
 */
export const MobileBottomNav: React.FC = () => {
  const { activeModule, setActiveModule, selectProject } = useProjectContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsMenuOpen(true);
    window.addEventListener('open-mobile-menu', open);
    return () => window.removeEventListener('open-mobile-menu', open);
  }, []);

  const go = (id: ActiveModuleId) => {
    if (id === 'projects') selectProject(null);
    setActiveModule(id);
    setIsMenuOpen(false);
  };

  const items: { id: ActiveModuleId | 'profile' | 'menu'; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'crm', label: 'Leads', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
  ];

  const extraModules: { id: ActiveModuleId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'calendar', label: 'Site Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'financials', label: 'Invoicing & BoQ', icon: Receipt },
    { id: 'reports', label: 'RERA & Safety', icon: BarChart3 },
  ];

  return (
    <>
      {/* Extra modules popover */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute bottom-20 right-4 w-52 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl py-1.5 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {extraModules.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => go(m.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                    activeModule === m.id
                      ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
        <div className="grid grid-cols-5 h-16">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeModule;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'menu') {
                    setIsMenuOpen((v) => !v);
                  } else if (item.id !== 'profile') {
                    go(item.id as ActiveModuleId);
                  }
                }}
                className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`text-[10px] font-bold ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
