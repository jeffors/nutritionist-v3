import { CollectionConfig } from 'payload'
import { notifyNewConsultation } from '@/services/notification'

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
        if (operation === 'create') {
          const contacts = await req.payload.findGlobal({ slug: 'contacts-global' })
          const adminUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/consultations/${doc.id}`

          await notifyNewConsultation({
            payload: req.payload,
            consultation: doc,
            adminUrl,
            notifyEmail: contacts.email_notify,
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
      defaultValue: false,
    },
  ],
}
