import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getConsentPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const consentPage = await payload.findGlobal({
    slug: 'consent-page',
    draft: isDraftMode,
  })

  return consentPage
}
