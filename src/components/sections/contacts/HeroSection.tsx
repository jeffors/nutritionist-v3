import SectionHeading from '@/components/shared/SectionHeading'
import { ContactsPage } from '@/payload-types'

type HeroSectionProps = {
  hero: ContactsPage['hero']
}

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading title={hero?.heading} description={hero?.description} as="h1" />
      </div>
    </section>
  )
}
