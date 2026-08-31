import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';

const themes: { id: string; label: string; color: string }[] = [
  { id: 'blue', label: 'Classic Blue', color: 'bg-blue-500' },
  { id: 'material-orange', label: 'Material Orange', color: 'bg-orange-500' },
  { id: 'lavender', label: 'Lavender Violet', color: 'bg-purple-500' },
  { id: 'mint', label: 'Mint Emerald', color: 'bg-emerald-500' },
  { id: 'peach', label: 'Coral Peach', color: 'bg-amber-500' },
  { id: 'yellow', label: 'Golden Amber', color: 'bg-yellow-500' },
  { id: 'rose', label: 'Vibrant Rose', color: 'bg-rose-500' },
  { id: 'blue-redd', label: 'Blue & Coral', color: 'bg-sky-500' },
  { id: 'dispute-fox', label: 'DisputeFox Emerald', color: 'bg-green-600' },
  { id: 'sage-mint', label: 'Sage & Mint', color: 'bg-teal-600' },
  { id: 'royal-blue', label: 'Royal Blue', color: 'bg-indigo-600' },
  { id: 'obsidian', label: 'Obsidian Dark', color: 'bg-slate-900' },
];

/**
 * Interactive Theme Switcher Component for Brand Palette Switching
 * Indian Context CRM - Centralized Token Theme Engine
 */
export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-muted hover:bg-theme-nested-hover text-xs font-bold text-theme-text-main transition-colors cursor-pointer"
        title="Switch UI Theme Token"
      >
        <Palette className="w-4 h-4 text-theme-primary" />
        <span className="hidden sm:inline">Theme</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-theme-card rounded-2xl p-2 shadow-xl border border-theme-border z-50 animate-fadeIn max-h-96 overflow-y-auto">
          <div className="text-[10px] font-extrabold uppercase px-2 py-1 text-theme-text-tertiary">
            Select Brand Theme (12 Themes)
          </div>
          <div className="space-y-1 mt-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  theme === t.id
                    ? 'bg-theme-primary-soft text-theme-primary'
                    : 'text-theme-text-main hover:bg-theme-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full ${t.color} shadow-xs`} />
                  <span>{t.label}</span>
                </div>
                {theme === t.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
