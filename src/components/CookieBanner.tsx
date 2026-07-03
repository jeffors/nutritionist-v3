'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isAccepted = localStorage.getItem('cookie_accepted')
    if (!isAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_accepted', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl animate-fade-in-up">
      <div className="flex flex-col items-center justify-between gap-4 rounded-4xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:flex-row sm:p-6">
        <p className="text-sm leading-relaxed text-black">
          Мы используем файлы cookie и сервис Yandex SmartCaptcha для обеспечения безопасности,
          корректной работы и защиты форм сайта. Продолжая использовать сайт, вы соглашаетесь с
          нашей{' '}
          <Link
            href="/privacy"
            className="text-green-600 underline transition-colors hover:text-green-500"
          >
            Политикой конфиденциальности
          </Link>
          .
        </p>

        <Button onClick={handleAccept}>Принять</Button>
      </div>
    </div>
  )
}
