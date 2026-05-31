import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Описание',
    },
    {
      name: 'price',
      type: 'text',
      label: 'Цена',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Продолжительность',
    },
    {
      name: 'includes',
      type: 'textarea',
      label: 'Что включает (по пунктам)',
    },
  ],
}
