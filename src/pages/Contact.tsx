import React from 'react'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Linkedin, Github, Smartphone } from 'lucide-react'
import Footer from '@/components/Footer'
import { useLanguage } from '@/hooks/use-language'

export default function Contact() {
  const { t } = useLanguage()

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

            {/* RIGHT COLUMN: TERMINAL INPUT */}
            <div
              className="rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-md p-6 md:p-8 shadow-2xl animate-slide-in-left"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="mb-8 flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-xs text-crimson font-bold tracking-widest">
                  {t.contact.form.header_badge}
                </span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-xs uppercase tracking-widest text-neutral-400"
                  >
                    {t.contact.form.label_name}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t.contact.form.placeholder_name}
                    className="bg-neutral-950 border-neutral-800 focus:border-crimson text-white placeholder:text-neutral-700 h-12 font-mono rounded-none border-b-2 focus:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest text-neutral-400"
                  >
                    {t.contact.form.label_email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form.placeholder_email}
                    className="bg-neutral-950 border-neutral-800 focus:border-crimson text-white placeholder:text-neutral-700 h-12 font-mono rounded-none border-b-2 focus:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-xs uppercase tracking-widest text-neutral-400"
                  >
                    {t.contact.form.label_message}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form.placeholder_message}
                    className="bg-neutral-950 border-neutral-800 focus:border-crimson text-white placeholder:text-neutral-700 min-h-[150px] font-mono rounded-none border-b-2 focus:ring-0 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-red-900 to-crimson hover:from-crimson hover:to-red-600 text-white font-bold tracking-widest border border-crimson/50 uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(186,12,16,0.5)] rounded-sm"
                >
                  {t.contact.form.button}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      <Footer />
    </div>
  )
}
