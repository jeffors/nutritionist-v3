import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Review } from '@/payload-types'
import { Star } from 'lucide-react'
import { formatReview } from '@/lib/formatReview'

export function ReviewCard({ review }: { review: Review }) {
  const formattedReview = formatReview(review)

  return (
    <Card className="justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{formattedReview.name}</CardTitle>
            {formattedReview.age && (
              <CardDescription>
                {formattedReview.age}
                {formattedReview.location && ` · ${formattedReview.location}`}
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
      <CardContent>
        <p className="text-black/80">"{formattedReview.text}"</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Badge variant={'secondary'}>{formattedReview.service}</Badge>
        <span className="text-xs text-black/80">{formattedReview.date}</span>
      </CardFooter>
    </Card>
  )
}
