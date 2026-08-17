import SectionHeading from '@/components/shared/SectionHeading'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getMediaUrl } from '@/lib/media'
import { HomePage, MenuGuide, Recipe } from '@/payload-types'
import { ArrowRight, BookOpen, FileText, Leaf, LockIcon, Utensils } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { RECIPE_CATEGORIES } from '@/lib/recipe-maps'
import { Button } from '@/components/ui/button'
import { iconMap } from '@/lib/service-maps'
import { Badge } from '@/components/ui/badge'

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
              {recipes.map((recipe) => {
                const recipe_image = getMediaUrl(recipe.image)
                return (
                  <Link href={`/recipes/${recipe.slug}`} key={recipe.id}>
                    <Card className="border border-gray-150 shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden bg-white">
                      <div className="h-40 bg-green-50/30 flex items-center justify-center border-b border-gray-100 relative">
                        {recipe_image ? (
                          <Image src={recipe_image} alt={recipe.title} fill></Image>
                        ) : (
                          <Leaf className="w-8 h-8 text-green-500/40" />
                        )}
                      </div>
                      <CardHeader className="p-4">
                        <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold">
                          {RECIPE_CATEGORIES[recipe.category]}
                        </span>
                        <CardTitle className="text-base font-heading font-medium text-black mt-1">
                          {recipe.title}
                        </CardTitle>
                        <CardDescription className="text-xs text-black/70 leading-relaxed line-clamp-4 mt-2">
                          {recipe.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
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
              {menuGuides.map((guide) => {
                const isAvailable = !guide.isComingSoon
                const Icon = iconMap[guide.icon]

                if (!isAvailable) {
                  return (
                    <div
                      key={guide.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gray-100/50 border border-dashed border-gray-200 opacity-75"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                          <LockIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700">{guide.title}</h4>
                          <p className="text-xs text-gray-500">
                            {guide.description || 'В перспективе / В разработке'}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-white border-gray-300 text-gray-500 text-[10px]"
                      >
                        Скоро
                      </Badge>
                    </div>
                  )
                }

                return (
                  <Link key={guide.id} href={`/guides/${guide.slug}`} className="block">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-green-50/30 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                          <Icon name={guide.icon} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-black">{guide.title}</h4>
                          {guide.description && (
                            <p className="text-xs text-black/60 line-clamp-1">
                              {guide.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="group-hover:translate-x-1 transition-transform"
                        asChild
                      >
                        <div>
                          <ArrowRight className="w-4 h-4 text-green-700" />
                        </div>
                      </Button>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* <div className="text-left mt-4">
                <Button asChild variant="outline" size="xl">
                  <Link href="/guides" className="inline-flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Все меню-гайды
                  </Link>
                </Button>
              </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
