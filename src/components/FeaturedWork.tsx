import { useState, useEffect } from 'react'
import { PinContainer } from '@/components/ui/3d-pin'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

const FeaturedWork = () => {
  const { t } = useLanguage()
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProjects()
  }, [])

  const fetchFeaturedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) throw error
      setFeaturedProjects(data || [])
    } catch (error) {
      console.error('Error fetching featured projects:', error)
    } finally {
      setLoading(false)
    }
  }

  // Gradient colors for project cards
  const gradients = [
    'from-cyan-500 to-blue-900',
    'from-purple-500 to-violet-500',
    'from-[#BA0C10] to-red-900',
  ]

  return (
    <section className="py-24 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center md:items-start">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight uppercase relative inline-block">
            <span className="relative z-10">{t.featured_work.title}</span>
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full md:w-1/2"></span>
          </h2>
          <p className="text-gray-400 font-light tracking-wide font-mono text-sm mt-2">
            {t.featured_work.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-mono">
            Nenhum projeto em destaque cadastrado ainda
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mb-16">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="h-[25rem] w-full flex items-center justify-center">
                <PinContainer
                  title={`/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  href="/work"
                >
                  <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                      {project.title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-slate-500">
                        {project.description?.substring(0, 100)}...
                      </span>
                    </div>

                    {/* Tech Stack Tags */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tech_stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2 py-0.5 bg-white/10 text-white/70 font-mono border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack.length > 3 && (
                          <span className="text-[10px] text-white/50">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Project Image or Gradient */}
                    {project.image_url ? (
                      <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
                    )}
                  </div>
                </PinContainer>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-center">
          <Link
            to="/work"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 rounded-none transition-all duration-300 hover:bg-white/5"
          >
            <span className="font-mono text-sm tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors">
              {t.featured_work.view_all}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-white transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
