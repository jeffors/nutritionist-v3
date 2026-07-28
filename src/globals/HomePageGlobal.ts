import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const HomePageGlobal: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  access: {
    read: () => true,
  },
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
      ],
    },
    {
      name: 'nutrition',
      type: 'group',
      label: 'Секция "Про питание"',
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
              defaultValue: 'Почему питание — основа здоровья',
            },
            {
              name: 'paragraph1',
              type: 'textarea',
              label: 'Первый абзац',
              defaultValue:
                'Правильно подобранный рацион — это не просто топливо для организма, а мощный терапевтический инструмент. Наше самочувствие, уровень энергии и даже хронические процессы напрямую зависят от того, что оказывается в нашей тарелке.',
            },
            {
              name: 'paragraph2',
              type: 'textarea',
              label: 'Второй абзац',
              defaultValue:
                'Коррекция питания позволяет не просто маскировать симптомы, а работать с первопричиной недомоганий, мягко восстанавливая баланс и возвращая организму его естественную силу.',
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Карточки',
              labels: {
                singular: 'Карточка',
                plural: 'Карточки',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Заголовок',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Описание',
                  required: true,
                },
              ],
              defaultValue: [
                {
                  title: 'Борьба с дефицитами',
                  description:
                    'Восполнение нехватки витаминов и минералов из качественных цельных продуктов для стабильной работы всех систем.',
                },
                {
                  title: 'Здоровье ЖКТ',
                  description:
                    'Мягкое восстановление процессов пищеварения, избавление от тяжести, вздутий и дискомфорта навсегда.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'Секция "Обо мне"',
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
              type: 'row',
              fields: [
                {
                  name: 'imageTitle',
                  type: 'text',
                  label: 'ФИО на картинке',
                  defaultValue: 'Лариса Галимова',
                },
                {
                  name: 'imageDescription',
                  type: 'text',
                  label: 'Профессия на картинке',
                  defaultValue: 'Клинический нутрициолог',
                },
              ],
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
              labels: {
                singular: 'Пункт',
                plural: 'Пункты',
              },
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
      ],
    },
    {
      name: 'clientStories',
      type: 'group',
      label: 'Секция "Истории моих клиентов"',
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
              defaultValue: 'Истории моих клиентов',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue:
                'Реальные рационы подопечных: как меняются тарелки в процессе нашей работы и какие результаты это приносит.',
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Карточки',
              labels: {
                singular: 'Карточка',
                plural: 'Карточки',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Фотография тарелки',
                },
                {
                  name: 'badge',
                  type: 'text',
                  label: 'Текст плашки',
                  required: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  label: 'Имя клиента',
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
                  label: 'Описание',
                  required: true,
                },
                {
                  name: 'result',
                  type: 'text',
                  label: 'Результат',
                  required: true,
                },
              ],
              defaultValue: [
                {
                  badge: 'Восстановление ЖКТ',
                  name: 'Мария, 32 года',
                  title: 'Легкость без вздутий и тяжести',
                  description:
                    'До работы с нутрициологом страдала от вздутия после каждого приема пищи. Скорректировали кислотность, убрали непереносимые продукты, научились собирать баланс.',
                  result:
                    'Результат: Прошла тяжесть, вернулась энергия, улучшилось состояние кожи.',
                },
                {
                  badge: 'Снижение веса',
                  name: 'Дмитрий, 39 лет',
                  title: 'Минус 8 кг сытно и комфортно',
                  description:
                    'Думал, что худеть — это голодать. На самом деле порции стали даже больше, но они сытные и богатые нутриентами. Вес ушел плавно, без срывов на сладкое.',
                  result:
                    'Результат: Стабильный вес без жестких ограничений, уменьшился объем талии на 7 см.',
                },
                {
                  badge: 'Усвоение ферритина',
                  name: 'Анна, 27 лет',
                  title: 'Победа над хронической усталостью',
                  description:
                    'Сил не было вообще, ферритин был на уровне 14. Сбалансировали рацион, добавили источники железа с правильными синергистами его усвоения. Жизнь заиграла красками.',
                  result:
                    'Результат: Подняли ферритин до 45 без побочных эффектов для желудка, ушел туман в голове.',
                },
              ],
            },
          ],
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
              defaultValue: 'Услуги',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue:
                'Индивидуальный подход к каждому клиенту. Работаю онлайн со всем миром.',
            },
            {
              name: 'ctaLabel',
              type: 'text',
              label: 'Текст кнопки',
              defaultValue: 'Все услуги',
            },
          ],
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
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      label: 'Секция "Как проходит работа"',
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
              defaultValue: 'Как проходит работа',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue: 'Простой и понятный процесс на пути к вашему здоровью',
            },
            {
              name: 'steps',
              type: 'array',
              label: 'Шаги',
              labels: {
                singular: 'Шаг',
                plural: 'Шаги',
              },
              fields: [
                { name: 'number', type: 'text', label: 'Номер (01, 02...)', required: true },
                { name: 'title', type: 'text', label: 'Заголовок шага', required: true },
                { name: 'description', type: 'textarea', label: 'Описание шага', required: true },
              ],
              defaultValue: [
                {
                  number: '01',
                  title: 'Оставляете заявку',
                  description:
                    'Заполняете форму или пишете в мессенджер. Я отвечаю в течение 2 часов.',
                },
                {
                  number: '02',
                  title: 'Первичная консультация',
                  description: 'Разбираем ваш запрос, анализы, образ жизни и формулируем цели.',
                },
                {
                  number: '03',
                  title: 'Получаете план',
                  description:
                    'Индивидуальный план питания, рекомендации по нутриентам и образу жизни.',
                },
                {
                  number: '04',
                  title: 'Результат',
                  description:
                    'Наблюдаете изменения, получаете поддержку и корректировки на каждом этапе.',
                },
              ],
            },
          ],
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
    },
    {
      name: 'proctolog',
      type: 'group',
      label: 'Секция "Врач-проктолог"',
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
              name: 'badge',
              type: 'text',
              label: 'Текст плашки',
              defaultValue: 'Смежный специалист',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Заголовок (профессия)',
              defaultValue: 'Врач-проктолог',
            },
            {
              name: 'headingAccent',
              type: 'text',
              label: 'Заголовок (ФИО)',
              defaultValue: 'Галимов Ринат Фаритович',
            },
            {
              name: 'paragraph1',
              type: 'textarea',
              label: 'Первый абзац',
              defaultValue:
                'Опытный врач-проктолог с 20-летней практикой. Специализируется на диагностике и лечении заболеваний прямой кишки, анального канала и толстого кишечника.',
            },
            {
              name: 'paragraph2',
              type: 'textarea',
              label: 'Второй абзац',
              defaultValue:
                'Работает в тесном сотрудничестве с нутрициологом для комплексного подхода к здоровью пациентов. Правильное питание часто является ключевым элементом лечения проктологических проблем.',
            },
            {
              name: 'checklistItem',
              type: 'array',
              label: 'Пункты списка',
              labels: {
                singular: 'Пункт',
                plural: 'Пункты',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Текст',
                  required: true,
                },
              ],
              defaultValue: [
                { text: 'Консультации и диагностика' },
                { text: 'Лечение геморроя и анальных трещин' },
                { text: 'Колоноскопия и другие процедуры' },
                { text: 'Координация с нутрициологом для комплексного плана' },
              ],
            },
            {
              name: 'ctaLabel',
              type: 'text',
              label: 'Текст кнопки',
              defaultValue: 'Записаться к врачу',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Ссылка для связи',
            },
          ],
        },
      ],
    },
    {
      name: 'faq',
      type: 'group',
      label: 'Секция "Вопросы и ответы"',
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
              defaultValue: 'Часто задаваемые вопросы',
            },
            {
              name: 'items',
              type: 'array',
              label: 'Вопросы',
              fields: [
                { name: 'question', type: 'text', label: 'Вопрос', required: true },
                { name: 'answer', type: 'textarea', label: 'Ответ', required: true },
              ],
              labels: {
                singular: 'Вопрос',
                plural: 'Вопросы',
              },
              defaultValue: [
                {
                  question: 'Как проходит консультация?',
                  answer:
                    'Консультация проходит онлайн — через WhatsApp или Telegram. После записи я пришлю анкету для заполнения, чтобы подготовиться к встрече.',
                },
                {
                  question: 'Нужно ли сдавать анализы перед консультацией?',
                  answer:
                    'Не обязательно. Если у вас есть результаты анализов — отлично, мы их разберём. Если нет — я помогу определить, какие анализы стоит сдать.',
                },
                {
                  question: 'Сколько длится сопровождение?',
                  answer:
                    'Минимальный срок — 1 месяц. Оптимально — 2–3 месяца. За это время успевают проявиться устойчивые изменения и формируются новые привычки.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'consultation',
      type: 'group',
      label: 'Cекция "Записаться на консультацию"',
      admin: {
        description: 'Заявки находятся в отдельной категории',
      },
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
              defaultValue: 'Записаться на консультацию',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue: 'Оставьте заявку, и я свяжусь с вами в течение 2 часов',
            },
          ],
        },
      ],
    },
    {
      name: 'contacts',
      type: 'group',
      label: 'Cекция "Контакты"',
      admin: {
        description: 'Сами контакты настраиваются в отдельной категории',
      },
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
              label: 'Контакты',
              defaultValue: 'Записаться на консультацию',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
              defaultValue: 'Выберите удобный способ связи',
            },
          ],
        },
      ],
    },
  ],
}
