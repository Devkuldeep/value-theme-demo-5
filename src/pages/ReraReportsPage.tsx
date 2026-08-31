import React from 'react';
import { BarChart3, ShieldCheck, FileCheck, Award, AlertTriangle, Download } from 'lucide-react';

export const ReraReportsPage: React.FC = () => {
  const reports = [
    {
      id: 'rep-1',
      title: 'Quarter 3 RERA Escrow & Progress Filing',
      authority: 'KA-RERA (Karnataka Real Estate Regulatory Authority)',
      date: '25 Aug 2026',
      status: 'Submitted & Approved',
      fileSize: '4.2 MB',
    },
    {
      id: 'rep-2',
      title: 'Quarter 3 Telangana RERA Compliance Certificate',
      authority: 'TS-RERA (Telangana RERA)',
      date: '20 Aug 2026',
      status: 'Submitted & Approved',
      fileSize: '3.8 MB',
    },
    {
      id: 'rep-3',
      title: 'Annual Structural Safety & EHS Audit Audit Log',
      authority: 'National Safety Council India (NSC)',
      date: '15 Aug 2026',
      status: 'Passed Quality Test',
      fileSize: '6.1 MB',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            RERA Regulatory Compliance & Safety Quality Audits
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Statutory Filings, Architect Progress Declarations & EHS Certifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-5 rounded-2xl space-y-2 shadow-lg shadow-blue-700/20">
          <span className="text-xs font-black uppercase tracking-wider opacity-80">RERA Status</span>
          <div className="text-2xl font-black">100% Compliant</div>
          <p className="text-xs opacity-90">All 5 Projects Active & Valid</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Site Safety Index</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Zero Incident</div>
          <p className="text-xs font-semibold text-slate-500">412 Days Incident Free</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Architect Certifications</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">Form 4 Valid</div>
          <p className="text-xs font-semibold text-slate-500">Chartered CE Verified</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">
          Regulatory Submissions & Official Filings Archive
        </h3>

        <div className="space-y-3">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {rep.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {rep.authority} · Submitted {rep.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  {rep.status}
                </span>
                <button className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:border-blue-500 transition-colors cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF ({rep.fileSize})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
