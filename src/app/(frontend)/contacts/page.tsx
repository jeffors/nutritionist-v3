import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import { getContactsPageData } from '@/data/contacts'
import HeroSection from '@/components/sections/contacts/HeroSection'
import ContactsSection from '@/components/sections/contacts/ContactsSection'

export default async function Contacts() {
  const { contactsPage, contacts } = await getContactsPageData()
  return (
    <div className="pt-20">
      <RefreshRouteOnSave />
      <HeroSection hero={contactsPage.hero} />
      <ContactsSection contactsPage={contactsPage} contacts={contacts} />
    </div>
  )
}
