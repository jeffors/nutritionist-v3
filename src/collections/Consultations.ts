import ConsultationEmail from 'emails/consultation'
import { CollectionConfig } from 'payload'
import { render } from 'react-email'

export const Consultations: CollectionConfig = {
  slug: 'consultations',
  labels: {
    singular: 'Заявка на консультацию',
    plural: 'Заявки на консультации',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Контент',
    defaultColumns: ['name', 'phone', 'messenger', 'isActive'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          const html = await render(
            ConsultationEmail({
              url: '/admin',
              name: doc.name,
              phone: doc.phone,
              email: doc.email,
              messenger: doc.messenger,
              request: doc.request,
            }),
          )

          await req.payload.sendEmail({
            to: 'test@example.com',
            subject: 'Новая заявка на консультацию',
            html,
          })
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
      defaultValue: 'false',
    },
  ],
}
