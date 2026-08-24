import { BookOpen } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { getRecipes } from '@/data/recipes'
import RecipeCard from '@/components/cards/RecipeCard'
import RecipesSection from '@/components/sections/recipes/RecipesSection'

export default async function RecipesPage() {
  const recipes = await getRecipes()

  return <RecipesSection recipes={recipes} />
}
