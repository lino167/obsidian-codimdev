import SystemStatus from '@/components/SystemStatus'
import HeroSection from '@/components/HeroSection'
import FeaturedWork from '@/components/FeaturedWork'
import TechStackSection from '@/components/TechStackSection'
import Footer from '@/components/Footer'
import { CornerBrackets, GridLines } from '@/components/ui/hud-elements'
import { Button } from '@/components/ui/button'
import { ArrowRight, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/use-language'

const Index = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-black overflow-x-hidden selection:bg-crimson/30 selection:text-crimson-foreground relative">
      {/* HUD Elements */}
      <CornerBrackets />
      <GridLines />

      {/* Main Content */}
      <SystemStatus />
      <main>
        <HeroSection />
        <TechStackSection />

        <div id="services-preview">
          {/* Mantenha o conteúdo existente do BentoGrid/Services aqui se houver */}
        </div>

        <FeaturedWork />

        {/* --- NOVA SEÇÃO DE CTA (Substitui o ContactSection) --- */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crimson/30 bg-crimson/5 text-crimson text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson"></span>
              </span>
              READY FOR DEPLOYMENT
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              {t.work.cta.title || 'Precisa de uma solução robusta?'}
            </h2>
            <p className="text-white/60 text-lg mb-10 font-light max-w-2xl mx-auto">
              {/* @ts-expect-error: subtitle property exists but typescript is not picking it up yet */}
              {t.work.cta.subtitle ||
                'Vamos discutir a arquitetura do seu próximo sistema industrial ou digital.'}
            </p>

            <Link to="/contact">
              <Button className="h-14 px-8 bg-crimson hover:bg-red-700 text-white font-mono tracking-wider text-base rounded-sm group">
                <Terminal className="mr-2 w-5 h-5 group-hover:text-black transition-colors" />
                {t.cta_global?.button || 'INICIAR PROTOCOLO DE CONTATO'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
        {/* ------------------------------------------------------- */}
      </main>
      <Footer />
    </div>
  )
}

export default Index
