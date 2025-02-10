import 'server-only'
import Container from '@/components/container'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

export default function Loading() {
  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-96 w-full" />
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-full space-y-4">
          <Skeleton className="h-8 w-32" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead className="text-right">Last Balance</TableHead>
                <TableHead className="text-right">Last update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-48" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-24 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-1/3">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </Container>
  )
}
