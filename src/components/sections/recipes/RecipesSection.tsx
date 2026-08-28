import { BookOpen } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import RecipeCard from '@/components/cards/RecipeCard'
import { Recipe } from '@/payload-types'

type RecipesSectionProps = {
  recipes: Recipe[]
}

export default function RecipesSection({ recipes }: RecipesSectionProps) {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto my-12">
          <SectionHeading
            title="Библиотека рецептов"
            description="Вкусные, простые и сбалансированные блюда с точным расчетом КБЖУ, разработанные с
            заботой о вашем здоровье."
            hero
            as="h1"
          />
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Рецепты скоро появятся</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
