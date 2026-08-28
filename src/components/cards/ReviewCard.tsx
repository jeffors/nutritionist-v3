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

export function ReviewCard({
  review,
  variant = 'full',
}: {
  review: Review
  variant?: 'home' | 'full'
}) {
  const formattedReview = formatReview(review)
  const isFull = variant === 'full'

  return (
    <Card className="justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{formattedReview.name}</CardTitle>
            {formattedReview.age && <CardDescription>{formattedReview.age}</CardDescription>}
            {isFull && formattedReview.location && ` · ${formattedReview.location}`}
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
      <CardContent>
        <p className="text-black/80">"{formattedReview.text}"</p>
      </CardContent>
      <CardFooter className={isFull ? 'justify-between' : undefined}>
        <Badge variant={'secondary'}>{formattedReview.service}</Badge>
        {isFull && <span className="text-xs text-black/80">{formattedReview.date}</span>}
      </CardFooter>
    </Card>
  )
}
