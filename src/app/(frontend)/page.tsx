import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import BackgroundImage from './../../../public/images/hero-bg.png'
import {
  ArrowRight,
  Award,
  BookOpen,
  Camera,
  CheckCircle,
  ChevronDown,
  FileText,
  ImageIcon,
  Leaf,
  LockIcon,
  Mail,
  Phone,
  Send,
  Stethoscope,
  Utensils,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { ServiceHomeCard } from '@/components/cards/ServiceHomeCard'
import { ReviewHomeCard } from '@/components/cards/ReviewHomeCard'
import { formatPhoneNumber, formatTelegram } from '@/lib/formatContacts'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import { getMediaUrl } from '@/lib/media'
import { draftMode } from 'next/headers'
import { RECIPE_CATEGORIES } from '@/lib/recipe-maps'
import { iconMap } from '@/lib/service-maps'
import { Section } from 'react-email'
import SectionHeading from '@/components/shared/SectionHeading'
import PortraitBlock from '@/components/shared/PortraitBlock'

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
  const payloadReviews = await payload.find({
    collection: 'reviews',
    where: { isActive: { equals: true } },
    sort: 'id',
    limit: 2,
  })
  const payloadRecipes = await payload.find({
    collection: 'recipes',
    where: { isActive: { equals: true } },
    sort: '-createdAt',
    draft: isDraftMode,
    limit: 2,
  })
  const payloadMenuGuides = await payload.find({
    collection: 'menu-guides',
    where: { isActive: { equals: true } },
    sort: 'createdAt',
    draft: isDraftMode,
    limit: 5,
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
            <PortraitBlock
              icon={Award}
              imageUrl={imageAboutUrl}
              title={payloadGlobalHomePage.about?.imageTitle}
              description={payloadGlobalHomePage.about?.imageDescription}
            />

            <div>
              <SectionHeading title={payloadGlobalHomePage.about?.heading} align="left" />
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

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title={payloadGlobalHomePage.nutrition?.heading} align="left" />
              <p className="text-black/80 leading-relaxed mb-4 text-base md:text-lg">
                {payloadGlobalHomePage.nutrition?.paragraph1}
              </p>
              <p className="text-black/80 leading-relaxed mb-6">
                {payloadGlobalHomePage.nutrition?.paragraph2}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {payloadGlobalHomePage.nutrition?.cards?.map((card) => (
                <Card key={card.id} className="border-none shadow-md bg-white">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-medium font-heading text-black mb-2">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-black/70 leading-relaxed">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={payloadGlobalHomePage.clientStories?.heading}
            description={payloadGlobalHomePage.clientStories?.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {payloadGlobalHomePage.clientStories?.cards?.map((card) => {
              const cardImage = getMediaUrl(card.image)

              return (
                <Card
                  key={card.id}
                  className="flex flex-col h-full border border-gray-100 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-green-50/50 border-b border-gray-100 group">
                    {cardImage ? (
                      <Image
                        src={cardImage}
                        alt={card.title || 'Фотография тарелки'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full p-6 text-center">
                        <div>
                          <Camera className="w-10 h-10 text-green-600/30 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                          <p className="text-sm font-heading font-medium text-green-800">
                            Фото тарелки подопечного
                          </p>
                          <p className="text-xs text-black/50 mt-1">
                            Здесь будет ваше фото рациона
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-800 border-none font-normal text-xs">
                        {card.badge}
                      </Badge>
                      <span className="text-xs text-black/50">{card.name}</span>
                    </div>
                    <CardTitle className="text-lg font-medium font-heading text-black">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-black/80 leading-relaxed mt-2">
                      «{card.description}»
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6 mt-auto">
                    <div className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                      {card.result}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={payloadGlobalHomePage.services?.heading}
            description={payloadGlobalHomePage.services?.description}
          />

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

      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={payloadGlobalHomePage.recipes?.heading}
            description={payloadGlobalHomePage.recipes?.description}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Utensils className="w-6 h-6 text-green-600" />
                <h3 className="font-heading text-2xl font-light text-black">Бесплатные рецепты</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {payloadRecipes.docs.map((recipe) => {
                  const recipe_image = getMediaUrl(recipe.image)
                  return (
                    <Link href={`/recipes/${recipe.slug}`} key={recipe.id}>
                      <Card className="border border-gray-150 shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden bg-white">
                        <div className="h-40 bg-green-50/30 flex items-center justify-center border-b border-gray-100 relative">
                          {recipe_image ? (
                            <Image src={recipe_image} alt={recipe.title} fill></Image>
                          ) : (
                            <Leaf className="w-8 h-8 text-green-500/40" />
                          )}
                        </div>
                        <CardHeader className="p-4">
                          <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold">
                            {RECIPE_CATEGORIES[recipe.category]}
                          </span>
                          <CardTitle className="text-base font-heading font-medium text-black mt-1">
                            {recipe.title}
                          </CardTitle>
                          <CardDescription className="text-xs text-black/70 leading-relaxed line-clamp-4 mt-2">
                            {recipe.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  )
                })}
              </div>

              <div className="text-left mt-4">
                <Button asChild variant="outline" size="xl">
                  <Link href="/recipes" className="inline-flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {payloadGlobalHomePage.recipes?.ctaLabel}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-green-600" />
                <h3 className="font-heading text-2xl font-light text-black">
                  Терапевтические меню-гайды
                </h3>
              </div>

              <div className="space-y-4">
                {payloadMenuGuides.docs.map((guide) => {
                  const isAvailable = !guide.isComingSoon
                  const Icon = iconMap[guide.icon]

                  if (!isAvailable) {
                    return (
                      <div
                        key={guide.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-gray-100/50 border border-dashed border-gray-200 opacity-75"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                            <LockIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700">{guide.title}</h4>
                            <p className="text-xs text-gray-500">
                              {guide.description || 'В перспективе / В разработке'}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-white border-gray-300 text-gray-500 text-[10px]"
                        >
                          Скоро
                        </Badge>
                      </div>
                    )
                  }

                  return (
                    <Link key={guide.id} href={`/guides/${guide.slug}`} className="block">
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-green-50/30 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                            <Icon name={guide.icon} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-black">{guide.title}</h4>
                            {guide.description && (
                              <p className="text-xs text-black/60 line-clamp-1">
                                {guide.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="group-hover:translate-x-1 transition-transform"
                          asChild
                        >
                          <div>
                            <ArrowRight className="w-4 h-4 text-green-700" />
                          </div>
                        </Button>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* <div className="text-left mt-4">
                <Button asChild variant="outline" size="xl">
                  <Link href="/guides" className="inline-flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Все меню-гайды
                  </Link>
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={payloadGlobalHomePage.howItWorks?.heading}
            description={payloadGlobalHomePage.howItWorks?.description}
          />
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
          <SectionHeading
            title={payloadGlobalHomePage.reviews?.heading}
            description={payloadGlobalHomePage.reviews?.description}
          />
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
            <PortraitBlock
              icon={Stethoscope}
              imageUrl={imageProctologUrl}
              title={payloadGlobalHomePage.proctolog?.headingAccent}
              description={payloadGlobalHomePage.proctolog?.heading}
              accentColor="indigo"
            />

            <div>
              <SectionHeading
                badge={payloadGlobalHomePage.proctolog?.badge}
                title={payloadGlobalHomePage.proctolog?.heading}
                accentTitle={payloadGlobalHomePage.proctolog?.headingAccent}
                accentColor="indigo"
                align="left"
              />
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
          <SectionHeading title={payloadGlobalHomePage.faq?.heading} />
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
          <SectionHeading
            title={payloadGlobalHomePage.consultation?.heading}
            description={payloadGlobalHomePage.consultation?.description}
          />
          <ConsultationForm></ConsultationForm>
        </div>
      </section>

      <section className="bg-gray-50 py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={payloadGlobalHomePage.contacts?.heading}
            description={payloadGlobalHomePage.contacts?.description}
          />
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
