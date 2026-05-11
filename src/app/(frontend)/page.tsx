import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import BackgroundImage from './../../../public/images/hero-bg.png'
import Portrait from './../../../public/images/portrait.jpg'
import { ArrowRight, Award, CheckCircle, ChevronDown, Leaf } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image src={BackgroundImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white opacity-60" />
        </div>

        <div className="relative z-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-500/15 backdrop-blur-sm border border-green-500/30 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Нутрициолог · Онлайн-консультации
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-black font-light leading-tight mb-6">
              Ваше здоровье —
              <br />
              <span className="text-green-700 italic">мой приоритет</span>
            </h1>
            <p className="text-lg text-black/80 leading-relaxed mb-8 max-w-lg">
              Помогаю улучшить самочувствие, нормализовать вес и восстановить здоровье через
              индивидуальный подход к питанию и образу жизни.
            </p>

            <div className="flex items-center gap-6 mb-10">
              <div>
                <div className="font-heading text-2xl font-semibold text-black">500+</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">клиентов</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-semibold text-black">5 лет</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">практики</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-semibold text-black">97%</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">
                  довольны результатом
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" size="lg">
                <Link href="#consultation">
                  Записаться на консультацию
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-green-700" />
        </div>
      </section>

      <section className="bg-white py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <Image src={Portrait} alt="Портрет" className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-black">Лариса Галимова</p>
                      <p className="text-xs text-black/70">Сертифицированный нутрициолог</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="w-60 h-1 bg-green-500 mb-4"></div>
              <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">
                Обо мне
              </h2>
              <p className="text-black/80 leading-relaxed mb-4">
                Меня зовут Лариса Галимова. Я — сертифицированный нутрициолог с 5-летним опытом
                практики. Помогаю людям по всему миру улучшить здоровье через осознанное и
                сбалансированное питание.
              </p>
              <p className="text-black/80 leading-relaxed mb-6">
                Моя цель — помочь вам достичь оптимального здоровья и благополучия через правильное
                питание и образ жизни.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Индивидуальный подход к каждому клиенту',
                  'Научно обоснованные рекомендации',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-black/80">{item}</p>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Подробнее обо мне
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="p-5 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl md:text-5xl text-black font-light mb-6">Услуги</h2>
            <p className="text-black/80 max-w-xl mx-auto">
              Индивидуальный подход к каждому клиенту. Работаю онлайн со всем миром/
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Индивидуальная консультация</CardTitle>
                <CardDescription>
                  Разбор текущего питания, составление рекомендаций и плана питания под ваши цели
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <p>от 3500 ₽</p>
                <p>60 минут</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Записаться</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
