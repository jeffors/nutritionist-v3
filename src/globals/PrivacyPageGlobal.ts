import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const PrivacyPageGlobal: GlobalConfig = {
  slug: 'privacy-page',
  label: 'Страница политики конфиденциальности',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/privacy')
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
              defaultValue: 'Политика конфиденциальности',
              required: true,
            },
            {
              name: 'lastUpdated',
              type: 'text',
              label: 'Дата последнего обновления',
              defaultValue: 'Последнее обновление: 1 июня 2026 года',
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
