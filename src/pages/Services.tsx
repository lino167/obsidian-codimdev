import React from 'react'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { MoveRight, Database, Workflow, PenTool, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import { useLanguage } from '@/hooks/use-language'

export default function ServicesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#050505] pt-32">
      {/* Header Simples */}
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
          {/* BLOCO 1: FULL STACK */}
          <div className="mb-24 relative group">
            <div className="absolute -left-16 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
              <Database className="w-5 h-5 text-crimson" />
            </div>

            <span className="px-3 py-1 rounded-full border border-crimson/30 bg-crimson/10 text-crimson text-xs font-mono mb-4 inline-block">
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
                    <span className="w-1.5 h-1.5 bg-crimson rounded-full" />{' '}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BLOCO 2: AUTOMAÇÃO */}
          <div className="mb-24 relative group">
            <div className="absolute -left-16 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
              <Workflow className="w-5 h-5 text-cyan-500" />
            </div>

            <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-500 text-xs font-mono mb-4 inline-block">
              {t.services.blocks.automation.badge}
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              {t.services.blocks.automation.title}
            </h2>

            <div className="prose prose-invert prose-sm md:prose-base font-sans text-neutral-300">
              <p>{t.services.blocks.automation.p1}</p>
              <p>{t.services.blocks.automation.p2}</p>

              <div className="mt-6 p-4 rounded-lg bg-neutral-900/50 border border-white/5 font-mono text-xs text-green-400/80">
                {`> initiating_agent...\n> connecting_webhook: SUCCESS\n> processing_data... DONE`}
              </div>
            </div>
          </div>

          {/* BLOCO 3: DESIGN */}
          <div className="mb-24 relative group">
            <div className="absolute -left-16 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
              <PenTool className="w-5 h-5 text-purple-500" />
            </div>

            <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-500 text-xs font-mono mb-4 inline-block">
              {t.services.blocks.design.badge}
            </span>
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              {t.services.blocks.design.title}
            </h2>

            <div className="prose prose-invert prose-sm md:prose-base font-sans text-neutral-300">
              <p>{t.services.blocks.design.p1}</p>
              <p>{t.services.blocks.design.p2}</p>
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="mt-12 mb-24 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              {t.services.cta.title}
            </h3>
            <p className="text-neutral-400 mb-8 font-mono text-sm">
              {t.services.cta.subtitle}
            </p>
            <Link to="/contact">
              <Button className="bg-crimson hover:bg-red-700 text-white font-mono px-8">
                {t.services.cta.button} <MoveRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </TracingBeam>
      <Footer />
    </div>
  )
}
