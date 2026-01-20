'use client'
import { motion } from 'framer-motion'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { TypewriterEffect } from '@/components/ui/text-generate-effect' // Assuming this exists as seen in previous HeroSection
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const HeroSection = () => {
  const [phraseIndex, setPhraseIndex] = useState(0)

  const phrases = [
    [
      {
        text: 'Engenharia',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'de',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'Software',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      { text: '&', className: 'text-red-600 font-mono text-sm md:text-xl' },
      {
        text: 'Full-Stack',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'Development.',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
    ],
    [
      {
        text: 'Automação',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'de',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'Processos',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'com',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      { text: 'IA', className: 'text-red-600 font-mono text-sm md:text-xl' },
      { text: '&', className: 'text-red-600 font-mono text-sm md:text-xl' },
      { text: 'n8n.', className: 'text-red-600 font-mono text-sm md:text-xl' },
    ],
    [
      {
        text: 'Design',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'de',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'Interfaces',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'de',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'Alta',
        className: 'text-neutral-400 font-mono text-sm md:text-xl',
      },
      {
        text: 'Precisão.',
        className: 'text-red-600 font-mono text-sm md:text-xl',
      },
    ],
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
    }, 5000) // Cycle every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <BackgroundBeamsWithCollision className="h-full">
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-xs text-neutral-400 tracking-wider">
                SYSTEM ONLINE // V2.0
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display font-bold text-7xl md:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 relative z-20"
          >
            CODIM DEV
          </motion.h1>

          {/* Subtitle - Typewriter */}
          <div className="mt-6 h-8 md:h-10 min-w-[300px]">
            <TypewriterEffect
              key={phraseIndex}
              words={phrases[phraseIndex]}
              className="text-center"
              cursorClassName="bg-red-600"
            />
          </div>

          {/* Support Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-2xl text-neutral-400 text-sm md:text-base leading-relaxed font-light tracking-wide"
          >
            Transformo complexidade em sistemas autônomos. Da identidade visual
            ao banco de dados, construo infraestruturas digitais que unem a
            lógica da engenharia com a estética do design industrial.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <button className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-md transition-all">
              <div className="absolute inset-0 border border-[#BA0C10]/50 rounded-md group-hover:border-[#BA0C10] transition-colors duration-300" />
              <div className="absolute inset-0 bg-[#BA0C10] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative flex items-center gap-2 text-white font-display tracking-wide uppercase text-sm z-10">
                <span>INICIAR PROJETO</span>
                <ArrowRight className="w-4 h-4 text-[#BA0C10] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </button>

            <button className="text-neutral-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest border-b border-transparent hover:border-white/20 pb-1">
              VER STACK TÉCNICA
            </button>
          </motion.div>
        </div>

        {/* HUD Decorations */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-50" />

          {/* Corners */}
          <div className="absolute top-8 left-8 font-mono text-[10px] text-neutral-600">
            LAT: -23.55
          </div>
          <div className="absolute top-8 right-8 font-mono text-[10px] text-neutral-600">
            CPU: 45%
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-[10px] text-neutral-600">
            MEM: 12GB
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[10px] text-neutral-600">
            SYS: ONLINE
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}

export default HeroSection
