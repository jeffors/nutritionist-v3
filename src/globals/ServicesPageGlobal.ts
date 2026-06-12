import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const ServicesPageGlobal: GlobalConfig = {
  slug: 'services-page',
  label: 'Страница "Услуги"',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
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
              defaultValue: 'Мои услуги',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Первый абзац',
              defaultValue:
                'Индивидуальный подход к каждому клиенту. Все консультации проходят онлайн — WhatsApp или Telegram. Работаю со всем миром.',
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      label: 'Секция CTA',
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
              name: 'heading',
              type: 'text',
              label: 'Заголовок',
              defaultValue: 'Не знаете, что подходит именно вам?',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue:
                'Напишите мне — вместе разберёмся, какая услуга подойдёт лучше всего для вашей ситуации.',
            },
            {
              name: 'button',
              type: 'text',
              label: 'Текст кнопки',
              defaultValue: 'Оставить заявку',
            },
          ],
        },
      ],
    },
  ],
}
