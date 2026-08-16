import { LucideIcon } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ContactMethodProps {
  icon: LucideIcon
  label: string
  value: string
  colorScheme: 'green' | 'blue' | 'gray'
  href?: string
}

export default function ContactMethod({
  icon,
  label,
  value,
  colorScheme,
  href,
}: ContactMethodProps) {
  const Icon = icon

  const content = (
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
  )

  return href ? (
    <Link href={href} target="_blank" className="block">
      {content}
    </Link>
  ) : (
    content
  )
}
