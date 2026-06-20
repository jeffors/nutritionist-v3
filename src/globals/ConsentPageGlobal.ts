import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const ConsentPageGlobal: GlobalConfig = {
  slug: 'consent-page',
  label: 'Страница согласия',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/consent')
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
              defaultValue: 'Согласие на обработку персональных данных',
              required: true,
            },
            {
              name: 'lastUpdated',
              type: 'text',
              label: 'Дата последнего обновления',
              defaultValue: 'Последнее обновление: 1 июня 2026 года',
              required: true,
            },
            {
              name: 'intro',
              type: 'textarea',
              label: 'Вступительный текст (зелёный блок)',
              defaultValue:
                'Настоящим я, субъект персональных данных (далее — «Пользователь»), предоставляю своё согласие ИП Галимовой Ларисе Леонидовне (далее — «Оператор») на обработку моих персональных данных на условиях, изложенных ниже.',
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
    {
      name: 'notice',
      label: 'Примечание (жёлтый блок внизу)',
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
              name: 'description',
              type: 'textarea',
              label: 'Заголовок',
              defaultValue:
                'При заполнении любой формы на данном сайте и нажатии кнопки «Записаться на консультацию» или «Отправить», вы подтверждаете, что ознакомились с настоящим Согласием и принимаете его условия.',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
