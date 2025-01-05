import MainTitle from '@/components/main-title'
import Container from '@/components/container'
import { getListOfRecipes } from '@/helpers/postHelpers'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function RecipesPage() {
  const recipes = getListOfRecipes()
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
      <MainTitle>Recipes</MainTitle>
      <ul className="list-disc pl-5 space-y-2">
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <a href={recipe.slug} className="hover:underline">
              {recipe.title}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  )
}
