import { getRecipes } from '@/data/recipes'
import RecipesSection from '@/components/sections/recipes/RecipesSection'

export default async function RecipesPage() {
  const recipes = await getRecipes()

  return <RecipesSection recipes={recipes} />
}
