import { Review } from '@/payload-types'
import { ReviewCard } from '@/components/cards/ReviewCard'

type ReviewsSectionProps = {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant="full" />
          ))}
        </div>
      </div>
    </section>
  )
}
