import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

type SectionHeadingProps = {
  badge?: string | null
  title?: string | null
  accentTitle?: string | null
  description?: string | null
  hero?: boolean
  as?: 'h1' | 'h2'
  align?: 'center' | 'left'
  accentColor?: 'green' | 'indigo'
}

export default function SectionHeading({
  badge,
  title,
  accentTitle,
  description,
  hero,
  as = 'h2',
  align = 'center',
  accentColor = 'green',
}: SectionHeadingProps) {
  if (!title) return null
  const Heading = as

  return (
    <div className={cn('text-center mb-12', { 'mb-6': hero, 'text-left': align === 'left' })}>
      {badge ? (
        <Badge
          className={cn('mb-4 bg-green-100 text-green-700', {
            'bg-indigo-100 text-indigo-700': accentColor === 'indigo',
          })}
        >
          {badge}
        </Badge>
      ) : (
        <div
          className={cn('w-60 h-1 bg-green-500 mb-4', {
            'mx-auto': align === 'center',
            'bg-indigo-500': accentColor === 'indigo',
          })}
        ></div>
      )}

      <Heading
        className={cn('font-heading text-4xl md:text-5xl text-black font-light mb-6', {
          'text-5xl md:text-6xl': hero,
        })}
      >
        {title}
        {accentTitle && (
          <span
            className={cn('block text-green-600', { 'text-indigo-600': accentColor === 'indigo' })}
          >
            {accentTitle}
          </span>
        )}
      </Heading>

      {description && (
        <p className={cn('text-black/80 max-w-xl mx-auto', { 'text-lg': hero })}>{description}</p>
      )}
    </div>
  )
}
