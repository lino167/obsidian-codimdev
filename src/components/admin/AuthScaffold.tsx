import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { GridLines, DataStream } from '@/components/ui/hud-elements'
import { cn } from '@/lib/utils'

type AuthScaffoldProps = {
  children: ReactNode
  className?: string
}

export default function AuthScaffold({
  children,
  className,
}: AuthScaffoldProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-[#050505] relative flex items-center justify-center p-4 overflow-hidden',
        className,
      )}
    >
      <div className="absolute inset-0 blueprint-grid opacity-[0.16]" />
      <GridLines />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 1px, rgba(0,0,0,0) 4px, rgba(0,0,0,0) 7px)',
        }}
      />

      <motion.div
        className="absolute inset-x-0 -top-1/2 h-[200%] pointer-events-none opacity-[0.09]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(186,12,16,0) 0%, rgba(186,12,16,0.15) 50%, rgba(186,12,16,0) 100%)',
        }}
        animate={{ y: ['-25%', '25%'] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="absolute left-0 right-0 top-6 px-6 pointer-events-none">
        <DataStream className="opacity-60" />
      </div>
      <div className="absolute left-0 right-0 bottom-6 px-6 pointer-events-none">
        <DataStream className="opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-md">{children}</div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-32 w-32 border-l border-t border-[#BA0C10]/20" />
        <div className="absolute top-0 right-0 h-32 w-32 border-r border-t border-[#BA0C10]/20" />
        <div className="absolute bottom-0 left-0 h-32 w-32 border-l border-b border-[#BA0C10]/20" />
        <div className="absolute bottom-0 right-0 h-32 w-32 border-r border-b border-[#BA0C10]/20" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#BA0C10]/[0.06] rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
