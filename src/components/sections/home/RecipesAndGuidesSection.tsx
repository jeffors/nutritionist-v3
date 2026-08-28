import SectionHeading from '@/components/shared/SectionHeading'
import { HomePage, MenuGuide, Recipe } from '@/payload-types'
import { BookOpen, FileText, Utensils } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RecipeHomeCard } from '@/components/cards/RecipeHomeCard'
import { MenuGuideHomeCard } from '@/components/cards/MenuGuideHomeCard'

type RecipesAndGuidesSectionProps = {
  recipesHeading: HomePage['recipes']
  recipes: Recipe[]
  menuGuides: MenuGuide[]
}

export default function RecipesAndGuidesSection({
  recipesHeading,
  recipes,
  menuGuides,
}: RecipesAndGuidesSectionProps) {
  return (
    <section className="bg-white py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={recipesHeading?.heading} description={recipesHeading?.description} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Utensils className="w-6 h-6 text-green-600" />
              <h3 className="font-heading text-2xl font-light text-black">Бесплатные рецепты</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recipes.map((recipe) => (
                <RecipeHomeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            <div className="text-left mt-4">
              <Button asChild variant="outline" size="xl">
                <Link href="/recipes" className="inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {recipesHeading?.ctaLabel}
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-green-600" />
              <h3 className="font-heading text-2xl font-light text-black">
                Терапевтические меню-гайды
              </h3>
            </div>

            <div className="space-y-4">
              {menuGuides.map((guide) => (
                <MenuGuideHomeCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
