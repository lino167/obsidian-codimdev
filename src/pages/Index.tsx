import SystemStatus from '@/components/SystemStatus'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import TechStackSection from '@/components/TechStackSection'
import PortfolioSection from '@/components/PortfolioSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { CornerBrackets, GridLines } from '@/components/ui/hud-elements'

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* HUD Elements */}
      <CornerBrackets />
      <GridLines />

      {/* Main Content */}
      <SystemStatus />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechStackSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Index
