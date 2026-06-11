import { revalidatePath } from 'next/cache'
import { array } from 'node:stream/iter'
import { GlobalConfig } from 'payload'

export const AboutPageGlobal: GlobalConfig = {
  slug: 'about-page',
  label: 'Страница "Обо мне"',
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
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Фотография',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Заголовок',
              defaultValue: 'Обо мне',
            },
            {
              name: 'paragraph1',
              type: 'textarea',
              label: 'Первый абзац',
              defaultValue:
                'Меня зовут Лариса Галимова. Я клинический нутрициолог с высшим медицинским образованием. Помогаю людям обрести здоровье и энергию через осознанное питание.',
            },
            {
              name: 'paragraph2',
              type: 'textarea',
              label: 'Второй абзац',
              defaultValue:
                'Сегодня я помогаю более 500 клиентам по всему миру решать проблемы со здоровьем, которые казались безнадёжными. Работаю онлайн — это позволяет сотрудничать с людьми из любой точки мира.',
            },
            {
              name: 'ctaLabel',
              type: 'text',
              label: 'Текст кнопки',
              defaultValue: 'Записаться на консультацию',
            },
          ],
        },
      ],
    },
    {
      name: 'values',
      label: 'Секция "Ценности в работе"',
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
              defaultValue: 'Мои ценности в работе',
            },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              maxRows: 4,
              labels: {
                singular: 'Пункт',
                plural: 'Пункты',
              },
              fields: [
                {
                  name: 'icon',
                  label: 'Значок',
                  type: 'select',
                  options: [
                    { label: '❤️ Сердце', value: 'Heart' },
                    { label: '📖 Книга', value: 'BookOpen' },
                    { label: '🏆 Награда', value: 'Award' },
                    { label: '✅ Галочка', value: 'CheckCircle' },
                    { label: '🎓 Выпускник', value: 'GraduationCap' },
                  ],
                  defaultValue: 'Heart',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'education',
      label: 'Секция "Образование и сертификаты"',
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
              defaultValue: 'Образование и сертификаты',
            },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              labels: {
                singular: 'Образование',
                plural: 'Образование',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Фото диплома/сертификата',
                },
                {
                  name: 'year',
                  type: 'text',
                  label: 'Год получения образования',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Название образования',
                  required: true,
                },
                {
                  name: 'place',
                  type: 'text',
                  label: 'Место получения',
                  required: true,
                },
                {
                  name: 'variant',
                  type: 'text',
                  label: 'Тип образования',
                  required: true,
                },
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
              defaultValue: 'Готовы начать путь к здоровью?',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue:
                'Запишитесь на первичную консультацию и получите персональную стратегию улучшения вашего здоровья.',
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
