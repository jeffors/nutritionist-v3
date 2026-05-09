import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import BackgroundImage from './../../../public/images/hero-bg.png'
import { ArrowRight, ChevronDown, Leaf } from 'lucide-react'

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
    </div>
  )
}
