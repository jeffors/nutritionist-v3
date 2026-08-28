import { EyeOff } from 'lucide-react'
import { Button } from '../ui/button'

interface PreviewBannerProps {
  currentPath?: string
}

export function PreviewBanner({ currentPath = '/' }: PreviewBannerProps) {
  return (
    <div className="bg-amber-500 text-white text-sm py-2 px-4 top-20 text-center font-medium flex items-center justify-center gap-3 sticky z-50 shadow-md animate-fade-in">
      <div className="flex items-center gap-1.5">
        <EyeOff className="w-4 h-4" />
        <span>
          Вы просматриваете <strong>черновик</strong> страницы
        </span>
      </div>
      <a href={`/api/exit-preview?url=${encodeURIComponent(currentPath)}`}>
        <Button variant={'secondary'} size={'xs'}>
          Вернуться к оригиналу
        </Button>
      </a>
    </div>
  )
}
