import { AwardIcon, ImageIcon, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type PortraitBlockProps = {
  imageUrl?: string | null
  icon?: LucideIcon
  title?: string | null
  description?: string | null
  accentColor?: 'green' | 'indigo'
}

export default function PortraitBlock({
  imageUrl,
  title,
  description,
  accentColor = 'green',
  icon = AwardIcon,
}: PortraitBlockProps) {
  const Icon = icon
  if (imageUrl)
    return (
      <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-lg mx-auto lg:mx-0">
        <Image
          src={imageUrl}
          width={400}
          height={500}
          alt={title ? `Фотография ${title}` : 'Фотография'}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center',
                { 'bg-indigo-500/20': accentColor === 'indigo' },
              )}
            >
              <Icon
                className={cn('w-5 h-5 text-green-500', {
                  'text-indigo-500': accentColor === 'indigo',
                })}
              />
            </div>
            <div>
              <p className="font-semibold text-sm text-black">{title}</p>
              <p className="text-xs text-black/70">{description}</p>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div
      className={cn(
        'relative rounded-3xl overflow-hidden aspect-[4/5] max-w-lg mx-auto lg:mx-0 bg-green-200 flex items-center justify-center',
        { 'bg-indigo-200': accentColor === 'indigo' },
      )}
    >
      <div className="text-center">
        <ImageIcon
          className={cn('w-24 h-24 text-green-600 mx-auto mb-4 opacity-30', {
            'text-indigo-600': accentColor === 'indigo',
          })}
        />
        <p
          className={cn('text-green-600 font-medium', {
            'text-indigo-600': accentColor === 'indigo',
          })}
        >
          {title}
        </p>
        <p
          className={cn('text-green-500', {
            'text-indigo-500': accentColor === 'indigo',
          })}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
