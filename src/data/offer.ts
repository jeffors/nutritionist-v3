import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getOfferPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const offerPage = await payload.findGlobal({
    slug: 'offer-page',
    draft: isDraftMode,
  })

  return offerPage
}
