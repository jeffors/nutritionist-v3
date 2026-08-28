import ConsultationForm from '@/components/forms/ConsultationForm/ConsultationForm'
import ContactMethod from '@/components/shared/ContactMethod'
import InfoCard from '@/components/shared/InfoCard'
import { Card } from '@/components/ui/card'
import { formatPhoneNumber, formatTelegram } from '@/lib/formatContacts'
import { ContactsGlobal, ContactsPage } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Clock, Globe, Mail, Phone, Send } from 'lucide-react'

type ContactsSectionProps = {
  contactsPage: ContactsPage
  contacts: ContactsGlobal
}

export default function ContactsSection({ contactsPage, contacts }: ContactsSectionProps) {
  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="">
            <h2 className="font-heading text-3xl text-black font-light mb-8">
              {contactsPage.hero?.howToContact}
            </h2>
            <div className="space-y-5">
              <ContactMethod
                variant="detailed"
                href={`https://wa.me/${contacts.whatsapp}`}
                colorScheme="green"
                icon={Phone}
                label="WhatsApp"
                value={formatPhoneNumber(contacts.whatsapp)}
                ctaText="Написать сейчас"
              />
              <ContactMethod
                variant="detailed"
                href={`https://t.me/${contacts.telegram}`}
                colorScheme="blue"
                icon={Send}
                label="Telegram"
                value={formatTelegram(contacts.telegram)}
                ctaText="Написать в Telegram"
              />
              <ContactMethod
                variant="detailed"
                href={`mailto:${contacts.email}`}
                colorScheme="gray"
                icon={Mail}
                label="Email"
                value={contacts.email}
                ctaText="Написать на почту"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <InfoCard icon={Clock} title={contactsPage.hours?.heading}>
                <RichText data={contactsPage.hours?.description} />
              </InfoCard>
              <InfoCard icon={Globe} title={contactsPage.online?.heading}>
                <RichText data={contactsPage.online?.description} />
              </InfoCard>
            </div>
          </div>
          <Card className="p-8">
            <h2 className="font-heading text-3xl text-black font-light mb-2">
              {contactsPage.form?.heading}
            </h2>
            <p className="text-black/80 text-sm mb-6">{contactsPage.form?.description}</p>
            <ConsultationForm />
          </Card>
        </div>
      </div>
    </section>
  )
}
