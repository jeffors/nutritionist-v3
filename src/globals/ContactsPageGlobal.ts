import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const ContactsPageGlobal: GlobalConfig = {
  slug: 'contacts-page',
  label: 'Страница "Контакты"',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/contacts')
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
              defaultValue: 'Контакты',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue:
                'Выберите удобный способ связи. Отвечаю в течение 2 часов в рабочее время.',
            },
            {
              name: 'howToContact',
              type: 'text',
              label: 'Заголовок секции с контактами',
              defaultValue: 'Как связаться',
            },
          ],
        },
      ],
    },
    {
      name: 'hours',
      type: 'group',
      label: 'Секция "Время работы"',
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
              defaultValue: 'Время работы',
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Описание',
            },
          ],
        },
      ],
    },
    {
      name: 'online',
      type: 'group',
      label: 'Секция "Работаю онлайн"',
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
              defaultValue: 'Работаю онлайн',
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Описание',
            },
          ],
        },
      ],
    },
    {
      name: 'form',
      type: 'group',
      label: 'Секция "Оставить заявку"',
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
              defaultValue: 'Оставить заявку',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue: 'Заполните форму и я свяжусь с вами в течение 2 часов',
            },
          ],
        },
      ],
    },
  ],
}
