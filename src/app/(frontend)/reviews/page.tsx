import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ReviewCard } from '@/components/cards/ReviewCard'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function Reviews() {
  const payload = await getPayload({ config })
  const payloadReviews = await payload.find({
    collection: 'reviews',
    where: { isActive: { equals: true } },
    sort: '-data',
  })
  const payloadGlobalReviewPage = await payload.findGlobal({ slug: 'review-page', draft: true })

  return (
    <div className="pt-20">
      <RefreshRouteOnSave />
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
          <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
            {payloadGlobalReviewPage.hero?.heading}
          </h1>
          <div className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-6">
            {payloadGlobalReviewPage.hero?.description}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
            {payloadGlobalReviewPage.hero?.stats?.map((stat) => (
              <div className="text-center" key={stat.id}>
                <div className="font-heading text-4xl font-light text-black mb-1">{stat.value}</div>
                <div className="text-xs text-black/80 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payloadReviews.docs.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-15 bg-green-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-light mb-4">
            {payloadGlobalReviewPage.cta?.heading}
          </h2>
          <p className="text-black/80 mb-8 leading-relaxed">
            {payloadGlobalReviewPage.cta?.description}
          </p>
          <Button asChild variant="default" size="xl">
            <Link href="/contacts">{payloadGlobalReviewPage.cta?.button}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
