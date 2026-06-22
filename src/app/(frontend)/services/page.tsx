import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Heart,
  Leaf,
  MessageCircle,
  Stethoscope,
} from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { draftMode } from 'next/headers'

export default async function Services() {
  const payload = await getPayload({ config })
  const { isEnabled: isDraftMode } = await draftMode()
  const payloadServices = await payload.find({
    collection: 'services',
    where: { isActive: { equals: true } },
    sort: 'order',
  })
  const payloadGlobalServicesPage = await payload.findGlobal({
    slug: 'services-page',
    draft: isDraftMode,
  })
  return (
    <div className="pt-20">
      <RefreshRouteOnSave />
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
          <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
            {payloadGlobalServicesPage.hero?.heading}
          </h1>
          <div className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-6">
            {payloadGlobalServicesPage.hero?.description}
          </div>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {payloadServices.docs.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-15 bg-green-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-light mb-4">
            {payloadGlobalServicesPage.cta?.heading}
          </h2>
          <p className="text-black/80 mb-8 leading-relaxed">
            {payloadGlobalServicesPage.cta?.description}
          </p>
          <Button asChild variant="default" size="xl">
            <Link href="/contacts">
              {payloadGlobalServicesPage.cta?.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
