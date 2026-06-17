import { CollectionConfig } from 'payload'

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
