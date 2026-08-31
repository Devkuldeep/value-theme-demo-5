import React from 'react';
import { Search, LayoutList, LayoutGrid } from 'lucide-react';
import { useProjectContext } from '../../context/ProjectContext';

const statusPills = ['All', 'On Site', 'Planning', 'On Hold', 'Handed Over'];
const cities = ['All Cities', 'Bengaluru', 'Pune', 'Chennai', 'Hyderabad'];
const sortOptions = ['Date (Newest)', 'Progress (High-Low)', 'Budget (High-Low)'];

/**
 * Filter Bar matching v10 reference screenshot styling
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
    <div className="bg-white rounded-full p-2 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 min-w-0">
      {/* Search Input Box */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-9 pr-4 py-1.5 text-xs font-medium bg-slate-50 text-slate-900 rounded-full border border-slate-200/60 focus:outline-none focus:border-[#0084ff] transition-all"
        />
      </div>

      {/* Status Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
        {statusPills.map((s) => {
          const isActive = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#ff7a00] text-white shadow-xs'
                  : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Dropdown Filters & View Mode */}
      <div className="flex items-center gap-2">
        {/* City Filter */}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-3 py-1.5 text-xs font-bold bg-white text-slate-700 rounded-full border border-slate-200 shadow-xs focus:outline-none cursor-pointer"
        >
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Sort Filter */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-1.5 text-xs font-bold bg-white text-slate-700 rounded-full border border-slate-200 shadow-xs focus:outline-none cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        {/* View Toggle Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200/60 shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="List View"
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
