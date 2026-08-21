import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LockIcon, ArrowRight, Clock } from 'lucide-react'
import { getMediaUrl } from '@/lib/media'
import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import type { Metadata } from 'next'
import { iconMap } from '@/lib/service-maps'
import SectionHeading from '@/components/shared/SectionHeading'
import { getMenuGuides } from '@/data/guides'

export const metadata: Metadata = {
  title: 'Терапевтические меню-гайды и статьи по питанию',
  description: 'Полноценные руководства по питанию, готовые меню и терапевтические рационы.',
}

export default async function MenuGuidesPage() {
  const menuGuides = await getMenuGuides()

  return (
    <div className="min-h-screen bg-gray-50 py-20 pt-28">
      <RefreshRouteOnSave />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeading
            title="Терапевтические меню-гайды"
            description="Практические статьи, сбалансированные схемы питания и рекомендации по рациону при
            различных состояниях."
            hero
            as="h1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuGuides.map((guide) => {
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
