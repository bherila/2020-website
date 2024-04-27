import React from 'react'
import MainTitle from '@/components/main-title'
import Container from '@/components/container'
import { getListOfRecipes } from '@/helpers/postHelpers'

// Great reference! https://www.singlehanded.dev/blog/building-markdown-blog-with-nextjs-app-router

export default function RecipesPage() {
  const recipes = getListOfRecipes()
  return (
    <Container>
      <MainTitle>Recipes</MainTitle>
      {recipes.map((recipe: string) => (
        <div key={recipe}>
          <a href={recipe.replace('.md', '')}>{recipe}</a>
        </div>
      ))}
    </Container>
  )
}
