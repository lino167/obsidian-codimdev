import React from 'react'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { MoveRight, Database, Workflow, Bot, Code2, BrainCircuit, MessageSquareCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import { useLanguage } from '@/hooks/use-language'

export default function ServicesPage() {
  const { t } = useLanguage()

  const whatsappUrl =
    'https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto%20de%20automa%C3%A7%C3%A3o%2Fsistema'

  return (
    <div className="min-h-screen bg-[#050505] pt-32">
      {/* Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="text-crimson font-mono text-xs tracking-widest uppercase mb-4 block">
          {t.services.header.badge}
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
          {t.services.header.title}{' '}
          <span className="text-crimson">
            {t.services.header.title_highlight}
          </span>
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto font-mono text-sm">
          {t.services.header.description}
        </p>
      </div>

      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {/* SERVIÇO 1: DESENVOLVIMENTO WEB FULL-STACK */}
          <div className="mb-24 relative group">
            <div className="absolute -left-16 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </div>

            <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-4 inline-block">
              {t.services.blocks.fullstack.badge}
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              {t.services.blocks.fullstack.title}
            </h2>

            <div className="prose prose-invert prose-sm md:prose-base font-sans text-neutral-300">
              <p>{t.services.blocks.fullstack.p1}</p>
              <p>{t.services.blocks.fullstack.p2}</p>

              <ul className="list-none pl-0 mt-6 space-y-2 font-mono text-xs md:text-sm text-neutral-400">
                {t.services.blocks.fullstack.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SERVIÇO 2: AUTOMAÇÃO DE PROCESSOS & BOTS */}
          <div className="mb-24 relative group">
            <div className="absolute -left-16 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
              <Workflow className="w-5 h-5 text-crimson" />
            </div>

            <span className="px-3 py-1 rounded-full border border-crimson/30 bg-crimson/10 text-crimson text-xs font-mono mb-4 inline-block">
              {t.services.blocks.automation.badge}
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              {t.services.blocks.automation.title}
            </h2>

            <div className="prose prose-invert prose-sm md:prose-base font-sans text-neutral-300">
              <p>{t.services.blocks.automation.p1}</p>
              <p>{t.services.blocks.automation.p2}</p>

              <ul className="list-none pl-0 mt-6 space-y-2 font-mono text-xs md:text-sm text-neutral-400">
                {t.services.blocks.automation.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-crimson rounded-full" /> {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 rounded-lg bg-neutral-900/50 border border-white/5 font-mono text-xs text-green-400/80">
                {`> eliminating_bottleneck...\n> bot_dispatcher: RUNNING 24/7\n> manual_rework: MINIMIZED`}
              </div>
            </div>
          </div>

          {/* SERVIÇO 3: INTEGRAÇÃO DE INTELIGÊNCIA ARTIFICIAL & APIS */}
          <div className="mb-24 relative group">
            <div className="absolute -left-16 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
            </div>

            <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-4 inline-block">
              {t.services.blocks.ai.badge}
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              {t.services.blocks.ai.title}
            </h2>

            <div className="prose prose-invert prose-sm md:prose-base font-sans text-neutral-300">
              <p>{t.services.blocks.ai.p1}</p>
              <p>{t.services.blocks.ai.p2}</p>

              <ul className="list-none pl-0 mt-6 space-y-2 font-mono text-xs md:text-sm text-neutral-400">
                {t.services.blocks.ai.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SERVIÇO 4: OTIMIZAÇÃO E MODELAGEM DE BANCO DE DADOS */}
          <div className="mb-24 relative group">
            <div className="absolute -left-16 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>

            <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-4 inline-block">
              {t.services.blocks.database.badge}
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              {t.services.blocks.database.title}
            </h2>

            <div className="prose prose-invert prose-sm md:prose-base font-sans text-neutral-300">
              <p>{t.services.blocks.database.p1}</p>
              <p>{t.services.blocks.database.p2}</p>

              <ul className="list-none pl-0 mt-6 space-y-2 font-mono text-xs md:text-sm text-neutral-400">
                {t.services.blocks.database.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="mt-12 mb-24 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              {t.services.cta.title}
            </h3>
            <p className="text-neutral-400 mb-8 font-mono text-sm max-w-xl mx-auto">
              {t.services.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-sm font-semibold transition-colors"
              >
                <MessageSquareCode className="w-4 h-4" />
                {t.services.cta.button}
              </a>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white font-mono px-6">
                  Enviar Mensagem <MoveRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </TracingBeam>

      <Footer />
    </div>
  )
}
