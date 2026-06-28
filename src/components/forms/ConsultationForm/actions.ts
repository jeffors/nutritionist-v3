'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { FormData } from '.'
import { success } from 'zod'

async function validateCaptcha(token: string): Promise<Boolean> {
  const secret = process.env.SMARTCAPTCHA_SERVER_KEY
  if (!secret) {
    console.error('SMARTCAPTCHA_SERVER_KEY не настроен в переменной окружения')
    return false
  }

  try {
    const response = await fetch('https://smartcaptcha.yandex.cloud/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secret,
        token: token,
      }),
    })

    const result = await response.json()
    return result.status === 'ok'
  } catch (error) {
    console.error('Ошибка при валидации SmartCAPTCHA:', error)
    return false
  }
}

export async function submitConsultation(data: FormData) {
  try {
    const isCaptchaValid = await validateCaptcha(data.captchaToken)
    if (!isCaptchaValid) {
      return { success: false, error: 'Проверка на робота не пройдена. Попробуйте еще раз.' }
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'consultations',
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        messenger: data.messenger,
        request: data.request,
        isActive: false,
      },
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Ошибка при отправке' }
  }
}
