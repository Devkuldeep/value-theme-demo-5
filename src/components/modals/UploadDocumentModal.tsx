import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useProjectContext } from '../../context/ProjectContext';
import { DocumentType, DocumentCategory } from '../../types';
import { Upload } from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const { addDocumentToProject } = useProjectContext();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState<DocumentType>('PDF Document');
  const [category, setCategory] = useState<DocumentCategory>('Architectural');
  const [author, setAuthor] = useState('Ananya Verma');
  const [authorRole, setAuthorRole] = useState('Lead Architect');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;

    addDocumentToProject(projectId, {
      code,
      title,
      author,
      authorRole,
      date: new Date().toISOString().split('T')[0],
      type,
      category,
      version: 'v1.0',
      description: description || 'Uploaded project drawing document file.',
      versionCount: 1,
      history: [
        {
          version: 'v1.0',
          date: new Date().toISOString().split('T')[0],
          author,
          notes: 'Initial document upload',
        },
      ],
    });

    onClose();
    setTitle('');
    setCode('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Project Document" subtitle="Add PDF blueprints, NOC certificates, or drone photos">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Document Code / Filename"
          placeholder="e.g. BLR-APX-ARC-L32.pdf"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <Input
          label="Document Title"
          placeholder="e.g. Superstructure Level 32 Structural & Slab PDF"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Document Format Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as DocumentType)}
              className="w-full py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <option value="PDF Document">PDF Document</option>
              <option value="Image File">Image File</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DocumentCategory)}
              className="w-full py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <option value="Architectural">Architectural</option>
              <option value="Structural">Structural</option>
              <option value="Civil">Civil</option>
              <option value="Site Photos">Site Photos</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Author / Engineer Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            label="Author Role"
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
          />
        </div>

        <Input
          label="Document Description / Notes"
          placeholder="e.g. Approved for C50 concrete mix pouring."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center space-y-1">
          <Upload className="w-5 h-5 text-blue-500 mx-auto" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Drag & Drop PDF or Image file here
          </span>
          <span className="text-[10px] text-slate-400">Max file size 50MB</span>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Upload Document
          </Button>
        </div>
      </form>
    </Modal>
  );
};
