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
import { Plus, Trash2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface Project {
  id: number
  created_at: string
  title: string
  description: string | null
  image_url: string | null
  tech_stack: string[] | null
  live_url: string | null
  status: 'deployed' | 'dev' | 'archived'
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    live_url: '',
    image_url: '',
  })

  const fetchProjects = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch projects')
    } else {
      setProjects(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Convert comma-separated tech stack to array
    const techStackArray = formData.tech_stack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const { error } = await supabase.from('projects').insert({
      title: formData.title,
      description: formData.description,
      tech_stack: techStackArray,
      live_url: formData.live_url,
      image_url: formData.image_url,
      status: 'deployed',
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Project created successfully')
      setIsOpen(false)
      setFormData({
        title: '',
        description: '',
        tech_stack: '',
        live_url: '',
        image_url: '',
      })
      fetchProjects()
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Project deleted')
      fetchProjects()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
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
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Tech Stack (comma separated)
                </label>
                <Input
                  placeholder="React, Supabase, Tailwind"
                  value={formData.tech_stack}
                  onChange={(e) =>
                    setFormData({ ...formData, tech_stack: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Live URL</label>
                <Input
                  type="url"
                  value={formData.live_url}
                  onChange={(e) =>
                    setFormData({ ...formData, live_url: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:bg-neutral-900/80"
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-950 mb-4">
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-800">
                  No Image
                </div>
              )}
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-neutral-100">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 line-clamp-2 mt-1">
                  {project.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-400 hover:text-red-300 hover:bg-red-900/10"
                onClick={() => handleDelete(project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech_stack?.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md bg-neutral-800 text-xs text-neutral-400 border border-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center text-sm text-blue-400 hover:text-blue-300"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View Live
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
