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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item'
import { Guide } from '@/payload-types'
import { ShoppingCart, Star } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'
import Image from 'next/image'
import { getMediaUrl } from '@/lib/media'
import { CATEGORIES } from '@/lib/shop-maps'
import GuideForm from '@/components/forms/GuideForm'

const categoryLabels: Record<string, string> = {
  guides: 'Гайды',
  lectures: 'Лекции',
  checklists: 'Чек-листы',
  'mini-courses': 'Мини-курсы',
}

export function GuideCard({ guide }: { guide: Guide }) {
  const imageUrl = getMediaUrl(guide.image)

  return (
    <Card className="relative">
      {imageUrl && <Image src={imageUrl} alt={guide.title} width={800} height={600} />}
      {guide.tag && (
        <Badge variant="secondary" className="absolute top-4 left-4">
          {guide.tag}
        </Badge>
      )}

      <Badge variant="default" className="absolute top-4 right-4">
        {categoryLabels[guide.category]}
      </Badge>
      <CardHeader>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
          <div className="text-xs font-semibold text-black">{guide.rating}</div>
          <div className="text-xs text-black/60">({guide.review} отзывов)</div>
        </div>
        <CardTitle>{guide.title}</CardTitle>
        <CardDescription>{guide.description}</CardDescription>
      </CardHeader>
      {guide.pages && (
        <CardContent className="text-xs text-black/60">{guide.pages} страниц · PDF</CardContent>
      )}

      <CardFooter className="flex justify-between">
        <p className="text-lg font-bold">{guide.price} ₽</p>
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
              <DialogDescription>{guide.title}</DialogDescription>
            </DialogHeader>
            <Item variant={'outline'}>
              <ItemContent>
                <ItemTitle className="text-sm font-medium">К оплате:</ItemTitle>
              </ItemContent>
              <ItemActions className="font-bold text-2xl">{guide.price} ₽</ItemActions>
            </Item>
            <GuideForm guide={guide} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
