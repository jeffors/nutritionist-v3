import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { render } from 'react-email'
import ShopEmail from 'emails/shop'

export async function POST(req: Request) {
  const payload = await getPayload({ config })

  try {
    const body = await req.json()

    if (body.event === 'payment.succeeded') {
      const paymentObject = body.object
      const { guideId, email, name } = paymentObject.metadata

      const guide = await payload.findByID({
        collection: 'guides',
        id: guideId,
      })

      if (!guide) {
        return NextResponse.json({ error: 'Guide not found' }, { status: 404 })
      }

      const fileMedia = guide.file as any
      const fileUrl = fileMedia?.url
        ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${fileMedia.url}`
        : null

      if (fileUrl) {
        const html = await render(
          ShopEmail({
            url: fileUrl,
            userName: name,
            productName: guide.title,
          }),
        )
        await payload.sendEmail({
          to: email,
          subject: `Ваш материал: ${guide.title}`,
          html: html,
        })

        console.log(`[Webhook] Ссылка на товар успешно отправлена на ${email}`)
      } else {
        console.error(`[Webhook] Файл для гайда ${guideId} не прикреплен в панели администратора.`)
      }
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
