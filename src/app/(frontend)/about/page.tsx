import { Button } from '@/components/ui/button'
import { ArrowRight, Award, BookOpen, CheckCircle, GraduationCap, Heart } from 'lucide-react'
import Link from 'next/link'

import Portrait from './../../../../public/images/portrait.jpg'
import Image from 'next/image'

export default async function About() {
  return (
    <div className="pt-20">
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="">
              <div className="w-60 h-1 bg-green-500  mb-4"></div>
              <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
                Обо мне
              </h1>
              <div className="text-xl text-black/80 leading-relaxed mb-6">
                Меня зовут <strong>Лариса Галимова</strong>. Я сертифицированный нутрициолог с
                5-летним опытом работы. Помогаю людям обрести здоровье и энергию через осознанное
                питание.
              </div>
              <p className="text-black/70 leading-relaxed mb-8">
                Сегодня я помогаю более 500 клиентам по всему миру решать проблемы со здоровьем,
                которые казались безнадёжными. Работаю онлайн — это позволяет сотрудничать с людьми
                из любой точки мира.
              </p>
              <Button asChild variant="default" size="xl">
                <Link href="/consultation">
                  Записаться на консультацию
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-3/4 max-w-sm mx-auto">
                <Image
                  src={Portrait}
                  alt="Нутрициолог Лариса Галимова"
                  className="w-full h-full object-cover"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"> </div>
            <h2 className="font-heading text-4xl text-black font-light">Мои ценности в работе</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-900 mx-auto mb-4">
                <Heart className="w-6 h-6"></Heart>
              </div>
              <h3 className="font-semibold text-black mb-2">Индивидуальный подход</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Каждый человек уникален. Я не верю в универсальные диеты — только в
                персонализированные решения.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-900 mx-auto mb-4">
                <BookOpen className="w-6 h-6"></BookOpen>
              </div>
              <h3 className="font-semibold text-black mb-2">Наука и практика</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Мои рекомендации основаны на современных научных данных и доказательной медицине.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-900 mx-auto mb-4">
                <Award className="w-6 h-6"></Award>
              </div>
              <h3 className="font-semibold text-black mb-2">Долгосрочный результат</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Работаю на устойчивое изменение привычек, а не на временный эффект.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-900 mx-auto mb-4">
                <CheckCircle className="w-6 h-6"></CheckCircle>
              </div>
              <h3 className="font-semibold text-black mb-2">Поддержка и забота</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Я рядом на каждом шагу — отвечаю на вопросы, поддерживаю и корректирую план.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-15 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
            <h2 className="font-heading text-4xl text-black font-light">
              Образование и сертификаты
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4 border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex flex-col items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-green-900" />
                <span className="text-xs font-semibold text-green-900 mt-0.5">2024</span>
              </div>
              <div>
                <h3 className="font-semibold text-black">Название образования</h3>
                <p className="text-gray-500">Место образования</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-green-500/10 text-green-900 px-3 py-1 rounded-full">
                  Диплом
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4 border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex flex-col items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-green-900" />
                <span className="text-xs font-semibold text-green-900 mt-0.5">2025</span>
              </div>
              <div>
                <h3 className="font-semibold text-black">Название образования</h3>
                <p className="text-gray-500">Место образования</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-green-500/10 text-green-900 px-3 py-1 rounded-full">
                  Сертификат
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-15 bg-green-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-light mb-4">Готовы начать путь к здоровью?</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Запишитесь на первичную консультацию и получите персональную стратегию улучшения вашего
            здоровья.
          </p>
          <Button asChild variant="secondary" size="xl">
            <Link href="/consultation">
              Записаться на консультацию
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
