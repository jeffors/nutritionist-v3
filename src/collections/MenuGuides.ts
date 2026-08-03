import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const MenuGuides: CollectionConfig = {
  slug: 'menu-guides',
  labels: {
    singular: 'Меню-гайд',
    plural: 'Терапевтические меню-гайды',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'readingTime', 'isComingSoon', 'isActive', 'updatedAt'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/guides')
        revalidatePath('/')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название гайда / статьи',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (URL адрес)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'icon',
      label: 'Значок',
      type: 'select',
      required: true,
      options: [
        { label: '🩺 Стетоскоп', value: 'Stethoscope' },
        { label: '🌿 Листик', value: 'Leaf' },
        { label: '🥗 Салат', value: 'Salad' },
        { label: '💊 Таблетка', value: 'Pill' },
        { label: '🏃 Активность', value: 'Activity' },
        { label: '🧬 ДНК', value: 'Dna' },
        { label: '❤️ Сердце', value: 'Heart' },
        { label: '🧠 Мозг', value: 'Brain' },
        { label: '⚖️ Весы', value: 'Scale' },
        { label: '🔬 Микроскоп', value: 'Microscope' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Категория / Тэг',
      admin: {
        description: 'Например: "Нутрициология", "Железодефицит"',
      },
    },
    {
      name: 'readingTime',
      type: 'text',
      label: 'Время чтения',
      defaultValue: '7 мин',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Краткое вступление / Аннотация (для карточки и лида в статье)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Главная обложка гайда',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Основной текст гайда (Меню, списки продуктов, правила, рацион)',
    },
    {
      name: 'isComingSoon',
      type: 'checkbox',
      defaultValue: false,
      label: 'В разработке (анонс)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Отображать на сайте',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
