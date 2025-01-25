'use server'
import auth from '@/server_lib/auth'
import { redirect } from 'next/navigation'
import { SignInFormState } from './SignInFormState'
import z from 'zod'
import { revalidatePath } from 'next/cache'

export async function EmailSignIn(prevState: SignInFormState | null, formData?: FormData): Promise<SignInFormState> {
  if (!formData) {
    return {
      email: '',
      error: 'Invalid form data',
    }
  }
  const body = z
    .object({ email: z.string().email(), password: z.string(), next: z.string().optional().nullable() })
    .parse(Object.fromEntries(formData.entries()))
  try {
    await auth.api.signInEmail({
      body,
    })
  } catch (error: any) {
    return {
      ...body,
      password: '',
      error: error.message || 'Failed to sign in. Please check your credentials and try again.',
    }
  }
  revalidatePath('/')
  redirect(body.next || '/')
}
