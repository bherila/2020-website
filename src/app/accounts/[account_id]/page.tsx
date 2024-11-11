import 'server-only'
import React from 'react'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import AccountClient from '@/app/accounts/[account_id]/Client'

export default async function Page({
  params,
}: {
  params: Promise<{ account_id: string }>
}) {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }
  return <AccountClient id={(await params).account_id} />
}
