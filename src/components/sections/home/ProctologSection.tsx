import PortraitBlock from '@/components/shared/PortraitBlock'
import SectionHeading from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { getMediaUrl } from '@/lib/media'
import { HomePage } from '@/payload-types'
import { ArrowRight, CheckCircle, Stethoscope } from 'lucide-react'
import Link from 'next/link'

type ProctologSectionProps = {
  proctolog: HomePage['proctolog']
}

export default function ProctologSection({ proctolog }: ProctologSectionProps) {
  const imageProctologUrl = getMediaUrl(proctolog?.image)
  return (
    <section className="bg-indigo-50 py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <PortraitBlock
            icon={Stethoscope}
            imageUrl={imageProctologUrl}
            title={proctolog?.headingAccent}
            description={proctolog?.heading}
            accentColor="indigo"
          />

          <div>
            <SectionHeading
              badge={proctolog?.badge}
              title={proctolog?.heading}
              accentTitle={proctolog?.headingAccent}
              accentColor="indigo"
              align="left"
            />
            <p className="text-black/80 leading-relaxed mb-4">{proctolog?.paragraph1}</p>
            <p className="text-black/80 leading-relaxed mb-6">{proctolog?.paragraph2}</p>

            <ul className="space-y-3 mb-8">
              {proctolog?.checklistItem?.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-black/80">{item.text}</p>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" size="xl">
              <Link href={proctolog?.ctaLink ?? ''}>
                {proctolog?.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
