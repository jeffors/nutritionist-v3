import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getRecipes() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const { docs } = await payload.find({
    collection: 'recipes',
    where: { isActive: { equals: true } },
    sort: '-createdAt',
    draft: isDraftMode,
  })

  return docs
}

export async function getRecipesBySlug(slug: string) {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const { docs } = await payload.find({
    collection: 'recipes',
    where: { slug: { equals: slug } },
    draft: isDraftMode,
  })

  return docs[0] ?? null
}
