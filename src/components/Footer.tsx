import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoIcon from '@/assets/logo-icon.png'
import { CoordinatesDisplay } from '@/components/ui/hud-elements'

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-obsidian-light/50">
      {/* System Status Bar */}
      <div className="border-t border-border">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()}</span>
              <img src={logoIcon} alt="CODIM" className="h-6 w-6 opacity-70" />
              <span>CODIM DEV. Todos os direitos reservados.</span>
            </div>

            {/* Coordinates */}
            <CoordinatesDisplay />

            {/* System Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-4 font-mono text-xs"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 status-pulse" />
                <span>
                  CODIM_DEV <span className="text-primary">v1.0</span>
                </span>
              </span>
              <span className="text-muted-foreground/50">//</span>
              <span className="text-emerald-500">SYSTEM_OPERATIONAL</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
