import PortraitBlock from '@/components/shared/PortraitBlock'
import SectionHeading from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { getMediaUrl } from '@/lib/media'
import { HomePage } from '@/payload-types'
import { ArrowRight, Award, CheckCircle } from 'lucide-react'
import Link from 'next/link'

type AboutSectionProps = {
  about: HomePage['about']
}

export default function AboutSection({ about }: AboutSectionProps) {
  const imageAboutUrl = getMediaUrl(about?.image)
  return (
    <section className="bg-white py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <PortraitBlock
            icon={Award}
            imageUrl={imageAboutUrl}
            title={about?.imageTitle}
            description={about?.imageDescription}
          />

          <div>
            <SectionHeading title={about?.heading} align="left" />
            <p className="text-black/80 leading-relaxed mb-4">{about?.paragraph1}</p>
            <p className="text-black/80 leading-relaxed mb-6">{about?.paragraph2}</p>

            <ul className="space-y-3 mb-8">
              {about?.checklistItem?.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-black/80">{item.text}</p>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" size="xl">
              <Link href="/about">
                {about?.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
