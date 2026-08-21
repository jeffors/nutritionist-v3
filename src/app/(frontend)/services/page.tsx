import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import SectionHeading from '@/components/shared/SectionHeading'
import { getServicesPageData } from '@/data/services'

export default async function Services() {
  const { servicesPage, services } = await getServicesPageData()
  return (
    <div className="pt-20">
      <RefreshRouteOnSave />
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title={servicesPage.hero?.heading}
            description={servicesPage.hero?.description}
            hero
            as="h1"
          />
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.docs.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-15 bg-green-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-light mb-4">{servicesPage.cta?.heading}</h2>
          <p className="text-black/80 mb-8 leading-relaxed">{servicesPage.cta?.description}</p>
          <Button asChild variant="default" size="xl">
            <Link href="/contacts">
              {servicesPage.cta?.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
