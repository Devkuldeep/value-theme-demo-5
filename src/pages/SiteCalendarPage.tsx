import React from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, HardHat, ChevronLeft, ChevronRight } from 'lucide-react';

export const SiteCalendarPage: React.FC = () => {
  const events = [
    {
      id: 'evt-1',
      date: '02 Sep 2026',
      time: '09:00 AM IST',
      title: 'Tower A Substructure Concrete Pour (C50 Mix)',
      project: 'Whitefield Commercial Hub',
      type: 'Pouring Schedule',
      badge: 'High Priority',
    },
    {
      id: 'evt-2',
      date: '05 Sep 2026',
      time: '11:30 AM IST',
      title: 'Chartered CE Structural Safety & Rebar Audit',
      project: 'HITEC City Commercial Block',
      type: 'Quality Inspection',
      badge: 'Audit Linked',
    },
    {
      id: 'evt-3',
      date: '10 Sep 2026',
      time: '02:00 PM IST',
      title: 'TS RERA Quarter 3 Escrow Milestone Verification',
      project: 'E2E Test Commercial Tower',
      type: 'Regulatory Compliance',
      badge: 'RERA Statutory',
    },
    {
      id: 'evt-4',
      date: '15 Sep 2026',
      time: '10:00 AM IST',
      title: 'Facade Double-Glazing Sample Walkthrough with Client',
      project: 'ECR Beachside Villa',
      type: 'Client Inspection',
      badge: 'Milestone Sign-off',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
            Master Construction Site Schedule & RERA Audit Calendar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Site Mobilization, Concrete Pourings, Safety Inspection Milestones
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl">
          <button className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-slate-900 dark:text-white px-2">September 2026</span>
          <button className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Schedule Feed Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">
          Upcoming Scheduled Site Events & Audits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {evt.badge}
                </span>
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {evt.date} · {evt.time}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {evt.title}
                </h4>
                <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {evt.project}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                <HardHat className="w-3.5 h-3.5 text-slate-400" />
                <span>{evt.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
