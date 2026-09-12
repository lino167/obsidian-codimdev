import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/landing/ServicesSection'
import ProjectsSection from '@/components/landing/ProjectsSection'
import AboutSection from '@/components/landing/AboutSection'
import TechStackSection from '@/components/TechStackSection'
import ContactSection from '@/components/landing/ContactSection'
import Footer from '@/components/Footer'
import { CornerBrackets, GridLines } from '@/components/ui/hud-elements'

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden selection:bg-crimson/30 selection:text-crimson-foreground relative font-sans">
      {/* HUD Decorative Elements */}
      <CornerBrackets />
      <GridLines />

      {/* Main Single Page Content */}
      <main>
        {/* 1. Hero Section: Apresentação Principal */}
        <HeroSection />

        {/* 2. Serviços Oferecidos: O que eu faço & Problemas que resolvo */}
        <ServicesSection />

        {/* 3. Projetos de Destaque: Cases Reais (Kraflo, Bots, Hackathons) */}
        <ProjectsSection />

        {/* 4. Sobre Mim: Bio Profissional, Foto & Vivência Industrial */}
        <AboutSection />

        {/* 5. Stack Técnica & Competências */}
        <TechStackSection />

        {/* 6. Contato & Diagnóstico Operacional (WhatsApp em destaque) */}
        <ContactSection />
      </main>

      {/* Rodapé Completo */}
      <Footer />
    </div>
  )
}

export default Index
