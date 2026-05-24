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
import Image from 'next/image'
import Guide from './../../../../public/images/guide-cover-1.jpg'
import { ButtonGroup } from '@/components/ui/button-group'

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
      <section className="bg-white sticky top-16 md:yop-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ButtonGroup className="py-4">
            <Button>Все</Button>
            <Button variant="outline">Гайды</Button>
            <Button variant="outline">Лекции</Button>
            <Button variant="outline">Чек-листы</Button>
            <Button variant="outline">Мини-курсы</Button>
          </ButtonGroup>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="relative">
              <Image src={Guide} alt="Гайд по питанию" />
              <Badge variant="secondary" className="absolute top-4 left-4">
                Новинка
              </Badge>
              <Badge variant="default" className="absolute top-4 right-4">
                Гайды
              </Badge>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  <div className="text-xs font-semibold text-black">4.9</div>
                  <div className="text-xs text-black/60">(12 отзывов)</div>
                </div>
                <CardTitle>Гайд по сбалансированному питанию</CardTitle>
                <CardDescription>
                  50 страниц практических рекомендаций, меню на неделю, списки продуктов.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-black/60">50 страниц · PDF</CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-lg font-bold">500 ₽</p>
                <Button variant="default">Купить</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
