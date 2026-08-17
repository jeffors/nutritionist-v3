import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'
import BackgroundImage from './../../../public/images/hero-bg.png'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import { draftMode } from 'next/headers'
import HeroSection from '@/components/sections/home/HeroSection'
import AboutSection from '@/components/sections/home/AboutSection'
import NutritionSection from '@/components/sections/home/NutritionSection'
import ClientStoriesSection from '@/components/sections/home/ClientStoriesSection'
import ServicesSection from '@/components/sections/home/ServicesSection'
import RecipesAndGuidesSection from '@/components/sections/home/RecipesAndGuidesSection'
import HowItWorksSection from '@/components/sections/home/HowItWorksSection'
import ReviewsSection from '@/components/sections/home/ReviewsSection'
import ProctologSection from '@/components/sections/home/ProctologSection'
import FaqSection from '@/components/sections/home/FaqSection'
import ConsultationSection from '@/components/sections/home/ConsultationSection'
import ContactsSection from '@/components/sections/home/ContactsSection'

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

  return (
    <div className="overflow-x-hidden">
      <RefreshRouteOnSave />
      <HeroSection backgroundImage={BackgroundImage} hero={payloadGlobalHomePage.hero} />
      <AboutSection about={payloadGlobalHomePage.about} />
      <NutritionSection nutrition={payloadGlobalHomePage.nutrition} />
      <ClientStoriesSection clientStories={payloadGlobalHomePage.clientStories} />
      <ServicesSection
        servicesHeading={payloadGlobalHomePage.services}
        services={payloadServices.docs}
      />
      <RecipesAndGuidesSection
        recipesHeading={payloadGlobalHomePage.recipes}
        recipes={payloadRecipes.docs}
        menuGuides={payloadMenuGuides.docs}
      />
      <HowItWorksSection howItWorks={payloadGlobalHomePage.howItWorks} />
      <ReviewsSection
        reviewsHeading={payloadGlobalHomePage.reviews}
        reviews={payloadReviews.docs}
      />
      <ProctologSection proctolog={payloadGlobalHomePage.proctolog} />
      <FaqSection faq={payloadGlobalHomePage.faq} />
      <ConsultationSection consultation={payloadGlobalHomePage.consultation} />
      <ContactsSection
        contactsHeading={payloadGlobalHomePage.contacts}
        contacts={payloadGlobalContacts}
      />
    </div>
  )
}
