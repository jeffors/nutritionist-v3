import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getAboutPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const aboutPage = await payload.findGlobal({
    slug: 'about-page',
    draft: isDraftMode,
  })

  return aboutPage
}
