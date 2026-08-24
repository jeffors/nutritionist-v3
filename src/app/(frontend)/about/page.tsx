import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import Image from 'next/image'
import { getMediaUrl } from '@/lib/media'
import { iconMap } from '@/lib/service-maps'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import { EducationCard } from '@/components/cards/EducationCard'

import SectionHeading from '@/components/shared/SectionHeading'
import { getAboutPageData } from '@/data/about'
import HeroSection from '@/components/sections/about/HeroSection'
import ValuesSection from '@/components/sections/about/ValuesSection'
import EducationSection from '@/components/sections/about/EducationSection'
import CTASection from '@/components/shared/CTASection'

export default async function About() {
  const aboutPage = await getAboutPageData()
  const imageAboutUrl = getMediaUrl(aboutPage.hero?.image)

  return (
    <div className="pt-20">
      <RefreshRouteOnSave />
      <HeroSection hero={aboutPage.hero} />
      <ValuesSection values={aboutPage.values} />
      <EducationSection education={aboutPage.education} />
      <CTASection
        backgroundColor="green"
        heading={aboutPage.cta?.heading}
        description={aboutPage.cta?.description}
        ctaHref="/contacts"
        ctaLabel={aboutPage.cta?.button}
      />
    </div>
  )
}
