import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getMediaUrl } from '@/lib/media'
import { Guide } from '@/payload-types'
import Image from 'next/image'

export function GuideHomeCard({ guide }: { guide: Guide }) {
  const imageUrl = getMediaUrl(guide.image)
  return (
    <Card className="relative">
      {imageUrl && <Image src={imageUrl} alt="Гайд по питанию" width={450} height={600} />}
      {guide.tag && (
        <Badge variant="secondary" className="absolute top-4 left-4">
          {guide.tag}
        </Badge>
      )}

      <CardHeader>
        <CardTitle>{guide.title}</CardTitle>
        <CardDescription>{guide.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <p className="text-lg font-bold">{guide.price} ₽</p>
        <Button variant="default">Купить</Button>
      </CardFooter>
    </Card>
  )
}
