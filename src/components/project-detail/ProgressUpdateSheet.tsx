import React, { useEffect, useRef, useState } from 'react';
import { Project, Milestone, IssueCategory, ProgressUpdate } from '../../types';
import { useProjectContext } from '../../context/ProjectContext';
import {
  X,
  Send,
  Paperclip,
  Flag,
  Lock,
  AlertTriangle,
  Clock3,
} from 'lucide-react';

interface ProgressUpdateSheetProps {
  project: Project;
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
}

const issueCategories: IssueCategory[] = [
  'Material Delay',
  'Labor Shortage',
  'Design Clarification',
  'Weather Impact',
  'Safety Flag',
  'Quality Defect',
];

/**
 * "Progress Update" bottom sheet for milestone site logs with
 * attachment, issue flagging and internal-note toggles.
 * Developer Help: Uses ProgressUpdate interface with Indian locale formatting.
 */
export const ProgressUpdateSheet: React.FC<ProgressUpdateSheetProps> = ({
  project,
  milestone,
  isOpen,
  onClose,
}) => {
  const { addProgressUpdate } = useProjectContext();

  const [message, setMessage] = useState('');
  const [flaggedIssue, setFlaggedIssue] = useState<IssueCategory | null>(null);
  const [isInternal, setIsInternal] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !milestone) return null;

  const updates: ProgressUpdate[] = milestone.progressUpdates || [];

  const reset = () => {
    setMessage('');
    setFlaggedIssue(null);
    setIsInternal(false);
    setAttachmentName(null);
  };

  const handleSubmit = () => {
    if (!message.trim() && !flaggedIssue) return;
    addProgressUpdate(project.id, milestone.id, {
      milestoneId: milestone.id,
      author: 'Site Engineer',
      authorRole: 'Site Operations',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      notes: message.trim(),
      progressPercentage: milestone.completionPercentage,
      flaggedIssue: flaggedIssue
        ? {
            category: flaggedIssue,
            severity: 'Medium',
            description: message.trim() || 'Site flag reported',
          }
        : undefined,
      attachments: attachmentName ? [attachmentName] : [],
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fadeIn p-0 sm:p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
            Progress Update — <span className="uppercase">{milestone.title}</span>
          </h3>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-4">
          {/* Composer Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3 bg-slate-50/60 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
              <Send className="w-3.5 h-3.5 text-indigo-500" />
              <span>Post Progress Update</span>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe what was completed today or report site updates..."
              rows={3}
              className="w-full p-3 text-xs font-medium bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950 resize-none transition-all"
            />

            {/* Flagged Issue Details */}
            {flaggedIssue !== null && (
              <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 p-3 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Flagged Site Issue Details
                  </span>
                  <button
                    onClick={() => setFlaggedIssue(null)}
                    className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    Clear Flag
                  </button>
                </div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Category
                </label>
                <select
                  value={flaggedIssue}
                  onChange={(e) => setFlaggedIssue(e.target.value as IssueCategory)}
                  className="w-full py-2 px-3 text-xs font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {issueCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Pills + Submit */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => setAttachmentName(e.target.files?.[0]?.name || null)}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                    attachmentName
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                      : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                  title={attachmentName || 'Attach a file'}
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>{attachmentName ? 'Attached' : 'Attach'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFlaggedIssue(flaggedIssue ? null : 'Material Delay')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                    flaggedIssue
                      ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                      : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flaggedIssue ? 'fill-amber-500 text-amber-600' : ''}`} />
                  <span>{flaggedIssue ? 'Issue Flagged' : 'Flag Issue'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsInternal(!isInternal)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                    isInternal
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                      : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Internal</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!message.trim() && !flaggedIssue}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold bg-indigo-500 text-white hover:bg-indigo-600 shadow-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Clock3 className="w-3 h-3" />
              <span>Recent Site Log Updates ({updates.length})</span>
            </div>

            {updates.length === 0 ? (
              <div className="p-5 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
                <p className="text-[11px] font-medium text-slate-400">
                  No updates posted yet. Use the box above to submit a progress log.
                </p>
              </div>
            ) : (
              updates.map((u: ProgressUpdate) => (
                <div
                  key={u.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-1.5"
                >
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                    {u.notes}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold text-slate-400">
                    <span className="font-mono">{u.date}</span>
                    {u.flaggedIssue && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        ⚑ {u.flaggedIssue.category}
                      </span>
                    )}
                    {u.attachments && u.attachments.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 truncate max-w-[140px]">
                        📎 {u.attachments[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
