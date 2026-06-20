import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const OfferPageGlobal: GlobalConfig = {
  slug: 'offer-page',
  label: 'Страница публичной оферты',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/offer')
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Первая секция',
      fields: [
        {
          type: 'collapsible',
          label: 'Поля секции',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Заголовок',
              defaultValue: 'Публичная оферта',
              required: true,
            },
            {
              name: 'lastUpdated',
              type: 'text',
              label: 'Дата последнего обновления',
              defaultValue: 'Редакция от 1 июня 2026 года',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'sections',
      label: 'Основной текст',
      type: 'group',
      fields: [
        {
          type: 'collapsible',
          label: 'Поля секции',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              label: 'Разделы',
              labels: {
                singular: 'Раздел',
                plural: 'Разделы',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Заголовок раздела',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'richText',
                  label: 'Содержимое',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
