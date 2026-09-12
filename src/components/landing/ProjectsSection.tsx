import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageSquareCode, Github, ExternalLink, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

const cases = [
  {
    id: 'kraflo',
    tag: 'CASE 01 // INDÚSTRIA PESADA',
    title: 'Kraflo-CMMS — Sistema de Gestão de Manutenção Industrial',
    subtitle: 'Digitalização completa de ordens de serviço, cálculo de torque e preventivas fabris.',
    problem:
      'Chão de fábrica com ordens de serviço em papel, cálculo de torque manual suscetível a erros de aperto e lentidão para consultar manuais de máquinas em campo.',
    solution:
      'Plataforma completa para gestão e acompanhamento de OS e rotinas preditivas/corretivas com webhook no Telegram e IA Generativa consultando PDFs.',
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase (PostgreSQL)',
      'Edge Functions',
      'Telegram Bot API',
      'IA Generativa (RAG)',
    ],
    highlights: [
      'Dashboard operacional interativo com controle granular de acessos (RLS - Row Level Security).',
      'Webhook integrado ao Telegram para abertura, acompanhamento e envio de relatórios e fotos em campo diretamente pelo celular.',
      'Assistente de IA integrado com busca semântica em manuais técnicos em PDF para suporte imediato aos operadores.',
    ],
    stats: [
      { label: 'Abertura de Chamados', value: '100% Mobile' },
      { label: 'Busca em Manuais', value: 'Instantânea (IA)' },
      { label: 'Segurança de Dados', value: 'RLS Ativo' },
    ],
  },
  {
    id: 'automation',
    tag: 'CASE 02 // RPA & EXTRAÇÃO CONTÍNUA',
    title: 'Automações de Workflows & Bots de Extração de Dados',
    subtitle: 'Raspagem contínua, monitoramento 24/7 e alertas em tempo real.',
    problem:
      'Horas gastas diariamente pela equipe copiando dados de portais externos e gerando relatórios manuais com risco de atrasos na tomada de decisão.',
    solution:
      'Robôs em Python com BeautifulSoup integrados à Telegram Bot API para raspagem automática, higienização de dados e alertas operacionais instantâneos.',
    stack: [
      'Python',
      'BeautifulSoup',
      'APIs REST',
      'Telegram Bot API',
      'Webhooks',
      'Cron Automation',
    ],
    highlights: [
      'Extração confiável e contínua de dados com tolerância a falhas e reexecução inteligente.',
      'Alertas instantâneos de status de serviços e rotinas administrativas no canal de gestão.',
      'Integração direta com mensageria para tomada de decisão em tempo real, sem intervenção humana.',
    ],
    stats: [
      { label: 'Operação', value: '24/7 Sem Parar' },
      { label: 'Trabalho Manual', value: 'Eliminado' },
      { label: 'Alerta Médio', value: '< 2 segundos' },
    ],
  },
  {
    id: 'hackathon',
    tag: 'CASE 03 // HACKATHON & ANALYTICS',
    title: 'Iniciativas Codim Studio & Hackathons (Team Lumen devs)',
    subtitle: 'Dashboards analíticos e modelagem para resolução de problemas operacionais.',
    problem:
      'Volume massivo de indicadores brutos que não geravam clareza estratégica e atrasavam a identificação de gargalos de produção.',
    solution:
      'Participação no Hackathon UniCesumar + Qlik com o time Lumen devs: desenvolvimento de ferramentas sob medida e dashboards analíticos de alta velocidade.',
    stack: [
      'React',
      'TypeScript',
      'Python',
      'Dashboards',
      'Qlik Sense',
      'APIs REST',
      'Figma',
    ],
    highlights: [
      'Análise de dados e criação de dashboards analíticos voltados para resolução de problemas operacionais críticos.',
      'Desenvolvimento ágil sob pressão de tempo com foco em precisão de cálculos e usabilidade.',
      'Arquitetura escalável para visualização gerencial e tomada de decisão informada.',
    ],
    stats: [
      { label: 'Projeto', value: 'UniCesumar + Qlik' },
      { label: 'Equipe', value: 'Lumen devs' },
      { label: 'Foco', value: 'Decisão Ágil' },
    ],
  },
]

export const ProjectsSection = () => {
  return (
    <section id="projetos" className="py-28 px-4 sm:px-6 bg-[#070707] relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
            PROJETOS & CASES REAIS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            O Que Já Construí e os Resultados Alcançados
          </h2>
          <p className="mt-4 text-neutral-400 font-sans text-base sm:text-lg leading-relaxed font-light">
            Veja como a combinação de engenharia de software com experiência de processos industriais se transforma em sistemas robustos e funcionais.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-12">
          {cases.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 sm:p-12 rounded-2xl bg-[#090909] border border-white/10 hover:border-crimson/30 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle accent border on left */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-crimson via-crimson/50 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Info (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Tag */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded bg-crimson/10 border border-crimson/30 text-crimson font-mono text-xs font-semibold">
                      {project.tag}
                    </span>
                    <span className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Caso Real Testado
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mt-1 font-sans">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase text-red-400 font-bold block">
                        Gargalo Anterior:
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold block">
                        Solução Implantada:
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono uppercase text-neutral-400 font-semibold tracking-wider block">
                      Destaques Técnicos:
                    </span>
                    {project.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                      Tecnologias Utilizadas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-neutral-200 font-mono text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics / CTA Column (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 bg-black/40 p-6 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 font-semibold tracking-wider block mb-4">
                      Métricas do Projeto
                    </span>
                    <div className="space-y-4">
                      {project.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="border-b border-white/5 pb-3">
                          <div className="text-[11px] font-mono text-neutral-500">{stat.label}</div>
                          <div className="text-lg font-bold text-white font-mono mt-0.5">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <a
                      href={`https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20vi%20o%20case%20de%20${encodeURIComponent(project.title)}%20e%20gostaria%20de%20uma%20solu%C3%A7%C3%A3o%20parecida`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
                    >
                      <MessageSquareCode className="w-4 h-4" />
                      Pedir Solução Semelhante
                    </a>

                    <a
                      href="https://github.com/lino167"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white font-mono text-xs transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Ver Perfil no GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
