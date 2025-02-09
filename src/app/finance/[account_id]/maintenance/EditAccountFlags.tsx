'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { updateAccountFlags } from './updateAccountFlags.action'

export interface EditAccountFlagsProps {
  accountId: string
  isDebt: boolean
  isRetirement: boolean
}

export function EditAccountFlags({ accountId, isDebt, isRetirement }: EditAccountFlagsProps) {
  return (
    <Card className="shadow-sm mt-8">
      <CardHeader>
        <CardTitle>Account Flags</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDebt"
              name="isDebt"
              defaultChecked={isDebt}
              onCheckedChange={(checked) => {
                updateAccountFlags(accountId, {
                  isDebt: !!checked,
                })
              }}
            />
            <Label htmlFor="isDebt">Account is a Liability (e.g., Credit Card)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isRetirement"
              name="isRetirement"
              defaultChecked={isRetirement}
              onCheckedChange={(checked) => {
                updateAccountFlags(accountId, {
                  isRetirement: !!checked,
                })
              }}
            />
            <Label htmlFor="isRetirement">Account is a Retirement Account</Label>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
