import MainTitle from '@/components/main-title'
import Container from '@/components/container'
import { getListOfRecipes, getAllCategories } from '@/helpers/postHelpers'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { RecipeListClient } from '@/components/recipe-list-client'

export default function RecipesPage() {
  const recipes = getListOfRecipes()
  const categories = getAllCategories()

  return (
    <Container>
      <div className="py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recipes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-2xl mx-auto">
        <RecipeListClient recipes={recipes} categories={categories} />
      </div>
    </Container>
  )
}
