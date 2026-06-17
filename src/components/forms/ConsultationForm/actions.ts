'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { FormData } from '.'

export async function submitConsultation(data: FormData) {
  try {
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
