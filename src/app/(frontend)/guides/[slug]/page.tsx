import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Sparkles, AlertCircle, LockIcon } from 'lucide-react'
import { getMediaUrl } from '@/lib/media'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import NotFound from '../../[...not-found]/page'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const guides = await payload.find({
    collection: 'menu-guides',
    limit: 100,
    where: { isActive: { equals: true } },
  })

  return guides.docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'menu-guides',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const guide = docs[0]
  if (!guide) return {}

  return {
    title: `${guide.title} | Терапевтический меню-гайд`,
    description: guide.description ?? undefined,
  }
}

export default async function MenuGuidePage({ params }: PageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled: isDraftMode } = await draftMode()

  const { docs } = await payload.find({
    collection: 'menu-guides',
    where: { slug: { equals: slug } },
    draft: isDraftMode,
    limit: 1,
  })

  const guide = docs[0]

  if (!guide || (!guide.isActive && !isDraftMode)) {
    NotFound()
  }

  const imageUrl = getMediaUrl(guide.image)

  return (
    <article className="min-h-screen bg-white py-20 pt-28">
      <RefreshRouteOnSave />

      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-green-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад к гайдам
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-green-100 text-green-800 border-none hover:bg-green-100 font-normal">
            {guide.badge || 'Терапевтическое меню'}
          </Badge>
          {guide.readingTime && (
            <span className="inline-flex items-center text-xs text-black/50 gap-1">
              <Clock className="w-3.5 h-3.5" />
              {guide.readingTime}
            </span>
          )}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-black font-light leading-tight mb-6">
          {guide.title}
        </h1>

        {guide.description && (
          <p className="text-lg md:text-xl text-black/70 leading-relaxed font-light border-l-2 border-green-500 pl-4 py-1">
            {guide.description}
          </p>
        )}
      </header>

      {imageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
            <Image src={imageUrl} alt={guide.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4 mb-10 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Важное примечание:</strong> Данный гайд носит информационный и ознакомительный
            характер. Выбор рациона не заменяет очную консультацию врача или нутрициолога при
            наличии хронических заболеваний.
          </div>
        </div>

        <div className="relative prose prose-lg prose-green max-w-none text-black/80 leading-relaxed font-sans prose-headings:font-heading prose-headings:font-light prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:mb-6 prose-li:my-1">
          <RichText data={guide.content} />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        <div className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60 rounded-3xl p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-700 flex items-center justify-center mx-auto mb-4">
            <LockIcon className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-2xl text-black font-light mb-2">
            Доступ к полному материалу ограничен
          </h3>
          <p className="text-sm text-black/70 max-w-md mx-auto mb-6">
            Оформите заказ, чтобы открыть остальную часть гайда
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="xl">
                Заказать полный гайд
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Заказать меню-гайд на месяц</DialogTitle>
                <DialogDescription>{guide.title}</DialogDescription>
              </DialogHeader>
              <Item variant={'outline'}>
                <ItemContent>
                  <ItemTitle className="text-sm font-medium">Оплата:</ItemTitle>
                </ItemContent>
                <ItemActions className="font-bold text-2xl">
                  {guide.price ? `${guide.price} ₽` : 'Бесплатно'}
                </ItemActions>
              </Item>
              <ConsultationForm guideName={guide.title} compact />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  )
}
