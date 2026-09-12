'use client'
import { motion } from 'framer-motion'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { TypewriterEffect } from '@/components/ui/text-generate-effect'
import { ArrowRight, MessageSquareCode, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/use-language'

const HeroSection = () => {
  const { t } = useLanguage()
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % t.hero.typewriter.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [t.hero.typewriter.length])

  const whatsappUrl =
    'https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto'

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center pt-24 pb-16">
      <BackgroundBeamsWithCollision className="min-h-screen h-auto py-12 flex items-center justify-center">
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto">
          {/* Badges / Tags */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md shadow-[0_0_20px_-10px_rgba(186,12,16,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs sm:text-xs text-neutral-300 tracking-wide">
                {t.hero.badge}
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 relative z-20 max-w-4xl leading-[1.12]"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle - Typewriter */}
          <div className="mt-6 h-8 md:h-10 min-w-[300px] flex items-center justify-center">
            <TypewriterEffect
              key={phraseIndex}
              words={t.hero.typewriter[phraseIndex]}
              className="text-center"
              cursorClassName="bg-crimson"
            />
          </div>

          {/* Subtítulo Descritivo Completo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-3xl text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-light tracking-normal"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none"
          >
            {/* Primary: Ver Projetos */}
            <a
              href="#projetos"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('projetos')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-full sm:w-auto group relative px-8 py-3.5 bg-transparent overflow-hidden rounded-xl transition-all inline-flex items-center justify-center border border-[#BA0C10]/60 hover:border-[#BA0C10] shadow-[0_0_25px_-10px_rgba(186,12,16,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-crimson to-red-700 opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center gap-2 text-white font-mono tracking-wider uppercase text-xs sm:text-sm z-10 font-semibold">
                <span>{t.hero.cta_primary}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Secondary: Iniciar um Projeto / Falar no WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/10 hover:border-emerald-500/50 bg-neutral-900/60 hover:bg-emerald-500/10 text-neutral-200 hover:text-emerald-400 transition-all font-mono text-xs sm:text-sm tracking-wider uppercase backdrop-blur-sm shadow-[0_0_20px_-10px_rgba(16,185,129,0.2)]"
            >
              <MessageSquareCode className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{t.hero.cta_secondary}</span>
            </a>
          </motion.div>
        </div>

        {/* HUD Decorations */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-50" />

          {/* Corners */}
          <div className="absolute top-8 left-8 font-mono text-[10px] text-neutral-600 hidden sm:block">
            OPS: READY
          </div>
          <div className="absolute top-8 right-8 font-mono text-[10px] text-neutral-600 hidden sm:block">
            LATENCY: &lt;10ms
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-[10px] text-neutral-600 hidden sm:block">
            STACK: TS + PY
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[10px] text-neutral-600 hidden sm:block">
            STATUS: ACTIVE
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}

export default HeroSection
