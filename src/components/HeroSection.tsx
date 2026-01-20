import { motion } from 'framer-motion'
import { ArrowRight, Terminal } from 'lucide-react'
import { Spotlight, SpotlightNew } from '@/components/ui/spotlight'
import {
  GridBackground,
  BackgroundBeams,
} from '@/components/ui/grid-background'
import {
  ScrambleText,
  TypewriterEffect,
} from '@/components/ui/text-generate-effect'
import { DataStream } from '@/components/ui/hud-elements'
import logoIcon from '@/assets/logo-icon.png'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Animated Background */}
      <GridBackground />
      <BackgroundBeams />

      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(358 87% 39% / 0.2)"
      />

      {/* Interactive spotlight that follows mouse */}
      <SpotlightNew />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* System initialization tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <Terminal size={14} className="text-primary" />
            <span className="font-mono text-xs text-muted-foreground border border-border px-3 py-1.5 bg-card/80 backdrop-blur-sm">
              <span className="text-primary">&gt;</span> SYSTEM_INIT
              <span className="text-emerald-500 ml-2">READY</span>
            </span>
          </motion.div>

          {/* Logo animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <img src={logoIcon} alt="CODIM" className="h-20 w-20 opacity-80" />
          </motion.div>

          {/* Main Headline with scramble effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-4 tracking-tight">
              <ScrambleText text="CODIM" className="text-foreground" />
              <span className="text-gradient-crimson ml-4">DEV</span>
            </h1>
          </motion.div>

          {/* Subtitle with typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-6"
          >
            <p className="font-mono text-sm md:text-base text-muted-foreground tracking-wider">
              <TypewriterEffect
                words={[
                  { text: 'SOFTWARE' },
                  { text: 'SYSTEMS' },
                  { text: 'ENGINEERING' },
                ]}
              />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Projetamos sistemas robustos que resistem ao tempo e à escala.
            <br />
            <span className="text-foreground font-medium">
              Arquitetura precisa. Código limpo. Resultados sólidos.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#contato"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-base overflow-hidden transition-all duration-300"
            >
              {/* Animated border */}
              <span className="absolute inset-0 border border-primary" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-crimson-glow to-primary bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative flex items-center gap-2">
                Iniciar Projeto
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </a>
            <a
              href="#portfolio"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-display font-medium text-base hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <span className="font-mono text-xs text-muted-foreground mr-2">
                [02]
              </span>
              Ver Portfólio
            </a>
          </motion.div>

          {/* Bottom data stream */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="max-w-3xl mx-auto"
          >
            <DataStream />
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8"
          >
            {[
              { label: 'PROJETOS', value: '50+', status: 'DELIVERED' },
              { label: 'UPTIME', value: '99.9%', status: 'STABLE' },
              { label: 'CLIENTES', value: '30+', status: 'ACTIVE' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-4 border border-border bg-card/30 backdrop-blur-sm"
              >
                <div className="font-mono text-[10px] text-muted-foreground mb-1">
                  {stat.label}
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-emerald-500 mt-1">
                  {stat.status}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  )
}

export default HeroSection
