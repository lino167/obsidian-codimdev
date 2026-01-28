import { useState, useEffect } from 'react'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer'
import { CornerBrackets, GridLines } from '@/components/ui/hud-elements'
import { Code, Terminal, Globe, ArrowRight, Loader2, Github, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

const KrafloMockup = () => (
  <div className="h-full w-full bg-neutral-900 border border-neutral-800 rounded-md p-4 flex flex-col font-mono text-[10px] text-green-500/80 overflow-hidden relative">
    <div className="absolute inset-0 bg-grid-white/[0.05]" />
    <div className="flex justify-between border-b border-white/10 pb-2 mb-2 z-10">
      <span>KRAFLO_SYS // MAIN_DASHBOARD</span>
      <span className="text-green-400">● ONLINE</span>
    </div>
    <div className="grid grid-cols-2 gap-2 z-10">
      <div className="bg-black/40 p-2 border border-white/5">
        <div className="text-white/50 mb-1">TORQUE_LOAD</div>
        <div className="text-xl text-white">1,240 Nm</div>
        <div className="h-1 w-full bg-neutral-800 mt-2">
          <div className="h-full w-[70%] bg-crimson" />
        </div>
      </div>
      <div className="bg-black/40 p-2 border border-white/5">
        <div className="text-white/50 mb-1">OS_STATUS</div>
        <div className="text-xl text-white">Pending: 4</div>
      </div>
      <div className="col-span-2 bg-black/40 p-2 border border-white/5 h-24">
        <div className="text-white/50 mb-1">PREDICTIVE_ANALYSIS</div>
        <div className="flex items-end gap-1 h-12 mt-2">
          {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="w-full bg-green-500/20 border-t border-green-500"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const TerminalMockup = () => (
  <div className="h-full w-full bg-[#0c0c0c] border border-neutral-800 rounded-md p-4 font-mono text-xs overflow-hidden relative shadow-2xl">
    <div className="flex gap-1.5 mb-4">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
    </div>
    <div className="space-y-2 text-neutral-300">
      <div className="flex">
        <span className="text-cyan-500 mr-2">➜</span>
        <span>n8n-worker start --workflow=crm-agent</span>
      </div>
      <div className="text-neutral-500">Initializing Neural Agents v2.4...</div>
      <div className="text-green-500/80">
        [SUCCESS] Connection to OpenAI established.
      </div>
      <div className="text-green-500/80">
        [SUCCESS] Supabase Webhook listening port 3000.
      </div>
      <div className="flex mt-4 animate-pulse">
        <span className="text-purple-500 mr-2">ai-agent@server:~$</span>
        <span className="w-2 h-4 bg-purple-500 block"></span>
      </div>
    </div>
  </div>
)

const BrandMockup = () => (
  <div className="h-full w-full bg-neutral-900 border border-neutral-800 rounded-md p-6 flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-crimson/20 blur-[50px] rounded-full" />
    <div className="text-4xl font-display font-bold text-white tracking-tighter z-10">
      CODIM<span className="text-crimson">.</span>DEV
    </div>
    <div className="mt-4 flex gap-2 z-10">
      <div className="w-8 h-8 bg-[#050505] border border-white/20 rounded-sm" />
      <div className="w-8 h-8 bg-[#BA0C10] border border-white/20 rounded-sm" />
      <div className="w-8 h-8 bg-[#E5E5E5] border border-white/20 rounded-sm" />
    </div>
    <div className="mt-6 font-mono text-[10px] text-white/40 tracking-[0.2em] border-t border-white/10 pt-2">
      VISUAL IDENTITY SYSTEM
    </div>
  </div>
)

export default function Work() {
  const { t } = useLanguage()
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllProjects()
  }, [])

  const fetchAllProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAllProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const content = [
    {
      title: t.work.projects.kraflo.title,
      description: t.work.projects.kraflo.description,
      content: <KrafloMockup />,
    },
    {
      title: t.work.projects.agents.title,
      description: t.work.projects.agents.description,
      content: <TerminalMockup />,
    },
    {
      title: t.work.projects.identity.title,
      description: t.work.projects.identity.description,
      content: <BrandMockup />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#BA0C10]/30 relative overflow-hidden">
      {/* HUD Elements */}
      <CornerBrackets />
      <GridLines />

      {/* Header */}
      <div className="pt-32 pb-10 px-6 max-w-7xl mx-auto relative z-10">
        <div className="inline-block px-3 py-1 mb-4 border border-white/10 bg-white/5 rounded-full backdrop-blur-sm">
          <span className="font-mono text-xs text-white/60 tracking-wider">
            {t.work.header.badge}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          {t.work.header.title}
        </h1>
        <p className="text-xl text-white/60 max-w-2xl font-light">
          {t.work.header.description}
        </p>
      </div>

      {/* Main Showcase (Sticky Scroll) */}
      <div className="relative z-10 py-10">
        <StickyScroll content={content} />
      </div>

      {/* All Projects from Supabase */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : allProjects.length > 0 && (
        <div className="py-20 px-6 max-w-7xl mx-auto relative z-10">
          <div className="mb-12 border-l-2 border-[#BA0C10] pl-4">
            <h2 className="text-2xl font-bold mb-2">
              PROJETOS CADASTRADOS
            </h2>
            <p className="text-white/50 font-mono text-sm">
              Todos os projetos do portfólio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="bg-neutral-900/50 border border-white/10 hover:border-red-600/30 transition-all duration-300 group overflow-hidden"
              >
                {/* Project Image */}
                <div className="h-48 bg-neutral-800 relative overflow-hidden">
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <Code className="w-16 h-16" />
                    </div>
                  )}
                  {project.is_featured && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 font-mono">
                      DESTAQUE
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-white/50 text-sm mb-4 line-clamp-2">
                    {project.short_description || "Detalhes confidenciais."}
                  </p>

                  {/* Tech Stack */}
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-white/5 text-white/70 font-mono border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 border-t border-white/10 pt-4">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Código
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-white/50 hover:text-red-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver Projeto
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Final */}
      <div className="py-32 px-6 text-center relative z-10 bg-gradient-to-b from-transparent to-black/80">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            {t.work.cta.title}
          </h2>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-base font-mono rounded-none border border-white/20 h-14 px-8"
            >
              {t.work.cta.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
