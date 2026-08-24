import { RefreshRouteOnSave } from '@/components/chrome/RefreshRouteOnSave'
import SectionHeading from '@/components/shared/SectionHeading'
import { MenuGuide } from '@/payload-types'
import MenuGuideCard from '@/components/cards/MenuGuideCard'

type GuidesSectionProps = {
  menuGuides: MenuGuide[]
}

export default function GuidesSection({ menuGuides }: GuidesSectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-20 pt-28">
      <RefreshRouteOnSave />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeading
            title="Терапевтические меню-гайды"
            description="Практические статьи, сбалансированные схемы питания и рекомендации по рациону при
            различных состояниях."
            hero
            as="h1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuGuides.map((guide) => (
            <MenuGuideCard guide={guide} />
          ))}
        </div>
      </div>
    </div>
  )
}
