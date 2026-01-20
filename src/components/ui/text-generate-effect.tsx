import { useEffect, useState } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextGenerateEffectProps {
  words: string
  className?: string
  filter?: boolean
  duration?: number
}

export const TextGenerateEffect = ({
  words,
  className = '',
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(' ')

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration,
        delay: stagger(0.1),
      },
    )
  }, [animate, duration, filter])

  return (
    <motion.div ref={scope} className={className}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0"
          style={{
            filter: filter ? 'blur(10px)' : 'none',
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Typewriter effect for terminal-style text
export const TypewriterEffect = ({
  words,
  className = '',
  cursorClassName = '',
}: {
  words: { text: string; className?: string }[]
  className?: string
  cursorClassName?: string
}) => {
  const [currentTick, setCurrentTick] = useState(0)

  // Calculate total characters including spaces (if we want to account for gaps conceptually,
  // but here we just count characters in words)
  const totalChars = words.reduce((acc, word) => acc + word.text.length, 0)

  useEffect(() => {
    if (currentTick < totalChars) {
      const timeout = setTimeout(() => {
        setCurrentTick((prev) => prev + 1)
      }, 50) // Typing speed
      return () => clearTimeout(timeout)
    }
  }, [currentTick, totalChars])

  let charCount = 0

  return (
    <div
      className={cn(
        'inline-flex items-center flex-wrap justify-center gap-2',
        className,
      )}
    >
      {words.map((word, wordIdx) => {
        return (
          <span key={wordIdx} className={cn('inline-block', word.className)}>
            {word.text.split('').map((char, charIdx) => {
              const isVisible = charCount < currentTick
              charCount++
              return (
                <span
                  key={charIdx}
                  className={cn(
                    'transition-opacity duration-0',
                    isVisible ? 'opacity-100' : 'opacity-0 hidden',
                  )}
                >
                  {char}
                </span>
              )
            })}
          </span>
        )
      })}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'ml-1 inline-block h-[1em] w-[3px] bg-primary',
          cursorClassName,
        )}
      />
    </div>
  )
}

// Scramble/decrypt text effect
export const ScrambleText = ({
  text,
  className = '',
}: {
  text: string
  className?: string
}) => {
  const [displayText, setDisplayText] = useState('')
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789'

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(''),
      )

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)

    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{displayText}</span>
}
