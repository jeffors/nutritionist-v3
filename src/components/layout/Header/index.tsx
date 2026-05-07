'use client'
import { Logo } from '@/components/sections/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Обо мне', href: '/about' },
  { name: 'Услуги', href: '/services' },
  { name: 'Магазин', href: '/shop' },
  { name: 'Отзывы', href: '/reviews' },
  { name: 'Контакты', href: '/contacts' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-green-500 text-sm font-medium transition-colors ${pathname === item.href ? 'text-green-500' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="default" size="lg">
              <Link href="/contacts">Записаться</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
