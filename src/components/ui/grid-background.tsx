import { motion } from "framer-motion";

export const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(186, 12, 16, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(186, 12, 16, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Larger grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/30 to-transparent"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-crimson/20 to-transparent"
        initial={{ left: "0%" }}
        animate={{ left: "100%" }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--obsidian))_70%)]" />
    </div>
  );
};

export const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Beam 1 */}
      <motion.div
        className="absolute h-[2px] w-[400px] bg-gradient-to-r from-transparent via-crimson/50 to-transparent rotate-45"
        style={{ top: "20%", left: "-200px" }}
        animate={{
          x: [0, 1500],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
      
      {/* Beam 2 */}
      <motion.div
        className="absolute h-[1px] w-[300px] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-12"
        style={{ top: "40%", right: "-150px" }}
        animate={{
          x: [0, -1200],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
      />

      {/* Beam 3 */}
      <motion.div
        className="absolute h-[1px] w-[500px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent rotate-[30deg]"
        style={{ bottom: "30%", left: "-250px" }}
        animate={{
          x: [0, 1800],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
