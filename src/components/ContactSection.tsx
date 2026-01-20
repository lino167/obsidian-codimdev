import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contato" className="relative py-24 md:py-32 bg-obsidian-light/30">
      <div className="container">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">Contato</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Vamos construir
              <br />
              <span className="text-muted-foreground">algo sólido juntos.</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Pronto para transformar sua ideia em um sistema robusto? 
              Entre em contato para discutirmos seu projeto.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 border border-border bg-secondary">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground block mb-1">EMAIL</span>
                  <a href="mailto:contato@codim.dev" className="text-foreground hover:text-primary transition-colors">
                    contato@codim.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 border border-border bg-secondary">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground block mb-1">LOCALIZAÇÃO</span>
                  <span className="text-foreground">Brasil // Remote Worldwide</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-10 pt-10 border-t border-border">
              <span className="font-mono text-xs text-muted-foreground block mb-4">LINKS RÁPIDOS</span>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Instagram <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="border border-border bg-card p-8">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="font-mono text-xs text-muted-foreground block mb-2">
                    NOME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="font-mono text-xs text-muted-foreground block mb-2">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Project Type Field */}
                <div>
                  <label htmlFor="project" className="font-mono text-xs text-muted-foreground block mb-2">
                    TIPO DE PROJETO
                  </label>
                  <select
                    id="project"
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="web">Desenvolvimento Web / SaaS</option>
                    <option value="erp">Sistema de Gestão (ERP/CRM)</option>
                    <option value="design">Design de Identidade Visual</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="font-mono text-xs text-muted-foreground block mb-2">
                    MENSAGEM *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Conte sobre seu projeto..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-crimson-glow transition-all duration-300 crimson-glow"
                >
                  Enviar Mensagem
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
