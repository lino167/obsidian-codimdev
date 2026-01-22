import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoIcon from '@/assets/logo-icon.png'
import { CoordinatesDisplay } from '@/components/ui/hud-elements'

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-obsidian-light/50 overflow-hidden">
      {/* System Status Bar */}
      <div className="border-t border-border">
        <div className="container py-8 md:py-10 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 font-mono text-[10px] md:text-xs text-muted-foreground order-3 md:order-1 w-full md:w-auto justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()}</span>
                <img
                  src={logoIcon}
                  alt="CODIM"
                  className="h-5 w-5 md:h-6 md:w-6 opacity-70"
                />
              </div>
              <span className="opacity-80 px-2 md:px-0 max-w-[200px] sm:max-w-none leading-tight">
                CODIM DEV. Todos os direitos reservados.
              </span>
            </div>

            {/* Coordinates - Center on Desktop */}
            <div className="order-1 md:order-2 scale-90 md:scale-100 w-full md:w-auto flex justify-center">
              <CoordinatesDisplay />
            </div>

            {/* System Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs order-2 md:order-3 w-full md:w-auto justify-center md:justify-end"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 status-pulse" />
                <span>
                  CODIM_DEV <span className="text-primary">v1.0</span>
                </span>
              </span>
              <span className="hidden sm:inline text-muted-foreground/50">
                //
              </span>
              <span className="text-emerald-500">SYSTEM_OPERATIONAL</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
