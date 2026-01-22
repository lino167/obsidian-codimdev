import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center gap-2 px-3 py-1.5 bg-black/50 border border-white/10 rounded-sm font-mono text-xs overflow-hidden group hover:border-white/30 transition-colors select-none"
    >
      {/* Background Scanline Effect (optional, simulated with opacity) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* PT Segment */}
      <div className="relative z-10 flex items-center">
        <motion.span
          animate={{
            color: language === 'pt' ? '#BA0C10' : '#404040',
            textShadow:
              language === 'pt' ? '0 0 8px rgba(186,12,16,0.6)' : 'none',
            opacity: language === 'pt' ? 1 : 0.5,
          }}
          className="font-bold transition-all duration-300"
        >
          [ BR ]
        </motion.span>
      </div>

      {/* Separator */}
      <span className="text-white/10 mx-1">|</span>

      {/* EN Segment */}
      <div className="relative z-10 flex items-center">
        <motion.span
          animate={{
            color: language === 'en' ? '#BA0C10' : '#404040',
            textShadow:
              language === 'en' ? '0 0 8px rgba(186,12,16,0.6)' : 'none',
            opacity: language === 'en' ? 1 : 0.5,
          }}
          className="font-bold transition-all duration-300"
        >
          [ EN ]
        </motion.span>
      </div>

      {/* Active Indicator Line */}
      <motion.div
        layoutId="active-lang-indicator"
        className="absolute bottom-0 h-[2px] bg-[#BA0C10] shadow-[0_0_8px_#BA0C10]"
        initial={false}
        animate={{
          left: language === 'pt' ? '10%' : '60%',
          width: '30%',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  )
}
