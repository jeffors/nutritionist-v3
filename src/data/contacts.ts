import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getContactsPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const [contactsPage, contacts, services] = await Promise.all([
    payload.findGlobal({
      slug: 'contacts-page',
      draft: isDraftMode,
    }),
    payload.findGlobal({ slug: 'contacts-global' }),
    payload.find({
      collection: 'services',
      where: { isActive: { equals: true } },
      sort: 'order',
    }),
  ])

  return { contactsPage, contacts, services }
}
