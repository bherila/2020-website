import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export function getListOfRecipes() {
  const folder = path.join(process.cwd(), 'posts/recipes')
  const files = fs.readdirSync(folder)
  return files.filter((file) => file.endsWith('.md')).map((filename) => filename.replace('.md', ''))
}

export function getRecipeContent(slug: string): matter.GrayMatterFile<string> {
  const file = path.join(process.cwd(), 'posts/recipes', slug) + '.md'
  const content = fs.readFileSync(file, 'utf8')
  return matter(content)
}
