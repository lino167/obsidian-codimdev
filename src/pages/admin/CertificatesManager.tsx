import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Plus,
  Award,
  Calendar,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  Upload,
  Download,
} from 'lucide-react'
import { toast } from 'sonner'

interface Certificate {
  id: number
  title: string
  issuer: string
  date_issued: string | null
  file_url: string | null
}

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date_issued: '',
    file_url: '',
  })

  const fetchCertificates = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('date_issued', { ascending: false })

    if (error) {
      toast.error('Failed to fetch certificates')
    } else {
      setCertificates(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('certificates').insert({
      title: formData.title,
      issuer: formData.issuer,
      date_issued: formData.date_issued || null,
      file_url: formData.file_url || null,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Certificate created successfully')
      setIsOpen(false)
      setFormData({
        title: '',
        issuer: '',
        date_issued: '',
        file_url: '',
      })
      fetchCertificates()
    }
  }

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setFormData({
      title: certificate.title,
      issuer: certificate.issuer,
      date_issued: certificate.date_issued || '',
      file_url: certificate.file_url || '',
    })
    setIsEditOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCertificate) return

    const { error } = await supabase
      .from('certificates')
      .update({
        title: formData.title,
        issuer: formData.issuer,
        date_issued: formData.date_issued || null,
        file_url: formData.file_url || null,
      })
      .eq('id', selectedCertificate.id)

    if (error) {
      toast.error('Failed to update certificate')
    } else {
      toast.success('Certificate updated successfully')
      setIsEditOpen(false)
      setSelectedCertificate(null)
      fetchCertificates()
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return

    const { error } = await supabase.from('certificates').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete certificate')
    } else {
      toast.success('Certificate deleted successfully')
      fetchCertificates()
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `certificates/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file)

      if (uploadError) {
        toast.error('Failed to upload file')
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('certificates').getPublicUrl(filePath)

      setFormData({ ...formData, file_url: publicUrl })
      toast.success('File uploaded successfully')
    } catch (error) {
      toast.error('Error uploading file')
    } finally {
      setUploading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Certificates</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Certificate</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Issuer</label>
                <Input
                  required
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Issued</label>
                <Input
                  type="date"
                  value={formData.date_issued}
                  onChange={(e) =>
                    setFormData({ ...formData, date_issued: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">File URL</label>
                <div className="flex gap-2">
                  <Input
                    value={formData.file_url}
                    onChange={(e) =>
                      setFormData({ ...formData, file_url: e.target.value })
                    }
                    className="bg-neutral-950 border-neutral-800"
                    placeholder="https://... or upload a file"
                  />
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.gif"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById('file-upload')?.click()
                    }
                    disabled={uploading}
                    className="border-neutral-800"
                  >
                    {uploading ? (
                      'Uploading...'
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create Certificate
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="group relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:bg-neutral-900/80"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Award className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-100">
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {certificate.issuer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/10"
                  onClick={() => handleEdit(certificate)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/10"
                  onClick={() => handleDelete(certificate.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(certificate.date_issued)}</span>
              </div>

              {certificate.file_url && (
                <div className="pt-2">
                  <a
                    href={certificate.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Certificate
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Award className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-400 mb-2">
            No certificates found
          </h3>
          <p className="text-neutral-500">
            Add your first certificate to get started
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Certificate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-neutral-950 border-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Issuer</label>
              <Input
                required
                value={formData.issuer}
                onChange={(e) =>
                  setFormData({ ...formData, issuer: e.target.value })
                }
                className="bg-neutral-950 border-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Issued</label>
              <Input
                type="date"
                value={formData.date_issued}
                onChange={(e) =>
                  setFormData({ ...formData, date_issued: e.target.value })
                }
                className="bg-neutral-950 border-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">File URL</label>
              <div className="flex gap-2">
                <Input
                  value={formData.file_url}
                  onChange={(e) =>
                    setFormData({ ...formData, file_url: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                  placeholder="https://... or upload a file"
                />
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="edit-file-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.gif"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById('edit-file-upload')?.click()
                  }
                  disabled={uploading}
                  className="border-neutral-800"
                >
                  {uploading ? 'Uploading...' : <Upload className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="border-neutral-800"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Update Certificate
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
