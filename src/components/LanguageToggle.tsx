import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'

const FlagBR = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="24" rx="2" fill="#009C3B" />
    <path d="M16 4L27 12L16 20L5 12L16 4Z" fill="#FFDF00" />
    <circle cx="16" cy="12" r="3.5" fill="#002776" />
    <path
      d="M14.5 12C14.5 12 15 11 17.5 11"
      stroke="white"
      strokeWidth="0.5"
      strokeLinecap="round"
    />
  </svg>
)

const FlagUS = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="24" rx="2" fill="#B22234" />
    <path d="M0 0H32V2.4H0V0Z" fill="white" />
    <path d="M0 4.8H32V7.2H0V4.8Z" fill="white" />
    <path d="M0 9.6H32V12H0V9.6Z" fill="white" />
    <path d="M0 14.4H32V16.8H0V14.4Z" fill="white" />
    <path d="M0 19.2H32V21.6H0V19.2Z" fill="white" />
    <rect width="14" height="13" fill="#3C3B6E" />
    <circle cx="3" cy="3" r="0.5" fill="white" />
    <circle cx="7" cy="3" r="0.5" fill="white" />
    <circle cx="11" cy="3" r="0.5" fill="white" />
    <circle cx="5" cy="5" r="0.5" fill="white" />
    <circle cx="9" cy="5" r="0.5" fill="white" />
    <circle cx="3" cy="7" r="0.5" fill="white" />
    <circle cx="7" cy="7" r="0.5" fill="white" />
    <circle cx="11" cy="7" r="0.5" fill="white" />
  </svg>
)

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center p-2 rounded-sm font-mono text-xs overflow-hidden group transition-colors select-none"
    >
      {/* Background Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Flag Container */}
      <div className="relative z-10 flex items-center justify-center w-6 h-4">
        <motion.div
          key={language}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute inset-0"
        >
          {language === 'pt' ? (
            <FlagBR className="w-full h-full shadow-sm" />
          ) : (
            <FlagUS className="w-full h-full shadow-sm" />
          )}
        </motion.div>
      </div>

      {/* Active Indicator Line */}
      <motion.div
        layoutId="active-lang-indicator"
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BA0C10] shadow-[0_0_8px_#BA0C10]"
      />
    </button>
  )
}
