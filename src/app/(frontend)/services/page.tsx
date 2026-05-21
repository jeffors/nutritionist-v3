import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight, BookOpen, CheckCircle, Heart, MessageCircle } from 'lucide-react'
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
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="justify-between">
              <CardHeader className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-green-500/10 text-green-900">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="">
                  <CardTitle className="text-2xl">Индивидуальная консультация</CardTitle>
                  <CardDescription className="flex items-center gap-3">
                    <span className="text-xl font-bold text-black">от 3 500 ₽</span>
                    <Badge variant="secondary">60 мин</Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black/80 mb-5">
                  Первичная консультация — это детальный разбор вашего питания, образа жизни и
                  состояния здоровья. Вы получите чёткие рекомендации и план действий.
                </p>
                <div className="">
                  <p className="font-semibold text-black/80 uppercase tracking-wider mb-3">
                    Что включено:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Анализ текущего рациона</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Персональные рекомендации по питанию</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Ответы на все вопросы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Запись консультации</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button size={'xl'} className="w-full">
                  Записаться
                </Button>
              </CardFooter>
            </Card>
            <Card className="justify-between">
              <CardHeader className="flex items-start gap-4 relative">
                <Badge className="absolute top-2 right-6">Популярно</Badge>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-yellow-500/10 text-yellow-900">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="">
                  <CardTitle className="text-2xl">Разбор анализов</CardTitle>
                  <CardDescription className="flex items-center gap-3">
                    <span className="text-xl font-bold text-black">от 4 000 ₽</span>
                    <Badge variant="secondary">75 мин</Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black/80 mb-5">
                  Детальный анализ лабораторных показателей. Выявление дефицитов витаминов и
                  минералов, гормональных нарушений, маркеров воспаления.
                </p>
                <div className="">
                  <p className="font-semibold text-black/80 uppercase tracking-wider mb-3">
                    Что включено:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Расшифровка анализов крови</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Выявление нутритивных дефицитов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Рекомендации по восполнению дефицитов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Список рекомендуемых добавок</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button size={'xl'} className="w-full">
                  Записаться
                </Button>
              </CardFooter>
            </Card>
            <Card className="justify-between">
              <CardHeader className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-rose-500/10 text-rose-900">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="">
                  <CardTitle className="text-2xl">Сопровождение</CardTitle>
                  <CardDescription className="flex items-center gap-3">
                    <span className="text-xl font-bold text-black">от 18 000 ₽</span>
                    <Badge variant="secondary">1–3 месяца</Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black/80 mb-5">
                  Работа под ключ на 1–3 месяца. Личный контроль, регулярные созвоны, корректировка
                  плана, поддержка в мессенджере.
                </p>
                <div className="">
                  <p className="font-semibold text-black/80 uppercase tracking-wider mb-3">
                    Что включено:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>4–8 консультаций (в зависимости от программы)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Индивидуальный план питания</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Поддержка в чате 5 дней/нед.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Контроль анализов и корректировка</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button size={'xl'} className="w-full">
                  Записаться
                </Button>
              </CardFooter>
            </Card>
            <Card className="justify-between">
              <CardHeader className="flex items-start gap-4 relative">
                <Badge className="absolute top-2 right-6">Хит</Badge>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-green-500/10 text-green-900">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="">
                  <CardTitle className="text-2xl">Программа снижения веса</CardTitle>
                  <CardDescription className="flex items-center gap-3">
                    <span className="text-xl font-bold text-black">от 12 000 ₽</span>
                    <Badge variant="secondary">4 недели</Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black/80 mb-5">
                  Комплексная программа без жёстких диет. Работаем с метаболизмом, гормонами,
                  пищевыми привычками и образом жизни.
                </p>
                <div className="">
                  <p className="font-semibold text-black/80 uppercase tracking-wider mb-3">
                    Что включено:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Первичная консультация</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Калорийность и КБЖУ под вас</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Меню на каждую неделю</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Рекомендации по добавкам</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button size={'xl'} className="w-full">
                  Записаться
                </Button>
              </CardFooter>
            </Card>
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
