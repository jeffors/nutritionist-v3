import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import { getReviewsPageData } from '@/data/reviews'
import HeroSection from '@/components/sections/reviews/HeroSection'
import ReviewsSection from '@/components/sections/reviews/ReviewsSection'
import CTASection from '@/components/shared/CTASection'

export default async function Reviews() {
  const { reviewsPage, reviews } = await getReviewsPageData()

  return (
    <div className="pt-20">
      <RefreshRouteOnSave />
      <HeroSection hero={reviewsPage.hero} />
      <ReviewsSection reviews={reviews.docs} />
      <CTASection
        backgroundColor="white"
        heading={reviewsPage.cta?.heading}
        description={reviewsPage.cta?.description}
        ctaHref="/contacts"
        ctaLabel={reviewsPage.cta?.button}
      />
    </div>
  )
}
