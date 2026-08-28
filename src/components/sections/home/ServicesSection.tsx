import { ServiceHomeCard } from '@/components/cards/ServiceHomeCard'
import SectionHeading from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { HomePage, Service } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type ServicesSectionProps = {
  servicesHeading: HomePage['services']
  services: Service[]
}

export default function ServicesSection({ servicesHeading, services }: ServicesSectionProps) {
  return (
    <section className="bg-gray-50 py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={servicesHeading?.heading}
          description={servicesHeading?.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceHomeCard key={service.id} service={service}></ServiceHomeCard>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="default" size="xl">
            <Link href="/services">
              {servicesHeading?.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
