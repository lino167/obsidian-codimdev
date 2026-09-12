import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Workflow, BrainCircuit, Database, CheckCircle2, ArrowRight } from 'lucide-react'
import { Icon4D } from '@/components/ui/Icon4D'

const services = [
  {
    id: 'fullstack',
    icon: Code2,
    badge: 'APLICAÇÕES & DASHBOARDS',
    color: 'text-cyan-400',
    glowColor: 'rgba(34, 211, 238, 0.5)',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/50',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    title: 'Desenvolvimento Web Full-Stack',
    pain: 'Planilhas dispersas, sistemas lentos ou falta de um painel central para a equipe.',
    solution:
      'Criação de painéis administrativos, dashboards e aplicações web modernas, responsivas e seguras utilizando React, TypeScript, Tailwind CSS e Supabase (PostgreSQL).',
    deliverables: [
      'Dashboards operacionais e gerenciais em tempo real',
      'Painéis administrativos sob medida para seu negócio',
      'Autenticação e controle granular de permissões',
      'Interfaces intuitivas com foco na produtividade da equipe',
    ],
  },
  {
    id: 'automation',
    icon: Workflow,
    badge: 'RPA & OPS-TECH',
    color: 'text-crimson',
    glowColor: 'rgba(186, 12, 16, 0.55)',
    borderColor: 'border-crimson/20 hover:border-crimson/50',
    badgeBg: 'bg-crimson/10 text-crimson border-crimson/30',
    title: 'Automações de Processos & Bots',
    pain: 'Tarefas manuais repetitivas, perda de prazos e retrabalho operacional diário.',
    solution:
      'Desenvolvimento de robôs em Python (Telegram Bots, web scraping, alertas automáticos e webhooks) para eliminar rotinas manuais e integrar sistemas legados a canais modernos.',
    deliverables: [
      'Robôs operacionais em Python e Telegram Bot API',
      'Web scraping e coleta contínua de dados da internet',
      'Webhooks e notificações automáticas em tempo real',
      'Eliminação de erros humanos e ganho de horas semanais',
    ],
  },
  {
    id: 'ai',
    icon: BrainCircuit,
    badge: 'INTELIGÊNCIA ARTIFICIAL',
    color: 'text-purple-400',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    borderColor: 'border-purple-500/20 hover:border-purple-500/50',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    title: 'Integração de IA & Busca Semântica (RAG)',
    pain: 'Dificuldade de encontrar informações em dezenas de manuais e lentidão no suporte a operadores.',
    solution:
      'Implementação de assistentes inteligentes com busca semântica em documentos (RAG), consulta a manuais operacionais em linguagem natural e integração com Edge Functions e APIs REST.',
    deliverables: [
      'Busca semântica inteligente em PDFs e manuais técnicos',
      'Respostas fundamentadas nos documentos da sua empresa',
      'Integração de modelos de linguagem (OpenAI, Claude, Gemini)',
      'Edge Functions rápidas e APIs REST bem estruturadas',
    ],
  },
  {
    id: 'database',
    icon: Database,
    badge: 'BANCO DE DADOS & SEGURANÇA',
    color: 'text-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.5)',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/50',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    title: 'Modelagem & Otimização de Banco de Dados',
    pain: 'Consultas lentas, dados desorganizados e risco de vazamento entre usuários.',
    solution:
      'Estruturação de bancos relacionais com PostgreSQL/Supabase, políticas granulares de segurança (Row Level Security - RLS) e funções RPC de alto desempenho.',
    deliverables: [
      'Modelagem relacional robusta em PostgreSQL & Supabase',
      'Políticas de segurança por usuário (Row Level Security - RLS)',
      'Funções RPC e stored procedures de alta performance',
      'Otimização de consultas para suportar o crescimento da operação',
    ],
  },
]

export const ServicesSection = () => {
  return (
    <section id="servicos" className="py-28 px-4 sm:px-6 bg-[#050505] relative border-t border-white/5 scroll-mt-20">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-crimson/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-crimson/30 bg-crimson/5 text-crimson font-mono text-xs uppercase tracking-wider mb-4">
            SERVIÇOS & SOLUÇÕES OPERACIONAIS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Como Posso Resolver os Gargalos do Seu Negócio
          </h2>
          <p className="mt-4 text-neutral-400 font-sans text-base sm:text-lg leading-relaxed font-light">
            Sem enrolação ou sistemas inflados: foco absoluto em construir ferramentas práticas que reduzem custos, eliminam tarefas manuais e organizam sua operação.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 sm:p-10 rounded-2xl bg-neutral-950/90 border ${svc.borderColor} transition-all duration-300 flex flex-col justify-between backdrop-blur-sm group hover:-translate-y-1 shadow-lg`}
              >
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider font-semibold ${svc.badgeBg}`}>
                      {svc.badge}
                    </span>
                    <Icon4D
                      icon={Icon}
                      color={svc.color}
                      glowColor={svc.glowColor}
                      size="md"
                      floating={true}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white font-display mb-4 group-hover:text-white transition-colors">
                    {svc.title}
                  </h3>

                  {/* Pain Box */}
                  <div className="mb-5 p-3.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs font-mono text-red-300/90">
                    <span className="font-bold text-red-400">O Problema que você enfrenta:</span>{' '}
                    {svc.pain}
                  </div>

                  {/* Solution Text */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
                    {svc.solution}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold mb-2">
                      O que você recebe:
                    </div>
                    {svc.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA Link */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">MÓDULO 0{idx + 1}</span>
                  <a
                    href={`https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20tenho%20interesse%20no%20servi%C3%A7o%20de%20${encodeURIComponent(svc.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-crimson hover:text-white transition-colors group/link"
                  >
                    Falar sobre esta solução <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
