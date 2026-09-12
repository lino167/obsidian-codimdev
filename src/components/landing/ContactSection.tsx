import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareCode, Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const myNumber = '5547996496281'
    let text = 'Olá Lino! Gostaria de falar sobre um projeto.'
    if (formData.name) {
      text = `Olá Lino! Meu nome é *${formData.name}* (${formData.email || 'sem email informado'}).\n\nGostaria de falar sobre o seguinte projeto/gargalo:\n"${formData.message || 'Tenho uma ideia de automação/sistema...'}"`
    }
    const url = `https://wa.me/${myNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    toast.success('🚀 Abrindo WhatsApp com seus dados...')
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      toast.error('Por favor, informe ao menos seu nome e email.')
      return
    }
    const subject = encodeURIComponent(`Contato de Projeto - ${formData.name}`)
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nEmail: ${formData.email}\n\nDescrição do Projeto / Gargalo:\n${formData.message}`,
    )
    window.location.href = `mailto:zaca793@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    toast.success('Abrindo cliente de email...')
  }

  return (
    <section id="contato" className="py-28 px-4 sm:px-6 bg-[#040404] relative border-t border-white/5 scroll-mt-20">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
            VAMOS CONVERSAR
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Tem um Gargalo Operacional ou Ideia de Sistema?
          </h2>
          <p className="mt-4 text-neutral-400 font-sans text-base sm:text-lg leading-relaxed font-light">
            Entre em contato direto pelo WhatsApp ou envie uma mensagem. Responderei rapidamente para entender seu cenário e desenhar a melhor solução.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Card Principal WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-neutral-950 to-black border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-emerald-500/10">
                <MessageSquareCode className="w-24 h-24" />
              </div>

              <div className="relative z-10 space-y-5">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider inline-block">
                  CANAL MAIS RÁPIDO
                </span>

                <div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Falar Direto no WhatsApp
                  </h3>
                  <p className="text-neutral-300 text-sm mt-1 font-sans">
                    Sem formulários complexos. Fale diretamente comigo sobre o seu projeto.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono">
                  <div className="text-[11px] text-neutral-500 uppercase">Telefone / WhatsApp</div>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">(47) 9 9649-6281</div>
                  <div className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Atendimento ágil
                  </div>
                </div>

                <a
                  href="https://wa.me/5547996496281?text=Ol%C3%A1%20Lino%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-sm font-semibold tracking-wide uppercase transition-all shadow-lg shadow-emerald-950/50 hover:scale-[1.02]"
                >
                  <MessageSquareCode className="w-5 h-5" />
                  Abrir WhatsApp Agora
                </a>
              </div>
            </div>

            {/* Outros Canais */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-white/5 space-y-3.5 font-mono text-xs">
              <div className="text-[11px] text-neutral-500 uppercase font-semibold">Canais Oficiais:</div>
              
              <a
                href="mailto:zaca793@gmail.com"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-crimson shrink-0" />
                <span>zaca793@gmail.com</span>
              </a>

              <a
                href="https://linkedin.com/in/zacariaslino"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>linkedin.com/in/zacariaslino</span>
              </a>

              <a
                href="https://github.com/lino167"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>github.com/lino167</span>
              </a>

              <div className="flex items-center gap-3 text-neutral-400 pt-1">
                <MapPin className="w-4 h-4 text-crimson shrink-0" />
                <span>Blumenau, SC – Brasil (Remoto para todo o país)</span>
              </div>
            </div>
          </div>

          {/* Formulário Rápido de Contato (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-neutral-950/90 border border-white/10 shadow-2xl backdrop-blur-sm">
            <div className="mb-6">
              <span className="text-xs font-mono text-crimson uppercase tracking-wider block mb-1">
                SOLICITAÇÃO DE DIAGNÓSTICO
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                Envie uma Mensagem Rápida
              </h3>
              <p className="text-neutral-400 text-sm mt-1 font-sans">
                Preencha abaixo para enviar por WhatsApp ou e-mail com 1 clique:
              </p>
            </div>

            <form onSubmit={handleWhatsApp} className="space-y-5 font-sans">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  Seu Nome ou Empresa:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva / Indústria ABC"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-crimson text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  Seu E-mail ou Telefone:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: carlos@empresa.com ou (47) 99999-9999"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-crimson text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  Qual problema você precisa resolver?
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ex: Preciso automatizar a coleta de dados de um portal / Preciso de um painel para acompanhar ordens de serviço da equipe..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-crimson text-sm font-sans resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquareCode className="w-4 h-4" />
                  Enviar via WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full py-3.5 px-6 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-crimson" />
                  Enviar via E-mail
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 text-center font-mono pt-2">
                🔒 Seus dados são usados exclusivamente para responder à sua solicitação.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
