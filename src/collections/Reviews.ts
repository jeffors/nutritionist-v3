import { revalidatePath } from 'next/cache'
import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Отзыв',
    plural: 'Отзывы',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Контент',
    defaultColumns: ['name', 'service', 'stars', 'date'],
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/reviews')
        revalidatePath('/')
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
      type: 'row',
      fields: [
        {
          name: 'age',
          label: 'Возраст',
          type: 'number',
          min: 1,
          max: 100,
        },
        {
          name: 'location',
          label: 'Город',
          type: 'text',
        },
      ],
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст отзыва',
      required: true,
    },
    {
      name: 'stars',
      type: 'number',
      label: 'Оценка (1–5)',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'service',
      label: 'Услуга / Программа',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Дата отзыва',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMMM yyyy',
        },
      },
    },
    {
      name: 'isActive',
      label: 'Активна (показывать карточку на сайте)',
      type: 'checkbox',
      defaultValue: 'true',
    },
  ],
}
