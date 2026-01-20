import { motion } from 'framer-motion';

const transitionVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '-100%',
  },
  exit: {
    y: '0%',
  },
};

const textVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.2, // Disappear quickly when doors start opening
    },
  },
  exit: {
    opacity: 1,
    transition: {
      delay: 0.2, // Wait for doors to start closing
      duration: 0.2,
    },
  },
};

const TransitionOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 flex"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Technical Text Overlay - Centered */}
      <motion.div
        variants={textVariants}
        className="absolute inset-0 flex items-center justify-center z-[51]"
      >
        <h2 className="text-xl md:text-3xl font-mono font-bold text-[#DC143C] tracking-widest uppercase animate-pulse">
          SYSTEM RELOADING...
        </h2>
      </motion.div>

      {/* 5 Vertical Columns */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={transitionVariants}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1], // Custom Bezier as requested
            delay: 0.1 * i, // Stagger effect
          }}
          className="relative h-full w-full bg-[#050505] border-r border-white/10 last:border-r-0"
        />
      ))}
    </motion.div>
  );
};

export default TransitionOverlay;
