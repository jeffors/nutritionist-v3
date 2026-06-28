'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'
import { FormData } from '.'
import { describe } from 'zod/v4/core'

interface CreatePaymentResponse {
  url?: string
  error?: string
}

export async function createPaymentAction(data: FormData): Promise<CreatePaymentResponse> {
  const payload = await getPayload({ config })
  const { guideId, email, name, terms } = data

  if (!guideId || !email || !name || !terms) {
    return { error: 'Заполните все обязательные поля.' }
  }

  try {
    const guide = await payload.findByID({ collection: 'guides', id: guideId })

    if (!guide || !guide.isActive) {
      return { error: 'Товар не найден или недоступен' }
    }

    return { error: 'Не подключена система оплаты' }

    // TODO: change payment system to ROBOKASSA
    const shopId = process.env.YOOKASSA_SHOP_ID
    const secretKey = process.env.YOOKASSA_SECRET_KEY
    const authHeader = `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString('base64')}`
    const idempotenceKey = crypto.randomUUID()

    const yookassaResponse = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Idempotence-Key': idempotenceKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: {
          value: guide.price.toFixed(2),
          currency: 'RUB',
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/shop/success`,
        },
        description: `Оплата материала: "${guide.title}"`,
        metadata: { guideId, email, name },
      }),
    })

    const paymentData = await yookassaResponse.json()

    if (!yookassaResponse.ok) {
      console.error('Yookassa error:', paymentData)
      return { error: 'Ошибка платежной системы.' }
    }
    return { url: paymentData.confirmation.confirmation_url }
  } catch (error) {
    console.error('Payment action error:', error)
    return { error: 'Внутренняя ошибка сервера.' }
  }
}
