import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export async function getContactsPageData() {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraftMode } = await draftMode()

  const [contactsPage, contacts] = await Promise.all([
    payload.findGlobal({
      slug: 'contacts-page',
      draft: isDraftMode,
    }),
    payload.findGlobal({ slug: 'contacts-global' }),
  ])

  return { contactsPage, contacts }
}
