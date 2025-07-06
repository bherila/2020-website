'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface RecipeDisplayItemProps {
  recipe: {
    slug: string
    title: string
    categories: string[]
  }
}

export function RecipeDisplayItem({ recipe }: RecipeDisplayItemProps) {
  return (
    <li key={recipe.slug} className="flex items-center">
      <Link href={`/recipes/${recipe.slug}`} className="hover:underline mr-2">
        {recipe.title}
      </Link>
      {recipe.categories.map((category) => (
        <Badge key={category} variant="secondary" className="mr-1">
          {category}
        </Badge>
      ))}
    </li>
  )
}
