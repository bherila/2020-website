import 'server-only'
import { prisma } from '@/server_lib/prisma'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'
import { createTag, deleteTag } from './actions'
import { revalidatePath } from 'next/cache'
import { TAG_COLORS } from './tagColors'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'

export default async function TagsPage() {
  const { uid } = await requireSession()

  // Fetch existing tags for the user with transaction count
  const existingTags = await prisma.finAccountTag.findMany({
    where: {
      tag_userid: uid,
      when_deleted: null, // Only show non-deleted tags
    },
    orderBy: { tag_label: 'asc' },
    include: {
      _count: {
        select: {
          FinAccountLineItemTagMap: {
            where: {
              when_deleted: null,
              transaction: {
                when_deleted: null, // Ensure only non-deleted transactions are counted
              },
            },
          },
        },
      },
    },
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Transactions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {existingTags.map((tag) => (
            <TableRow key={tag.tag_id}>
              <TableCell>{tag.tag_label}</TableCell>
              <TableCell>
                <div className={`bg-${tag.tag_color}-200 text-white p-1 rounded`}>{tag.tag_color}</div>
              </TableCell>
              <TableCell>
                <Badge variant={tag._count.FinAccountLineItemTagMap > 0 ? 'default' : 'secondary'}>
                  {tag._count.FinAccountLineItemTagMap}
                </Badge>
              </TableCell>
              <TableCell>
                <form action={deleteTag}>
                  <input type="hidden" name="tag_id" value={tag.tag_id} />
                  <Button type="submit" variant="destructive" size="sm" disabled={tag._count.FinAccountLineItemTagMap > 0}>
                    Delete
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <Input placeholder="Enter tag label" name="tag_label" maxLength={50} required />
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>{/* Placeholder for alignment */}</TableCell>
            <TableCell>
              <form action={handleCreateTag}>
                <Button type="submit">Create Tag</Button>
              </form>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  )
}
