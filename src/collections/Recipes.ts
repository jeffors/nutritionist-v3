import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  labels: {
    singular: 'Рецепт',
    plural: 'Рецепты',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'prepTime', 'difficulty', 'isActive', 'updatedAt'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/reviews')
        revalidatePath('/')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Название рецепта',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Уникальный идентификатор для URL (например, pasta-carbonara)',
      },
    },
    {
      name: 'description',
      label: 'Краткое описание',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Главное изображение',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      label: 'Категория',
      type: 'select',
      required: true,
      options: [
        { label: 'Завтраки', value: 'breakfast' },
        { label: 'Обеды', value: 'lunch' },
        { label: 'Ужины', value: 'dinner' },
        { label: 'Десерты', value: 'dessert' },
        { label: 'Закуски', value: 'snacks' },
        { label: 'Напитки', value: 'drinks' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'prepTime',
          label: 'Время подготовки (мин)',
          type: 'number',
          min: 0,
        },
        {
          name: 'cookTime',
          label: 'Время готовки (мин)',
          type: 'number',
          min: 0,
        },
        {
          name: 'servings',
          label: 'Порций',
          type: 'number',
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'difficulty',
          label: 'Сложность',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Легко', value: 'easy' },
            { label: 'Средняя', value: 'medium' },
            { label: 'Сложная', value: 'hard' },
          ],
        },
      ],
    },

    {
      name: 'nutrition',
      label: 'Пищевая ценность (на 1 порцию)',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'calories',
              label: 'Калории (ккал)',
              type: 'number',
              min: 0,
            },
            {
              name: 'protein',
              label: 'Белки (г)',
              type: 'number',
              min: 0,
            },
            {
              name: 'fat',
              label: 'Жиры (г)',
              type: 'number',
              min: 0,
            },
            {
              name: 'carbs',
              label: 'Углеводы (г)',
              type: 'number',
              min: 0,
            },
          ],
        },
      ],
    },

    {
      name: 'ingredients',
      label: 'Ингредиенты',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Ингредиент',
        plural: 'Ингредиенты',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              label: 'Наименование',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'amount',
              label: 'Количество',
              type: 'text',
              required: true,
              admin: {
                width: '25%',
              },
            },
            {
              name: 'unit',
              label: 'Ед. измерения',
              type: 'text',
              admin: {
                width: '25%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'instructions',
      label: 'Инструкция по приготовлению',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Шаг',
        plural: 'Шаги',
      },
      fields: [
        {
          name: 'stepNumber',
          label: 'Номер шага',
          type: 'number',
        },
        {
          name: 'description',
          label: 'Описание шага',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          label: 'Фотография шага',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'tags',
      label: 'Теги',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          label: 'Тег',
          type: 'text',
        },
      ],
    },
    {
      name: 'isActive',
      label: 'Опубликовать рецепт',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
