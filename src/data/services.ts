import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getServicesPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const [servicesPage, services] = await Promise.all([
    payload.findGlobal({
      slug: 'services-page',
      draft: isDraftMode,
    }),
    payload.find({
      collection: 'services',
      where: { isActive: { equals: true } },
      sort: 'order',
    }),
  ])

  return { servicesPage, services }
}
