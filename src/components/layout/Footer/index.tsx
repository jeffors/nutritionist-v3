import { Button } from '@/components/ui/button'
import { Leaf, Send, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-50/30 flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <div className="font-heading text-lg font-semibold">Лариса Галимова</div>
                <div className="text-xs text-gray-400 tracking-widest uppercase">Нутрициолог</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Помогаю людям улучшить здоровье и качество жизни через правильное питание и образ
              жизни.
            </p>
            {/* <div className="flex items-center gap-3">
              <Link
                href="https://t.me/_"
                target="_blank"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gray-50/40 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </Link>
              <Link
                href="https://wa.me/_"
                target="_blank"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gray-50/40 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </Link>
            </div> */}
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">
              Навигация
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Обо мне
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Магазин
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Отзывы
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/services/nutrition"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Консультация
                </Link>
              </li>
              <li>
                <Link
                  href="/services/coaching"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Разбор анализов
                </Link>
              </li>
              <li>
                <Link
                  href="/services/weight-loss"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Снижение веса
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="tel:+79001234567"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  +7 (900) 123-45-67
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:larisa.galimova@example.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  larisa.galimova@example.com
                </Link>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                Магнитогорск, онлайн по всему миру
              </li>
            </ul>

            <div className="mt-5 flex gap-2">
              <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600 text-xs">
                <Link href="https://t.me/_" target="_blank" aria-label="Telegram">
                  <Send className="w-3.5 h-3.5" />
                  Telegram
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-green-500 hover:bg-green-600 text-xs">
                <Link href="https://wa.me/_" target="_blank" aria-label="WhatsApp">
                  <Phone className="w-3.5 h-3.5" />
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Лариса Галимова. Все права защищены.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/offer"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Публичная оферта
            </Link>
            <Link
              href="/consent"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Согласие на обработку данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
