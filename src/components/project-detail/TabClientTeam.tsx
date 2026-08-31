import React from 'react';
import { Project } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  FileText, 
  Clock, 
  UserPlus, 
  ShieldCheck 
} from 'lucide-react';

interface TabClientTeamProps {
  project: Project;
  onOpenAddMemberModal: () => void;
}

/**
 * Client Contact Details & Assigned Team Tab View matching client-and-team.png
 */
export const TabClientTeam: React.FC<TabClientTeamProps> = ({ project, onOpenAddMemberModal }) => {
  const { clientDetails, teamMembers } = project;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT COLUMN: CLIENT CONTACT DETAILS (5 cols on lg) */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-black text-slate-900 dark:text-white">
            Client Contact Details
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full">
            Verified Owner
          </span>
        </div>

        {/* Client Header & Avatar */}
        <div className="flex items-center gap-4">
          <Avatar
            initials={clientDetails.avatarInitials || 'CL'}
            size="xl"
            variant="blue"
          />
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {clientDetails.name}
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              {clientDetails.role}
            </p>
          </div>
        </div>

        {/* Call & WhatsApp CTAs */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${clientDetails.phone}`}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Client</span>
          </a>

          <a
            href={`https://wa.me/${clientDetails.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Contact Field Rows */}
        <div className="space-y-3 pt-2 text-xs font-medium border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Official Email</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">{clientDetails.email}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Primary Phone</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">{clientDetails.phone}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">WhatsApp Number</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">{clientDetails.whatsapp}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Billing Address</span>
              <span className="font-semibold text-slate-900 dark:text-white">{clientDetails.billingAddress}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">GSTIN</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-white">{clientDetails.gstin}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">PAN Card</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-white">{clientDetails.pan}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Clock className="w-4 h-4 text-purple-500 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Preferred Hours</span>
              <span className="font-semibold text-slate-900 dark:text-white">{clientDetails.preferredHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: ASSIGNED TEAM (7 cols on lg) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Assigned Team
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-extrabold text-xs">
              {teamMembers.length} Members
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<UserPlus className="w-3.5 h-3.5" />}
            onClick={onOpenAddMemberModal}
          >
            Add Member
          </Button>
        </div>

        {/* Team Member Cards */}
        <div className="space-y-4">
          {teamMembers.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No team members assigned.</p>
          ) : (
            teamMembers.map((m) => (
              <div
                key={m.id}
                className="p-5 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar
                    initials={m.avatarInitials}
                    size="lg"
                    variant={m.badge === 'Site Lead' ? 'orange' : m.badge === 'Design Lead' ? 'purple' : 'emerald'}
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {m.name}
                      </h4>
                      <Badge
                        variant={m.badge === 'Site Lead' ? 'amber' : m.badge === 'Design Lead' ? 'purple' : 'emerald'}
                        size="sm"
                      >
                        {m.badge}
                      </Badge>
                    </div>

                    <p className="text-xs font-semibold text-slate-500">
                      {m.role}
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-xs text-slate-600 dark:text-slate-400">
                      <a href={`mailto:${m.email}`} className="flex items-center gap-1 hover:text-blue-600">
                        <Mail className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-mono">{m.email}</span>
                      </a>
                      <a href={`tel:${m.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-mono">{m.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
