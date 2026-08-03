import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { draftMode } from 'next/headers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LockIcon, ArrowRight, FileText, Clock, BookOpen } from 'lucide-react'
import { getMediaUrl } from '@/lib/media'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import type { Metadata } from 'next'
import { iconMap } from '@/lib/service-maps'

export const metadata: Metadata = {
  title: 'Терапевтические меню-гайды и статьи по питанию',
  description: 'Полноценные руководства по питанию, готовые меню и терапевтические рационы.',
}

export default async function MenuGuidesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled: isDraftMode } = await draftMode()

  const { docs: guides } = await payload.find({
    collection: 'menu-guides',
    where: { isActive: { equals: true } },
    sort: '-createdAt',
    draft: isDraftMode,
  })

  return (
    <div className="min-h-screen bg-gray-50 py-20 pt-28">
      <RefreshRouteOnSave />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-40 h-1 bg-green-500 mx-auto mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-light text-black mb-4">
            Терапевтические меню-гайды
          </h1>
          <p className="text-black/70 leading-relaxed">
            Практические статьи, сбалансированные схемы питания и рекомендации по рациону при
            различных состояниях.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => {
            const imageUrl = getMediaUrl(guide.image)
            const isAvailable = !guide.isComingSoon
            const Icon = iconMap[guide.icon]

            return (
              <Card
                key={guide.id}
                className="flex flex-col h-full border border-gray-150 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-52 bg-green-50/40 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-green-700/30">
                      <Icon className="w-12 h-12 mb-2" />
                    </div>
                  )}

                  {guide.badge && (
                    <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-800 border-none font-medium text-xs shadow-sm">
                      {guide.badge}
                    </Badge>
                  )}

                  {guide.isComingSoon && (
                    <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] flex items-center justify-center">
                      <Badge
                        variant="outline"
                        className="bg-white border-gray-300 text-gray-700 px-3 py-1"
                      >
                        <LockIcon className="w-3.5 h-3.5 mr-1.5" /> В разработке
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="flex-1 p-6">
                  {guide.readingTime && (
                    <span className="inline-flex items-center text-xs text-black/50 gap-1 mb-2">
                      <Clock className="w-3.5 h-3.5 text-green-600" />
                      {guide.readingTime} чтения
                    </span>
                  )}
                  <CardTitle className="font-heading text-xl text-black font-medium leading-snug group-hover:text-green-700 transition-colors">
                    {guide.title}
                  </CardTitle>
                  {guide.description && (
                    <CardDescription className="text-sm text-black/70 leading-relaxed mt-2 line-clamp-3">
                      {guide.description}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-6 pt-0 mt-auto">
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-black/50">Полный гайд</span>
                    {isAvailable ? (
                      <Button
                        asChild
                        variant="ghost"
                        className="text-green-700 hover:text-green-800 p-0 hover:bg-transparent"
                      >
                        <Link
                          href={`/guides/${guide.slug}`}
                          className="inline-flex items-center gap-1 font-medium text-sm"
                        >
                          Читать материал <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-400">Скоро на сайте</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
