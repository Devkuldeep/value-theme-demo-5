import React, { useState } from 'react';

import { FileText, Download, Search, Filter, HardHat, FileSpreadsheet, Eye } from 'lucide-react';
import { useProjectContext } from '../context/ProjectContext';
export const CentralDocumentVaultPage: React.FC = () => {
  const { projects } = useProjectContext();
  const [search, setSearch] = useState('');

  // Flatten all documents from all projects into central vault
  const allDocs = projects.flatMap((p) =>
    p.documents.map((d) => ({
      ...d,
      projectName: p.name,
      projectCode: p.code,
    }))
  );

  const filteredDocs = allDocs.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.projectName.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Central Blueprint & Document Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Master Architectural CAD Drawings, Structural NOCs & RERA Approvals
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blueprints by title, code or project..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-4">Doc Code</th>
              <th className="py-3 px-4">Drawing & Title</th>
              <th className="py-3 px-4">Associated Workspace</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Version</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  {doc.code}
                </td>
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                  {doc.title}
                  <div className="text-[10px] text-slate-400 font-normal">{doc.description}</div>
                </td>
                <td className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                  {doc.projectName} ({doc.projectCode})
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {doc.category}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  v{doc.version}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer" title="Preview Drawing">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer" title="Download Document">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
