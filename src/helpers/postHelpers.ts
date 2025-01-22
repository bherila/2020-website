import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export function getListOfRecipes() {
  const folder = path.join(process.cwd(), 'posts/recipes')
  const files = fs.readdirSync(folder)
  const recipes = files
    .filter((file) => file.endsWith('.md'))
    .map((filename) => {
      const content = getRecipeContent(filename.replace('.md', ''))
      return {
        slug: filename.replace('.md', ''),
        title: content.data.title,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
  return recipes
}

export function getRecipeContent(slug: string): matter.GrayMatterFile<string> {
  const file = path.join(process.cwd(), 'posts/recipes', slug) + '.md'
  const content = fs.readFileSync(file, 'utf8')
  return matter(content)
}
