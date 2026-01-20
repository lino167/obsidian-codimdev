import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const projects = [
  {
    id: 1,
    title: "Industrial Dashboard",
    description: "Sistema de monitoramento em tempo real para linhas de produção industrial.",
    tags: ["REACT", "TYPESCRIPT", "WEBSOCKET"],
    category: "WEB_APP",
    year: "2024",
    metrics: { users: "500+", uptime: "99.9%" },
  },
  {
    id: 2,
    title: "ERP Manufatura",
    description: "Sistema de gestão empresarial customizado para indústria de manufatura.",
    tags: ["NODE.JS", "POSTGRESQL", "REACT"],
    category: "ENTERPRISE",
    year: "2024",
    metrics: { transactions: "1M+", modules: "12" },
  },
  {
    id: 3,
    title: "Brand Identity System",
    description: "Sistema completo de identidade visual para empresa de tecnologia.",
    tags: ["BRANDING", "FIGMA", "DESIGN"],
    category: "DESIGN",
    year: "2023",
    metrics: { assets: "200+", variants: "24" },
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <Folder size={14} className="text-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">
                PORTFOLIO_INDEX
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                [{projects.length} ENTRIES]
              </span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Projetos <span className="text-gradient-crimson">Selecionados</span>
            </h2>
          </div>

          <a 
            href="#contato"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-primary">&gt;</span> VER_TODOS
            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.15 }}
            >
              <CardContainer className="inter-var">
                <CardBody className="bg-card relative group/card border border-border w-auto h-auto p-6 hover:border-primary/30 transition-colors">
                  {/* Header */}
                  <CardItem
                    translateZ="50"
                    className="w-full flex items-center justify-between mb-4"
                  >
                    <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-1">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {project.year}
                    </span>
                  </CardItem>

                  {/* Project image placeholder */}
                  <CardItem
                    translateZ="100"
                    className="w-full aspect-video bg-gradient-to-br from-secondary to-charcoal rounded-sm overflow-hidden mb-4"
                  >
                    <div className="w-full h-full blueprint-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-xs text-muted-foreground/50">
                        [{project.title.toUpperCase()}]
                      </span>
                    </div>
                  </CardItem>

                  {/* Title */}
                  <CardItem
                    translateZ="60"
                    className="font-display text-xl font-semibold text-foreground group-hover/card:text-primary transition-colors mb-2"
                  >
                    {project.title}
                  </CardItem>

                  {/* Description */}
                  <CardItem
                    as="p"
                    translateZ="40"
                    className="text-sm text-muted-foreground leading-relaxed mb-4"
                  >
                    {project.description}
                  </CardItem>

                  {/* Tags */}
                  <CardItem translateZ="30" className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag text-[10px]">
                        [{tag}]
                      </span>
                    ))}
                  </CardItem>

                  {/* Metrics */}
                  <CardItem translateZ="20" className="w-full flex items-center gap-4 pt-4 border-t border-border">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="font-mono text-[10px]">
                        <span className="text-muted-foreground uppercase">{key}:</span>
                        <span className="text-foreground ml-1">{value}</span>
                      </div>
                    ))}
                  </CardItem>

                  {/* Action buttons */}
                  <CardItem
                    translateZ="80"
                    className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity"
                  >
                    <button className="p-2 border border-border bg-background/90 hover:border-primary transition-colors">
                      <ExternalLink size={14} />
                    </button>
                    <button className="p-2 border border-border bg-background/90 hover:border-primary transition-colors">
                      <Github size={14} />
                    </button>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};

export default PortfolioSection;
