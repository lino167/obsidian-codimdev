import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2, X, Upload, Github, Globe, Trash2, Edit, Star, FolderKanban } from "lucide-react";
import { toast } from "sonner";

// Simple Switch Component
const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-red-600' : 'bg-neutral-700'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Form States
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    tech_stack: [],
    featured: false,
    repo_url: "",
    live_url: "",
    status: "deployed"
  });
  const [currentTag, setCurrentTag] = useState("");
  const [uploading, setUploading] = useState(false);

  // 1. Fetch Projects
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) toast.error("Erro ao carregar projetos");
    else setProjects(data || []);
    setLoading(false);
  }

  // 2. Handle Image Upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `project-${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Erro no upload da imagem");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
    setFormData({ ...formData, image_url: data.publicUrl });
    setUploading(false);
    toast.success("Imagem enviada!");
  }

  // 3. Handle Tags (Tech Stack)
  const addTag = () => {
    if (currentTag && !formData.tech_stack?.includes(currentTag)) {
      setFormData({
        ...formData,
        tech_stack: [...(formData.tech_stack || []), currentTag]
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack?.filter(tag => tag !== tagToRemove)
    });
  };

  // 4. Save Project (Create or Update)
  async function handleSave() {
    if (!formData.title) return toast.error("Título é obrigatório");

    const payload = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
      tech_stack: formData.tech_stack,
      repo_url: formData.repo_url,
      live_url: formData.live_url,
      featured: formData.featured,
      status: formData.status || 'deployed'
    };

    try {
      if (editingId) {
        const { error } = await supabase.from("projects").update(payload).eq("id", editingId);
        if (error) throw error;
        toast.success("Projeto atualizado!");
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) throw error;
        toast.success("Projeto criado!");
      }

      setIsOpen(false);
      resetForm();
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar projeto");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      toast.success("Projeto deletado");
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar");
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech_stack: [],
      featured: false,
      repo_url: "",
      live_url: "",
      status: "deployed"
    });
    setEditingId(null);
  };

  const openEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-wider flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-blue-400" />
            GERENCIADOR DE PROJETOS
          </h1>
          <p className="text-white/60 font-mono text-sm mt-2">
            Adicione e edite seu portfólio
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if(!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 font-mono tracking-wider">
              <Plus className="w-4 h-4 mr-2" /> NOVO PROJETO
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-mono text-2xl text-white">
                {editingId ? "Editar Projeto" : "Novo Projeto"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Imagem */}
              <div className="flex flex-col gap-2">
                <Label className="text-white/70 font-mono text-sm">Capa do Projeto</Label>
                <div className="flex items-center gap-4">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Preview" className="w-24 h-24 object-cover border border-white/10" />
                  ) : (
                    <div className="w-24 h-24 bg-neutral-800 flex items-center justify-center border border-white/10">
                      <Upload className="text-white/20" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-black border-white/10 text-white file:text-white"
                      disabled={uploading}
                    />
                    {uploading && <span className="text-xs text-red-400 animate-pulse mt-1 block">Enviando imagem...</span>}
                  </div>
                </div>
              </div>

              {/* Título e Destaque */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 font-mono text-sm">Título do Projeto</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-black border-white/10 text-white"
                    placeholder="Ex: KRAFLO System"
                  />
                </div>
                <div className="flex items-center justify-between bg-black border border-white/10 p-3">
                  <Label className="text-white/70 font-mono text-sm flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Projeto em Destaque?
                  </Label>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(val) => setFormData({...formData, featured: val})}
                  />
                </div>
              </div>

              {/* Tecnologias (Tags) */}
              <div className="space-y-2">
                <Label className="text-white/70 font-mono text-sm">Stack Tecnológica (Digite e pressione Enter)</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Ex: React, Node.js, Supabase..."
                    className="bg-black border-white/10 text-white"
                  />
                  <Button onClick={addTag} variant="outline" className="border-white/10 text-white hover:bg-white/10">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tech_stack?.map((tag) => (
                    <span key={tag} className="bg-white/10 text-xs font-mono px-2 py-1 flex items-center gap-1 border border-white/10">
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-400 transition-colors"
                        onClick={() => removeTag(tag)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-white/70 font-mono text-sm">
                    <Github className="w-4 h-4" /> Repositório (Privado/Público)
                  </Label>
                  <Input
                    value={formData.repo_url || ""}
                    onChange={(e) => setFormData({...formData, repo_url: e.target.value})}
                    className="bg-black border-white/10 text-white"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-white/70 font-mono text-sm">
                    <Globe className="w-4 h-4" /> Link do Deploy (Live)
                  </Label>
                  <Input
                    value={formData.live_url || ""}
                    onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                    className="bg-black border-white/10 text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Descrição Markdown */}
              <div className="space-y-2">
                <Label className="text-white/70 font-mono text-sm">Descrição (Markdown Suportado)</Label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-black border-white/10 text-white min-h-[150px] font-mono text-sm"
                  placeholder="# Sobre o Projeto&#10;Descreva o desafio, a solução e o resultado..."
                />
              </div>

              <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 w-full font-bold font-mono tracking-wider">
                SALVAR PROJETO
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Projetos */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-red-600 w-8 h-8" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-white/30 font-mono">
          Nenhum projeto cadastrado ainda
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-black border border-white/10 overflow-hidden group hover:border-red-600/30 transition-all">
              <div className="h-40 bg-neutral-800 relative overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={project.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    No Image
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 font-mono">
                    DESTAQUE
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-white font-mono">{project.title}</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech_stack?.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] bg-white/5 px-2 py-0.5 text-neutral-400 font-mono border border-white/10">
                      {t}
                    </span>
                  ))}
                  {project.tech_stack && project.tech_stack.length > 3 && (
                    <span className="text-[10px] text-neutral-500 font-mono">
                      +{project.tech_stack.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex justify-end gap-2 border-t border-white/5 pt-3">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(project)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-600/10" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
