import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getReviewsPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const [reviewsPage, reviews] = await Promise.all([
    payload.findGlobal({
      slug: 'review-page',
      draft: isDraftMode,
    }),
    payload.find({
      collection: 'reviews',
      where: { isActive: { equals: true } },
      sort: '-data',
    }),
  ])

  return { reviewsPage, reviews }
}
