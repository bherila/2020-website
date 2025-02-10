import 'server-only'
import { prisma } from '@/server_lib/prisma'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'
import { createTag } from './actions'
import { revalidatePath } from 'next/cache'
import { TAG_COLORS } from './tagColors'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

export default async function TagsPage() {
  const { uid } = await requireSession()

  // Fetch existing tags for the user
  const existingTags = await prisma.finAccountTag.findMany({
    where: { tag_userid: uid },
    orderBy: { tag_label: 'asc' },
  })

  async function handleCreateTag(formData: FormData) {
    'use server'
    const result = await createTag(formData)

    if (result.error) {
      // TODO: Add error handling
      console.error(result.error)
    }

    revalidatePath('/finance/tags')
  }

  return (
    <Container>
      <Breadcrumb className="pt-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/finance">Financial Accounts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Manage Tags</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between mb-8">
        <MainTitle>Manage Tags</MainTitle>
      </div>
      <div className="flex items-top justify-between mb-8">
        <div className="w-2/3 pr-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {existingTags.map((tag) => (
                <TableRow key={tag.tag_id}>
                  <TableCell>{tag.tag_label}</TableCell>
                  <TableCell>
                    <div className={`bg-${tag.tag_color}-200 text-white`}>{tag.tag_color}</div>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-1/3 border-l pl-4">
          <h2 className="text-xl font-semibold mb-4">Add New Tag</h2>
          <form action={handleCreateTag}>
            <div className="space-y-4">
              <div>
                <Label>Tag Label</Label>
                <Input placeholder="Enter tag label" name="tag_label" maxLength={50} required />
              </div>

              <div>
                <Label>Tag Color</Label>
                <Select name="tag_color" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {TAG_COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-left">
                          <div className={`w-4 h-4 rounded-full bg-${color}-400 mr-2`} title={color} />
                          {color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit">Create Tag</Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
