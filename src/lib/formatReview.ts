import { Review } from '@/payload-types'

export function formatReview(review: Review) {
  return {
    name: review.name,
    age: review.age ? `${review.age} ${pluralAge(review.age)}` : undefined,
    location: review.location ?? '',
    text: review.text,
    stars: review.stars,
    service: review.service,
    date: new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(
      new Date(review.date),
    ),
  }
}

function pluralAge(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'лет'
  if (mod10 === 1) return 'год'
  if (mod10 >= 2 && mod10 <= 4) return 'года'
  return 'лет'
}
