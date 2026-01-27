import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Search, Filter, FolderKanban, Plus, Eye, Lock, Calendar,
  DollarSign, Edit, Trash2, Save, X, Tag, Github, Globe,
  ChevronLeft, Upload, Loader2, AlertCircle, Clock, CheckCircle2,
  ListTodo, FileText, Circle, AlertTriangle, Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { format, differenceInDays, isPast, parseISO } from 'date-fns';

// TypeScript Types
interface Project {
  id: number;
  created_at: string;
  title: string;
  slug: string | null;
  short_description: string | null;
  full_description: string | null;
  cover_image: string | null;
  gallery_images: string[] | null;
  tech_stack: string[] | null;
  live_url: string | null;
  repo_url: string | null;
  is_featured: boolean | null;
  is_public: boolean | null;
  status: string | null;
  client_name: string | null;
  budget: number | null;
  deadline: string | null;
  progress: number | null;
}

interface Task {
  id: number;
  project_id: number;
  created_at: string;
  title: string;
  status: string | null;
  priority: string | null;
  due_date: string | null;
}

type ViewMode = 'list' | 'detail';
type FilterTab = 'all' | 'planning' | 'development' | 'live' | 'maintenance' | 'archived';
type DetailTab = 'tasks' | 'case-study';

export default function ProjectsManager() {
  // State Management
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Detail View
  const [detailTab, setDetailTab] = useState<DetailTab>('tasks');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [currentTag, setCurrentTag] = useState('');
  const [uploading, setUploading] = useState(false);

  // Task Management
  const [newTaskText, setNewTaskText] = useState({ todo: '', in_progress: '', done: '' });

  // Fetch Projects
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch Tasks when project selected
  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject.id);
    }
  }, [selectedProject]);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar projetos');
      console.error(error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }

  async function fetchTasks(projectId: number) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar tarefas');
    } else {
      setTasks(data || []);
    }
  }

  // Filtered Projects
  const filteredProjects = projects.filter(p => {
    const matchesFilter = filterTab === 'all' || p.status === filterTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.client_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Open Project Detail
  function openProject(project: Project) {
    setSelectedProject(project);
    setFormData(project);
    setViewMode('detail');
    setEditMode(false);
    setDetailTab('tasks');
  }

  // Close Detail View
  function closeDetail() {
    setViewMode('list');
    setSelectedProject(null);
    setFormData({});
    setEditMode(false);
  }

  // Save Project
  async function handleSaveProject() {
    if (!selectedProject || !formData.title) {
      toast.error('Título é obrigatório');
      return;
    }

    const { error } = await supabase
      .from('projects')
      .update({
        title: formData.title,
        client_name: formData.client_name,
        budget: formData.budget,
        deadline: formData.deadline,
        progress: formData.progress,
        cover_image: formData.cover_image,
        tech_stack: formData.tech_stack,
        repo_url: formData.repo_url,
        live_url: formData.live_url,
        is_public: formData.is_public,
        is_featured: formData.is_featured,
        short_description: formData.short_description,
        full_description: formData.full_description,
        status: formData.status
      })
      .eq('id', selectedProject.id);

    if (error) {
      toast.error('Erro ao salvar');
      console.error(error);
    } else {
      toast.success('Projeto atualizado!');
      setEditMode(false);
      fetchProjects();
      setSelectedProject({ ...selectedProject, ...formData } as Project);
    }
  }

  // Delete Project
  async function handleDeleteProject() {
    if (!selectedProject || !confirm('Deletar este projeto permanentemente?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', selectedProject.id);

    if (error) {
      toast.error('Erro ao deletar');
    } else {
      toast.success('Projeto deletado');
      closeDetail();
      fetchProjects();
    }
  }

  // Image Upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `project-${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(filePath, file);

    if (uploadError) {
      toast.error('Erro no upload');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
    setFormData({ ...formData, cover_image: data.publicUrl });
    setUploading(false);
    toast.success('Imagem enviada!');
  }

  // Tech Stack Management
  function addTag() {
    if (currentTag && !formData.tech_stack?.includes(currentTag)) {
      setFormData({
        ...formData,
        tech_stack: [...(formData.tech_stack || []), currentTag]
      });
      setCurrentTag('');
    }
  }

  function removeTag(tag: string) {
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack?.filter(t => t !== tag)
    });
  }

  // Task CRUD
  async function createTask(status: string) {
    if (!selectedProject) return;
    const text = newTaskText[status as keyof typeof newTaskText];
    if (!text.trim()) return;

    const { error } = await supabase
      .from('tasks')
      .insert({
        project_id: selectedProject.id,
        title: text,
        status: status,
        priority: 'medium'
      });

    if (error) {
      toast.error('Erro ao criar tarefa');
    } else {
      setNewTaskText({ ...newTaskText, [status]: '' });
      fetchTasks(selectedProject.id);
    }
  }

  async function updateTaskStatus(taskId: number, newStatus: string) {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) {
      toast.error('Erro ao atualizar');
    } else {
      fetchTasks(selectedProject!.id);
    }
  }

  async function deleteTask(taskId: number) {
    if (!confirm('Deletar tarefa?')) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      toast.error('Erro ao deletar');
    } else {
      fetchTasks(selectedProject!.id);
    }
  }

  // Calculate deadline status
  function getDeadlineStatus(deadline: string | null) {
    if (!deadline) return null;
    const days = differenceInDays(parseISO(deadline), new Date());
    if (days < 0) return { text: `${Math.abs(days)} day${Math.abs(days) > 1 ? 's' : ''} overdue`, color: 'text-[#BA0C10]', urgent: true };
    if (days === 0) return { text: 'Due today', color: 'text-yellow-500', urgent: true };
    if (days <= 3) return { text: `Due in ${days} day${days > 1 ? 's' : ''}`, color: 'text-yellow-500', urgent: false };
    return { text: `Due in ${days} days`, color: 'text-white/50', urgent: false };
  }

  // Status pill component
  const StatusPill = ({ status }: { status: string | null }) => {
    const config = {
      planning: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', label: 'PLAN' },
      development: { bg: 'bg-blue-500/20', text: 'text-blue-500', label: 'DEV' },
      live: { bg: 'bg-green-500/20', text: 'text-green-500', label: 'LIVE' },
      maintenance: { bg: 'bg-cyan-500/20', text: 'text-cyan-500', label: 'MAINT' },
      archived: { bg: 'bg-white/10', text: 'text-white/50', label: 'ARCH' }
    };
    const style = config[status as keyof typeof config] || config.planning;
    return (
      <span className={`${style.bg} ${style.text} text-[10px] font-bold px-2 py-1 font-mono`}>
        {style.label}
      </span>
    );
  };

  // Priority pill
  const PriorityPill = ({ priority }: { priority: string | null }) => {
    const config = {
      low: { bg: 'bg-white/10', text: 'text-white/50', icon: Circle },
      medium: { bg: 'bg-blue-500/20', text: 'text-blue-500', icon: AlertCircle },
      high: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', icon: AlertTriangle },
      critical: { bg: 'bg-[#BA0C10]/20', text: 'text-[#BA0C10]', icon: Zap }
    };
    const style = config[priority as keyof typeof config] || config.medium;
    const Icon = style.icon;
    return (
      <span className={`${style.bg} ${style.text} text-[10px] font-bold px-1.5 py-0.5 flex items-center gap-1`}>
        <Icon className="w-2.5 h-2.5" />
        {priority?.toUpperCase()}
      </span>
    );
  };

  // ============ LIST VIEW: THE REGISTRY ============
  if (viewMode === 'list') {
    return (
      <div className="p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-mono text-white tracking-wider flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-[#00FFFF]" />
            THE REGISTRY
          </h1>
          <p className="text-white/60 font-mono text-sm mt-2 uppercase tracking-wide">
            Project Command Center // CMS + Manager
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#0A0A0A] border border-white/10 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'planning', 'development', 'live', 'maintenance', 'archived'] as FilterTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    filterTab === tab
                      ? 'bg-[#BA0C10] text-white'
                      : 'bg-black/50 text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'all' ? 'ALL SYSTEMS' : tab === 'development' ? 'ACTIVE DEV' : tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-white font-mono text-sm placeholder:text-white/30 focus:border-[#00FFFF] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#00FFFF] w-8 h-8" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-white/30 font-mono">
            {searchQuery ? 'No protocols found' : 'No projects in this category'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              const deadlineStatus = getDeadlineStatus(project.deadline);
              return (
                <div
                  key={project.id}
                  onClick={() => openProject(project)}
                  className="bg-[#0A0A0A] border border-white/5 hover:border-[#00FFFF]/30 transition-all cursor-pointer group"
                >
                  {/* Cover Image */}
                  <div className="h-36 bg-black relative overflow-hidden">
                    {project.cover_image ? (
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        <FolderKanban className="w-12 h-12" />
                      </div>
                    )}
                    {/* Badges Overlay */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      <StatusPill status={project.status} />
                    </div>
                    <div className="absolute top-2 right-2">
                      {project.is_public ? (
                        <span className="bg-green-500/20 text-green-500 text-[10px] font-bold px-2 py-1 font-mono flex items-center gap-1">
                          <Eye className="w-3 h-3" /> PUBLIC
                        </span>
                      ) : (
                        <span className="bg-white/10 text-white/50 text-[10px] font-bold px-2 py-1 font-mono flex items-center gap-1">
                          <Lock className="w-3 h-3" /> PRIVATE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="font-mono font-bold text-lg text-white mb-1">
                      {project.title}
                    </h3>
                    {project.client_name && (
                      <p className="text-white/40 text-xs font-mono mb-3 uppercase tracking-wide">
                        Client: {project.client_name}
                      </p>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-white/50 font-mono uppercase">Progress</span>
                        <span className="text-[10px] text-[#00FFFF] font-mono font-bold">
                          {project.progress || 0}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#00FFFF] to-[#BA0C10]"
                          style={{ width: `${project.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Deadline */}
                    {deadlineStatus && (
                      <div className={`flex items-center gap-2 text-xs font-mono ${deadlineStatus.color}`}>
                        <Clock className="w-3 h-3" />
                        <span className={deadlineStatus.urgent ? 'font-bold' : ''}>
                          {deadlineStatus.text}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ============ DETAIL VIEW: COMMAND CENTER ============
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="bg-[#0A0A0A] border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={closeDetail}
              className="text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-mono font-bold text-white">
                {selectedProject?.title}
              </h1>
              <p className="text-white/40 text-xs font-mono uppercase tracking-wide">
                Project Command Center
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <button
                  onClick={handleSaveProject}
                  className="bg-[#00FF94] hover:bg-[#00FF94]/80 text-black px-4 py-2 font-mono font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" /> SAVE
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData(selectedProject!);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 font-mono font-bold text-sm transition-colors"
                >
                  CANCEL
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#00FFFF]/20 hover:bg-[#00FFFF]/30 text-[#00FFFF] px-4 py-2 font-mono font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <Edit className="w-4 h-4" /> EDIT
                </button>
                <button
                  onClick={handleDeleteProject}
                  className="bg-[#BA0C10]/20 hover:bg-[#BA0C10]/30 text-[#BA0C10] px-4 py-2 font-mono font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> DELETE
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* LEFT SIDEBAR: Metadata */}
        <div className="w-80 bg-[#0A0A0A] border-r border-white/10 p-6 space-y-6 overflow-y-auto max-h-screen">
          <h2 className="font-mono font-bold text-white uppercase text-sm tracking-wide border-b border-white/10 pb-2">
            Project Metadata
          </h2>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase">Cover Image</label>
            {formData.cover_image && (
              <img src={formData.cover_image} alt="Cover" className="w-full h-32 object-cover border border-white/10" />
            )}
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full bg-black border border-white/10 text-white text-xs file:bg-white/10 file:border-0 file:text-white file:px-3 file:py-1.5 file:mr-3"
              />
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={!editMode}
              className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-sm disabled:opacity-50"
            />
          </div>

          {/* Client */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase">Client Name</label>
            <input
              type="text"
              value={formData.client_name || ''}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              disabled={!editMode}
              className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-sm disabled:opacity-50"
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase flex items-center gap-2">
              <DollarSign className="w-3 h-3" /> Budget
            </label>
            <input
              type="number"
              value={formData.budget || ''}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
              disabled={!editMode}
              className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-sm disabled:opacity-50"
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Deadline
            </label>
            <input
              type="date"
              value={formData.deadline || ''}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              disabled={!editMode}
              className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-sm disabled:opacity-50"
            />
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase">Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.progress || 0}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              disabled={!editMode}
              className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-sm disabled:opacity-50"
            />
            <div className="h-1.5 bg-white/5">
              <div
                className="h-full bg-[#00FFFF]"
                style={{ width: `${formData.progress || 0}%` }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase">Status</label>
            <select
              value={formData.status || 'planning'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              disabled={!editMode}
              className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-sm disabled:opacity-50"
            >
              <option value="planning">Planning</option>
              <option value="development">Development</option>
              <option value="live">Live</option>
              <option value="maintenance">Maintenance</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-3 bg-black/30 p-3 border border-white/10">
            <label className="flex items-center justify-between">
              <span className="text-white/70 font-mono text-xs flex items-center gap-2">
                <Eye className="w-3 h-3" /> Publish to Site
              </span>
              <input
                type="checkbox"
                checked={formData.is_public || false}
                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                disabled={!editMode}
                className="w-4 h-4"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-white/70 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" /> Featured on Home
              </span>
              <input
                type="checkbox"
                checked={formData.is_featured || false}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                disabled={!editMode}
                className="w-4 h-4"
              />
            </label>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <label className="text-white/50 font-mono text-xs uppercase flex items-center gap-2">
              <Tag className="w-3 h-3" /> Tech Stack
            </label>
            {editMode && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  className="flex-1 bg-black border border-white/10 text-white px-3 py-1.5 font-mono text-xs"
                />
                <button
                  onClick={addTag}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.tech_stack?.map(tag => (
                <span key={tag} className="bg-[#00FFFF]/10 text-[#00FFFF] text-[10px] font-mono px-2 py-1 flex items-center gap-1 border border-[#00FFFF]/30">
                  {tag}
                  {editMode && (
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-[#BA0C10]"
                      onClick={() => removeTag(tag)}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-white/50 font-mono text-xs uppercase flex items-center gap-2">
                <Github className="w-3 h-3" /> Repo URL
              </label>
              <input
                type="url"
                value={formData.repo_url || ''}
                onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                disabled={!editMode}
                className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-xs disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/50 font-mono text-xs uppercase flex items-center gap-2">
                <Globe className="w-3 h-3" /> Live URL
              </label>
              <input
                type="url"
                value={formData.live_url || ''}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                disabled={!editMode}
                className="w-full bg-black border border-white/10 text-white px-3 py-2 font-mono text-xs disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT: Tabs */}
        <div className="flex-1">
          {/* Tab Navigation */}
          <div className="bg-black border-b border-white/10 flex">
            <button
              onClick={() => setDetailTab('tasks')}
              className={`px-6 py-3 font-mono font-bold text-sm uppercase flex items-center gap-2 transition-colors ${
                detailTab === 'tasks'
                  ? 'bg-[#0A0A0A] text-white border-b-2 border-[#00FFFF]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <ListTodo className="w-4 h-4" /> Task Board
            </button>
            <button
              onClick={() => setDetailTab('case-study')}
              className={`px-6 py-3 font-mono font-bold text-sm uppercase flex items-center gap-2 transition-colors ${
                detailTab === 'case-study'
                  ? 'bg-[#0A0A0A] text-white border-b-2 border-[#00FFFF]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" /> Case Study
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {detailTab === 'tasks' ? (
              /* TASK BOARD */
              <div className="grid grid-cols-3 gap-4">
                {(['todo', 'in_progress', 'done'] as const).map(status => {
                  const statusTasks = tasks.filter(t => t.status === status);
                  const statusConfig = {
                    todo: { label: 'TODO', color: 'bg-white/10', icon: Circle },
                    in_progress: { label: 'IN PROGRESS', color: 'bg-blue-500/20', icon: Clock },
                    done: { label: 'DONE', color: 'bg-green-500/20', icon: CheckCircle2 }
                  };
                  const config = statusConfig[status];
                  const Icon = config.icon;

                  return (
                    <div key={status} className="space-y-3">
                      {/* Column Header */}
                      <div className={`${config.color} border border-white/10 p-3 flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-white" />
                          <h3 className="font-mono font-bold text-white text-sm uppercase">
                            {config.label}
                          </h3>
                        </div>
                        <span className="bg-black/50 text-white/70 text-xs font-mono px-2 py-0.5">
                          {statusTasks.length}
                        </span>
                      </div>

                      {/* Quick Add */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="+ Add task..."
                          value={newTaskText[status]}
                          onChange={(e) => setNewTaskText({ ...newTaskText, [status]: e.target.value })}
                          onKeyDown={(e) => e.key === 'Enter' && createTask(status)}
                          className="flex-1 bg-black border border-white/10 text-white px-3 py-2 font-mono text-xs placeholder:text-white/30"
                        />
                        <button
                          onClick={() => createTask(status)}
                          className="bg-[#00FFFF]/20 hover:bg-[#00FFFF]/30 text-[#00FFFF] px-3"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Task Cards */}
                      <div className="space-y-2">
                        {statusTasks.map(task => (
                          <div
                            key={task.id}
                            className="bg-[#0A0A0A] border border-white/10 p-3 space-y-2 group hover:border-white/30 transition-colors"
                          >
                            <p className="text-white text-sm font-mono leading-relaxed">
                              {task.title}
                            </p>
                            <div className="flex items-center justify-between">
                              <PriorityPill priority={task.priority} />
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {status !== 'todo' && (
                                  <button
                                    onClick={() => updateTaskStatus(task.id, status === 'in_progress' ? 'todo' : 'in_progress')}
                                    className="text-white/50 hover:text-white"
                                  >
                                    <ChevronLeft className="w-4 h-4" />
                                  </button>
                                )}
                                {status !== 'done' && (
                                  <button
                                    onClick={() => updateTaskStatus(task.id, status === 'todo' ? 'in_progress' : 'done')}
                                    className="text-white/50 hover:text-white"
                                  >
                                    <ChevronLeft className="w-4 h-4 rotate-180" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteTask(task.id)}
                                  className="text-white/50 hover:text-[#BA0C10]"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* CASE STUDY EDITOR */
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-2">
                  <label className="text-white/50 font-mono text-xs uppercase">Short Description (Card Summary)</label>
                  <textarea
                    value={formData.short_description || ''}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    disabled={!editMode}
                    rows={3}
                    className="w-full bg-black border border-white/10 text-white px-4 py-3 font-mono text-sm disabled:opacity-50 resize-none"
                    placeholder="Brief project summary for cards (2-3 lines)..."
                  />
                  <p className="text-white/30 text-xs font-mono text-right">
                    {formData.short_description?.length || 0} characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-white/50 font-mono text-xs uppercase">Full Description (Case Study - Markdown Supported)</label>
                  <textarea
                    value={formData.full_description || ''}
                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                    disabled={!editMode}
                    rows={20}
                    className="w-full bg-black border border-white/10 text-white px-4 py-3 font-mono text-sm disabled:opacity-50 resize-y leading-relaxed"
                    placeholder="# Project Title&#10;&#10;## Challenge&#10;Describe the problem...&#10;&#10;## Solution&#10;Explain your approach...&#10;&#10;## Results&#10;Key outcomes and metrics..."
                  />
                  <p className="text-white/30 text-xs font-mono text-right">
                    {formData.full_description?.length || 0} characters
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
