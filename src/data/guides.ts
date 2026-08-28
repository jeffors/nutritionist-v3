import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getMenuGuides() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const { docs } = await payload.find({
    collection: 'menu-guides',
    where: { isActive: { equals: true } },
    sort: '-createdAt',
    draft: isDraftMode,
  })

  return docs
}

export async function getMenuGuidesBySlug(slug: string) {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const { docs } = await payload.find({
    collection: 'menu-guides',
    where: { slug: { equals: slug } },
    draft: isDraftMode,
  })

  const guide = docs[0]
  if (!guide) return null
  if (!guide.isActive && !draftMode) return null

  return guide
}

export async function getMenuGuidesSlugs() {
  const payload = await getPayload({ config: await config })

  const { docs } = await payload.find({
    collection: 'menu-guides',
    limit: 100,
    where: { isActive: { equals: true } },
  })

  return docs.map((doc) => doc.slug)
}
