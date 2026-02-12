import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Certificate } from '@/types';
import {
  Award, Plus, Search, ExternalLink, Calendar,
  Trash2, Edit2, Loader2, Upload, X
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const initialFormState = {
    title: '',
    issuer: '',
    issue_date: '',
    credential_url: '',
    image_url: '',
    description: '',
    skills: '', // Comma separated string for input
    is_featured: true
  };
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast.error('Erro ao carregar certificados');
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `certificates/${fileName}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('images') // Using existing bucket
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erro ao enviar imagem');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit() {
    if (!formData.title || !formData.issuer) {
      toast.error('Preencha título e emissor');
      return;
    }

    setSaving(true);

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        title: formData.title,
        issuer: formData.issuer,
        issue_date: formData.issue_date || null,
        credential_url: formData.credential_url || null,
        image_url: formData.image_url || null,
        description: formData.description || null,
        skills: skillsArray,
        is_featured: formData.is_featured
      };

      let error;

      if (editingId) {
        const { error: updateError } = await supabase
          .from('certificates')
          .update(payload)
          .eq('id', editingId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('certificates')
          .insert(payload);
        error = insertError;
      }

      if (error) throw error;

      toast.success(editingId ? 'Certificado atualizado!' : 'Certificado criado!');
      setDialogOpen(false);
      resetForm();
      fetchCertificates();
    } catch (error) {
      console.error('Error saving certificate:', error);
      toast.error('Erro ao salvar certificado');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir este certificado?')) return;

    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Certificado excluído');
      fetchCertificates();
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast.error('Erro ao excluir');
    }
  }

  function handleEdit(cert: Certificate) {
    setEditingId(cert.id);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.issue_date || '',
      credential_url: cert.credential_url || '',
      image_url: cert.image_url || '',
      description: cert.description || '',
      skills: cert.skills ? cert.skills.join(', ') : '',
      is_featured: cert.is_featured
    });
    setDialogOpen(true);
  }

  function resetForm() {
    setFormData(initialFormState);
    setEditingId(null);
  }

  const filteredCertificates = certificates.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="w-8 h-8 animate-spin text-[#BA0C10]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-mono font-bold tracking-tight text-white flex items-center gap-3">
            <Award className="w-8 h-8 text-[#BA0C10]" />
            ACADEMY / CERTIFICATES
          </h1>
          <p className="text-white/50 font-mono text-sm mt-1">
            Manage credentials, courses and validations
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={(open) => {
          if (!open) resetForm();
          setDialogOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#BA0C10] hover:bg-[#a60b0e] text-white font-mono gap-2">
              <Plus className="w-4 h-4" /> NEW CREDENTIAL
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-mono text-[#BA0C10] uppercase tracking-wider text-xl">
                {editingId ? 'Edit Credential' : 'New Credential'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-white/70 font-mono text-xs uppercase">Certificate Image / Badge</Label>
                {formData.image_url ? (
                  <div className="relative group w-full h-48 bg-black/50 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={formData.image_url} alt="Preview" className="h-full object-contain" />
                    <button
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                      className="absolute top-2 right-2 p-2 bg-black/80 text-white hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg hover:border-[#BA0C10]/50 hover:bg-white/5 cursor-pointer transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploading ? (
                        <Loader2 className="w-8 h-8 text-[#BA0C10] animate-spin mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-white/30 mb-2" />
                      )}
                      <p className="text-xs text-white/50 font-mono uppercase">Click to upload image</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 font-mono text-xs uppercase">Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Fullstack React Master"
                    className="bg-black border-white/20 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 font-mono text-xs uppercase">Issuer *</Label>
                  <Input
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="e.g. Udemy, Coursera"
                    className="bg-black border-white/20 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70 font-mono text-xs uppercase">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details about the certification..."
                  className="bg-black border-white/20 font-mono h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 font-mono text-xs uppercase">Issue Date</Label>
                  <Input
                    type="date"
                    value={formData.issue_date}
                    onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                    className="bg-black border-white/20 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 font-mono text-xs uppercase">Validation URL</Label>
                  <Input
                    type="url"
                    value={formData.credential_url}
                    onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                    placeholder="https://..."
                    className="bg-black border-white/20 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70 font-mono text-xs uppercase">Skills (Comma separated)</Label>
                <Input
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, TypeScript, Node.js"
                  className="bg-black border-white/20 font-mono"
                />
              </div>

              <div className="flex items-center space-x-2 bg-white/5 p-4 rounded border border-white/10">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 accent-[#BA0C10] cursor-pointer"
                />
                <Label htmlFor="featured" className="text-white font-mono cursor-pointer">Featured (Show on homepage/portfolio)</Label>
              </div>

              <Button onClick={handleSubmit} disabled={saving} className="w-full bg-[#BA0C10] hover:bg-[#a60b0e] font-mono font-bold">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? 'UPDATE CERTIFICATE' : 'CREATE CERTIFICATE')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10 rounded-sm">
        <Search className="w-4 h-4 text-white/50" />
        <input
          type="text"
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none focus:outline-none text-white font-mono text-sm w-full"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          <div key={cert.id} className="group bg-black/40 border border-white/10 hover:border-[#BA0C10]/50 rounded-sm overflow-hidden transition-all duration-300">
            {/* Card Header / Image */}
            <div className="h-40 bg-black/60 relative overflow-hidden flex items-center justify-center p-4">
              {cert.image_url ? (
                <img src={cert.image_url} alt={cert.title} className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Award className="w-16 h-16 text-white/10" />
              )}
              {cert.is_featured && (
                <div className="absolute top-2 right-2 bg-[#BA0C10] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm">
                  FEATURED
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-[#BA0C10] transition-colors">
                  {cert.title}
                </h3>
                <p className="text-[#BA0C10] font-mono text-xs mt-1">{cert.issuer}</p>
              </div>

              {cert.issue_date && (
                <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(cert.issue_date), 'MMMM yyyy')}
                </div>
              )}

              {cert.description && (
                <p className="text-white/60 text-sm line-clamp-2 min-h-[40px]">
                  {cert.description}
                </p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 text-white/70">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[10px] font-mono text-white/40 px-1">+{cert.skills.length - 3}</span>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cert)} className="p-2 hover:bg-white/10 rounded-sm text-white/70 hover:text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 hover:bg-white/10 rounded-sm text-white/70 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {cert.credential_url && (
                  <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#BA0C10] hover:text-white flex items-center gap-1 transition-colors">
                    VERIFY <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredCertificates.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-sm">
            <Award className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/50 font-mono">No certificates found</p>
          </div>
        )}
      </div>
    </div>
  );
}
