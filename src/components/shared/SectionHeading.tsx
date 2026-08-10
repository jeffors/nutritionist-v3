import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title?: string | null
  description?: string | null
  hero?: boolean
}

export default async function SectionHeading({ title, description, hero }: SectionHeadingProps) {
  if (!title) return null
  return (
    <div className={cn('text-center mb-12', { 'mb-6': hero })}>
      <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
      <h2
        className={cn('font-heading text-4xl md:text-5xl text-black font-light mb-6', {
          'text-5xl md:text-6xl': hero,
        })}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('text-black/80 max-w-xl mx-auto', { 'text-lg': hero })}>{description}</p>
      )}
    </div>
  )
}
