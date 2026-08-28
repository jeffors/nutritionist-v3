import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getPrivacyPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const privacyPage = await payload.findGlobal({
    slug: 'privacy-page',
    draft: isDraftMode,
  })

  return privacyPage
}
