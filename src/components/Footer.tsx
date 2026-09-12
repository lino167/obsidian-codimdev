import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { logoHorizontalDark, symbolDark } from '@/assets/logos'
import { CoordinatesDisplay } from '@/components/ui/hud-elements'
import { MapPin, Mail, Phone, Github, Linkedin, MessageCircle, Terminal } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-[#050505] text-neutral-400 font-mono overflow-hidden">
      {/* Upper Footer: Branding, Info & Links */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Slogan (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logoHorizontalDark}
                alt="CODIM DEV"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-white font-medium text-sm font-sans tracking-wide">
              Engenharia de Software & Soluções Operacionais de Precisão.
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-md">
              Aplicações web modernas, automações em Python, bots e integrações com inteligência artificial para otimizar fluxos de trabalho e eliminar gargalos operacionais.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-crimson shrink-0" />
              <span>Blumenau, SC – Brasil (Atendimento remoto para todo o país)</span>
            </div>
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs text-white uppercase font-bold tracking-widest border-l-2 border-crimson pl-2">
              NAVEGAÇÃO
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  &gt; Início
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  &gt; Sobre Mim (Operador)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  &gt; Serviços Oferecidos
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-white transition-colors">
                  &gt; Projetos & Cases
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  &gt; Diagnóstico & Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels & Direct Links (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs text-white uppercase font-bold tracking-widest border-l-2 border-crimson pl-2">
              CANAIS DIRETOS
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: (47) 9 9649-6281</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:zaca793@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-crimson" />
                  <span>zaca793@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lino167"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-neutral-300" />
                  <span>github.com/lino167</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/zacariaslino"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>linkedin.com/in/zacariaslino</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="border-t border-white/10 bg-black/80">
        <div className="container mx-auto py-5 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-[10px] md:text-xs text-neutral-500 order-3 md:order-1">
              <div className="flex items-center gap-2">
                <span>© {currentYear}</span>
                <img
                  src={symbolDark}
                  alt="CODIM"
                  className="h-4 w-4 opacity-80"
                />
              </div>
              <span className="opacity-90">
                CODIM DEV — Zacarias Lino. Todos os direitos reservados.
              </span>
            </div>

            {/* Coordinates */}
            <div className="order-1 md:order-2 scale-90 md:scale-100 flex justify-center">
              <CoordinatesDisplay />
            </div>

            {/* System Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-2 text-[10px] md:text-xs order-2 md:order-3 justify-center md:justify-end"
            >
              <span className="flex items-center gap-2 text-neutral-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 status-pulse" />
                <span>
                  CODIM_DEV <span className="text-crimson font-bold">v2.0</span>
                </span>
              </span>
              <span className="text-neutral-700">//</span>
              <span className="text-emerald-400 font-semibold">OPS_READY</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
