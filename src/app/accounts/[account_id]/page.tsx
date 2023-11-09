import 'server-only'
import React from 'react'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import AccountClient from '@/app/accounts/[account_id]/Client'

export default async function Page({
  params,
  searchParams,
}: {
  params: { account_id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
    return null
  }
  return <AccountClient id={params.account_id} />
}
