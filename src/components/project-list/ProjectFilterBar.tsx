import React from 'react';
import { Search, LayoutList, LayoutGrid } from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';

const statusPills = ['All', 'On Site', 'Planning', 'On Hold', 'Handed Over'];
const cities = ['All Cities', 'Bengaluru', 'Pune', 'Chennai', 'Hyderabad'];
const sortOptions = ['Date (Newest)', 'Progress (High-Low)', 'Budget (High-Low)'];

/**
 * Filter Bar matching v10 reference screenshot styling
 * Developer Help: Fully responsive pill filters with horizontal scroll on mobile.
 */
export const ProjectFilterBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    cityFilter,
    setCityFilter,
    sortOption,
    setSortOption,
    viewMode,
    setViewMode,
  } = useProjectContext();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-2.5 sm:p-3 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
      {/* Top Row: Search Input & View Toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, code or location..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#ff7a00] transition-all"
          />
        </div>

        {/* View Toggle Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-700 text-[#ff7a00] shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-700 text-[#ff7a00] shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="List View"
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Status Filter Pills & Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        {/* Status Pills Horizontally Scrollable */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {statusPills.map((s) => {
            const isActive = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ff7a00] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-1.5 text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1.5 text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
