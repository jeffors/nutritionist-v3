import SectionHeading from '@/components/shared/SectionHeading'
import { ReviewPage } from '@/payload-types'

type HeroSectionProps = {
  hero: ReviewPage['hero']
}

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading title={hero?.heading} description={hero?.description} hero as="h1" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
          {hero?.stats?.map((stat) => (
            <div className="text-center" key={stat.id}>
              <div className="font-heading text-4xl font-light text-black mb-1">{stat.value}</div>
              <div className="text-xs text-black/80 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
