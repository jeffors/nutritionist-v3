import ContactMethod from '@/components/shared/ContactMethod'
import SectionHeading from '@/components/shared/SectionHeading'
import { formatPhoneNumber, formatTelegram } from '@/lib/formatContacts'
import { ContactsGlobal, HomePage } from '@/payload-types'
import { Mail, Phone, Send } from 'lucide-react'

type ContactsSectionProps = {
  contactsHeading: HomePage['contacts']
  contacts: ContactsGlobal
}

export default function ContactsSection({ contactsHeading, contacts }: ContactsSectionProps) {
  return (
    <section className="bg-gray-50 py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={contactsHeading?.heading}
          description={contactsHeading?.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <ContactMethod
            colorScheme="green"
            icon={Phone}
            label="WhatsApp"
            value={formatPhoneNumber(contacts.whatsapp)}
            href={`https://wa.me/${contacts.whatsapp}`}
            variant="compact"
          />
          <ContactMethod
            colorScheme="blue"
            icon={Send}
            label="Telegram"
            value={formatTelegram(contacts.telegram)}
            href={`https://t.me/${contacts.telegram}`}
            variant="compact"
          />
          <ContactMethod
            colorScheme="gray"
            icon={Mail}
            label="WhatsApp"
            value={contacts.email}
            href={`mailto:${contacts.email}`}
            variant="compact"
          />
        </div>
      </div>
    </section>
  )
}
