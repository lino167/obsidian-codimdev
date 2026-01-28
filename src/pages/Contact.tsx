import { useState } from 'react'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Linkedin, Github, Smartphone, Send, MessageCircle, Loader2 } from 'lucide-react'
import Footer from '@/components/Footer'
import { useLanguage } from '@/hooks/use-language'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function Contact() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  // WhatsApp Integration - Opens chat with pre-formatted message
  const handleWhatsApp = () => {
    if (!formData.name) {
      toast.error('Por favor, digite seu nome primeiro.')
      return
    }

    const myNumber = '5547996496281' // Your WhatsApp number

    const text = `Olá Zacarias! Meu nome é *${formData.name}*` +
                 (formData.company ? ` da empresa *${formData.company}*` : '') +
                 `.\n\nGostaria de falar sobre um projeto:\n"${formData.message || 'Tenho uma ideia de sistema...'}"`;

    const url = `https://wa.me/${myNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    toast.success('🚀 Abrindo WhatsApp...')
  }

  // Traditional Form Submission - Saves to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      toast.error('Preencha nome e email')
      return
    }

    setLoading(true)

    try {
      // Capture IP address for rate limiting
      let ipAddress = null;
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } catch (ipError) {
        console.log('Could not capture IP, proceeding without it:', ipError);
        // Continue without IP - manual admin entries will still work
      }

      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        status: 'new',
        ip_address: ipAddress
      })

      if (error) {
        // Check for rate limit error
        if (error.message?.includes('Rate limit exceeded')) {
          toast.error('⚠️ Muitas tentativas. Por favor, aguarde 1 hora e tente novamente.');
          return;
        }
        throw error;
      }

      toast.success('✅ Mensagem recebida! Entrarei em contato em breve.')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      console.error('Error submitting lead:', error)
      toast.error('Erro ao enviar. Tente pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative font-mono">
      <BackgroundBeamsWithCollision className="min-h-screen h-auto flex-col justify-start items-center pt-24 md:pt-32 pb-12">
        <div className="container relative z-20 mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
            {/* LEFT COLUMN: CHANNELS */}
            <div className="space-y-12 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                  {t.contact.title}
                  <br />
                  <span className="text-crimson">
                    {t.contact.title_highlight}
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg border-l-2 border-crimson pl-4">
                  {t.contact.location}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-md bg-neutral-900 border border-neutral-800 group-hover:border-crimson/50 transition-colors">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-neutral-300 group-hover:text-white transition-colors">
                    zaca793@gmail.com
                  </span>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-md bg-neutral-900 border border-neutral-800 group-hover:border-crimson/50 transition-colors">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-neutral-300 group-hover:text-white transition-colors">
                    (47) 9 9649-6281
                  </span>
                </div>

                <a
                  href="https://linkedin.com/in/zacariaslino"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-md bg-neutral-900 border border-neutral-800 group-hover:border-crimson/50 transition-colors">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-neutral-300 group-hover:text-white transition-colors">
                    /in/zacariaslino
                  </span>
                </a>

                <a
                  href="https://github.com/codim-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-md bg-neutral-900 border border-neutral-800 group-hover:border-crimson/50 transition-colors">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-neutral-300 group-hover:text-white transition-colors">
                    /codim-dev
                  </span>
                </a>
              </div>

              <div className="pt-8 border-t border-neutral-800">
                <p className="text-sm text-neutral-500 uppercase tracking-widest">
                  {t.contact.availability}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: OMNICHANNEL FORM */}
            <div
              className="rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-md p-6 md:p-8 shadow-2xl animate-slide-in-left"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="mb-8 flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-xs text-crimson font-bold tracking-widest">
                  INICIAR PROTOCOLO / OMNICHANNEL
                </span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-xs uppercase tracking-widest text-neutral-400"
                    >
                      OPERADOR (NOME) *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      className="bg-neutral-950 border-neutral-800 focus:border-crimson text-white placeholder:text-neutral-700 h-12 font-mono rounded-none border-b-2 focus:ring-0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-xs uppercase tracking-widest text-neutral-400"
                    >
                      ORGANIZAÇÃO
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nome da empresa"
                      className="bg-neutral-950 border-neutral-800 focus:border-crimson text-white placeholder:text-neutral-700 h-12 font-mono rounded-none border-b-2 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest text-neutral-400"
                  >
                    CANAL DE RETORNO (EMAIL) *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="bg-neutral-950 border-neutral-800 focus:border-crimson text-white placeholder:text-neutral-700 h-12 font-mono rounded-none border-b-2 focus:ring-0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-xs uppercase tracking-widest text-neutral-400"
                  >
                    DADOS DA MISSÃO
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva seu projeto ou ideia..."
                    className="bg-neutral-950 border-neutral-800 focus:border-crimson text-white placeholder:text-neutral-700 min-h-[120px] font-mono rounded-none border-b-2 focus:ring-0 resize-none"
                  />
                </div>

                {/* OMNICHANNEL BUTTONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-black font-bold tracking-widest border border-[#25D366]/50 uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] rounded-sm"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WHATSAPP
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-red-900 to-crimson hover:from-crimson hover:to-red-600 text-white font-bold tracking-widest border border-crimson/50 uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(186,12,16,0.5)] rounded-sm"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        ENVIAR DADOS
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-center text-neutral-500 font-mono">
                  Escolha o canal de comunicação mais seguro para sua missão
                </p>
              </form>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      <Footer />
    </div>
  )
}
