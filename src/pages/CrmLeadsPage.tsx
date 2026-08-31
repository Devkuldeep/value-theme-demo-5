import React, { useState } from 'react';
import { Users, Phone, MessageSquare, Search, Filter, Plus, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  city: string;
  unitType: string;
  projectInterest: string;
  budget: number;
  stage: 'New Lead' | 'Site Visit Scheduled' | 'Token Amount Paid' | 'Agreement Signed' | 'Closed';
  assignedAgent: string;
  date: string;
}

export const CrmLeadsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');

  const leads: LeadItem[] = [
    {
      id: 'lead-1',
      name: 'Vikram & Radhika Bajaj',
      phone: '+91 98450 12345',
      city: 'Bengaluru',
      unitType: '3BHK Penthouse',
      projectInterest: 'Whitefield Commercial Hub',
      budget: 35000000,
      stage: 'Site Visit Scheduled',
      assignedAgent: 'Rajesh Sharma',
      date: '28 Aug 2026',
    },
    {
      id: 'lead-2',
      name: 'Dr. Alok Verma',
      phone: '+91 97110 98765',
      city: 'Hyderabad',
      unitType: 'Commercial Floor (4500 sq.ft)',
      projectInterest: 'HITEC City Commercial Block',
      budget: 120000000,
      stage: 'Token Amount Paid',
      assignedAgent: 'Priya Sundaram',
      date: '29 Aug 2026',
    },
    {
      id: 'lead-3',
      name: 'Mehta Logistics India Pvt Ltd',
      phone: '+91 98220 44332',
      city: 'Pune',
      unitType: 'Duplex Office Suite',
      projectInterest: 'Kothrud Twin Villas',
      budget: 68000000,
      stage: 'Agreement Signed',
      assignedAgent: 'Sanjay Kulkarni',
      date: '27 Aug 2026',
    },
    {
      id: 'lead-4',
      name: 'Karthik & Ananya Iyer',
      phone: '+91 98400 98765',
      city: 'Chennai',
      unitType: 'Luxury Beach Villa',
      projectInterest: 'ECR Beachside Villa',
      budget: 45000000,
      stage: 'Closed',
      assignedAgent: 'Ananya Verma',
      date: '15 Aug 2026',
    },
    {
      id: 'lead-5',
      name: 'Siddharth Roy',
      phone: '+91 99001 88776',
      city: 'Bengaluru',
      unitType: '4BHK Garden Villa',
      projectInterest: 'Mahadevapura Villa (Phase 2)',
      budget: 32000000,
      stage: 'New Lead',
      assignedAgent: 'Rajesh Sharma',
      date: '29 Aug 2026',
    },
  ];

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.projectInterest.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === 'All' ? true : l.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            CRM Client Leads & Booking Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Indian High-Net-Worth Purchaser & Commercial Unit Allocations
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shrink-0 shadow-md shadow-blue-600/20">
          <Plus className="w-4 h-4" />
          <span>Add New Inquiry</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by client name, city..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
          >
            <option value="All">All Pipeline Stages</option>
            <option value="New Lead">New Lead</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Token Amount Paid">Token Amount Paid</option>
            <option value="Agreement Signed">Agreement Signed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-4">Purchaser Name</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Unit Specification</th>
              <th className="py-3 px-4">Project Workspace</th>
              <th className="py-3 px-4">Budget</th>
              <th className="py-3 px-4">Pipeline Stage</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                  {lead.name}
                  <div className="text-[10px] text-slate-400 font-normal">{lead.city}</div>
                </td>
                <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{lead.phone}</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200">
                  {lead.unitType}
                </td>
                <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">
                  {lead.projectInterest}
                </td>
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                  {formatINR(lead.budget)}
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {lead.stage}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer" title="Direct WhatsApp">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer" title="Call Lead">
                      <Phone className="w-4 h-4" />
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
