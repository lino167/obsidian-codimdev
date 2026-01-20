import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cog, Code, Zap, Target } from "lucide-react";

const features = [
  {
    icon: Cog,
    title: "Mecânica Industrial",
    description: "Background em engenharia mecânica aplicado à arquitetura de software."
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Desenvolvimento completo do frontend ao backend com tecnologias modernas."
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Sistemas otimizados para velocidade e eficiência operacional."
  },
  {
    icon: Target,
    title: "Precisão",
    description: "Cada linha de código é projetada com propósito e documentação."
  }
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <div className="container">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">Sobre</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Não entregamos apenas código.
              <br />
              <span className="text-muted-foreground">Entregamos arquitetura.</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              A CODIM DEV une a precisão da engenharia mecânica industrial com o poder do 
              desenvolvimento full-stack moderno. Cada projeto é tratado como um sistema 
              complexo que precisa ser projetado, não apenas construído.
            </p>

            <div className="flex items-center gap-4 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">5+ anos de experiência</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">50+ projetos entregues</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group p-6 border border-border bg-card hover:border-primary/30 transition-colors duration-300"
              >
                <feature.icon 
                  size={24} 
                  className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300" 
                />
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};

export default AboutSection;
