'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

async function validateCaptcha(token: string): Promise<boolean> {
  const secret = process.env.SMARTCAPTCHA_SERVER_KEY
  if (!secret) {
    console.error('SMARTCAPTCHA_SERVER_KEY не настроен в переменной окружения')
    return false
  }

  try {
    const response = await fetch('https://smartcaptcha.cloud.yandex.ru/validate', {
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

export async function submitReview(formData: FormData) {
  try {
    const rawData = formData.get('data') as string
    if (!rawData) {
      return { success: false, error: 'Неверные данные формы' }
    }

    const data = JSON.parse(rawData)

    const isCaptchaValid = await validateCaptcha(data.captchaToken)
    if (!isCaptchaValid) {
      return { success: false, error: 'Проверка на робота не пройдена. Попробуйте еще раз.' }
    }

    const payload = await getPayload({ config })

    let photoId: string | number | undefined = undefined
    const photoFile = formData.get('photo') as File | null

    if (photoFile && photoFile.size > 0) {
      const arrayBuffer = await photoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const mediaRes = await payload.create({
        collection: 'media',
        data: {
          alt: `Отзыв от ${data.name || 'клиента'}`,
        },
        file: {
          data: buffer,
          name: photoFile.name,
          mimetype: photoFile.type,
          size: photoFile.size,
        },
      })
      photoId = mediaRes.id
    }

    await payload.create({
      collection: 'reviews',
      data: {
        name: data.name || undefined,
        age: data.age ? Number(data.age) : undefined,
        location: data.location || undefined,
        service: data.service || undefined,
        text: data.text || undefined,
        stars: Number(data.stars) || 5,
        date: new Date().toISOString(),
        isActive: false,
        photo: photoId,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Ошибка при отправке отзыва:', error)
    return { success: false, error: 'Ошибка при отправке отзыва' }
  }
}
