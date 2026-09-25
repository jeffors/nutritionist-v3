import { ReviewCard } from '@/components/cards/ReviewCard'
import SectionHeading from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { HomePage, Review } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type ReviewsSectionProps = {
  reviewsHeading: HomePage['reviews']
  reviews: Review[]
}

export default function ReviewsSection({ reviewsHeading, reviews }: ReviewsSectionProps) {
  return (
    <section className="bg-white py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={reviewsHeading?.heading} description={reviewsHeading?.description} />
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review) => {
            let home_review
            if (review.name && review.text) {
              home_review = {
                ...review,
                text: Array.from(review.text.split('.', 12)).join('.'),
              }
            } else {
              home_review = review
            }

            return <ReviewCard key={review.id} review={home_review} variant="home" />
          })}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="xl">
            <Link href="/reviews">
              {reviewsHeading?.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
