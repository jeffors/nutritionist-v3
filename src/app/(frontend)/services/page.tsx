import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function Services() {
  return (
    <div className="pt-20">
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
          <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
            Мои услуги
          </h1>
          <div className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-6">
            Индивидуальный подход к каждому клиенту. Все консультации проходят онлайн — WhatsApp или
            Telegram. Работаю со всем миром.
          </div>
        </div>
      </section>
      <section className="py-15 bg-green-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-light mb-4">
            Не знаете, что подходит именно вам?
          </h2>
          <p className="text-black/80 mb-8 leading-relaxed">
            Напишите мне — вместе разберёмся, какая услуга подойдёт лучше всего для вашей ситуации.
          </p>
          <Button asChild variant="default" size="xl">
            <Link href="/consultation">
              Оставить заявку
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
