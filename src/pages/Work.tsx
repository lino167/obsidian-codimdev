import React from 'react'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer'
import { CornerBrackets, GridLines } from '@/components/ui/hud-elements'
import {
  Code,
  Terminal,
  Globe,
  ArrowRight,
  BarChart3,
  Activity,
  Layers,
  Cpu,
} from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

export default function Work() {
  const { t } = useLanguage()

  const content = [
    {
      title: t.work.projects.kraflo.title,
      description: t.work.projects.kraflo.description,
      content: (
        <div className="h-full w-full bg-neutral-900 border border-neutral-800 p-4 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-2 z-10">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500" />
            </div>
            <span className="font-mono text-[10px] text-emerald-500 tracking-wider flex items-center gap-1">
              <Activity className="h-3 w-3" /> SYSTEM: ONLINE
            </span>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-2 font-mono text-xs z-10 h-full">
            <div className="bg-black/40 p-3 border border-white/5 rounded-sm flex flex-col justify-between">
              <div className="text-white/40 mb-1 flex items-center gap-1">
                <Layers className="h-3 w-3" /> TORQUE
              </div>
              <div className="text-xl text-white font-bold">85%</div>
              <div className="h-1 w-full bg-white/10 mt-2 overflow-hidden rounded-full">
                <div className="h-full w-[85%] bg-[#BA0C10]" />
              </div>
            </div>
            <div className="bg-black/40 p-3 border border-white/5 rounded-sm flex flex-col justify-between">
              <div className="text-white/40 mb-1 flex items-center gap-1">
                <BarChart3 className="h-3 w-3" /> PRESSURE
              </div>
              <div className="text-xl text-white font-bold">120 PSI</div>
              <div className="h-1 w-full bg-white/10 mt-2 overflow-hidden rounded-full">
                <div className="h-full w-[60%] bg-emerald-500" />
              </div>
            </div>
            <div className="col-span-2 bg-black/40 p-3 border border-white/5 rounded-sm overflow-hidden">
              <div className="flex justify-between border-b border-white/10 pb-2 mb-2 text-white/40 text-[10px] tracking-wider">
                <span>ID</span>
                <span>STATUS</span>
                <span>ZONE</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-white/80 items-center">
                  <span className="bg-white/5 px-1 rounded">#8821</span>
                  <span className="text-emerald-500">ACTIVE</span>
                  <span>A-1</span>
                </div>
                <div className="flex justify-between text-white/80 items-center">
                  <span className="bg-white/5 px-1 rounded">#8822</span>
                  <span className="text-yellow-500">MAINT</span>
                  <span>B-3</span>
                </div>
                <div className="flex justify-between text-white/80 items-center opacity-50">
                  <span className="bg-white/5 px-1 rounded">#8823</span>
                  <span className="text-white">IDLE</span>
                  <span>C-2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t.work.projects.agents.title,
      description: t.work.projects.agents.description,
      content: (
        <div className="h-full w-full bg-black border border-white/10 p-5 font-mono text-xs flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BA0C10] to-transparent opacity-50" />
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#BA0C10] opacity-5 blur-[50px] pointer-events-none" />

          <div className="space-y-4 mt-2 z-10">
            <div className="text-white/40 flex gap-2 items-center">
              <span className="animate-pulse">_</span>{' '}
              <span>Incoming Lead Signal...</span>
            </div>

            <div className="pl-3 border-l-2 border-white/10 ml-1">
              <div className="text-white/40 mb-1 text-[10px] uppercase">
                User Input
              </div>
              <div className="text-white bg-white/5 p-2 rounded inline-block">
                Tenho interesse na solução enterprise.
              </div>
            </div>

            <div className="text-emerald-500/80 flex gap-2 items-center">
              <Cpu className="h-3 w-3" />{' '}
              <span>AI Agent analyzing intent...</span>
            </div>

            <div className="bg-[#BA0C10]/10 p-3 rounded border border-[#BA0C10]/20 text-white/90 shadow-[0_0_15px_rgba(186,12,16,0.1)]">
              <div className="flex justify-between items-center border-b border-[#BA0C10]/20 pb-2 mb-2">
                <span className="text-[10px] text-[#BA0C10] uppercase font-bold">
                  Analysis Result
                </span>
                <span className="text-[10px] bg-[#BA0C10] text-white px-1 rounded">
                  CONFIRMED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-white/40 block text-[10px]">
                    Intent
                  </span>
                  <span>Purchase</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">
                    Confidence
                  </span>
                  <span>98.5%</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#BA0C10]/20 text-emerald-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Action: Schedule_Meeting
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t.work.projects.identity.title,
      description: t.work.projects.identity.description,
      content: (
        <div className="h-full w-full bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>

          <div className="grid grid-cols-3 gap-3 z-10">
            <div className="group relative aspect-square bg-black border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors cursor-crosshair">
              <span className="text-[10px] text-white/40 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                #000000
              </span>
            </div>
            <div className="group relative aspect-square bg-[#BA0C10] flex items-center justify-center shadow-[0_0_20px_rgba(186,12,16,0.3)] cursor-crosshair">
              <span className="text-[10px] text-white/80 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                #BA0C10
              </span>
            </div>
            <div className="group relative aspect-square bg-white flex items-center justify-center cursor-crosshair">
              <span className="text-[10px] text-black/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                #FFFFFF
              </span>
            </div>
          </div>

          <div className="space-y-3 z-10 bg-black/40 p-4 border border-white/5 backdrop-blur-sm">
            <div className="flex items-end justify-between">
              <div className="font-display text-3xl text-white leading-none">
                Aa
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/40 font-mono uppercase">
                  Primary Font
                </div>
                <div className="text-sm font-bold">Space Grotesk</div>
              </div>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>ABCDEFGHIJKLM</span>
              <span>0123456789</span>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const minorProjects = t.work.minor_projects.items.map((item, i) => ({
    ...item,
    header: (
      <div className="flex w-full h-40 rounded-xl bg-neutral-900 border border-white/5 items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {i === 0 ? (
          <Terminal className="h-10 w-10 text-white/20 group-hover:text-[#BA0C10] transition-colors z-10" />
        ) : i === 1 ? (
          <>
            <div className="absolute top-0 right-0 p-2">
              <div className="w-2 h-2 rounded-full bg-pink-500/20"></div>
            </div>
            <Globe className="h-10 w-10 text-white/20 group-hover:text-pink-500 transition-colors z-10" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="text-4xl grayscale group-hover:grayscale-0 transition-all z-10">
              🤖
            </div>
          </>
        )}
      </div>
    ),
    icon:
      i === 0 ? (
        <Code className="h-4 w-4 text-neutral-500" />
      ) : i === 1 ? (
        <Globe className="h-4 w-4 text-neutral-500" />
      ) : (
        <Terminal className="h-4 w-4 text-neutral-500" />
      ),
  }))

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

      {/* Minor Projects Grid */}
      <div className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="mb-12 border-l-2 border-[#BA0C10] pl-4">
          <h2 className="text-2xl font-bold mb-2">
            {t.work.minor_projects.title}
          </h2>
          <p className="text-white/50 font-mono text-sm">
            {t.work.minor_projects.subtitle}
          </p>
        </div>

        <BentoGrid>
          {minorProjects.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
            />
          ))}
        </BentoGrid>
      </div>

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
