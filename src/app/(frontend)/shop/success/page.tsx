import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function PaymentSuccessPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const payloadGlobalContacts = await payload.findGlobal({ slug: 'contacts-global' })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 rounded-2xl sm:px-10 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl text-black mb-3">Оплата прошла успешно!</h1>

          <p className="text-black/80 text-sm mb-6">
            Спасибо за заказ. Мы уже обрабатываем ваш платеж и готовим материалы к отправке.
          </p>

          <hr className="border-gray-300 my-6" />
          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h4 className="text-sm text-black">Проверьте входящие сообщения</h4>
                <p className="text-xs text-black/80 mt-0.5">
                  Ссылка на скачивание цифрового продукта отправлена на Email, который вы указали
                  при оформлении.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm text-black">Если письма нет во входящих</h4>
                <p className="text-xs text-black/80 mt-0.5">
                  Иногда письма с автоматическими вложениями могут случайно попасть в папку{' '}
                  <strong>«Спам»</strong> или <strong>«Промоакции»</strong>. Проверьте их.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Button asChild className="w-full" size={'xl'}>
              <Link href="/shop">
                <ArrowLeft className="w-4 h-4" />
                Вернуться в магазин
              </Link>
            </Button>
            <p className="text-xs text-black/40">
              Возникли вопросы? Напишите нам в поддержку:{' '}
              <span className="underline">{payloadGlobalContacts.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
