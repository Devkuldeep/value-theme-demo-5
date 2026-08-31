import React from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { formatINR, formatCr } from '../utils/formatters';
import { Receipt } from 'lucide-react';

export const FinancialsLedgerPage: React.FC = () => {
  const { projects } = useProjectContext();

  const totalSanctioned = projects.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spentBudget, 0);
  const totalEscrow = Math.max(0, totalSanctioned - totalSpent);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-blue-600" />
            Master Portfolio Financial Ledger & BoQ Allocations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Indian Statutory Tax Accounts, GST Input Credit & RERA Escrow Audits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sanctioned Portfolio</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatINR(totalSanctioned)}
          </div>
          <p className="text-xs font-semibold text-slate-500">{formatCr(totalSanctioned / 10000000)} Capital</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative Outflow</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {formatINR(totalSpent)}
          </div>
          <p className="text-xs font-semibold text-slate-500">{formatCr(totalSpent / 10000000)} Utilized</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">RERA Locked Escrow</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCr(totalEscrow / 10000000)}
          </div>
          <p className="text-xs font-semibold text-slate-500">Sub-Account Guarantee</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 overflow-x-auto">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">
          Project-wise Financial Breakdowns (INR Crores)
        </h3>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-4">Workspace</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Sanctioned (₹ Cr)</th>
              <th className="py-3 px-4">Spent (₹ Cr)</th>
              <th className="py-3 px-4">GST (18% ITC)</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
            {projects.map((p) => {
              const sanctionedCr = p.totalBudget / 10000000;
              const spentCr = p.spentBudget / 10000000;
              const gstCr = spentCr * 0.18;

              return (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                    {p.name}
                    <div className="text-[10px] text-slate-400 font-mono">{p.code}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{p.location}</td>
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{formatCr(sanctionedCr)}</td>
                  <td className="py-4 px-4 font-bold text-emerald-600 dark:text-emerald-400">{formatCr(spentCr)}</td>
                  <td className="py-4 px-4 font-bold text-purple-600 dark:text-purple-400">{formatCr(gstCr)}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {p.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
