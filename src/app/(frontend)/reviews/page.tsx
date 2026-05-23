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
import { ArrowRight, BookOpen, CheckCircle, Heart, Leaf, MessageCircle } from 'lucide-react'
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
