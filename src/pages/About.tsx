import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Timeline } from '@/components/ui/timeline'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Code2, BrainCircuit, PenTool, Wrench, Award, Calendar, ExternalLink, Loader2 } from 'lucide-react'
import Footer from '@/components/Footer'
import ceoCodim from '@/assets/ceo-codim.png'
import { useLanguage } from '@/hooks/use-language'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function About() {
  const { t } = useLanguage()
  type Certificate = {
    id: number
    title: string
    issuer: string
    date_issued: string | null // Keep for backward compatibility or map from issue_date
    issue_date?: string | null
    file_url: string | null // Keep for backward compatibility
    credential_url?: string | null
    image_url: string | null
    description: string | null
    skills: string[] | null
  }
  const [certData, setCertData] = useState<Certificate[]>([])
  const [loadingCerts, setLoadingCerts] = useState(true)

  const localCertificates: Certificate[] = [
    {
      id: 10001,
      title: 'Estrutura de Controle',
      issuer: 'OneBitCode',
      date_issued: '2026-01-01',
      file_url: '/certificates/Estrutura de controle.pdf',
      image_url: null,
      description: 'Certificado de Conclusão - Estrutura de Controle',
      skills: ['Logic', 'Programming']
    },
    {
      id: 10002,
      title: 'Formação Full Stack (Parte 1)',
      issuer: 'OneBitCode',
      date_issued: '2026-01-01',
      file_url: '/certificates/certificado-OBC-2026-824052FDB-pt.pdf',
      image_url: null,
      description: 'Certificado OneBitCode - 2026',
      skills: ['Fullstack', 'Web']
    },
    {
      id: 10003,
      title: 'Formação Full Stack (Parte 2)',
      issuer: 'OneBitCode',
      date_issued: '2026-01-01',
      file_url: '/certificates/certificado-OBC-2026-83519A2AA-pt.pdf',
      image_url: null,
      description: 'Certificado OneBitCode - 2026',
      skills: ['Fullstack', 'Web']
    },
    {
      id: 10004,
      title: 'CSS3',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_CSS3_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Domínio de estilização com CSS3',
      skills: ['CSS3', 'Frontend']
    },
    {
      id: 10005,
      title: 'Dominando o ChatGPT',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_DominandooCHATGPT_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Uso avançado de IA generativa',
      skills: ['AI', 'ChatGPT']
    },
    {
      id: 10006,
      title: 'Entendendo as IAs',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_EntendendoasIAs_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Fundamentos de Inteligência Artificial',
      skills: ['AI', 'Theory']
    },
    {
      id: 10007,
      title: 'Estudando 10x Melhor',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_Estudando10xMelhor_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Técnicas de produtividade e aprendizado',
      skills: ['Soft Skills', 'Productivity']
    },
    {
      id: 10008,
      title: 'HTML5',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_HTML5_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Estruturação web moderna com HTML5',
      skills: ['HTML5', 'Frontend']
    },
    {
      id: 10009,
      title: 'JavaScript I',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_JavaScriptI_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Fundamentos da linguagem JavaScript',
      skills: ['JavaScript', 'Logic']
    },
    {
      id: 10010,
      title: 'Planejando seus Projetos',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_PlanejandoseusProjetos_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Gestão e planejamento de projetos de software',
      skills: ['Management', 'Planning']
    },
    {
      id: 10011,
      title: 'Python I - Introdução',
      issuer: 'OneBitCode',
      date_issued: null,
      file_url: '/certificates/certificado_PythonI-IntroduýýoaoPython_ZacariasLinoramosfilho.pdf',
      image_url: null,
      description: 'Introdução à linguagem Python',
      skills: ['Python', 'Backend']
    }
  ]

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false })

        if (!error) {
          // Merge remote data with local certificates
          // Create a Map to avoid duplicates based on title if necessary, or just concat
          // Here we just concat, assuming local IDs (101+) don't conflict with DB IDs
          const remoteCerts = data || []
          setCertData([...remoteCerts, ...localCertificates])
        } else {
          // If error, atleast show local
          setCertData(localCertificates)
        }
      } catch (error) {
        console.error('Error fetching certificates:', error)
        setCertData(localCertificates)
      } finally {
        setLoadingCerts(false)
      }
    }

    fetchCertificates()
  }, [])

  const timelineData = [
    {
      title: t.about.timeline.t1_title,
      content: (
        <p className="text-neutral-300 text-base md:text-lg font-sans leading-relaxed">
          {t.about.timeline.t1_desc}
        </p>
      ),
    },
    {
      title: t.about.timeline.t2_title,
      content: (
        <p className="text-neutral-300 text-base md:text-lg font-sans leading-relaxed">
          {t.about.timeline.t2_desc}
        </p>
      ),
    },
    {
      title: t.about.timeline.t3_title,
      content: (
        <p className="text-neutral-300 text-base md:text-lg font-sans leading-relaxed">
          {t.about.timeline.t3_desc}
        </p>
      ),
    },
    {
      title: t.about.timeline.t4_title,
      content: (
        <p className="text-neutral-300 text-base md:text-lg font-sans leading-relaxed">
          {t.about.timeline.t4_desc}
        </p>
      ),
    },
    {
      title: t.about.timeline.t5_title,
      content: (
        <p className="text-neutral-300 text-base md:text-lg font-sans leading-relaxed">
          {t.about.timeline.t5_desc}
        </p>
      ),
    },
    {
      title: t.about.timeline.t6_title,
      content: (
        <p className="text-neutral-300 text-base md:text-lg font-sans leading-relaxed">
          {t.about.timeline.t6_desc}
        </p>
      ),
    },
  ]

  const iconMap = {
    Code2: Code2,
    BrainCircuit: BrainCircuit,
    PenTool: PenTool,
    Wrench: Wrench,
  }

  const certificates = t.about.certificates.groups.map((group, i) => {
    // iconMap access is safe
    const IconComponent = iconMap[group.icon as keyof typeof iconMap] || Code2

    return {
      title: group.category,
      description: (
        <ul className="list-disc list-inside space-y-1 mt-2">
          {group.items.map((item, idx) => (
            <li
              key={idx}
              className="text-xs md:text-sm text-neutral-200 font-sans"
            >
              {item}
            </li>
          ))}
        </ul>
      ),
      header: (
        <div className="w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
      ),
      icon: <IconComponent className="h-4 w-4 text-neutral-500" />,
      id: group.id,
    }
  })

  const dynamicCertItems = certData.map((c) => ({
    title: c.title,
    description: (
      <div className="space-y-3 mt-2">
        {c.description && (
          <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
            {c.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {c.skills?.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono">
              {skill}
            </span>
          ))}
        </div>

        <div className="pt-2 border-t border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-neutral-300 text-xs font-mono">
            <span className="text-[#BA0C10]">ISSUER:</span>
            <span>{c.issuer || 'Unknown'}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300 text-xs font-mono">
            <Calendar className="w-3 h-3" />
            <span>
              {c.issue_date || c.date_issued ? new Date(c.issue_date || c.date_issued!).toLocaleDateString() : 'No date'}
            </span>
          </div>
        </div>

        {(c.credential_url || c.file_url) && (
          <a
            href={c.credential_url || c.file_url!}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#BA0C10] hover:text-white transition-colors mt-2"
          >
            <ExternalLink className="w-3 h-3" />
            VERIFY CREDENTIAL
          </a>
        )}
      </div>
    ),
    header: (
      <div className="w-full h-[8rem] rounded-xl bg-neutral-900 border border-white/5 overflow-hidden flex items-center justify-center relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#BA0C10]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {c.image_url ? (
          <img src={c.image_url} alt={c.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <Award className="w-12 h-12 text-white/10" />
        )}
      </div>
    ),
    icon: <Award className="h-4 w-4 text-[#BA0C10]" />,
    id: c.id,
  }))

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <main className="flex-grow pt-20">
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 py-12 lg:py-24">
          {/* Header Line */}
          <div className="w-full border-b border-white/10 pb-4 mb-12 font-mono">
            <p className="text-xs text-neutral-500 tracking-widest">
              {t.about.hero.access_file}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* COLUNA 1 (ESQUERDA): A FOTO 3D */}
            <div className="flex justify-center items-center w-full">
              <CardContainer className="inter-var w-full max-w-lg">
                <CardBody className="bg-neutral-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-white/10 w-auto h-auto rounded-xl p-6 border">
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg group-hover/card:shadow-xl transition-shadow duration-300">
                      <img
                        src={ceoCodim}
                        alt="Zacarias Lino - The Operator"
                        className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      />
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>

            {/* COLUNA 2 (DIREITA): HERO TEXT */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-2 text-white font-display">
                  {t.about.hero.title}
                </h1>
                <h2 className="text-xl lg:text-2xl text-[#BA0C10] font-medium tracking-wide font-mono">
                  {t.about.hero.subtitle}
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-[#E5E5E5] text-lg leading-relaxed">
                  {t.about.hero.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <section className="w-full bg-[#050505]">
          <div className="container mx-auto px-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display text-center">
              {t.about.timeline_title}
            </h2>
          </div>
          <Timeline data={timelineData} />
        </section>

        {/* CERTIFICADOS SECTION */}
        <section className="w-full py-20 bg-[#050505]">
          <div className="container mx-auto px-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              {t.about.certificates.title}
            </h2>
            <p className="text-neutral-500 font-mono text-sm">
              {t.about.certificates.subtitle}
            </p>
          </div>
          {loadingCerts ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-crimson" />
            </div>
          ) : dynamicCertItems.length > 0 ? (
            <BentoGrid className="max-w-6xl mx-auto px-4 md:grid-cols-2">
              {dynamicCertItems.map((item) => (
                <BentoGridItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                />
              ))}
            </BentoGrid>
          ) : (
            <BentoGrid className="max-w-6xl mx-auto px-4 md:grid-cols-2">
              {certificates.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                />
              ))}
            </BentoGrid>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
