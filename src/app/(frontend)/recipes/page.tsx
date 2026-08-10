import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getMediaUrl } from '@/lib/media'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Utensils, Sparkles, BookOpen } from 'lucide-react'
import { RECIPE_CATEGORIES } from '@/lib/recipe-maps'
import SectionHeading from '@/components/shared/SectionHeading'

export default async function RecipesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled: isDraftMode } = await draftMode()

  const recipes = await payload.find({
    collection: 'recipes',
    where: { isActive: { equals: true } },
    sort: '-createdAt',
    draft: isDraftMode,
  })

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto my-12">
          <SectionHeading
            title="Библиотека рецептов"
            description="Вкусные, простые и сбалансированные блюда с точным расчетом КБЖУ, разработанные с
            заботой о вашем здоровье."
            hero
          />
        </div>

        {recipes.docs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Рецепты скоро появятся</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.docs.map((recipe) => {
              const coverUrl = getMediaUrl(recipe.image)

              return (
                <Card
                  key={recipe.id}
                  className="flex flex-col border border-gray-100 bg-white overflow-hidden group rounded-2xl"
                >
                  <div className="relative aspect-[16/10] bg-green-50/40 overflow-hidden">
                    {coverUrl ? (
                      <Image src={coverUrl} alt={recipe.title} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-green-600/30">
                        <Utensils className="w-12 h-12" />
                      </div>
                    )}
                    {recipe.category && (
                      <Badge className="absolute top-4 left-4 bg-white/90 text-black backdrop-blur-sm border-none">
                        {RECIPE_CATEGORIES[recipe.category]}
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between text-xs text-black/60 mb-2">
                      {recipe.prepTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-green-600" />
                          <span>{recipe.prepTime} мин</span>
                        </div>
                      )}
                      {recipe.nutrition?.calories && (
                        <div className="flex items-center gap-1 font-medium text-green-700">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{recipe.nutrition?.calories} ккал</span>
                        </div>
                      )}
                    </div>

                    <CardTitle className="font-heading text-xl font-medium text-black">
                      {recipe.title}
                    </CardTitle>

                    {recipe.description && (
                      <CardDescription className="text-sm text-black/70 mt-2">
                        {recipe.description}
                      </CardDescription>
                    )}

                    {(recipe.nutrition?.protein !== undefined ||
                      recipe.nutrition?.fat !== undefined ||
                      recipe.nutrition?.carbs !== undefined) && (
                      <div className="flex items-center justify-center gap-10 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100 mt-4">
                        <div className="text-center">
                          <span className="block text-[10px] uppercase text-black/40 font-semibold">
                            Белки
                          </span>
                          <span className="font-medium text-black">
                            {recipe.nutrition?.protein ?? 0}г
                          </span>
                        </div>
                        <div className="h-4 w-[1px] bg-gray-200" />
                        <div className="text-center">
                          <span className="block text-[10px] uppercase text-black/40 font-semibold">
                            Жиры
                          </span>
                          <span className="font-medium text-black">
                            {recipe.nutrition?.fat ?? 0}г
                          </span>
                        </div>
                        <div className="h-4 w-[1px] bg-gray-200" />
                        <div className="text-center">
                          <span className="block text-[10px] uppercase text-black/40 font-semibold">
                            Углеводы
                          </span>
                          <span className="font-medium text-black">
                            {recipe.nutrition?.carbs ?? 0}г
                          </span>
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="p-6 pt-4 mt-auto">
                    <Button asChild variant="default" className="w-full" size={'xl'}>
                      <Link href={`/recipes/${recipe.slug}`}>
                        Читать рецепт
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
