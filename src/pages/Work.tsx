import { useState, useEffect } from 'react'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer'
import { CornerBrackets, GridLines } from '@/components/ui/hud-elements'
import { Code, Terminal, Globe, ArrowRight, Loader2, Github, ExternalLink, CheckCircle2, MessageSquareCode } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

const KrafloMockup = () => (
  <div className="h-full w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg p-5 flex flex-col font-mono text-[11px] text-neutral-300 overflow-hidden relative shadow-2xl">
    <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />
    <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3 z-10">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
        <span className="font-bold text-white tracking-wider">KRAFLO_CMMS // OPERATIONAL</span>
      </div>
      <span className="text-emerald-400 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
        RLS ACTIVE
      </span>
    </div>

    <div className="grid grid-cols-2 gap-2.5 z-10">
      <div className="bg-black/50 p-3 rounded border border-white/5">
        <div className="text-neutral-400 text-[10px] mb-1">CÁLCULO DE TORQUE</div>
        <div className="text-lg font-bold text-white">1,240 Nm</div>
        <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
          <div className="h-full w-[75%] bg-crimson" />
        </div>
      </div>
      <div className="bg-black/50 p-3 rounded border border-white/5">
        <div className="text-neutral-400 text-[10px] mb-1">ORDENS DE SERVIÇO</div>
        <div className="text-lg font-bold text-emerald-400">98.4% Concluídas</div>
        <div className="text-[9px] text-neutral-500 mt-1">Sincronizado via Edge Function</div>
      </div>
      <div className="col-span-2 bg-black/50 p-3 rounded border border-white/5">
        <div className="flex justify-between items-center text-neutral-400 text-[10px] mb-2">
          <span>TELEGRAM BOT DISPATCHER</span>
          <span className="text-cyan-400">WEBHOOK ONLINE</span>
        </div>
        <div className="text-[10px] text-neutral-300 space-y-1">
          <div className="text-emerald-400/90">&gt; Relatório de campo recebido com foto [OS #4082]</div>
          <div className="text-neutral-400">&gt; IA RAG: Manual Preditivo PDF consultado (pág. 42)</div>
        </div>
      </div>
    </div>
  </div>
)

const TerminalMockup = () => (
  <div className="h-full w-full bg-[#080808] border border-neutral-800 rounded-lg p-5 font-mono text-xs overflow-hidden relative shadow-2xl flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-neutral-500">python-worker // rpa-bot</span>
      </div>
      <div className="space-y-2 text-neutral-300 text-[11px]">
        <div className="flex items-center text-cyan-400">
          <span className="mr-2">&gt;</span>
          <span>python bot_scraper.py --target=rotinas-ops</span>
        </div>
        <div className="text-neutral-500">[INFO] Iniciando raspagem contínua (BeautifulSoup)...</div>
        <div className="text-emerald-400">
          [SUCCESS] 142 registros extraídos sem inconsistências.
        </div>
        <div className="text-purple-400">
          [TELEGRAM] Alerta operacional disparado para o canal de gestão.
        </div>
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
      <span>LATÊNCIA: 180ms</span>
      <span className="text-emerald-400">DECISÃO EM TEMPO REAL</span>
    </div>
  </div>
)

const HackathonMockup = () => (
  <div className="h-full w-full bg-[#090909] border border-neutral-800 rounded-lg p-5 flex flex-col justify-between font-mono text-[11px] text-neutral-300 overflow-hidden relative shadow-2xl">
    <div className="flex justify-between items-center border-b border-white/10 pb-3">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-cyan-400" />
        <span className="font-bold text-white">HACKATHON // UNICESUMAR + QLIK</span>
      </div>
      <span className="text-cyan-400 text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
        TEAM LUMEN DEVS
      </span>
    </div>

    <div className="space-y-3 my-2">
      <div className="bg-black/50 p-3 rounded border border-white/5">
        <div className="text-[10px] text-neutral-400 mb-1">DESAFIO OPERACIONAL</div>
        <div className="text-white text-xs font-semibold">Análise de Dados e Resolução de Gargalos em Tempo Real</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-black/50 p-2.5 rounded border border-white/5 text-center">
          <div className="text-lg font-bold text-cyan-400">KPIs ÁGEIS</div>
          <div className="text-[9px] text-neutral-500">Dashboards Qlik & React</div>
        </div>
        <div className="bg-black/50 p-2.5 rounded border border-white/5 text-center">
          <div className="text-lg font-bold text-emerald-400">ALTA PRECISÃO</div>
          <div className="text-[9px] text-neutral-500">Métricas Consolidadas</div>
        </div>
      </div>
    </div>

    <div className="pt-2 border-t border-white/5 text-[10px] text-neutral-500 flex justify-between">
      <span>CODIM STUDIO // INOVAÇÃO</span>
      <span className="text-neutral-400">DECISÃO BASEADA EM DADOS</span>
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

  const p = t.work.projects

  const casesList = [
    {
      title: p.kraflo.title,
      description: p.kraflo.description,
      context: p.kraflo.context,
      stack: p.kraflo.stack,
      highlights: p.kraflo.highlights,
      mockup: <KrafloMockup />,
    },
    {
      title: p.agents.title,
      description: p.agents.description,
      context: p.agents.context,
      stack: p.agents.stack,
      highlights: p.agents.highlights,
      mockup: <TerminalMockup />,
    },
    {
      title: p.identity.title,
      description: p.identity.description,
      context: p.identity.context,
      stack: p.identity.stack,
      highlights: p.identity.highlights,
      mockup: <HackathonMockup />,
    },
  ]

  const stickyContent = casesList.map((c) => ({
    title: c.title,
    description: (c.highlights ? c.highlights.join(' • ') : c.description) as unknown as string,
    content: c.mockup,
  }))

  const whatsappUrl =
    'https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto'

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#BA0C10]/30 relative overflow-hidden">
      {/* HUD Elements */}
      <CornerBrackets />
      <GridLines />

      {/* Header */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10 text-center md:text-left">
        <div className="inline-block px-3 py-1 mb-4 border border-white/10 bg-white/5 rounded-full backdrop-blur-sm">
          <span className="font-mono text-xs text-crimson tracking-wider uppercase">
            {t.work.header.badge}
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight font-display">
          {t.work.header.title}
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl font-light">
          {t.work.header.description}
        </p>
      </div>

      {/* Cases Detalhados em Cards com Especificação Completa */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20 space-y-12">
        {casesList.map((caseItem, idx) => (
          <div
            key={idx}
            className="p-8 md:p-10 rounded-2xl bg-neutral-950/80 border border-white/10 hover:border-crimson/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center backdrop-blur-md"
          >
            {/* Informações Técnicas */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-crimson/10 border border-crimson/30 text-crimson font-mono text-xs font-semibold">
                  CASE 0{idx + 1}
                </span>
                <span className="text-neutral-500 font-mono text-xs">STATUS: EM OPERAÇÃO</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-display">
                {caseItem.title}
              </h2>

              {/* Contexto */}
              <div>
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Contexto:
                </h4>
                <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                  {caseItem.context}
                </p>
              </div>

              {/* Stack */}
              <div>
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Stack Técnica:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {caseItem.stack.split(',').map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-black/60 border border-white/10 rounded font-mono text-xs text-neutral-200"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Destaques Técnicos */}
              <div>
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Destaques Técnicos:
                </h4>
                <ul className="space-y-2">
                  {caseItem.highlights?.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mockup Interativo / Visual */}
            <div className="lg:col-span-5 h-72 md:h-80 w-full">
              {caseItem.mockup}
            </div>
          </div>
        ))}
      </div>

      {/* Projetos Dinâmicos do Supabase (se houver cadastrados) */}
      {allProjects.length > 0 && (
        <div className="py-16 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
          <div className="mb-12 border-l-2 border-crimson pl-4">
            <h2 className="text-2xl font-bold mb-1 font-display">
              TODOS OS PROJETOS CADASTRADOS
            </h2>
            <p className="text-neutral-400 font-mono text-xs">
              Histórico de entregas e implantações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="bg-neutral-950 border border-white/10 hover:border-crimson/40 transition-all duration-300 rounded-xl overflow-hidden group flex flex-col justify-between"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-crimson transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-xs mb-4 line-clamp-3 leading-relaxed">
                    {project.short_description}
                  </p>
                  {project.tech_stack && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 bg-white/5 text-neutral-300 font-mono border border-white/5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-white/5 flex justify-end gap-3 font-mono text-xs">
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" /> Código
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-crimson hover:text-red-400 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Ver
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Final */}
      <div className="py-24 px-6 text-center relative z-10 bg-gradient-to-b from-transparent via-neutral-950 to-black border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
            {t.work.cta.title}
          </h2>
          <p className="text-neutral-400 font-mono text-sm mb-8">
            {t.work.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-crimson hover:bg-red-700 text-white font-mono text-sm font-semibold tracking-wide transition-colors"
            >
              <MessageSquareCode className="w-4 h-4" />
              {t.work.cta.button}
            </a>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white font-mono px-8 py-3.5 h-auto">
                Solicitar Diagnóstico <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
