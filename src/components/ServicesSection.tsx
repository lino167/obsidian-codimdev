import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Database, Palette, Code, Cpu, Layers } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const services = [
  {
    icon: <Globe size={24} />,
    title: "Desenvolvimento Web & SaaS",
    description: "Aplicações web modernas e plataformas SaaS escaláveis com React, Node.js e infraestrutura cloud.",
    status: "ONLINE",
    load: "LOAD: 42%",
    version: "v3.2",
    className: "md:col-span-2",
  },
  {
    icon: <Database size={24} />,
    title: "Sistemas de Gestão",
    description: "ERPs e CRMs customizados para otimizar operações empresariais.",
    status: "ACTIVE",
    load: "LOAD: 38%",
    version: "v2.1",
    className: "md:col-span-1",
  },
  {
    icon: <Palette size={24} />,
    title: "Design de Identidade",
    description: "Criação de identidades visuais que comunicam solidez e tecnologia.",
    status: "READY",
    load: "QUEUE: 3",
    version: "v1.5",
    className: "md:col-span-1",
  },
  {
    icon: <Cpu size={24} />,
    title: "Automação & Integração",
    description: "APIs robustas e integrações entre sistemas para fluxos automatizados.",
    status: "SYNC",
    load: "LOAD: 27%",
    version: "v4.0",
    className: "md:col-span-1",
  },
  {
    icon: <Layers size={24} />,
    title: "Arquitetura de Sistemas",
    description: "Design de arquiteturas escaláveis, documentação técnica e consultoria.",
    status: "ACTIVE",
    load: "PROC: OK",
    version: "v2.8",
    className: "md:col-span-1",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="relative py-24 md:py-32 bg-obsidian-light/30">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Code size={14} className="text-primary" />
            <span className="font-mono text-xs text-primary uppercase tracking-wider">
              SERVICES_MODULE
            </span>
            <span className="font-mono text-[10px] text-emerald-500 border border-emerald-500/30 px-2 py-0.5">
              OPERATIONAL
            </span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Soluções de <span className="text-gradient-crimson">Engenharia</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-mono">
            {"// Cada serviço é projetado como um sistema integrado"}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-5xl mx-auto">
          {services.map((service, i) => (
            <BentoGridItem
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              status={service.status}
              load={service.load}
              version={service.version}
              className={service.className}
            />
          ))}
        </BentoGrid>
      </div>

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};

export default ServicesSection;
