import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Terminal, Code2, Briefcase, User, Mail } from 'lucide-react'
import logoHorizontal from '@/assets/logo-horizontal.png'

const navItems = [
  { name: 'Home', path: '/', icon: Terminal },
  { name: 'Services', path: '/services', icon: Code2 },
  { name: 'Work', path: '/work', icon: Briefcase },
  { name: 'About', path: '/about', icon: User },
  { name: 'Contact', path: '/contact', icon: Mail },
]

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  return (
    <div className="fixed top-10 inset-x-0 max-w-2xl mx-auto z-[100] px-4 pointer-events-none">
      <nav
        className="
          pointer-events-auto
          flex items-center justify-between p-2 rounded-full
          bg-black/50 backdrop-blur-md border border-white/[0.1]
          shadow-[0_0_20px_-10px_rgba(186,12,16,0.3)]
        "
      >
        {/* Logo Section */}
        <Link to="/" className="pl-4 pr-6 group relative overflow-hidden">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={logoHorizontal}
              alt="CODIM DEV Logo"
              className="h-12 w-auto object-contain"
            />
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative px-4 py-2 rounded-full text-sm font-medium font-mono transition-colors duration-200',
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white',
                )}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Liquid Hover Background */}
                <AnimatePresence>
                  {hoveredPath === item.path && (
                    <motion.span
                      className="absolute inset-0 bg-neutral-800/50 rounded-full -z-10"
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
                    className="absolute bottom-1.5 left-0 right-0 h-[2px] bg-[#BA0C10] mx-4 shadow-[0_0_8px_#BA0C10]"
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="sm:hidden">
                    <Icon size={18} />
                  </span>
                </motion.span>
              </Link>
            )
          })}
        </div>

        {/* Status Indicator */}
        <div className="pr-2 pl-2 border-l border-white/10 hidden sm:block">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
        </div>
      </nav>
    </div>
  )
}
