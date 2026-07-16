import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import BackgroundImage from './../../../public/images/hero-bg.png'
import Portrait from './../../../public/images/portrait.jpg'
import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronDown,
  ImageIcon,
  Leaf,
  Mail,
  Phone,
  Send,
  ShoppingBag,
  Stethoscope,
} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { ServiceHomeCard } from '@/components/cards/ServiceHomeCard'
import { GuideHomeCard } from '@/components/cards/GuideHomeCard'
import { ReviewHomeCard } from '@/components/cards/ReviewHomeCard'
import { formatPhoneNumber, formatTelegram } from '@/lib/formatContacts'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { getMediaUrl } from '@/lib/media'
import { draftMode } from 'next/headers'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled: isDraftMode } = await draftMode()
  const payloadServices = await payload.find({
    collection: 'services',
    where: { isActive: { equals: true } },
    sort: 'order',
    limit: 3,
  })
  const payloadGuides = await payload.find({
    collection: 'guides',
    depth: 1,
    sort: '-createdAt',
    where: { isActive: { equals: true } },
    limit: 3,
  })
  const payloadReviews = await payload.find({
    collection: 'reviews',
    where: { isActive: { equals: true } },
    sort: 'id',
    limit: 2,
  })
  const payloadGlobalContacts = await payload.findGlobal({ slug: 'contacts-global' })
  const payloadGlobalHomePage = await payload.findGlobal({ slug: 'home-page', draft: isDraftMode })
  const imageAboutUrl = getMediaUrl(payloadGlobalHomePage.about?.image)
  const imageProctologUrl = getMediaUrl(payloadGlobalHomePage.proctolog?.image)
  return (
    <div className="overflow-x-hidden">
      <RefreshRouteOnSave />
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={BackgroundImage}
            alt="Hero"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-white opacity-75" />
        </div>

        <div className="relative z-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-500/15 backdrop-blur-sm border border-green-500/30 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              {payloadGlobalHomePage.hero?.badge}
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-black font-light leading-tight mb-6">
              {payloadGlobalHomePage.hero?.heading}
              <br />
              <span className="text-green-700 italic">
                {payloadGlobalHomePage.hero?.headingAccent}
              </span>
            </h1>
            <p className="text-lg text-black/80 leading-relaxed mb-8 max-w-lg">
              {payloadGlobalHomePage.hero?.description}
            </p>

            <div className="flex items-center gap-6 mb-10">
              {payloadGlobalHomePage.hero?.stats?.map((stat) => (
                <div key={stat.id}>
                  <div className="font-heading text-2xl font-semibold text-black">{stat.value}</div>
                  <div className="text-xs text-black/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" size="xl">
                <Link href="#consultation">
                  {payloadGlobalHomePage.hero?.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-green-700" />
        </div>
      </section>

      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {imageAboutUrl ? (
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-lg mx-auto lg:mx-0">
                  <Image
                    src={imageAboutUrl}
                    width={400}
                    height={500}
                    alt="Портрет"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-black">
                          {payloadGlobalHomePage.about?.imageTitle}
                        </p>
                        <p className="text-xs text-black/70">
                          {payloadGlobalHomePage.about?.imageDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 bg-green-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-24 h-24 text-green-600 mx-auto mb-4 opacity-30" />
                    <p className="text-green-600 font-medium">
                      {payloadGlobalHomePage.about?.imageTitle}
                    </p>
                    <p className="text-green-500">
                      {payloadGlobalHomePage.about?.imageDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="w-60 h-1 bg-green-500 mb-4"></div>
              <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
                {payloadGlobalHomePage.about?.heading}
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                {payloadGlobalHomePage.about?.paragraph1}
              </p>
              <p className="text-black/80 leading-relaxed mb-6">
                {payloadGlobalHomePage.about?.paragraph2}
              </p>

              <ul className="space-y-3 mb-8">
                {payloadGlobalHomePage.about?.checklistItem?.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-black/80">{item.text}</p>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" size="xl">
                <Link href="/about">
                  {payloadGlobalHomePage.about?.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              {payloadGlobalHomePage.services?.heading}
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              {payloadGlobalHomePage.services?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payloadServices.docs.map((service) => (
              <ServiceHomeCard key={service.id} service={service}></ServiceHomeCard>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="default" size="xl">
              <Link href="/services">
                {payloadGlobalHomePage.services?.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {payloadGuides.docs.length !== 0 && (
        <section className="bg-white py-15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
              <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
                {payloadGlobalHomePage.guides?.heading}
              </h2>
              <p className="text-black/80 max-w-xl mx-auto">
                {payloadGlobalHomePage.guides?.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {payloadGuides.docs.length === 1 && <div className=""></div>}

              {payloadGuides.docs.map((guide) => (
                <GuideHomeCard key={guide.id} guide={guide} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="xl">
                <Link href="/shop">
                  <ShoppingBag className="w-4 h-4" />
                  {payloadGlobalHomePage.guides?.ctaLabel}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              {payloadGlobalHomePage.howItWorks?.heading}
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              {payloadGlobalHomePage.howItWorks?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {payloadGlobalHomePage.howItWorks?.steps?.map((step) => (
              <Card key={step.id}>
                <CardHeader>
                  <div className="font-heading text-4xl md:text-5xl text-gray-200 font-light mb-4">
                    {step.number}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              {payloadGlobalHomePage.reviews?.heading}
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              {payloadGlobalHomePage.reviews?.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payloadReviews.docs.map((review) => {
              let short_review = {
                ...review,
                text: Array.from(review.text.split('.', 12)).join('.'),
              }
              return <ReviewHomeCard key={review.id} review={short_review} />
            })}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="xl">
              <Link href="/reviews">
                {payloadGlobalHomePage.reviews?.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-indigo-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {imageProctologUrl ? (
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-lg mx-auto lg:mx-0">
                  <Image
                    src={imageProctologUrl}
                    width={400}
                    height={500}
                    alt="Портрет"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-black">
                          {payloadGlobalHomePage.proctolog?.headingAccent}
                        </p>
                        <p className="text-xs text-black/70">
                          {payloadGlobalHomePage.proctolog?.heading}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 bg-indigo-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-24 h-24 text-indigo-600 mx-auto mb-4 opacity-30" />
                    <p className="text-indigo-600 font-medium">
                      {payloadGlobalHomePage.proctolog?.headingAccent}
                    </p>
                    <p className="text-indigo-500">{payloadGlobalHomePage.proctolog?.heading}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Badge className="mb-4 bg-indigo-100 text-indigo-700">
                {payloadGlobalHomePage.proctolog?.badge}
              </Badge>
              <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
                {payloadGlobalHomePage.proctolog?.heading}
                <div className="text-indigo-600">
                  {payloadGlobalHomePage.proctolog?.headingAccent}
                </div>
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                {payloadGlobalHomePage.proctolog?.paragraph1}
              </p>
              <p className="text-black/80 leading-relaxed mb-6">
                {payloadGlobalHomePage.proctolog?.paragraph2}
              </p>

              <ul className="space-y-3 mb-8">
                {payloadGlobalHomePage.proctolog?.checklistItem?.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-black/80">{item.text}</p>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" size="xl">
                <Link href={payloadGlobalHomePage.proctolog?.ctaLink ?? ''}>
                  {payloadGlobalHomePage.proctolog?.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              {payloadGlobalHomePage.faq?.heading}
            </h2>
          </div>
          <Accordion type="multiple">
            {payloadGlobalHomePage.faq?.items?.map((item) => (
              <AccordionItem key={item.id} value={item.id?.toString() ?? ''}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="consultation" className="bg-white py-15">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              {payloadGlobalHomePage.consultation?.heading}
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              {payloadGlobalHomePage.consultation?.description}
            </p>
          </div>
          <ConsultationForm></ConsultationForm>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
              {payloadGlobalHomePage.contacts?.heading}
            </h2>
            <p className="text-black/80 max-w-xl mx-auto">
              {payloadGlobalHomePage.contacts?.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader className="">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                </div>

                <CardTitle className="flex font-sans justify-center">WhatsApp</CardTitle>
                <CardDescription className="flex justify-center">
                  {formatPhoneNumber(payloadGlobalContacts.whatsapp)}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-green-600 mb-3">
                    <Send className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                <CardTitle className="flex font-sans justify-center">Telegram</CardTitle>
                <CardDescription className="flex justify-center">
                  {formatTelegram(payloadGlobalContacts.telegram)}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-green-600 mb-3">
                    <Mail className="w-6 h-6 text-gray-600" />
                  </div>
                </div>

                <CardTitle className="flex font-sans justify-center">Mail</CardTitle>
                <CardDescription className="flex justify-center">
                  {payloadGlobalContacts.email}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
