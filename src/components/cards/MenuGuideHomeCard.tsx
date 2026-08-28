import { MenuGuide } from '@/payload-types'
import { ArrowRight, LockIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { iconMap } from '@/lib/service-maps'
import { Badge } from '@/components/ui/badge'

export function MenuGuideHomeCard({ guide }: { guide: MenuGuide }) {
  const isAvailable = !guide.isComingSoon
  const Icon = iconMap[guide.icon]

  if (!isAvailable) {
    return (
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-100/50 border border-dashed border-gray-200 opacity-75">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
            <LockIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">{guide.title}</h4>
            <p className="text-xs text-gray-500">
              {guide.description || 'В перспективе / В разработке'}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-white border-gray-300 text-gray-500 text-[10px]">
          Скоро
        </Badge>
      </div>
    )
  }

  return (
    <Link key={guide.id} href={`/guides/${guide.slug}`} className="block">
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-green-50/30 transition-colors group">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
            <Icon name={guide.icon} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-black">{guide.title}</h4>
            {guide.description && (
              <p className="text-xs text-black/60 line-clamp-1">{guide.description}</p>
            )}
          </div>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="group-hover:translate-x-1 transition-transform"
          asChild
        >
          <div>
            <ArrowRight className="w-4 h-4 text-green-700" />
          </div>
        </Button>
      </div>
    </Link>
  )
}
