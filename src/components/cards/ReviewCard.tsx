import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { formatReview } from '@/lib/formatReview'
import { Review } from '@/payload-types'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { getMediaUrl } from 'src/lib/media'

export function ReviewCard({
  review,
  variant = 'full',
}: {
  review: Review
  variant?: 'home' | 'full'
}) {
  const formattedReview = formatReview(review)
  const isFull = variant === 'full'
  const image = getMediaUrl(review?.photo)
  if (!review.text)
    return (
      <Card className="p-0">
        {image && <Image alt="Отзыв клиента" src={image} height={600} width={600} />}
      </Card>
    )

  return (
    <Card className="justify-between ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{formattedReview.name}</CardTitle>
            {formattedReview.age && (
              <CardDescription>
                {formattedReview.age}{' '}
                {isFull && formattedReview.location && ` · ${formattedReview.location}`}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < formattedReview.stars ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-500 text-gray-500'}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-black/80">"{formattedReview.text}"</p>
        {image && (
          <Image alt="Отзыв клиента" src={image} height={600} width={600} className="rounded-xl" />
        )}
      </CardContent>
      <CardFooter className={isFull ? 'justify-between' : undefined}>
        {formattedReview.service && <Badge variant={'secondary'}>{formattedReview.service}</Badge>}
        {isFull && <span className="text-xs text-black/80">{formattedReview.date}</span>}
      </CardFooter>
    </Card>
  )
}
