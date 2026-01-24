import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Timeline } from '@/components/ui/timeline'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Code2, BrainCircuit, PenTool, Wrench } from 'lucide-react'
import Footer from '@/components/Footer'
import ceoCodim from '@/assets/ceo-codim.png'
import { useLanguage } from '@/hooks/use-language'

export default function About() {
  const { t } = useLanguage()

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
    // @ts-expect-error - iconMap access is safe
    const IconComponent = iconMap[group.icon] || Code2

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
          <BentoGrid className="max-w-6xl mx-auto px-4 md:grid-cols-2">
            {certificates.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                // Removed the span logic as we are using a 2-column grid
              />
            ))}
          </BentoGrid>
        </section>
      </main>
      <Footer />
    </div>
  )
}
