import { getMediaUrl } from '@/lib/media'
import { Recipe } from '@/payload-types'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Leaf } from 'lucide-react'
import { RECIPE_CATEGORIES } from '@/lib/recipe-maps'

export function RecipeHomeCard({ recipe }: { recipe: Recipe }) {
  const recipe_image = getMediaUrl(recipe.image)
  return (
    <Link href={`/recipes/${recipe.slug}`}>
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
}
