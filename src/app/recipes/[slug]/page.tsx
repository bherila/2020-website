import Container from '@/components/container'
import { getListOfRecipes, getRecipeContent } from '@/helpers/postHelpers'
import ReactMarkdown from 'react-markdown'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import MainTitle from '@/components/main-title'
import { ModalImage } from '@/components/modal-image'
import { CTAs } from '@/components/ctas'
import { RecipeDisplayItem } from '@/components/recipe-display-item'

export async function generateStaticParams() {
  const posts = getListOfRecipes()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const { content, data } = getRecipeContent(slug)
  const allRecipes = getListOfRecipes()
  const firstCategory = data.categories && data.categories.length > 0 ? data.categories[0] : null

  const relatedRecipes = firstCategory
    ? allRecipes.filter((recipe) => recipe.slug !== slug && recipe.categories.includes(firstCategory))
    : []

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
              <BreadcrumbLink href="/recipes">Recipes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-2xl mx-auto py-8">
        <MainTitle>{data.title}</MainTitle>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-2">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2">
              {data.ingredients.map((x: string, i: number) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="md:w-2/3 p-2">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ReactMarkdown>{content}</ReactMarkdown>
            {data.images && data.images.length > 0 && (
              <div className="mt-4">
                <ModalImage title={data.title} imageUrl={'/images/recipe/' + data.images[0]} alt={data.title} />
              </div>
            )}
          </div>
        </div>

        {relatedRecipes.length > 0 && firstCategory && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Other recipes in {firstCategory}</h2>
            <ul className="list-disc pl-5 space-y-2">
              {relatedRecipes.map((recipe) => (
                <RecipeDisplayItem key={recipe.slug} recipe={recipe} />
              ))}
            </ul>
          </div>
        )}

        <CTAs />
      </div>
    </Container>
  )
}
