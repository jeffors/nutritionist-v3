import { CollectionConfig } from 'payload'

export const Guides: CollectionConfig = {
  slug: 'guides',
  labels: {
    singular: 'Материал',
    plural: 'Материалы',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'category', 'price', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Краткое описание',
      required: true,
      admin: {
        description: 'Отображается на карточке товара. ~150 символов.',
      },
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      label: 'Полное описание',
      required: true,
      admin: {
        description: 'Отображается в модальном окне / на странице товара.',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      required: true,
      options: [
        { label: 'Гайды', value: 'guides' },
        { label: 'Лекции', value: 'lectures' },
        { label: 'Чек-листы', value: 'checklists' },
        { label: 'Мини-курсы', value: 'mini-courses' },
      ],
    },
    {
      name: 'pages',
      label: 'Количество страниц',
      type: 'number',
      min: 1,
      admin: {
        description: 'Не обязательно для лекцией и видео-курсов',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Цена (₽)',
      required: true,
      min: 0,
    },
    {
      name: 'file',
      label: 'Файлы материала (PDF / видео)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Приватный файл - отправляется покупателю после оплаты',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          label: 'Рейтинг',
          type: 'number',
          min: 0,
          max: 5,
          admin: {
            description: 'Например: 4.9',
          },
        },
        {
          name: 'review',
          label: 'Количество отзывов',
          type: 'number',
          min: 0,
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'tag',
      label: 'Бейдж (необязательно)',
      type: 'text',
      admin: {
        placeholder: 'Бестселлер, Новинка, Популярно...',
        description: 'Если заполнено - отображается в углу карточки',
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
