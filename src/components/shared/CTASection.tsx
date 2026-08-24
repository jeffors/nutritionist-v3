import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ServicesPage } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type CTASectionProps = {
  heading?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  backgroundColor?: 'white' | 'green'
}

export default function CTASection({
  heading,
  description,
  ctaLabel,
  ctaHref,
  backgroundColor = 'white',
}: CTASectionProps) {
  return (
    <section
      className={cn('py-15 bg-green-100', {
        'bg-green-700 text-white': backgroundColor === 'green',
      })}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl font-light mb-4">{heading}</h2>
        <p
          className={cn('text-black/80 mb-8 leading-relaxed', {
            'text-white/80': backgroundColor === 'green',
          })}
        >
          {description}
        </p>
        <Button asChild variant={backgroundColor === 'green' ? 'secondary' : 'default'} size="xl">
          <Link href={ctaHref ?? ''}>
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
