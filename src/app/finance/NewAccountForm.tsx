'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  accountName: z.string().min(1, 'Account name is required'),
})

type NewAccountFormProps = {
  createAccount: (acctName: string) => Promise<void>
}

const NewAccountForm = ({ createAccount }: NewAccountFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: '',
    },
  })

  const onSubmit = async (values: { accountName: string }) => {
    try {
      await createAccount(values.accountName)
      form.reset()
    } catch (error) {
      form.setError('accountName', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      })
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create New Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <Label>Account Name</Label>
                  <FormControl>
                    <Input placeholder="Enter account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.accountName && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{form.formState.errors.accountName.message}</AlertDescription>
              </Alert>
            )}
            <CardFooter className="flex justify-end p-0 pt-4">
              <Button type="submit">{form.formState.isSubmitting ? 'Creating...' : 'Create Account'}</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default NewAccountForm
