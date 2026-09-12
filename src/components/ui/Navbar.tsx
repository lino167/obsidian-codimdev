import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Terminal, Code2, Briefcase, User, Mail, MessageSquareCode } from 'lucide-react'
import { logoHorizontalDark, symbolDark } from '@/assets/logos'
import { useLanguage } from '@/hooks/use-language'
import { LanguageToggle } from '@/components/LanguageToggle'

const navConfig = [
  { key: 'home', hash: 'top', icon: Terminal },
  { key: 'services', hash: 'servicos', icon: Code2 },
  { key: 'work', hash: 'projetos', icon: Briefcase },
  { key: 'about', hash: 'sobre', icon: User },
  { key: 'contact', hash: 'contato', icon: Mail },
] as const

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('top')
  const { t } = useLanguage()

  // Track active section via scroll on home page
  useEffect(() => {
    if (pathname !== '/') return

    const handleScroll = () => {
      const sections = ['top', 'servicos', 'projetos', 'sobre', 'contato']
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec === 'top') {
          if (window.scrollY < 300) {
            setActiveSection('top')
            break
          }
        } else {
          const el = document.getElementById(sec)
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(sec)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Hide Navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === '/') {
      e.preventDefault()
      if (hash === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setActiveSection(hash)
    } else {
      navigate(`/#${hash}`)
    }
  }

  return (
    <div className="fixed top-6 sm:top-10 inset-x-0 max-w-5xl mx-auto z-[100] px-3 sm:px-4 pointer-events-none">
      <nav
        className="
          pointer-events-auto
          flex items-center justify-between p-1.5 sm:p-2 rounded-full
          bg-black/70 backdrop-blur-md border border-white/[0.12]
          shadow-[0_0_25px_-10px_rgba(186,12,16,0.35)]
        "
      >
        {/* Logo Section */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="pl-2 sm:pl-4 pr-1 sm:pr-4 group relative shrink-0"
        >
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Desktop / Tablet Logo (Horizontal) */}
            <img
              src={logoHorizontalDark}
              alt="CODIM DEV Logo"
              className="hidden md:block h-7 sm:h-9 w-auto object-contain"
            />
            {/* Mobile Logo (Icon Only) */}
            <img
              src={symbolDark}
              alt="CODIM DEV Icon"
              className="block md:hidden h-7 w-auto object-contain"
            />
          </motion.div>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar">
          {navConfig.map((item) => {
            const isActive = pathname === '/' ? activeSection === item.hash : false
            const Icon = item.icon
            const itemName = t.navbar[item.key]

            return (
              <a
                key={item.hash}
                href={`#${item.hash}`}
                onClick={(e) => handleNavClick(e, item.hash)}
                className={cn(
                  'relative px-2 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium font-mono transition-colors duration-200 shrink-0 cursor-pointer',
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white',
                )}
                onMouseEnter={() => setHoveredPath(item.hash)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Liquid Hover Background */}
                <AnimatePresence>
                  {hoveredPath === item.hash && (
                    <motion.span
                      className="absolute inset-0 bg-neutral-800/60 rounded-full -z-10"
                      layoutId="navbar-hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Active State Indicator (Underline) */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute bottom-1 left-0 right-0 h-[2px] bg-crimson mx-3 shadow-[0_0_8px_#BA0C10]"
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="hidden sm:inline">{itemName}</span>
                  <span className="sm:hidden">
                    <Icon size={16} />
                  </span>
                </span>
              </a>
            )
          })}
        </div>

        {/* Right Section: WhatsApp Button & Language Toggle */}
        <div className="flex items-center gap-2 pr-1 sm:pr-2 pl-1 sm:pl-2 border-l border-white/10 shrink-0">
          <a
            href="https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-medium transition-all shadow-sm"
          >
            <MessageSquareCode size={14} />
            <span>WhatsApp</span>
          </a>

          <div>
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
