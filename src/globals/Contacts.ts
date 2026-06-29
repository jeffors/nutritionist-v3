import { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts-global',
  label: 'Контакты',
  admin: {
    description: 'Контакты изменяются во всех разделах сайта, кроме юридических',
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
        description: 'На этот email также будут отправляться письма о новой заявке',
      },
    },
  ],
}
