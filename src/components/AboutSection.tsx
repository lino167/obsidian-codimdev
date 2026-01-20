import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cog, Code, Palette, GraduationCap } from 'lucide-react'
import ceoImg from '../assets/ceo-codim.png'

const features = [
  {
    icon: GraduationCap,
    title: 'Acadêmico',
    description: 'Engenharia de Software (Em curso)',
  },
  {
    icon: Code,
    title: 'Especialidade',
    description: 'Automação & Full-Stack',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'UX/UI & Branding',
  },
  {
    icon: Cog,
    title: 'Background',
    description: 'Mecânica Industrial',
  },
]

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" className="relative py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div
          ref={ref}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-2xl aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
              <img
                src={ceoImg}
                alt="CEO Codim - Desenvolvedor Full-Stack"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-primary/10 rounded-2xl hidden md:block" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">
                Sobre Mim
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight">
              A Lógica Industrial no Código
            </h2>

            <div className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 space-y-4">
              <p>
                Minha abordagem ao desenvolvimento de software é herdada do chão
                de fábrica. Como ex-Mecânico Industrial, aprendi que sistemas
                não podem falhar e que a precisão é inegociável.
              </p>
              <p>
                Hoje, aplico essa mentalidade de engenharia na CODIM DEV. Sou um
                desenvolvedor Full-Stack e Designer focado em criar ecossistemas
                completos. Utilizo Javascript e Python para lógica robusta, n8n
                para orquestrar automações inteligentes e Supabase para dados
                escaláveis.
              </p>
            </div>

            {/* Features Grid - More compact layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group flex items-center gap-3 p-3 border border-border/50 bg-card/30 hover:bg-card hover:border-primary/20 transition-all duration-300 rounded-lg"
                >
                  <div className="flex-shrink-0 p-2 rounded-md bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <feature.icon
                      size={18}
                      className="text-primary transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  )
}

export default AboutSection
