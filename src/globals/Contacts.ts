import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts-global',
  label: 'Контакты',
  admin: {
    description: 'Контакты изменяются во всех разделах сайта, кроме юридических',
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  fields: [
    {
      name: 'whatsapp',
      type: 'number',
      label: 'WhatsApp',
      defaultValue: '79001234567',
      required: true,
      admin: {
        description:
          'Формат: 7XXXXXXXXXX. Не используйте плюс, пробел, скобки или дефисы - сайт сам сделает красивый вид номера',
      },
    },
    {
      name: 'telegram',
      type: 'text',
      label: 'Telegram',
      defaultValue: 'samplename',
      required: true,
      admin: {
        description:
          'Просто ник. Не используйте @ или https://t.me/ - сайт сам подставит необходимые символы',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'larisa.galimova@example.com',
      required: true,
      admin: {
        description: 'Этот email будет отображаться на сайте',
      },
    },
    {
      name: 'email_notify',
      type: 'email',
      label: 'Email (для уведомлений)',
      defaultValue: 'larisa.galimova@example.com',
      required: true,
      admin: {
        description: 'Этот email будет использоваться для уведомлений о новых заявках',
      },
    },
  ],
}
