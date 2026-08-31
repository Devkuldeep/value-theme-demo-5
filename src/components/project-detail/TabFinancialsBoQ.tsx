import React from 'react';
import { Project } from '../../types';
import { formatINR, formatCr } from '../../utils/formatters';
import { Receipt, TrendingUp, AlertTriangle, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface TabFinancialsBoQProps {
  project: Project;
}

/**
 * Tab component for Financials & Bill of Quantities (BoQ) Breakdown
 * Structured according to Indian commercial construction financial standards.
 */
export const TabFinancialsBoQ: React.FC<TabFinancialsBoQProps> = ({ project }) => {
  // Convert numbers for Indian Crores calculation
  const totalBudgetCr = project.totalBudget / 10000000;
  const spentBudgetCr = project.spentBudget / 10000000;
  const remainingBudgetCr = Math.max(0, totalBudgetCr - spentBudgetCr);
  const gstLiabilityCr = (spentBudgetCr * 0.18);

  const boqCategories = [
    {
      id: 'boq-1',
      code: 'CIV-SUB-01',
      category: 'Civil & Substructure (C50 RCC Mix)',
      allocated: totalBudgetCr * 0.40,
      spent: spentBudgetCr * 0.45,
      vendor: 'L&T Ready Mix Concrete',
      status: 'On Track',
      gstRate: '18%',
    },
    {
      id: 'boq-2',
      code: 'STL-REBAR-02',
      category: 'Structural Steel (FE 550D TMT Rebar)',
      allocated: totalBudgetCr * 0.25,
      spent: spentBudgetCr * 0.30,
      vendor: 'Tata Tiscon Steels Ltd',
      status: 'On Track',
      gstRate: '18%',
    },
    {
      id: 'boq-3',
      code: 'MEP-HVAC-03',
      category: 'MEP, Plumbing & Electrical Conduits',
      allocated: totalBudgetCr * 0.15,
      spent: spentBudgetCr * 0.15,
      vendor: 'Voltas Engineering',
      status: 'Procurement Stage',
      gstRate: '18%',
    },
    {
      id: 'boq-4',
      code: 'FCD-GLZ-04',
      category: 'Structural Glass Facade & Glazing',
      allocated: totalBudgetCr * 0.12,
      spent: spentBudgetCr * 0.08,
      vendor: 'Saint-Gobain Glass India',
      status: 'Upcoming',
      gstRate: '18%',
    },
    {
      id: 'boq-5',
      code: 'LIA-RERA-05',
      category: 'Statutory Liasoning & BBMP/RERA Fees',
      allocated: totalBudgetCr * 0.08,
      spent: spentBudgetCr * 0.02,
      vendor: 'Chartered CE Consultants',
      status: 'Completed',
      gstRate: '18%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Summary Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Sanctioned Budget</span>
            <Receipt className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {formatINR(project.totalBudget)}
          </div>
          <p className="text-[11px] font-semibold text-slate-500">
            {formatCr(totalBudgetCr)} Total Allocated
          </p>
        </div>

        {/* Total Spent Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Spent To Date</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {formatINR(project.spentBudget)}
          </div>
          <p className="text-[11px] font-semibold text-slate-500">
            {totalBudgetCr > 0 ? ((spentBudgetCr / totalBudgetCr) * 100).toFixed(1) : 0}% Utilized
          </p>
        </div>

        {/* Remaining Capital Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Remaining Escrow</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {formatCr(remainingBudgetCr)}
          </div>
          <p className="text-[11px] font-semibold text-slate-500">
            RERA Escrow Locked
          </p>
        </div>

        {/* Estimated GST Tax Liability Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">GST Liability (18%)</span>
            <FileSpreadsheet className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400">
            {formatCr(gstLiabilityCr)}
          </div>
          <p className="text-[11px] font-semibold text-slate-500">
            Input Tax Credit Eligible
          </p>
        </div>
      </div>

      {/* Bill of Quantities (BoQ) Ledger Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              Bill of Quantities (BoQ) & Material Payout Ledger
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Indian Standard IS-456 Itemized Allocation & Vendor Accounts
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>RERA Phase Audit Compliant</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">BoQ Code</th>
                <th className="py-3 px-4">Category & Specs</th>
                <th className="py-3 px-4">Primary Contractor</th>
                <th className="py-3 px-4">Allocated (₹ Cr)</th>
                <th className="py-3 px-4">Utilized (₹ Cr)</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
              {boqCategories.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {item.code}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {item.vendor}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {formatCr(item.allocated)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCr(item.spent)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
