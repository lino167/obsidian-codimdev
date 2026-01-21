import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Timeline } from '@/components/ui/timeline'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandPython,
  IconBrain,
  IconTool,
  IconCertificate,
} from '@tabler/icons-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ceoCodim from '@/assets/ceo-codim.png'

export default function About() {
  const timelineData = [
    {
      title: '2006',
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
            INITIALIZATION (13 Anos)
          </h4>
          <h5 className="text-lg text-[#BA0C10] font-mono mb-2">
            O Primeiro Hardware
          </h5>
          <p className="text-neutral-300 font-sans text-base md:text-lg leading-relaxed">
            Aos 13 anos, montei meu primeiro computador. O fascínio pela lógica
            binária foi imediato. O desejo de cursar Ciência da Computação
            existia, mas restrições orçamentárias forçaram um desvio de rota. O
            sistema entrou em 'Sleep Mode', mas o kernel permaneceu ativo.
          </p>
        </div>
      ),
    },
    {
      title: '2011',
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
            MANUAL OVERRIDE (18 Anos)
          </h4>
          <h5 className="text-lg text-[#BA0C10] font-mono mb-2">
            A Forja Industrial
          </h5>
          <p className="text-neutral-300 font-sans text-base md:text-lg leading-relaxed mb-4">
            Aos 18 anos, a realidade exigiu ação. Ingressei no chão de fábrica
            como ajudante. Foi o início de uma carreira de mais de uma década na
            Mecânica Industrial Pesada (Passaúra, Santos CMI). Aprendi na
            prática como grandes sistemas funcionam sob pressão.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
              Chão de Fábrica
            </span>
            <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
              Resiliência
            </span>
          </div>
        </div>
      ),
    },
    {
      title: '2014-2016',
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
            PRECISION PROTOCOL
          </h4>
          <h5 className="text-lg text-[#BA0C10] font-mono mb-2">
            Turbinas & Siderurgia
          </h5>
          <p className="text-neutral-300 font-sans text-base md:text-lg leading-relaxed mb-4">
            Atuando na montagem crítica de turbinas a gás e manutenção
            siderúrgica. Onde um erro de milímetros pode custar milhões. Essa
            experiência moldou meu caráter profissional: a busca obsessiva pela
            precisão e a tolerância zero para falhas.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
              Turbinas a Gás
            </span>
            <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
              Tolerância Zero
            </span>
          </div>
        </div>
      ),
    },
    {
      title: '2023',
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
            SYSTEM REBOOT
          </h4>
          <h5 className="text-lg text-[#BA0C10] font-mono mb-2">
            Retorno ao Código
          </h5>
          <p className="text-neutral-300 font-sans text-base md:text-lg leading-relaxed mb-4">
            Com a estabilidade alcançada, reativei o protocolo original.
            Investimento pesado em formação Full-Stack (OneBitCode), Design e
            IA. A lógica mecânica foi finalmente traduzida para JavaScript,
            Python e Automação.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-mono bg-[#BA0C10]/20 text-[#BA0C10] border border-[#BA0C10]/50 px-2 py-1 rounded">
              OneBitCode
            </span>
            <span className="text-xs font-mono bg-[#BA0C10]/20 text-[#BA0C10] border border-[#BA0C10]/50 px-2 py-1 rounded">
              Python
            </span>
            <span className="text-xs font-mono bg-[#BA0C10]/20 text-[#BA0C10] border border-[#BA0C10]/50 px-2 py-1 rounded">
              Sass
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'CURRENT',
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
            PARALLEL PROCESSING
          </h4>
          <h5 className="text-lg text-[#BA0C10] font-mono mb-2">
            Operação Híbrida (Mecânica + Dev)
          </h5>
          <p className="text-neutral-300 font-sans text-base md:text-lg leading-relaxed mb-4">
            Atualmente operando em 'Dual-Core'. Mantenho a precisão de teares
            industriais na Karsten durante o dia e construo softwares complexos
            como CODIM DEV nos ciclos livres. Essa vivência dupla me dá uma
            vantagem única: eu resolvo problemas reais do mundo físico usando
            soluções digitais.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-mono bg-emerald-900/30 text-emerald-500 border border-emerald-500/50 px-2 py-1 rounded">
              Dual-Core
            </span>
            <span className="text-xs font-mono bg-emerald-900/30 text-emerald-500 border border-emerald-500/50 px-2 py-1 rounded">
              Karsten
            </span>
            <span className="text-xs font-mono bg-emerald-900/30 text-emerald-500 border border-emerald-500/50 px-2 py-1 rounded">
              CODIM DEV
            </span>
          </div>
        </div>
      ),
    },
  ]

  const certificates = [
    {
      title: 'DEVELOPMENT CORE',
      description: 'HTML5, CSS3 Moderno, JavaScript I, Bootstrap, Sass.',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
      ),
      icon: <IconBrandHtml5 className="h-4 w-4 text-neutral-500" />,
      status: 'COMPLETED',
      version: 'v1.0',
    },
    {
      title: 'INTELLIGENCE & LOGIC',
      description:
        'Python I, Dominando ChatGPT, Entendendo as IAs, Planejando Projetos.',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
      ),
      icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
      status: 'ACTIVE',
      version: 'v2.0',
    },
    {
      title: 'VISUAL ENGINEERING',
      description: 'Adobe Photoshop, Adobe Illustrator.',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
      ),
      icon: <IconCertificate className="h-4 w-4 text-neutral-500" />,
      status: 'VERIFIED',
      version: 'v1.5',
    },
    {
      title: 'INDUSTRIAL BASE',
      description: 'Técnico em Mecânica Industrial.',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
      ),
      icon: <IconTool className="h-4 w-4 text-neutral-500" />,
      status: 'LEGACY',
      version: 'v0.9',
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 py-12 lg:py-24">
          {/* Header Line */}
          <div className="w-full border-b border-white/10 pb-4 mb-12 font-mono">
            <p className="text-xs text-neutral-500 tracking-widest">
              // ACCESSING PERSONNEL FILE: 001
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
                  THE OPERATOR
                </h1>
                <h2 className="text-xl lg:text-2xl text-[#BA0C10] font-medium tracking-wide font-mono">
                  ZACARIAS LINO // FULL-STACK ENGINEER
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-[#E5E5E5] text-lg leading-relaxed">
                  De Mecânico Industrial a Arquiteto de Software. Unindo a
                  precisão do chão de fábrica com a escalabilidade do código.
                  Hoje, aplico essa mentalidade de engenharia na CODIM DEV.
                  Especialista em criar ecossistemas digitais que funcionam
                  sozinhos, utilizando Python para lógica robusta e Automação
                  Inteligente com n8n e Supabase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <section className="w-full bg-[#050505]">
          <Timeline data={timelineData} />
        </section>

        {/* CERTIFICADOS SECTION */}
        <section className="w-full py-20 bg-[#050505]">
          <div className="container mx-auto px-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              CERTIFIED PROTOCOLS
            </h2>
            <p className="text-neutral-500 font-mono text-sm">
              // VERIFIED CREDENTIALS DATABASE
            </p>
          </div>
          <BentoGrid className="max-w-6xl mx-auto px-4">
            {certificates.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
                status={item.status}
                version={item.version}
              />
            ))}
          </BentoGrid>
        </section>
      </main>
      <Footer />
    </div>
  )
}
