import React from 'react';
import { CalendarDays, Plus, ExternalLink, Clock3 } from 'lucide-react';

/**
 * Related Activities card with empty-state CTA matching the overview reference.
 */
export const RelatedActivitiesCard: React.FC = () => {
  return (
    <div className="card-v2 p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Related Activities
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-black">
            0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Event</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">
            <span>Calendar</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="p-8 sm:p-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-400 flex items-center justify-center">
          <Clock3 className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
          No events scheduled for this project
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Schedule site visits, architectural reviews, material deliveries, or client
          walk-throughs to stay on track.
        </p>
        <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 transition-colors cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Schedule First Event</span>
        </button>
      </div>
    </div>
  );
};
