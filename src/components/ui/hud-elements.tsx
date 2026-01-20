import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Corner brackets HUD element
export const CornerBrackets = () => {
  return (
    <>
      {/* Top Left */}
      <div className="fixed top-4 left-4 z-50 pointer-events-none">
        <div className="w-8 h-8 border-l-2 border-t-2 border-border/50" />
      </div>
      
      {/* Top Right */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <div className="w-8 h-8 border-r-2 border-t-2 border-border/50" />
      </div>
      
      {/* Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
        <div className="w-8 h-8 border-l-2 border-b-2 border-border/50" />
      </div>
      
      {/* Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
        <div className="w-8 h-8 border-r-2 border-b-2 border-border/50" />
      </div>
    </>
  );
};

// Coordinates display that changes
export const CoordinatesDisplay = () => {
  const [coords, setCoords] = useState({ x: "0000", y: "0000", z: "0000" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x: Math.floor(Math.random() * 10000).toString().padStart(4, "0"),
        y: Math.floor(Math.random() * 10000).toString().padStart(4, "0"),
        z: Math.floor(Math.random() * 10000).toString().padStart(4, "0"),
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] text-muted-foreground/50 flex items-center gap-4">
      <span>X:{coords.x}</span>
      <span>Y:{coords.y}</span>
      <span>Z:{coords.z}</span>
    </div>
  );
};

// Vertical grid lines
export const GridLines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Vertical lines */}
      <div className="absolute inset-0 flex justify-between px-[10%]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-px h-full bg-white/[0.02]" />
        ))}
      </div>
      
      {/* Horizontal accent lines */}
      <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
    </div>
  );
};

// System status indicator
export const SystemIndicator = ({ label, value, status = "active" }: { label: string; value: string; status?: "active" | "warning" | "error" }) => {
  const statusColors = {
    active: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className={`h-1.5 w-1.5 rounded-full ${statusColors[status]} status-pulse`} />
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
};

// Data stream effect
export const DataStream = ({ className = "" }: { className?: string }) => {
  const [chars, setChars] = useState<string[]>([]);
  const characters = "01";

  useEffect(() => {
    const generateChars = () => {
      return Array.from({ length: 50 }, () => 
        characters[Math.floor(Math.random() * characters.length)]
      );
    };
    
    setChars(generateChars());
    const interval = setInterval(() => {
      setChars(generateChars());
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-mono text-[8px] text-primary/20 overflow-hidden whitespace-nowrap ${className}`}>
      {chars.join(" ")}
    </div>
  );
};

// Glitch text effect
export const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        x: [0, -2, 2, 0],
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 5,
      }}
    >
      {children}
      <span className="absolute top-0 left-0 text-primary/50 clip-glitch-1" aria-hidden>
        {children}
      </span>
      <span className="absolute top-0 left-0 text-cyan-500/50 clip-glitch-2" aria-hidden>
        {children}
      </span>
    </motion.span>
  );
};
