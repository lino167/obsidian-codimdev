import { X, Plus, Upload, Loader2, Eye, CheckCircle2, Calendar, DollarSign, Tag, Github, Globe } from 'lucide-react';

interface ProjectFormData {
  title?: string;
  slug?: string;
  client_name?: string;
  cover_image?: string;
  tech_stack?: string[];
  status?: string;
  budget?: number;
  deadline?: string;
  repo_url?: string;
  live_url?: string;
  is_public?: boolean;
  is_featured?: boolean;
}

interface NewProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
  currentTag: string;
  setCurrentTag: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onCoverUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

export default function NewProjectDrawer({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  currentTag,
  setCurrentTag,
  onAddTag,
  onRemoveTag,
  onCoverUpload,
  uploading
}: NewProjectDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-2xl w-full flex">
        <div className="relative w-full bg-[#0A0A0A] border-l-4 border-[#BA0C10] shadow-2xl overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-white/10 px-8 py-6">
            <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-wider">
              INITIALIZE NEW PROTOCOL
            </h2>
            <p className="text-white/40 text-xs font-mono mt-1 uppercase tracking-wide">
              Project Wizard // Registration System
            </p>
          </div>

          {/* Form Sections */}
          <div className="px-8 py-6 space-y-8 pb-32">
            {/* SECTION 1: Core Identity */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-[#00FFFF] uppercase tracking-wider border-b border-[#00FFFF]/20 pb-2">
                01 // CORE IDENTITY
              </h3>

              {/* Project Title */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase">Project Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., KRAFLO System"
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 font-mono text-lg focus:border-[#00FFFF] focus:outline-none transition-colors"
                />
              </div>

              {/* Client Name */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase">Client Name</label>
                <input
                  type="text"
                  value={formData.client_name || ''}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g., Industrial Solutions Inc."
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 font-mono text-sm focus:border-[#00FFFF] focus:outline-none transition-colors"
                />
              </div>

              {/* Slug (Auto-generated) */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase">Slug / URL Path (Auto-generated)</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  readOnly
                  className="w-full bg-black/50 border border-white/10 text-[#00FFFF] px-4 py-3 font-mono text-sm cursor-not-allowed opacity-70"
                />
                <p className="text-white/30 text-[10px] font-mono">
                  codim.dev/work/{formData.slug || 'slug-here'}
                </p>
              </div>
            </div>

            {/* SECTION 2: Visual Assets */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-[#00FFFF] uppercase tracking-wider border-b border-[#00FFFF]/20 pb-2">
                02 // VISUAL ASSETS
              </h3>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase">Cover Image</label>
                {formData.cover_image ? (
                  <div className="relative">
                    <img
                      src={formData.cover_image}
                      alt="Cover preview"
                      className="w-full h-48 object-cover border border-white/20"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, cover_image: '' })}
                      className="absolute top-2 right-2 bg-[#BA0C10] hover:bg-[#BA0C10]/80 text-white p-2 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="block">
                    <div className="border-2 border-dashed border-white/20 hover:border-[#00FFFF]/50 bg-black/30 p-12 text-center cursor-pointer transition-colors">
                      <Upload className="w-12 h-12 text-white/20 mx-auto mb-3" />
                      <p className="text-white/50 font-mono text-xs uppercase tracking-wider">
                        UPLOAD COVER SEQUENCES
                      </p>
                      <p className="text-white/30 font-mono text-[10px] mt-1">
                        Click to browse • 16:9 recommended
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onCoverUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                )}
                {uploading && (
                  <div className="flex items-center gap-2 text-[#00FFFF] text-xs font-mono">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading sequences...
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Tech Stack
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTag())}
                    placeholder="Type and press Enter (e.g., React)"
                    className="flex-1 bg-black border border-white/20 text-white px-4 py-2 font-mono text-sm focus:border-[#00FFFF] focus:outline-none transition-colors"
                  />
                  <button
                    onClick={onAddTag}
                    className="bg-[#00FFFF]/20 hover:bg-[#00FFFF]/30 text-[#00FFFF] px-4 py-2 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tech_stack?.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF]/30 text-xs font-mono px-3 py-1.5 flex items-center gap-2"
                    >
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-[#BA0C10] transition-colors"
                        onClick={() => onRemoveTag(tag)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 3: Operational Data */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-[#00FFFF] uppercase tracking-wider border-b border-[#00FFFF]/20 pb-2">
                03 // OPERATIONAL DATA (Private)
              </h3>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase">Project Status</label>
                <select
                  value={formData.status || 'planning'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 font-mono text-sm focus:border-[#00FFFF] focus:outline-none transition-colors"
                >
                  <option value="planning">Planning</option>
                  <option value="development">Development</option>
                  <option value="live">Live</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase flex items-center gap-2">
                  <DollarSign className="w-3 h-3" /> Budget (R$)
                </label>
                <input
                  type="number"
                  value={formData.budget || ''}
                  onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  className="w-full bg-black border border-white/20 text-[#00FF94] px-4 py-3 font-mono text-lg font-bold focus:border-[#00FFFF] focus:outline-none transition-colors"
                />
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 font-mono text-sm focus:border-[#00FFFF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* SECTION 4: Portfolio Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-[#00FFFF] uppercase tracking-wider border-b border-[#00FFFF]/20 pb-2">
                04 // PORTFOLIO SETTINGS (Public)
              </h3>

              {/* Repository URL */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase flex items-center gap-2">
                  <Github className="w-3 h-3" /> Repository URL
                </label>
                <input
                  type="url"
                  value={formData.repo_url || ''}
                  onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                  placeholder="https://github.com/username/project"
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 font-mono text-sm focus:border-[#00FFFF] focus:outline-none transition-colors"
                />
              </div>

              {/* Live URL */}
              <div className="space-y-2">
                <label className="text-white/70 font-mono text-xs uppercase flex items-center gap-2">
                  <Globe className="w-3 h-3" /> Live URL
                </label>
                <input
                  type="url"
                  value={formData.live_url || ''}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://project.live"
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 font-mono text-sm focus:border-[#00FFFF] focus:outline-none transition-colors"
                />
              </div>

              {/* Toggles */}
              <div className="bg-black/30 border border-white/10 p-4 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-white/70 font-mono text-xs flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Make Publicly Visible?
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.is_public || false}
                    onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                    className="w-5 h-5 accent-[#00FF94]"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-white/70 font-mono text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Feature on Homepage?
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.is_featured || false}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-5 h-5 accent-[#00FF94]"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions (Fixed) */}
          <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white/10 px-8 py-6 space-y-3">
            <button
              onClick={onSubmit}
              className="w-full bg-[#BA0C10] hover:bg-[#BA0C10]/80 text-white py-4 font-mono font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              INITIATE PROJECT
            </button>
            <button
              onClick={onClose}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 font-mono font-bold text-xs uppercase tracking-wider transition-colors"
            >
              ABORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
