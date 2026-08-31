import React from 'react';
import { Project } from '../../types';
import { HardHat, ShieldCheck, Thermometer, Calendar, Award, CheckCircle2 } from 'lucide-react';

interface TabSiteAuditLogsProps {
  project: Project;
}

/**
 * Tab component for Real-Time Site Audits & Daily Inspection Logs
 * Indian Construction Site Operations Context (IS Standards & Zero Incident Records).
 */
export const TabSiteAuditLogs: React.FC<TabSiteAuditLogsProps> = ({ project }) => {
  const siteLogs = [
    {
      id: 'log-101',
      date: '29 Aug 2026',
      time: '08:30 AM',
      engineer: 'Er. Rajesh Gowda',
      role: 'Project Operations Manager',
      category: 'Concrete Quality',
      title: 'Tower A Core Raft C50 Pouring Audit',
      summary: '420 cu.m of ready-mix concrete poured. Slump test verified 120mm. Temperature of mix: 24°C.',
      status: 'Passed Quality Test',
      weather: '28°C · Clear Sky',
      verifiedBy: 'Suresh Kumar (QA Auditor)',
    },
    {
      id: 'log-102',
      date: '28 Aug 2026',
      time: '04:15 PM',
      engineer: 'Ar. Sanjay Rao',
      role: 'BIM Lead & Architect',
      category: 'Structural Steel Alignment',
      title: 'FE 550D Rebar Anchorage Verification',
      summary: 'Inspected anchor bolts & column rebar verticality on Level 3. Laser survey tolerance strictly < 2mm.',
      status: 'Approved for Casting',
      weather: '30°C · Sunny',
      verifiedBy: 'Suresh Kumar (QA Auditor)',
    },
    {
      id: 'log-103',
      date: '26 Aug 2026',
      time: '11:00 AM',
      engineer: 'Suresh Kumar',
      role: 'Safety & Quality Auditor',
      category: 'EHS & Safety Audit',
      title: 'Weekly EHS Safety & Perimeter Protection Check',
      summary: 'Scaffolding safety net, worker PPE harnesses, and sub-grade electrical grounding verified 100%.',
      status: 'Zero Safety Violation',
      weather: '29°C · Overcast',
      verifiedBy: 'Er. Rajesh Gowda',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Site Health Metrics Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Zero Incident Counter */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl space-y-2 shadow-lg shadow-emerald-600/20">
          <div className="flex items-center justify-between opacity-80">
            <span className="text-xs font-black uppercase tracking-wider">Safety Milestone</span>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black">
            412 Days
          </div>
          <p className="text-xs font-medium opacity-90">
            Zero Accident Record Maintained
          </p>
        </div>

        {/* Concrete Cube Strength */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Concrete Compressive Strength</span>
            <Award className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            52.4 N/mm²
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            28-Day Cube Test (Exceeds C50 Spec)
          </p>
        </div>

        {/* Current Site Weather */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Site Weather & Environment</span>
            <Thermometer className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            29°C · Optimal
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            {project.location}
          </p>
        </div>
      </div>

      {/* Daily Audit Log Feed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <HardHat className="w-5 h-5 text-blue-600" />
            Daily Site Engineer Logs & Quality Audits
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            Live Field Stream
          </span>
        </div>

        <div className="space-y-4">
          {siteLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xs shrink-0">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {log.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      {log.engineer} · {log.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {log.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {log.date} ({log.time})
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {log.summary}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-1">
                <span>Verified by: {log.verifiedBy}</span>
                <span>Environment: {log.weather}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
