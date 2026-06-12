'use client'
import { Button } from '@/components/ui/button'
import { PackageX } from 'lucide-react'
import { ButtonGroup } from '@/components/ui/button-group'
import { useState } from 'react'
import type { Guide, ServicesPage } from '@/payload-types'
import { CATEGORIES, CategoryValue } from '@/lib/shop-maps'
import { GuideCard } from '@/components/cards/GuideCard'

interface ShopClientProps {
  guides: Guide[]
  page: ServicesPage
}

export function ShopClient({ guides, page }: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>('all')

  const filteredGuides =
    activeCategory === 'all' ? guides : guides.filter((guide) => guide.category === activeCategory)

  return (
    <div className="pt-20">
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-60 h-1 bg-green-500 mx-auto mb-4"></div>
          <h1 className="font-heading text-5xl md:text-6xl text-black font-light mb-6">
            {page.hero?.heading}
          </h1>
          <div className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-6">
            {page.hero?.description}
          </div>
        </div>
      </section>
      <section className="bg-white sticky top-16 md:top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ButtonGroup className="py-4 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(({ label, value }) => (
              <Button
                key={value}
                variant={activeCategory === value ? 'default' : 'outline'}
                onClick={() => setActiveCategory(value)}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </section>
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <PackageX className="w-24 h-24"></PackageX>
              <p className="text-center">Не найдено цифровых продуктов по выбранным фильтрам</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
