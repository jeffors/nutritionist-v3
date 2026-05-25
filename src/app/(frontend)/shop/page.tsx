'use client'

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
import { PackageX, ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Guide from './../../../../public/images/guide-cover-1.jpg'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Form from 'next/form'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item'
import { useState } from 'react'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('Все')
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
      <section className="bg-white sticky top-16 md:top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ButtonGroup className="py-4 overflow-x-auto scrollbar-hide">
            <Button
              variant={`${activeCategory === 'Все' ? 'default' : 'outline'}`}
              onClick={() => setActiveCategory('Все')}
            >
              Все
            </Button>
            <Button
              variant={`${activeCategory === 'Гайды' ? 'default' : 'outline'}`}
              onClick={() => setActiveCategory('Гайды')}
            >
              Гайды
            </Button>
            <Button
              variant={`${activeCategory === 'Лекции' ? 'default' : 'outline'}`}
              onClick={() => setActiveCategory('Лекции')}
            >
              Лекции
            </Button>
            <Button
              variant={`${activeCategory === 'Мини-курсы' ? 'default' : 'outline'}`}
              onClick={() => setActiveCategory('Мини-курсы')}
            >
              Мини-курсы
            </Button>
          </ButtonGroup>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCategory === 'Все' || activeCategory === 'Гайды' ? (
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default">
                        <ShoppingCart className="w-4 h-4" />
                        Купить
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Оформить покупку</DialogTitle>
                        <DialogDescription>Гайд по сбалансированному питанию</DialogDescription>
                      </DialogHeader>
                      <Item variant={'outline'}>
                        <ItemContent>
                          <ItemTitle className="text-sm font-medium">К оплате:</ItemTitle>
                        </ItemContent>
                        <ItemActions className="font-bold text-2xl">500 ₽</ItemActions>
                      </Item>
                      <Form action={''}>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="input-name">Имя</FieldLabel>
                            <Input id="input-name" type="text" placeholder="Ваше имя"></Input>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="input-email">Email</FieldLabel>
                            <Input
                              id="input-email"
                              type="email"
                              placeholder="your@email.com"
                            ></Input>
                          </Field>
                          <Field orientation={'horizontal'}>
                            <Checkbox id="terms-checkbox" name="terms-checkbox"></Checkbox>
                            <FieldLabel htmlFor="terms-checkbox">
                              <span>
                                Я согласен(а) c{' '}
                                <Link
                                  href="/offer"
                                  className="text-green-600 underline hover:no-underline"
                                >
                                  Публичной офертой
                                </Link>{' '}
                                и{' '}
                                <Link
                                  href="/privacy"
                                  className="text-green-600 underline hover:no-underline"
                                >
                                  Политикой конфиденциальности
                                </Link>
                              </span>
                            </FieldLabel>
                          </Field>
                        </FieldGroup>
                      </Form>
                      <p className="text-center text-xs text-black/60 mt-4">
                        🔒 Безопасная оплата. После оплаты материал придёт на email.
                      </p>
                      <DialogFooter>
                        <Button className="w-full" size={'xl'}>
                          <ShoppingCart className="w-4 h-4" />
                          Оплатить 500 ₽
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <PackageX className="w-24 h-24"></PackageX>
              <p className="text-center">Не найдено цифровых продуктов по выбранным фильтрам</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
