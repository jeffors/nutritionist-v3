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

export default async function Shop() {
  return (
    <div className="pt-20">
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
          <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
            Гайды и лекции
          </h1>
          <div className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-6">
            Авторские цифровые продукты для вашего здоровья. После оплаты — мгновенный доступ.
          </div>
        </div>
      </section>
    </div>
  )
}
