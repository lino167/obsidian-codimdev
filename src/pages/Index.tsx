import SystemStatus from '@/components/SystemStatus'
import HeroSection from '@/components/HeroSection'
import FeaturedWork from '@/components/FeaturedWork'
import TechStackSection from '@/components/TechStackSection'
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
        <FeaturedWork />
        <TechStackSection />
      </main>
      <Footer />
    </div>
  )
}

export default Index
