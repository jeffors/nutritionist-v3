import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getHomePageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const [homePage, contacts, services, reviews, recipes, menuGuides] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', draft: isDraftMode }),
    payload.findGlobal({ slug: 'contacts-global' }),
    payload.find({
      collection: 'services',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 3,
    }),
    payload.find({
      collection: 'reviews',
      where: { isActive: { equals: true } },
      sort: 'id',
      limit: 2,
    }),
    payload.find({
      collection: 'recipes',
      where: { isActive: { equals: true } },
      sort: '-createdAt',
      draft: isDraftMode,
      limit: 2,
    }),
    payload.find({
      collection: 'menu-guides',
      where: { isActive: { equals: true } },
      sort: 'createdAt',
      draft: isDraftMode,
      limit: 5,
    }),
  ])

  return { homePage, contacts, services, reviews, recipes, menuGuides }
}
