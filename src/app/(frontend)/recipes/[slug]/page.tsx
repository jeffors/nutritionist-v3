import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/media'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock, Utensils, CheckCircle2 } from 'lucide-react'
import { RECIPE_CATEGORIES } from '@/lib/recipe-maps'
import NotFound from '../../[...not-found]/page'
import { getRecipesBySlug } from '@/data/recipes'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const recipe = await getRecipesBySlug(slug)
  if (!recipe) return {}

  return {
    title: `${recipe.title} — Рецепты`,
    description: recipe.description,
  }
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params
  const recipe = await getRecipesBySlug(slug)

  if (!recipe) {
    return NotFound()
  }

  const imageUrl = getMediaUrl(recipe.image)

  return (
    <article className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ко всем рецептам
        </Link>

        <div className="mb-6">
          {recipe.category && (
            <Badge className="bg-green-100 text-green-800 border-none mb-3">
              {RECIPE_CATEGORIES[recipe.category]}
            </Badge>
          )}
          <h1 className="font-heading text-4xl sm:text-5xl text-black font-light leading-tight mb-4">
            {recipe.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-black/70">
            {recipe.prepTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span>
                  Время приготовления: <strong>{recipe.prepTime} мин</strong>
                </span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-600" />
                <span>
                  Порций: <strong>{recipe.servings}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-green-50/70 border border-green-100 text-center">
            <span className="text-[11px] font-semibold text-green-700 uppercase tracking-wider block mb-1">
              Калории
            </span>
            <div className="text-2xl font-heading font-semibold text-black">
              {recipe.nutrition?.calories ?? '—'}{' '}
              <span className="text-xs font-normal text-black/60">ккал</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block mb-1">
              Белки
            </span>
            <div className="text-2xl font-heading font-semibold text-black">
              {recipe.nutrition?.protein ?? '—'}{' '}
              <span className="text-xs font-normal text-black/60">г</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1">
              Жиры
            </span>
            <div className="text-2xl font-heading font-semibold text-black">
              {recipe.nutrition?.fat ?? '—'}{' '}
              <span className="text-xs font-normal text-black/60">г</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
            <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider block mb-1">
              Углеводы
            </span>
            <div className="text-2xl font-heading font-semibold text-black">
              {recipe.nutrition?.carbs ?? '—'}{' '}
              <span className="text-xs font-normal text-black/60">г</span>
            </div>
          </div>
        </div>

        {imageUrl && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-sm">
            <Image src={imageUrl} alt={recipe.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="md:col-span-5 bg-green-50/40 p-6 rounded-3xl border border-green-100 h-fit">
              <h2 className="font-heading text-2xl text-black font-medium mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-green-600" />
                Ингредиенты
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 text-sm text-black/80">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      {item.name}{' '}
                      <strong>
                        {item.amount}&nbsp;
                        {item.unit}
                      </strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="md:col-span-7 space-y-6">
            <h2 className="font-heading text-2xl text-black font-medium mb-4">
              Способ приготовления
            </h2>
            {recipe.instructions ? (
              <div className="prose prose-green max-w-none text-black/80 leading-relaxed">
                {typeof recipe.instructions === 'string' ? (
                  <p>{recipe.instructions}</p>
                ) : (
                  recipe.instructions?.map?.((step) => (
                    <div key={step.id} className="mb-6">
                      <h3 className="font-semibold text-black mb-1 text-base">
                        Шаг {step.stepNumber}
                      </h3>
                      <p className="text-black/80">{step.description}</p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-black/60 italic">Описание шагов скоро появится.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
