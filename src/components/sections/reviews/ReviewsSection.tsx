import { Review } from '@/payload-types'
import { ReviewCard } from '@/components/cards/ReviewCard'

type ReviewsSectionProps = {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant="full" />
          ))}
        </div>
      </div>
    </section>
  )
}
