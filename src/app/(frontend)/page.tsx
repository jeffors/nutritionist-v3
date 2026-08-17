import './styles.css'
import BackgroundImage from './../../../public/images/hero-bg.png'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
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
import { getHomePageData } from '@/data/home'

export default async function HomePage() {
  const { homePage, contacts, services, reviews, recipes, menuGuides } = await getHomePageData()

  return (
    <div className="overflow-x-hidden">
      <RefreshRouteOnSave />
      <HeroSection backgroundImage={BackgroundImage} hero={homePage.hero} />
      <AboutSection about={homePage.about} />
      <NutritionSection nutrition={homePage.nutrition} />
      <ClientStoriesSection clientStories={homePage.clientStories} />
      <ServicesSection servicesHeading={homePage.services} services={services.docs} />
      <RecipesAndGuidesSection
        recipesHeading={homePage.recipes}
        recipes={recipes.docs}
        menuGuides={menuGuides.docs}
      />
      <HowItWorksSection howItWorks={homePage.howItWorks} />
      <ReviewsSection reviewsHeading={homePage.reviews} reviews={reviews.docs} />
      <ProctologSection proctolog={homePage.proctolog} />
      <FaqSection faq={homePage.faq} />
      <ConsultationSection consultation={homePage.consultation} />
      <ContactsSection contactsHeading={homePage.contacts} contacts={contacts} />
    </div>
  )
}
