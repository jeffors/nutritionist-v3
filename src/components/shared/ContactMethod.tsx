import { LucideIcon, Phone } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ContactMethodProps {
  icon: LucideIcon
  label: string
  value: string
  colorScheme: 'green' | 'blue' | 'gray'
  href?: string
  variant: 'compact' | 'detailed'
  ctaText?: string
}

export default function ContactMethod({
  icon,
  label,
  value,
  colorScheme,
  href,
  variant = 'compact',
  ctaText,
}: ContactMethodProps) {
  const Icon = icon

  const content =
    variant === 'compact' ? (
      <Card className="hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-center">
            <div
              className={cn('w-14 h-14 rounded-full flex items-center justify-center mb-3', {
                'bg-green-100 text-green-600': colorScheme === 'green',
                'bg-blue-100 text-blue-600': colorScheme === 'blue',
                'bg-gray-100 text-gray-600': colorScheme === 'gray',
              })}
            >
              <Icon
                className={cn('w-6 h-6', {
                  'text-green-600': colorScheme === 'green',
                  'text-blue-600': colorScheme === 'blue',
                  'text-gray-600': colorScheme === 'gray',
                })}
              />
            </div>
          </div>

          <CardTitle className="flex font-sans justify-center">{label}</CardTitle>
          <CardDescription className="flex justify-center">{value}</CardDescription>
        </CardHeader>
      </Card>
    ) : (
      <div
        className={cn('flex items-center gap-4 p-5 rounded-2xl border transition-colors group', {
          'bg-green-50 border-green-100 hover:border-green-300': colorScheme === 'green',
          'bg-blue-50 border-blue-100 hover:border-blue-300': colorScheme === 'blue',
          'bg-gray-50 border-gray-100 hover:border-gray-300': colorScheme === 'gray',
        })}
      >
        <div
          className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', {
            'bg-green-500': colorScheme === 'green',
            'bg-blue-500': colorScheme === 'blue',
            'bg-gray-500': colorScheme === 'gray',
          })}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="">
          <p
            className={cn('font-semibold text-black transition-colors', {
              'group-hover:text-green-700': colorScheme === 'green',
              'group-hover:text-blue-700': colorScheme === 'blue',
              'group-hover:text-gray-700': colorScheme === 'gray',
            })}
          >
            {label}
          </p>
          <p className="text-black/80 text-sm">{value}</p>
          <p
            className={cn('text-xs text-green-600 mt-0.5', {
              'text-green-600': colorScheme === 'green',
              'text-blue-600': colorScheme === 'blue',
              'text-gray-600': colorScheme === 'gray',
            })}
          >
            {ctaText} →
          </p>
        </div>
      </div>
    )

  return href ? (
    <Link href={href} target="_blank" className="block">
      {content}
    </Link>
  ) : (
    content
  )
}
