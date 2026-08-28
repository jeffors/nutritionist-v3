import { Consultation } from '@/payload-types'
import ConsultationEmail from 'emails/consultation'
import { Payload } from 'payload'
import { render } from 'react-email'

type NotifyNewConsultationParams = {
  payload: Payload
  consultation: Consultation
  adminUrl: string
  notifyEmail: string
}

export async function notifyNewConsultation({
  payload,
  consultation,
  adminUrl,
  notifyEmail,
}: NotifyNewConsultationParams) {
  await sendConsultationEmail({
    payload,
    consultation,
    adminUrl,
    notifyEmail,
  })
  await sendTelegramMessage({
    payload,
    text: [
      `🔔 <b>Новая заявка на консультацию! Номер: ${consultation.id}</b>`,
      ``,
      `<a href="${adminUrl}">Открыть заявку в админ-панели</a>`,
    ].join('\n'),
  })
}

async function sendConsultationEmail({
  payload,
  consultation,
  adminUrl,
  notifyEmail,
}: NotifyNewConsultationParams) {
  try {
    const html = await render(
      ConsultationEmail({
        url: adminUrl,
        name: consultation.name,
        phone: consultation.phone,
        email: consultation.email,
        messenger: consultation.messenger,
        request: consultation.request,
      }),
    )

    await payload.sendEmail({
      from: `"Лариса Галимова | Нутрициолог" <${process.env.EMAIL_DOMAIN}>`,
      to: notifyEmail,
      subject: 'Новая заявка на консультацию',
      html,
    })
  } catch (emailError) {
    payload.logger.error(`Ошибка отправки Email: ${emailError}`)
  }
}

export async function sendTelegramMessage({ payload, text }: { payload: Payload; text: string }) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  const proxyUrl = process.env.PROXY_URL ?? ''
  const proxySecret = process.env.PROXY_SECRET ?? ''

  if (!botToken || !chatId || !proxyUrl) {
    payload.logger.warn('Telegram переменные окружения не настроены.')
    return
  }

  try {
    await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-proxy-secret': proxySecret,
      },
      body: JSON.stringify({
        token: botToken,
        method: 'sendMessage',
        payload: {
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
        },
      }),
    })
  } catch (tgError) {
    payload.logger.error(`Ошибка отправки в Telegram: ${tgError}`)
  }
}
