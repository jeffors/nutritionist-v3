import SectionHeading from '@/components/shared/SectionHeading'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HomePage } from '@/payload-types'
import { Leaf } from 'lucide-react'

type NutritionSection = {
  nutrition: HomePage['nutrition']
}

export default function NutritionSection({ nutrition }: NutritionSection) {
  return (
    <section className="bg-gray-50 py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title={nutrition?.heading} align="left" />
            <p className="text-black/80 leading-relaxed mb-4 text-base md:text-lg">
              {nutrition?.paragraph1}
            </p>
            <p className="text-black/80 leading-relaxed mb-6">{nutrition?.paragraph2}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nutrition?.cards?.map((card) => (
              <Card key={card.id} className="border-none shadow-md bg-white">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-medium font-heading text-black mb-2">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-black/70 leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
