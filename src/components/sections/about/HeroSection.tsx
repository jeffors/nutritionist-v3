import SectionHeading from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { getMediaUrl } from '@/lib/media'
import { AboutPage } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type HeroSectionProps = {
  hero: AboutPage['hero']
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const imageAboutUrl = getMediaUrl(hero?.image)

  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="">
            <SectionHeading title={hero?.heading} align="left" hero as="h1" />
            <div className="text-xl text-black/80 leading-relaxed mb-6">
              <RichText data={hero?.paragraph1} />
            </div>
            <p className="text-black/70 leading-relaxed mb-8">{hero?.paragraph2}</p>
            <Button asChild variant="default" size="xl">
              <Link href="/contacts">
                {hero?.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-3/4 max-w-sm mx-auto">
              {imageAboutUrl && (
                <Image
                  src={imageAboutUrl}
                  alt="Нутрициолог Лариса Галимова"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
