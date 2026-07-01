import { revalidatePath } from 'next/cache'
import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'duration', 'tag'],
    group: 'Контент',
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/services')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      required: true,
    },
    {
      type: 'row',
      fields: [
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
        },
        {
          name: 'color',
          label: 'Цвет карточки',
          type: 'select',
          required: true,
          defaultValue: 'green',
          options: [
            { label: 'Зелёный', value: 'green' },
            { label: 'Синий', value: 'blue' },
            { label: 'Розовый', value: 'rose' },
            { label: 'Фиолетовый', value: 'violet' },
            { label: 'Жёлтый', value: 'amber' },
            { label: 'Голубой', value: 'sky' },
            { label: 'Оранжевый', value: 'orange' },
          ],
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      label: 'Цена (₽)',
      required: true,
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Продолжительность',
      required: true,
      admin: {
        placeholder: '60 мин',
      },
    },
    {
      name: 'includes',
      type: 'array',
      label: 'Что включает',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Пункт',
        plural: 'Пункты',
      },
      fields: [
        {
          name: 'item',
          label: 'Пункт',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tag',
      label: 'Бейдж (необязательно)',
      type: 'text',
      admin: {
        placeholder: 'Хит, Новинка, Популярно...',
        description: 'Если заполнено - отображается в углу карточки',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок сортировки',
      defaultValue: 0,
      admin: {
        description: 'Меньше = выше. Верхние три карточки отображаются на главной странице',
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
