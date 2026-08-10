import ConsultationEmail from 'emails/consultation'
import { CollectionConfig } from 'payload'
import { render } from 'react-email'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const Consultations: CollectionConfig = {
  slug: 'consultations',
  labels: {
    singular: 'Заявка на консультацию',
    plural: 'Заявки на консультации',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Заявки',
    defaultColumns: ['name', 'phone', 'messenger', 'isActive'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        const payloadConfig = await config
        const payload = await getPayload({ config: payloadConfig })
        const payloadGlobalContacts = await payload.findGlobal({ slug: 'contacts-global' })

        if (operation === 'create') {
          const website = process.env.NEXT_PUBLIC_PAYLOAD_URL
          try {
            const html = await render(
              ConsultationEmail({
                url: `${website}/admin/collections/consultations/${doc.id}`,
                name: doc.name,
                phone: doc.phone,
                email: doc.email,
                messenger: doc.messenger,
                request: doc.request,
              }),
            )

            await req.payload.sendEmail({
              from: `"Лариса Галимова | Нутрициолог" <${process.env.EMAIL_DOMAIN}>`,
              to: payloadGlobalContacts.email_notify,
              subject: 'Новая заявка на консультацию',
              html,
            })
          } catch (emailError) {
            req.payload.logger.error(`Ошибка отправки Email: ${emailError}`)
          }

          const botToken = process.env.TELEGRAM_BOT_TOKEN
          const chatId = process.env.TELEGRAM_CHAT_ID
          const PROXY_URL = process.env.PROXY_URL ?? ''
          const PROXY_SECRET = process.env.PROXY_SECRET ?? ''

          if (botToken && chatId) {
            const message = [
              `🔔 <b>Новая заявка на консультацию! Номер: ${doc.id}</b>`,
              ``,
              `<a href="${website}/admin/collections/consultations/${doc.id}">Открыть заявку в админ-панели</a>`,
            ].join('\n')

            try {
              await fetch(PROXY_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-proxy-secret': PROXY_SECRET,
                },
                body: JSON.stringify({
                  token: botToken,
                  method: 'sendMessage',
                  payload: {
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML',
                  },
                }),
              })
            } catch (tgError) {
              req.payload.logger.error(`Ошибка отправки в Telegram: ${tgError}`)
            }
          } else {
            req.payload.logger.warn('Telegram переменные окружения не настроены.')
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      required: true,
    },
    {
      name: 'messenger',
      type: 'select',
      label: 'Мессенджер',
      required: true,
      options: ['whatsapp', 'telegram'],
    },
    {
      name: 'request',
      type: 'textarea',
      label: 'Запрос',
      required: true,
    },
    {
      name: 'isActive',
      label: 'Обработана',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
