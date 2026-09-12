import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { Cpu, Layout, Database, Bot, Wrench } from 'lucide-react'

const stackCategories = [
  {
    title: 'Front-end',
    icon: Layout,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    items: [
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'Framer Motion',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Back-end & Banco de Dados',
    icon: Database,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
    items: [
      'Supabase',
      'PostgreSQL',
      'Edge Functions',
      'RPCs',
      'REST APIs',
      'Python',
    ],
  },
  {
    title: 'Automação & Integrações',
    icon: Bot,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    bgColor: 'bg-purple-500/5',
    items: [
      'Telegram Bots',
      'Web Scraping',
      'Webhooks',
      'RAG / Embeddings',
      'BeautifulSoup',
      'OpenAI APIs',
    ],
  },
  {
    title: 'Design & Ferramentas',
    icon: Wrench,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
    items: [
      'Git & GitHub',
      'VS Code',
      'Figma',
      'Adobe Photoshop',
      'Adobe Illustrator',
    ],
  },
]

const marqueeTechnologies = [
  { name: 'REACT', icon: <span className="text-lg font-bold">⚛</span> },
  { name: 'TYPESCRIPT', icon: <span className="text-lg font-bold">TS</span> },
  { name: 'PYTHON', icon: <span className="text-lg font-bold">🐍</span> },
  { name: 'POSTGRESQL', icon: <span className="text-lg font-bold">🐘</span> },
  { name: 'SUPABASE', icon: <span className="text-lg font-bold">⚡</span> },
  { name: 'TAILWIND', icon: <span className="text-lg font-bold">🌊</span> },
  { name: 'TELEGRAM BOTS', icon: <span className="text-lg font-bold">✈</span> },
  { name: 'WEB SCRAPING', icon: <span className="text-lg font-bold">🕷</span> },
  { name: 'RAG / IA', icon: <span className="text-lg font-bold">🧠</span> },
  { name: 'EDGE FUNCTIONS', icon: <span className="text-lg font-bold">λ</span> },
  { name: 'REST APIS', icon: <span className="text-lg font-bold">⇄</span> },
  { name: 'FIGMA', icon: <span className="text-lg font-bold">◈</span> },
]

const TechStackSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 overflow-hidden bg-[#050505] border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#BA0C10]/5 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-crimson/30 bg-crimson/5">
            <Cpu size={14} className="text-crimson" />
            <span className="font-mono text-xs text-crimson uppercase tracking-wider">
              STACK_TÉCNICA & COMPETÊNCIAS
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Tecnologias & Ferramentas
          </h2>
          <p className="mt-4 text-neutral-400 font-mono text-sm max-w-2xl mx-auto">
            Ecossistema robusto para desenvolvimento full-stack, automação de ponta a ponta e inteligência artificial aplicada.
          </p>
        </motion.div>

        {/* Categorized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stackCategories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${cat.borderColor} ${cat.bgColor} backdrop-blur-sm relative group hover:border-white/20 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-md bg-black/60 border border-white/10 ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-mono font-semibold text-sm text-white tracking-wide">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/50 border border-white/10 text-neutral-300 group-hover:text-white transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span>MÓDULO 0{index + 1}</span>
                  <span className="text-emerald-500/80">VERIFICADO</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Infinite Scroll Rows */}
        <div className="pt-4">
          <InfiniteMovingCards
            items={marqueeTechnologies.slice(0, 6)}
            direction="left"
            speed="slow"
            className="mb-4"
          />
          <InfiniteMovingCards
            items={marqueeTechnologies.slice(6, 12)}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
