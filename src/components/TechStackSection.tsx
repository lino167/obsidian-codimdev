import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Cpu } from "lucide-react";

// Technology icons as simple text representations for the infinite scroll
const technologies = [
  { name: "REACT", icon: <span className="text-lg font-bold">⚛</span> },
  { name: "TYPESCRIPT", icon: <span className="text-lg font-bold">TS</span> },
  { name: "NODE.JS", icon: <span className="text-lg font-bold">⬢</span> },
  { name: "PYTHON", icon: <span className="text-lg font-bold">🐍</span> },
  { name: "POSTGRESQL", icon: <span className="text-lg font-bold">🐘</span> },
  { name: "AWS", icon: <span className="text-lg font-bold">☁</span> },
  { name: "DOCKER", icon: <span className="text-lg font-bold">🐳</span> },
  { name: "FIGMA", icon: <span className="text-lg font-bold">◈</span> },
  { name: "NEXT.JS", icon: <span className="text-lg font-bold">▲</span> },
  { name: "TAILWIND", icon: <span className="text-lg font-bold">🌊</span> },
  { name: "GRAPHQL", icon: <span className="text-lg font-bold">◇</span> },
  { name: "REDIS", icon: <span className="text-lg font-bold">◆</span> },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian-light/20 to-background" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Cpu size={14} className="text-primary" />
            <span className="font-mono text-xs text-primary uppercase tracking-wider">
              TECH_STACK
            </span>
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Tecnologias & Ferramentas
          </h2>
        </motion.div>

        {/* Infinite Scroll - Direction 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InfiniteMovingCards
            items={technologies.slice(0, 6)}
            direction="left"
            speed="slow"
            className="mb-4"
          />
        </motion.div>

        {/* Infinite Scroll - Direction 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InfiniteMovingCards
            items={technologies.slice(6, 12)}
            direction="right"
            speed="slow"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
