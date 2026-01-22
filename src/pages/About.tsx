import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Timeline } from '@/components/ui/timeline'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {
  IconBrandHtml5,
  IconBrain,
  IconTool,
  IconCertificate,
} from '@tabler/icons-react'
import Footer from '@/components/Footer'
import ceoCodim from '@/assets/ceo-codim.png'
import { useLanguage } from '@/hooks/use-language'

export default function About() {
  const { t } = useLanguage()

  const timelineData = t.about.timeline.map((item) => ({
    title: item.year,
    content: (
      <div>
        <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
          {item.title}
        </h4>
        <h5 className="text-lg text-[#BA0C10] font-mono mb-2">
          {item.subtitle}
        </h5>
        <p className="text-neutral-300 font-sans text-base md:text-lg leading-relaxed mb-4">
          {item.description}
        </p>
        {item.tags && (
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
  }))

  const certificates = t.about.certificates.items.map((item, i) => ({
    ...item,
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
    ),
    icon:
      i === 0 ? (
        <IconBrandHtml5 className="h-4 w-4 text-neutral-500" />
      ) : i === 1 ? (
        <IconBrain className="h-4 w-4 text-neutral-500" />
      ) : i === 2 ? (
        <IconCertificate className="h-4 w-4 text-neutral-500" />
      ) : (
        <IconTool className="h-4 w-4 text-neutral-500" />
      ),
    version: i === 0 ? 'v1.0' : i === 1 ? 'v2.0' : i === 2 ? 'v1.5' : 'v0.9',
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
