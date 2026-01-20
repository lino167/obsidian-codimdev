import React from 'react'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {
  Monitor,
  Database,
  Brain,
  Terminal,
  Code2,
  Server,
  Cpu,
  Layers,
  Workflow,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Visual Components for Headers
const BrowserMockup = () => (
  <div className="flex w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border border-neutral-700/50 relative overflow-hidden flex-col">
    <div className="h-6 w-full bg-neutral-800 border-b border-neutral-700 flex items-center px-3 gap-1.5">
      <div className="w-2 h-2 rounded-full bg-red-500/50" />
      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
      <div className="w-2 h-2 rounded-full bg-green-500/50" />
    </div>
    <div className="p-4 flex flex-col gap-3">
      <div className="w-full h-16 rounded-lg bg-neutral-800/50 border border-neutral-700/30 animate-pulse" />
      <div className="flex gap-3">
        <div className="w-1/3 h-12 rounded-lg bg-neutral-800/50 border border-neutral-700/30" />
        <div className="w-2/3 h-12 rounded-lg bg-neutral-800/50 border border-neutral-700/30" />
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
    <Monitor className="absolute -bottom-6 -right-6 text-neutral-800 group-hover:text-crimson/20 transition-colors duration-500 w-40 h-40 rotate-12" />
  </div>
)

const DatabaseMockup = () => (
  <div className="flex w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border border-neutral-700/50 relative overflow-hidden flex-col p-4">
    <div className="flex flex-col gap-2 relative z-10">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-2 rounded bg-neutral-800/40 border border-neutral-700/30"
        >
          <div
            className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-emerald-500' : 'bg-neutral-600'}`}
          />
          <div className="h-1.5 w-24 bg-neutral-700/50 rounded" />
          <div className="h-1.5 w-12 bg-neutral-700/30 rounded ml-auto" />
        </div>
      ))}
    </div>
    <Database className="absolute -bottom-6 -right-6 text-neutral-800 group-hover:text-crimson/20 transition-colors duration-500 w-32 h-32 rotate-12" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
  </div>
)

const AIMockup = () => (
  <div className="flex w-full min-h-[6rem] rounded-xl bg-neutral-950 border border-neutral-800 relative overflow-hidden flex-col items-center justify-center">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full" />
    </div>
    <div className="relative z-10 grid grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-cyan-500/40 animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      stroke="currentColor"
    >
      <line
        x1="30%"
        y1="30%"
        x2="70%"
        y2="70%"
        className="text-cyan-500"
        strokeWidth="1"
      />
      <line
        x1="70%"
        y1="30%"
        x2="30%"
        y2="70%"
        className="text-cyan-500"
        strokeWidth="1"
      />
    </svg>
    <Brain className="absolute -bottom-8 -right-8 text-neutral-800 group-hover:text-cyan-500/20 transition-colors duration-500 w-40 h-40 rotate-12" />
  </div>
)

const TerminalMockup = () => (
  <div className="flex w-full min-h-[6rem] rounded-xl bg-black border border-neutral-800 relative overflow-hidden flex-col font-mono text-[10px] p-3">
    <div className="text-green-500 mb-1">$ python manage.py run_analysis</div>
    <div className="text-neutral-400">Loading datasets... [OK]</div>
    <div className="text-neutral-400">Optimizing vectors... [OK]</div>
    <div className="text-neutral-400">
      Training model... <span className="animate-pulse">_</span>
    </div>
    <Terminal className="absolute -bottom-6 -right-6 text-neutral-800 group-hover:text-crimson/20 transition-colors duration-500 w-32 h-32 rotate-12" />
  </div>
)

const items = [
  {
    title: 'High-Performance Frontend Ecosystems',
    description:
      'Não apenas sites, mas experiências digitais imersivas. Desenvolvemos interfaces reativas com Next.js e Tailwind, otimizadas para Core Web Vitals e conversão máxima. Design Systems escaláveis que garantem consistência visual em todos os pontos de contato da sua marca.',
    header: <BrowserMockup />,
    icon: <Monitor className="h-4 w-4 text-crimson" />,
    className: 'md:col-span-2',
    status: 'UI-SYS-01',
    tags: ['FIGMA', 'REACT', 'TAILWIND', 'MOTION'],
    techIcon: <Layers className="text-xs" />,
  },
  {
    title: 'Scalable Cloud Architectures',
    description:
      'Arquiteturas robustas e seguras. APIs RESTful e GraphQL, autenticação JWT/OAuth e bancos de dados PostgreSQL otimizados. Infraestrutura pronta para escalar horizontalmente conforme seu negócio cresce.',
    header: <DatabaseMockup />,
    icon: <Server className="h-4 w-4 text-crimson" />,
    className: 'md:col-span-1',
    status: 'BE-OPS-02',
    tags: ['SUPABASE', 'NEXT.JS', 'POSTGRESQL'],
    techIcon: <Database className="text-xs" />,
  },
  {
    title: 'AI-Powered Business Logic',
    description:
      'Automatize o complexo. Agentes autônomos que orquestram fluxos de trabalho, chatbots com RAG (Retrieval-Augmented Generation) para suporte inteligente e integrações via n8n que eliminam tarefas repetitivas.',
    header: <AIMockup />,
    icon: <Brain className="h-4 w-4 text-cyan-500" />,
    className: 'md:col-span-2',
    status: 'AI-NET-03',
    tags: ['N8N', 'OPENAI', 'PYTHON', 'RAG'],
    techIcon: <Workflow className="text-xs" />,
  },
  {
    title: 'Data Science & Algorithmic Core',
    description:
      'O motor matemático do seu negócio. Scripts Python para ETL, processamento de dados em larga escala, web scraping e algoritmos de otimização que transformam dados brutos em inteligência acionável.',
    header: <TerminalMockup />,
    icon: <Terminal className="h-4 w-4 text-crimson" />,
    className: 'md:col-span-1',
    status: 'PY-CORE-04',
    tags: ['PYTHON', 'PANDAS', 'ALGORITHMS'],
    techIcon: <Code2 className="text-xs" />,
  },
]

export default function ServicesSection() {
  return (
    <section
      className="py-24 bg-background relative overflow-hidden"
      id="services"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crimson/20 bg-crimson/5 text-crimson text-xs font-mono mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson"></span>
            </span>
            SYSTEM MODULES V2.0
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Engenharia de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600">
              Soluções
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed">
            // Módulos de alta performance prontos para acoplar ao seu negócio.
            <br className="hidden md:block" />
            Selecione os componentes necessários para sua infraestrutura
            digital.
          </p>
        </div>

        <BentoGrid className="max-w-6xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={
                <span className="font-display text-xl font-bold tracking-tight">
                  {item.title}
                </span>
              }
              description={
                <div className="flex flex-col gap-4 mt-3">
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 border border-white/5 bg-white/5 text-neutral-400 font-mono rounded-sm flex items-center gap-1 hover:border-crimson/50 hover:text-crimson hover:bg-crimson/5 transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              }
              header={item.header}
              icon={item.icon}
              className={cn(
                item.className,
                'bg-neutral-900/40 hover:bg-neutral-900/60 hover:shadow-[0_0_40px_rgba(186,12,16,0.1)] hover:border-crimson/30 transition-all duration-500 backdrop-blur-md border-white/5',
              )}
              status={item.status}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
