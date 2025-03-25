'use server'
import 'server-only'
import { z } from 'zod'
import { fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import { prisma } from '@/server_lib/prisma'
import { getSession } from '@/server_lib/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function savePayslip(
  formData: z.infer<typeof fin_payslip_schema> & {
    originalPeriodStart?: string
    originalPeriodEnd?: string
    originalPayDate?: string
  },
) {
  'use server'
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    // Validate the input using the schema
    const validatedData = fin_payslip_schema.parse({
      ...formData,
      // Ensure other is always an array or null
      other: formData.other ?? null,
    })

    // Determine which dates to use for lookup and update
    const lookupDates = {
      period_start: formData.originalPeriodStart ?? validatedData.period_start,
      period_end: formData.originalPeriodEnd ?? validatedData.period_end,
      pay_date: formData.originalPayDate ?? validatedData.pay_date,
    }

    // Upsert the payslip record
    await prisma.finPayslips.upsert({
      where: {
        uid_period_start_period_end_pay_date: {
          uid: session.uid,
          period_start: lookupDates.period_start!,
          period_end: lookupDates.period_end!,
          pay_date: lookupDates.pay_date!,
        },
      },
      create: {
        uid: session.uid,
        ...validatedData,
        other: validatedData.other ? JSON.stringify(validatedData.other) : null,
      },
      update: {
        ...validatedData,
        other: validatedData.other ? JSON.stringify(validatedData.other) : null,
      },
    })
  } catch (error) {
    console.error('Error saving payslip:', error)
    throw error
  }

  // Revalidate the payslip page to show updated data
  revalidatePath('/payslip')
}

export async function deletePayslip(
  payslipData: Pick<z.infer<typeof fin_payslip_schema>, 'period_start' | 'period_end' | 'pay_date'>,
) {
  let year = payslipData.pay_date?.slice(0, 4) ?? new Date().getFullYear().toString()
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    await prisma.finPayslips.delete({
      where: {
        uid_period_start_period_end_pay_date: {
          uid: session.uid,
          period_start: payslipData.period_start!,
          period_end: payslipData.period_end!,
          pay_date: payslipData.pay_date!,
        },
      },
    })
  } catch (error) {
    console.error('Error deleting payslip:', error)
    throw error
  }

  // Revalidate the payslip page to show updated data
  revalidatePath('/payslip')
  redirect('/payslip/?year=' + year)
}

export async function fetchPayslipYears() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  const years = await prisma.finPayslips.findMany({
    where: { uid: session.uid },
    select: { pay_date: true },
    distinct: ['pay_date'],
    orderBy: { pay_date: 'asc' },
  })

  // Extract unique years, including current year
  const uniqueYears = new Set([...years.map((y) => y.pay_date?.slice(0, 4) ?? ''), new Date().getFullYear().toString()])

  return Array.from(uniqueYears).filter(Boolean).sort().reverse()
}

export async function fetchPayslips(year?: string) {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  // Default to current year if no year is provided
  const selectedYear = year ?? new Date().getFullYear().toString()

  // validate year is between 1900 and 2100
  if (selectedYear < '1900' || selectedYear > '2100') {
    throw new Error('Invalid year')
  }

  const start = `${selectedYear}-01-01`
  const end = `${selectedYear}-12-31`

  let data = await prisma.finPayslips.findMany({
    where: {
      uid: session.uid,
      pay_date: {
        gte: start,
        lt: end,
      },
    },
    orderBy: {
      pay_date: 'asc',
    },
  })

  // Parse 'other' field if it's a string
  data = data.map((r) => ({
    ...r,
    other: typeof r.other === 'string' ? JSON.parse(r.other) : r.other,
  }))

  return z.array(fin_payslip_schema).parse(data)
}

export async function fetchPayslipByDetails(payslipDetails: {
  period_start: string
  period_end: string
  pay_date: string
}) {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  const payslip = await prisma.finPayslips.findUnique({
    where: {
      uid_period_start_period_end_pay_date: {
        uid: session.uid,
        period_start: payslipDetails.period_start,
        period_end: payslipDetails.period_end,
        pay_date: payslipDetails.pay_date,
      },
    },
  })

  if (!payslip) {
    throw new Error('Payslip not found')
  }

  // Parse 'other' field if it's a string
  const parsedPayslip = {
    ...payslip,
    other: typeof payslip.other === 'string' ? JSON.parse(payslip.other) : payslip.other,
  }

  return z.object(fin_payslip_schema.shape).parse(parsedPayslip)
}

export async function updatePayslipEstimatedStatus(payslipDetails: {
  period_start: string
  period_end: string
  pay_date: string
  ps_is_estimated: boolean
}) {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    await prisma.finPayslips.update({
      where: {
        uid_period_start_period_end_pay_date: {
          uid: session.uid,
          period_start: payslipDetails.period_start,
          period_end: payslipDetails.period_end,
          pay_date: payslipDetails.pay_date,
        },
      },
      data: {
        ps_is_estimated: payslipDetails.ps_is_estimated,
      },
    })

    // Revalidate the payslip page to show updated data
    revalidatePath('/payslip')
  } catch (error) {
    console.error('Error updating payslip estimated status:', error)
    throw error
  }
}
