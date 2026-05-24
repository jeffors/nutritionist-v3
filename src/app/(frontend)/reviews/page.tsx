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
import { Star } from 'lucide-react'
import Link from 'next/link'

export default async function Reviews() {
  return (
    <div className="pt-20">
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
          <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
            Отзывы клиентов
          </h1>
          <div className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-6">
            Реальные истории реальных людей, которые улучшили своё здоровье
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-heading text-4xl font-light text-black mb-1">500+</div>
              <div className="text-xs text-black/80 uppercase tracking-wider">клиентов</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-light text-black mb-1">4.9</div>
              <div className="text-xs text-black/80 uppercase tracking-wider">Средняя оценка</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-light text-black mb-1">97%</div>
              <div className="text-xs text-black/80 uppercase tracking-wider">
                Рекомендуют знакомым
              </div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-light text-black mb-1">5 лет</div>
              <div className="text-xs text-black/80 uppercase tracking-wider">Практики</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Мария К.</CardTitle>
                    <CardDescription>34 года · Москва</CardDescription>
                  </div>
                  <div className="flex gap-0.5">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black/80">
                  "За 2 месяца работы с Анной я наконец-то разобралась со своим здоровьем. Ушло 6
                  кг, нормализовался сон и уровень энергии. Очень рекомендую!"
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <Badge variant={'secondary'}>Программа снижения веса</Badge>
                <span className="text-xs text-black/80">Март 2026</span>
              </CardFooter>
            </Card>
            <Card className="justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Елена М.</CardTitle>
                    <CardDescription>29 лет · Санкт-Петербург</CardDescription>
                  </div>
                  <div className="flex gap-0.5">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black/80">
                  "Разбор анализов помог понять, откуда берётся постоянная усталость. Оказалось —
                  дефицит железа и В12. Уже через месяц почувствовала себя намного лучше."
                </p>
              </CardContent>

              <CardFooter className="justify-between">
                <Badge variant={'secondary'}>Разбор анализов</Badge>
                <span className="text-xs text-black/80">Февраль 2026</span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-15 bg-green-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-light mb-4">
            Станьте следующим успешным примером
          </h2>
          <p className="text-black/80 mb-8 leading-relaxed">
            Запишитесь на консультацию и начните свой путь к здоровью уже сегодня.
          </p>
          <Button asChild variant="default" size="xl">
            <Link href="/consultation">Записаться на консультацию</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
