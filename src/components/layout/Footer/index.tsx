import { Leaf, Send, Phone } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
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
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
