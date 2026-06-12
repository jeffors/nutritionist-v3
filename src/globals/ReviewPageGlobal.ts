import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const ReviewPageGlobal: GlobalConfig = {
  slug: 'review-page',
  label: 'Страница "Отзывы клиентов"',
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
              defaultValue: 'Отзывы клиентов',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Первый абзац',
              defaultValue: 'Реальные истории реальных людей, которые улучшили своё здоровье.',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Статистика',
              labels: {
                singular: 'Показатель',
                plural: 'Показатели',
              },
              fields: [
                { name: 'value', type: 'text', label: 'Значение', required: true },
                { name: 'label', type: 'text', label: 'Подпись', required: true },
              ],
              defaultValue: [
                { value: '500+', label: 'клиентов' },
                { value: '4.9', label: 'cредняя оценка' },
                { value: '97%', label: 'рекомендуют знакомым' },
                { value: '5 лет', label: 'практики' },
              ],
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
              defaultValue: 'Станьте следующим успешным примером',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue:
                'Запишитесь на консультацию и начните свой путь к здоровью уже сегодня.',
            },
            {
              name: 'button',
              type: 'text',
              label: 'Текст кнопки',
              defaultValue: 'Записаться на консультацию',
            },
          ],
        },
      ],
    },
  ],
}
