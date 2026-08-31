import React, { useState } from 'react';
import { Project, ProjectDocument } from '../../types';
import { 
  FileText, 
  Upload, 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  History, 
  Image as ImageIcon,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface TabDocumentsBlueprintsProps {
  project: Project;
  onOpenUploadModal: () => void;
}

/**
 * Documents & Blueprints Tab View matching document-blueprint.png reference image
 */
export const TabDocumentsBlueprints: React.FC<TabDocumentsBlueprintsProps> = ({
  project,
  onOpenUploadModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<'All' | 'PDF Docs' | 'Images'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedDocHistory, setSelectedDocHistory] = useState<ProjectDocument | null>(null);

  const categories = ['All', 'Architectural', 'Structural', 'Civil', 'Site Photos'];

  const filteredDocs = project.documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat =
      formatFilter === 'All'
        ? true
        : formatFilter === 'PDF Docs'
        ? doc.type === 'PDF Document'
        : doc.type === 'Image File';
    const matchesCategory =
      categoryFilter === 'All' ? true : doc.category === categoryFilter;

    return matchesSearch && matchesFormat && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Project Documents & Media
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage project PDF drawings, NOC certificates, and site images with version control.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Upload className="w-4 h-4" />}
          onClick={onOpenUploadModal}
        >
          Upload PDF / Image
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents or code..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
          />
        </div>

        {/* Format Filters */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          {(['All', 'PDF Docs', 'Images'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormatFilter(f)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                formatFilter === f
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upload Dropzone Card */}
        <div
          onClick={onOpenUploadModal}
          className="p-6 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[280px] group"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Upload Document or Photo
          </h3>
          <p className="text-xs text-slate-400 mt-1">Supports PDF & Image files only</p>
        </div>

        {/* Document Cards */}
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant={doc.type === 'PDF Document' ? 'red' : 'blue'}
                  size="sm"
                  icon={doc.type === 'PDF Document' ? <FileText className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                >
                  {doc.type}
                </Badge>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {doc.version}
                  </span>
                  <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Code & Title */}
              <div>
                <div className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{doc.code}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 leading-snug line-clamp-2">
                  {doc.title}
                </h3>
              </div>

              {/* Author & Date */}
              <p className="text-[11px] font-medium text-slate-400">
                {doc.author} ({doc.authorRole}) • {doc.date}
              </p>

              {/* Description Box */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {doc.description}
              </div>
            </div>

            {/* Footer Links */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <button
                onClick={() => setSelectedDocHistory(doc)}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <History className="w-3.5 h-3.5 text-blue-500" />
                <span>{doc.versionCount} Versions</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenUploadModal}
                  className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Version</span>
                </button>

                <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document History Modal */}
      {selectedDocHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="surface-card rounded-2xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Version History — {selectedDocHistory.code}
            </h3>
            <div className="space-y-2">
              {(selectedDocHistory.history || []).map((h, i) => (
                <div key={i} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="font-mono text-blue-600">{h.version}</span>
                    <span className="text-slate-400">{h.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{h.notes}</p>
                  <p className="text-[10px] text-slate-400">By {h.author}</p>
                </div>
              ))}
            </div>
            <Button fullWidth variant="secondary" onClick={() => setSelectedDocHistory(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
