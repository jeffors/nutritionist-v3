import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import { getServicesPageData } from '@/data/services'
import HeroSection from '@/components/sections/services/HeroSection'
import ServicesSection from '@/components/sections/services/ServicesSection'
import CTASection from '@/components/shared/CTASection'

export default async function Services() {
  const { servicesPage, services } = await getServicesPageData()
  return (
    <div className="pt-20">
      <RefreshRouteOnSave />
      <HeroSection hero={servicesPage.hero} />
      <ServicesSection services={services.docs} />
      <CTASection
        backgroundColor="white"
        heading={servicesPage.cta?.heading}
        description={servicesPage.cta?.description}
        ctaHref="/contacts"
        ctaLabel={servicesPage.cta?.button}
      />
    </div>
  )
}
