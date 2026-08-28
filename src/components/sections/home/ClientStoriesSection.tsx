import SectionHeading from '@/components/shared/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getMediaUrl } from '@/lib/media'
import { HomePage } from '@/payload-types'
import { Camera } from 'lucide-react'
import Image from 'next/image'

type ClientStoriesSectionProps = {
  clientStories: HomePage['clientStories']
}

export default function ClientStoriesSection({ clientStories }: ClientStoriesSectionProps) {
  return (
    <section className="bg-white py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={clientStories?.heading} description={clientStories?.description} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientStories?.cards?.map((card) => {
            const cardImage = getMediaUrl(card.image)

            return (
              <Card
                key={card.id}
                className="flex flex-col h-full border border-gray-100 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-green-50/50 border-b border-gray-100 group">
                  {cardImage ? (
                    <Image
                      src={cardImage}
                      alt={card.title || 'Фотография тарелки'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full p-6 text-center">
                      <div>
                        <Camera className="w-10 h-10 text-green-600/30 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-heading font-medium text-green-800">
                          Фото тарелки подопечного
                        </p>
                        <p className="text-xs text-black/50 mt-1">Здесь будет ваше фото рациона</p>
                      </div>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-100 text-green-800 border-none font-normal text-xs">
                      {card.badge}
                    </Badge>
                    <span className="text-xs text-black/50">{card.name}</span>
                  </div>
                  <CardTitle className="text-lg font-medium font-heading text-black">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-black/80 leading-relaxed mt-2">
                    «{card.description}»
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-6 mt-auto">
                  <div className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    {card.result}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
