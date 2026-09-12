import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Icon4DProps {
  icon: LucideIcon
  color?: string
  glowColor?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  floating?: boolean
  ambientGlow?: boolean
}

const sizeConfig = {
  sm: { container: 'w-10 h-10', iconSize: 'w-5 h-5', depth: 16 },
  md: { container: 'w-14 h-14', iconSize: 'w-7 h-7', depth: 24 },
  lg: { container: 'w-16 h-16', iconSize: 'w-8 h-8', depth: 32 },
  xl: { container: 'w-20 h-20', iconSize: 'w-10 h-10', depth: 40 },
}

export const Icon4D: React.FC<Icon4DProps> = ({
  icon: Icon,
  color = 'text-crimson',
  glowColor = 'rgba(186, 12, 16, 0.45)',
  size = 'md',
  className = '',
  floating = true,
  ambientGlow = true,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { container, iconSize, depth } = sizeConfig[size]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 18, stiffness: 180, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [depth, -depth]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-depth, depth]), springConfig)
  const lightX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%'])
  const lightY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex items-center justify-center [perspective:1000px] cursor-pointer ${container} ${className}`}
    >
      {ambientGlow && (
        <motion.div
          animate={
            floating
              ? {
                  scale: [1, 1.25, 1],
                  opacity: [0.35, 0.65, 0.35],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-2xl blur-xl pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}

      <motion.div
        animate={
          floating
            ? {
                rotateZ: [0, 360],
              }
            : {}
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -inset-2 rounded-2xl border border-white/[0.08] pointer-events-none opacity-40 [transform:rotateX(55deg)]"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={
          floating
            ? {
                y: [-4, 4, -4],
                rotateZ: [-1.5, 1.5, -1.5],
              }
            : {}
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.12,
          z: 50,
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
        className={`
          ${container}
          relative rounded-2xl flex items-center justify-center
          bg-gradient-to-br from-neutral-900/90 via-neutral-950/95 to-black
          border border-white/15
          shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)]
          backdrop-blur-xl group
        `}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%)',
          }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 blur-[2px]"
          style={{
            transform: 'translateZ(-15px) scale(0.9)',
          }}
        >
          <Icon className={`${iconSize} text-black filter blur-[3px]`} />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: 'translateZ(15px)',
          }}
        >
          <Icon
            className={`${iconSize} ${color} opacity-40 blur-[4px]`}
          />
        </div>

        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{
            transform: 'translateZ(30px)',
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <Icon
            className={`
              ${iconSize} ${color}
              drop-shadow-[0_0_12px_${glowColor}]
              transition-all duration-300
            `}
          />
        </motion.div>

        <div className="absolute top-1 left-1 w-1 h-1 bg-white/40 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40 rounded-full" />
      </motion.div>
    </div>
  )
}

export default Icon4D
