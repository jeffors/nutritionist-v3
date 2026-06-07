import ConsultationForm from '@/components/forms/ConsultationForm'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Globe, Mail, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { formatPhoneNumber, formatTelegram } from '@/lib/formatContacts'

export default async function Contacts() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const payloadGlobalContacts = await payload.findGlobal({ slug: 'contacts-global' })
  return (
    <div className="pt-20">
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
          <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">Контакты</h1>
          <div className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-6">
            Выберите удобный способ связи. Отвечаю в течение 2 часов в рабочее время.
          </div>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="">
              <h2 className="font-heading text-3xl text-black font-light mb-8">Как связаться</h2>
              <div className="space-y-5">
                <Link
                  href={`https://wa.me/{${payloadGlobalContacts.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-green-50 rounded-2xl border border-green-100 hover:border-green-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="">
                    <p className="font-semibold text-black group-hover:text-green-700 transition-colors">
                      WhatsApp
                    </p>
                    <p className="text-black/80 text-sm">
                      {formatPhoneNumber(payloadGlobalContacts.whatsapp)}
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">Написать сейчас →</p>
                  </div>
                </Link>
                <Link
                  href={`https://t.me/{${payloadGlobalContacts.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100 hover:border-blue-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div className="">
                    <p className="font-semibold text-black group-hover:text-blue-700 transition-colors">
                      Telegram
                    </p>
                    <p className="text-black/80 text-sm">
                      {formatTelegram(payloadGlobalContacts.telegram)}
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">Написать в Telegram →</p>
                  </div>
                </Link>
                <Link
                  href={`mailto:${payloadGlobalContacts.email}`}
                  className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="">
                    <p className="font-semibold text-black group-hover:text-gray-700 transition-colors">
                      Email
                    </p>
                    <p className="text-black/80 text-sm">{payloadGlobalContacts.email}</p>
                    <p className="text-xs text-gray-600 mt-0.5">Написать на почту →</p>
                  </div>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Card>
                  <CardHeader>
                    <Clock className="w-6 h-6 text-green-700 mb-3"></Clock>
                    <CardTitle className="font-sans text-sm">Время работы</CardTitle>
                    <CardDescription>
                      Пн–Пт: 9:00–19:00
                      <br />
                      Сб: 10:00–16:00
                      <br />
                      Вс: выходной
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Globe className="w-6 h-6 text-green-700 mb-3" />
                    <CardTitle className="font-sans text-sm">Работаю онлайн</CardTitle>
                    <CardDescription>
                      Консультирую клиентов
                      <br />
                      из любой страны мира.
                      <br />
                      WhatsApp / TG
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
            <Card className="p-8">
              <h2 className="font-heading text-3xl text-black font-light mb-2">Оставить заявку</h2>
              <p className="text-black/80 text-sm mb-6">
                Заполните форму и я свяжусь с вами в течение 2 часов
              </p>
              <ConsultationForm />
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
