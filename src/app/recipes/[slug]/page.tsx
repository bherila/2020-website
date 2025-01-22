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

export async function generateStaticParams() {
  const posts = getListOfRecipes()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { content, data } = getRecipeContent((await params).slug)
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
      <MainTitle>{data.title}</MainTitle>
      <div className="flex flex-col md:flex-row">
        <div className="sm:w-64 p-2">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-2">
            {data.ingredients.map((x: string, i: number) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="p-2">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </Container>
  )
}
