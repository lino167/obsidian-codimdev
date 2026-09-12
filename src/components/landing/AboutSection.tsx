import React from 'react'
import { motion } from 'framer-motion'
import ceoCodim from '@/assets/ceo-codim.png'
import { Wrench, Code2, GraduationCap, MapPin, CheckCircle, ArrowRight, MessageSquareCode, Cog, Cpu } from 'lucide-react'
import { Icon4D } from '@/components/ui/Icon4D'

export const AboutSection = () => {
  return (
    <section id="sobre" className="py-28 px-4 sm:px-6 bg-[#050505] relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Image & Badges (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_-10px_rgba(186,12,16,0.3)] group">
              <img
                src={ceoCodim}
                alt="Zacarias Lino - Engenheiro de Software & Automação"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white font-display font-bold text-xl">Zacarias Lino</div>
                <div className="text-crimson font-mono text-xs mt-0.5">Engenharia de Software & Ops-Tech</div>
                <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-crimson" /> Blumenau, SC – Brasil
                </div>
              </div>
            </div>

            {/* Quick credibility pills below image with 4D Icons */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-4">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 flex items-center gap-3">
                <Icon4D
                  icon={Cog}
                  color="text-crimson"
                  glowColor="rgba(186, 12, 16, 0.5)"
                  size="sm"
                  floating={true}
                />
                <div>
                  <div className="text-base font-bold text-white font-mono">10+ Anos</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Vivência Industrial</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 flex items-center gap-3">
                <Icon4D
                  icon={GraduationCap}
                  color="text-emerald-400"
                  glowColor="rgba(16, 185, 129, 0.5)"
                  size="sm"
                  floating={true}
                />
                <div>
                  <div className="text-base font-bold text-emerald-400 font-mono">UniCesumar</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Eng. Software</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Bio & The Practical Advantage (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crimson/30 bg-crimson/5 text-crimson font-mono text-xs uppercase tracking-wider mb-4">
                SOBRE O DESENVOLVEDOR
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Engenharia de Precisão Aplicada ao Software
              </h2>
              <p className="text-crimson font-mono text-sm sm:text-base mt-2 font-medium">
                ZACARIAS LINO // DA MECÂNICA INDUSTRIAL AO DESENVOLVIMENTO FULL-STACK
              </p>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              <p className="p-4 rounded-xl bg-neutral-950 border-l-4 border-crimson border-y border-r border-white/5 text-white font-medium">
                Engenheiro de Software em formação (UniCesumar) com mais de 10 anos de vivência no setor industrial e manutenção mecânica.
              </p>
              
              <p>
                Essa trajetória traz um diferencial claro para o desenvolvimento de software: <strong className="text-white font-semibold">foco absoluto em confiabilidade, arquitetura limpa e resolução de problemas reais de alta complexidade</strong>. Em vez de criar apenas interfaces visuais, construo ferramentas que resolvem gargalos de produção, reduzem retrabalho manual e geram retorno tangível para a operação.
              </p>

              <p>
                Atualmente atuo no desenvolvimento de sistemas web completos, bots de automação (Telegram/RPA) e pipelines de dados com integração a modelos de inteligência artificial.
              </p>
            </div>

            {/* Diferenciais em Destaque */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-300 font-sans">
                  Entendimento de processos fabris, fluxos de OS e chão de fábrica.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-300 font-sans">
                  Arquitetura moderna e código limpo com TypeScript e Python.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-300 font-sans">
                  Sistemas testados com foco em estabilidade e segurança RLS.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-300 font-sans">
                  Comunicação direta e objetiva, sem intermediários.
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-crimson hover:bg-red-700 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageSquareCode className="w-4 h-4" />
                Conversar Comigo no WhatsApp
              </a>

              <a
                href="https://linkedin.com/in/zacariaslino"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white font-mono text-xs transition-colors"
              >
                Ver Trajetória no LinkedIn <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
