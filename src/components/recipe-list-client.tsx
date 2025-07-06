'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RecipeDisplayItem } from './recipe-display-item'
import MainTitle from '@/components/main-title'
import { CTAs } from '@/components/ctas'

interface Recipe {
  slug: string
  title: string
  categories: string[]
}

interface RecipeListClientProps {
  recipes: Recipe[]
  categories: string[]
}

export function RecipeListClient({ recipes, categories }: RecipeListClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCategory = searchParams.get('category')

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    router.push(`?${params.toString()}`)
  }

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.categories.includes(selectedCategory))
    : recipes

  return (
    <div className="py-8">
      <MainTitle>Recipes</MainTitle>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant={!selectedCategory ? 'default' : 'outline'} onClick={() => handleCategoryChange('')}>
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <ul className="list-disc pl-5 space-y-2">
        {filteredRecipes.map((recipe) => (
          <RecipeDisplayItem key={recipe.slug} recipe={recipe} />
        ))}
      </ul>

      <CTAs />
    </div>
  )
}
