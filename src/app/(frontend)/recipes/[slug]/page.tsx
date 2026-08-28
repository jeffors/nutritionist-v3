import NotFound from '../../[...not-found]/page'
import { getRecipesBySlug } from '@/data/recipes'
import RecipeDetail from '@/components/sections/recipes/RecipesDetail'

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

  return <RecipeDetail recipe={recipe} />
}
