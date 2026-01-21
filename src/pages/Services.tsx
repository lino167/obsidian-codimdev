import React from 'react'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { cn } from '@/lib/utils'
import {
  Check,
  Terminal,
  Network,
  ShieldCheck,
  Cpu,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Services = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-[#BA0C10] selection:text-white">
      {/* HEADER */}
      <div className="w-full max-w-4xl mx-auto px-6 pt-28 pb-10">
        <div className="border-b border-neutral-800 pb-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white mb-2">
            CAPACIDADES <span className="text-[#BA0C10]">OPERACIONAIS</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm md:text-base tracking-wider uppercase">
            Arquitetura detalhada dos módulos de serviço.
          </p>
        </div>
      </div>

      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {/* BLOCO A: ENGENHARIA DE SOFTWARE */}
          <div className="mb-24 relative group">
            <div className="absolute -left-12 top-0 text-xs font-mono text-neutral-600 hidden md:block rotate-90 origin-top-left translate-y-12">
              REF-2024-ENG
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 rounded bg-[#BA0C10]/10 border border-[#BA0C10]/20 text-[#BA0C10] text-xs font-mono font-bold">
                [ARCH: ROBUST]
              </span>
              <Terminal className="w-4 h-4 text-neutral-500" />
            </div>

            <h2 className="text-3xl font-display font-bold mb-6 text-neutral-100">
              Desenvolvimento de Aplicações Críticas
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="prose prose-invert prose-sm text-neutral-400">
                <p>
                  Não construímos apenas sites; projetamos{' '}
                  <span className="text-white font-medium">sistemas vivos</span>
                  . Nossa engenharia foca na resiliência e escalabilidade.
                </p>
                <p>
                  Utilizamos <span className="text-[#BA0C10]">Next.js</span>{' '}
                  para renderização híbrida de alta performance e
                  <span className="text-[#BA0C10]"> Supabase</span> para
                  persistência de dados em tempo real com segurança Row Level
                  Security (RLS).
                </p>
                <ul className="list-none pl-0 space-y-2 mt-4 font-mono text-xs text-neutral-500">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#BA0C10]" /> Painéis
                    Administrativos (Dashboards)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#BA0C10]" /> SaaS (Software
                    as a Service)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#BA0C10]" /> Aplicações
                    Progressivas (PWA)
                  </li>
                </ul>
              </div>

              {/* Visual: Code Snippet */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 font-mono text-xs overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-[#BA0C10]" />
                <div className="flex gap-1.5 mb-3 opacity-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="space-y-1 text-neutral-400">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-yellow-200">SystemCore</span> ={' '}
                    <span className="text-purple-400">async</span> () ={'>'}{' '}
                    {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">const</span> data ={' '}
                    <span className="text-purple-400">await</span> db.
                    <span className="text-blue-400">query</span>(
                  </div>
                  <div className="pl-8 text-green-400">
                    "SELECT * FROM 'mission_critical'"
                  </div>
                  <div className="pl-4">);</div>
                  <div className="pl-4 text-neutral-500">
                    // Real-time subscription active
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-yellow-200">SecureView</span>(data);
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCO B: INTEGRAÇÃO & AUTOMAÇÃO */}
          <div className="mb-24 relative group">
            <div className="absolute -left-12 top-0 text-xs font-mono text-neutral-600 hidden md:block rotate-90 origin-top-left translate-y-12">
              REF-2024-AUTO
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 rounded bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                [FLOW: AUTOMATED]
              </span>
              <Network className="w-4 h-4 text-neutral-500" />
            </div>

            <h2 className="text-3xl font-display font-bold mb-6 text-neutral-100">
              Orquestração de Processos com IA
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Visual: Abstract Nodes */}
              <div className="order-2 md:order-1 bg-neutral-900 border border-neutral-800 rounded-lg p-4 relative flex items-center justify-center h-40 md:h-auto">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-mono text-neutral-300">
                      CRM
                    </span>
                  </div>
                  <div className="h-[2px] w-8 bg-gradient-to-r from-neutral-700 to-[#BA0C10]" />
                  <div className="w-12 h-12 rounded-full bg-[#BA0C10]/10 border border-[#BA0C10] flex items-center justify-center shadow-[0_0_15px_rgba(186,12,16,0.3)]">
                    <Cpu className="w-5 h-5 text-[#BA0C10]" />
                  </div>
                  <div className="h-[2px] w-8 bg-gradient-to-r from-[#BA0C10] to-cyan-500" />
                  <div className="w-10 h-10 rounded bg-neutral-800 border border-cyan-900/50 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-mono text-cyan-400">DB</span>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 prose prose-invert prose-sm text-neutral-400">
                <p>
                  Eliminamos o trabalho manual repetitivo. Usamos{' '}
                  <span className="text-cyan-400">n8n</span> e{' '}
                  <span className="text-cyan-400">Python</span> para criar o
                  "cérebro" da sua operação.
                </p>
                <p>
                  Conectamos CRMs, WhatsApp, e Bancos de Dados em um fluxo
                  autônomo que opera 24/7.
                </p>
                <ul className="list-none pl-0 space-y-2 mt-4 font-mono text-xs text-neutral-500">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-cyan-500" /> Agentes de
                    Atendimento IA (LLMs)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-cyan-500" /> ETL e Tratamento
                    de Dados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-cyan-500" /> Integração de
                    APIs (Webhooks)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* BLOCO C: DESIGN SYSTEM */}
          <div className="mb-24 relative group">
            <div className="absolute -left-12 top-0 text-xs font-mono text-neutral-600 hidden md:block rotate-90 origin-top-left translate-y-12">
              REF-2024-UX
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-mono font-bold">
                [UI: PRECISION]
              </span>
              <ShieldCheck className="w-4 h-4 text-neutral-500" />
            </div>

            <h2 className="text-3xl font-display font-bold mb-6 text-neutral-100">
              Identidade Visual Completa
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="prose prose-invert prose-sm text-neutral-400">
                <p>
                  O design não é apenas estética, é{' '}
                  <span className="text-white font-medium">função</span>.
                  Criamos interfaces que transmitem confiança imediata e
                  autoridade técnica.
                </p>
                <p>
                  Cada pixel é posicionado com intenção. Tipografia forte e
                  grids matemáticos guiam o usuário.
                </p>
              </div>

              {/* Visual: Wireframe/Palette */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 h-40 flex flex-col justify-between">
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-neutral-800 rounded border border-neutral-700 flex flex-col items-center justify-center gap-1">
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Aa
                    </span>
                  </div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-2 bg-neutral-800 rounded w-3/4" />
                    <div className="h-2 bg-neutral-800 rounded w-1/2" />
                    <div className="h-2 bg-neutral-800 rounded w-full" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-4 w-4 rounded-full bg-[#BA0C10]" />
                  <div className="h-4 w-4 rounded-full bg-cyan-500" />
                  <div className="h-4 w-4 rounded-full bg-neutral-500" />
                  <div className="h-4 w-4 rounded-full bg-neutral-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TracingBeam>

      {/* CTA FINAL */}
      <div className="w-full max-w-4xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-12 text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BA0C10] to-transparent opacity-50" />

          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Seu sistema precisa de uma atualização?
          </h3>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Agende uma consultoria técnica para avaliarmos a arquitetura do seu
            próximo projeto.
          </p>

          <Button
            className="bg-[#BA0C10] hover:bg-[#8a090c] text-white font-mono tracking-wide px-8 py-6 h-auto text-lg rounded-none border border-red-900/50 shadow-[0_0_20px_rgba(186,12,16,0.3)] hover:shadow-[0_0_30px_rgba(186,12,16,0.5)] transition-all duration-300"
            onClick={() => (window.location.href = '/contact')}
          >
            Solicitar Diagnóstico Técnico{' '}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Services
