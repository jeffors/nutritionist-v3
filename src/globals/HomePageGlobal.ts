import { GlobalConfig } from 'payload'

export const HomePageGlobal: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Первая секция',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Текст плашки',
          defaultValue: 'Нутрициолог · Онлайн-консультации',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Заголовок (первая строка)',
          defaultValue: 'Ваше здоровье —',
        },
        {
          name: 'headingAccent',
          type: 'text',
          label: 'Заголовок (вторая строка)',
          defaultValue: 'мой приоритет',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
          defaultValue:
            'Помогаю улучшить самочувствие, нормализовать вес и восстановить здоровье через индивидуальный подход к питанию и образу жизни.',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Статистика',
          fields: [
            { name: 'value', type: 'text', label: 'Значение', required: true },
            { name: 'label', type: 'text', label: 'Подпись', required: true },
          ],
          defaultValue: [
            { value: '500+', label: 'клиентов' },
            { value: '5 лет', label: 'практики' },
            { value: '97%', label: 'довольны результатом' },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Текст кнопки',
          defaultValue: 'Записаться на консультацию',
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'Секция "Обо мне"',
      fields: [
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
            'Меня зовут Лариса Галимова. Я — клинический нутрициолог с высшем медицинским образованием. Помогаю людям по всему миру улучшить здоровье через осознанное и сбалансированное питание.',
        },
        {
          name: 'paragraph2',
          type: 'textarea',
          label: 'Второй абзац',
          defaultValue:
            'Моя цель — помочь вам достичь оптимального здоровья и благополучия через правильное питание и образ жизни.',
        },
        {
          name: 'checklistItem',
          type: 'array',
          label: 'Пункты списка',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Текст',
              required: true,
            },
          ],
          defaultValue: [
            { text: 'Индивидуальный подход к каждому клиенту' },
            { text: 'Научно обоснованные рекомендации' },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Текст кнопки',
          defaultValue: 'Подробнее обо мне',
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      label: 'Секция "Услуги"',
      admin: {
        description: 'Сами услуги настраиваются в отдельной категории',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Заголовок',
          defaultValue: 'Услуги',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
          defaultValue: 'Индивидуальный подход к каждому клиенту. Работаю онлайн со всем миром.',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Текст кнопки',
          defaultValue: 'Все услуги',
        },
      ],
    },
    {
      name: 'guides',
      type: 'group',
      label: 'Секция "Гайды и лекции"',
      admin: {
        description: 'Сами гайды и лекции настраиваются в отдельной категории',
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
          label: 'Описание',
          defaultValue:
            'Авторские цифровые продукты — скачайте и начните улучшать своё здоровье прямо сейчас.',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Текст кнопки',
          defaultValue: 'Все продукты в магазине',
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      label: 'Секция "Отзывы клиентов"',
      admin: {
        description: 'Сами отзывы настраиваются в отдельной категории',
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
          label: 'Описание',
          defaultValue: 'Более 500 довольных клиентов по всему миру',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Текст кнопки',
          defaultValue: 'Все отзывы',
        },
      ],
    },
  ],
}
