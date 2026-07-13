import { Button } from '@/components/ui/button'
import { ArrowLeft, FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 rounded-2xl sm:px-10 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
            <FileQuestion className="h-10 w-10 text-gray-600" />
          </div>
          <h1 className="font-heading text-3xl text-black mb-3">Страница не найдена!</h1>

          <p className="text-black/80 text-sm mb-6">К сожалению, такой страницы не существует.</p>

          <div className="space-y-3">
            <Button asChild className="w-full" size={'xl'}>
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                Вернуться на главную
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
