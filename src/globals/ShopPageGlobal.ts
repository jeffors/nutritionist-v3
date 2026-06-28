import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const ShopPageGlobal: GlobalConfig = {
  slug: 'shop-page',
  label: 'Страница "Гайды и лекции"',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/shop')
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
  admin: {
    group: 'Страницы',
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
              defaultValue: 'Гайды и лекции',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Первый абзац',
              defaultValue:
                'Авторские цифровые продукты для вашего здоровья. После оплаты — мгновенный доступ.',
            },
          ],
        },
      ],
    },
  ],
}
