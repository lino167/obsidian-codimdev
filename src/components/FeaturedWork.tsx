import React from 'react'
import { PinContainer } from '@/components/ui/3d-pin'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

const FeaturedWork = () => {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header - Alinhado com a grid */}
        <div className="mb-12 flex flex-col items-center md:items-start">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight uppercase relative inline-block">
            <span className="relative z-10">{t.featured_work.title}</span>
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full md:w-1/2"></span>
          </h2>
          <p className="text-gray-400 font-light tracking-wide font-mono text-sm mt-2">
            {t.featured_work.subtitle}
          </p>
        </div>

        {/* Grid - Usando Grid CSS para alinhamento perfeito */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mb-16">
          {/* Project 1: KRAFLO SYSTEM */}
          <div className="h-[25rem] w-full flex items-center justify-center">
            <PinContainer title="/kraflo-saas" href="/work">
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                  {t.featured_work.projects.kraflo.title}
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">
                    {t.featured_work.projects.kraflo.description}
                  </span>
                </div>
                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-cyan-500 to-blue-900" />
              </div>
            </PinContainer>
          </div>

          {/* Project 2: NEURAL AGENTS */}
          <div className="h-[25rem] w-full flex items-center justify-center">
            <PinContainer title="/n8n-auto" href="/work">
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                  {t.featured_work.projects.neural.title}
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">
                    {t.featured_work.projects.neural.description}
                  </span>
                </div>
                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-purple-500 to-violet-500" />
              </div>
            </PinContainer>
          </div>

          {/* Project 3: CODIM PLATFORM */}
          <div className="h-[25rem] w-full flex items-center justify-center">
            <PinContainer title="/codim-v1" href="/work">
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                  {t.featured_work.projects.codim.title}
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">
                    {t.featured_work.projects.codim.description}
                  </span>
                </div>
                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-[#BA0C10] to-red-900" />
              </div>
            </PinContainer>
          </div>
        </div>

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
