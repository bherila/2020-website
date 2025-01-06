import { z } from 'zod'

export const taxFilingTypes = ['s', 'mfj', 'mfs', 'hoh']

export const graduatedTaxSchema = z.object({
  year: z.coerce.number().min(1900).max(2023),
  region: z.string().length(2).nullable(),
  income_over: z.number().min(-1),
  rate: z.string(),
  type: z.enum(['s', 'mfj', 'mfs', 'hoh']).optional(),
})

export interface tax_row {
  year: number
  region: string
  income_over: number
  rate: string
  type: string
}

export type tax_hierarchy = {
  [year: string]: {
    [region: string]: {
      [type: string]: {
        income_over: number
        rate: number
      }[]
    }
  }
}

export function convertToTaxHierarchy(rows: tax_row[]): tax_hierarchy {
  const hierarchy: tax_hierarchy = {}

  for (const row of rows) {
    let year = row.year.toString()
    if (!hierarchy[year]) {
      hierarchy[year] = {}
    }

    let region = row.region
    if (!hierarchy[year][region]) {
      hierarchy[year][region] = {}
    }

    let type = row.type
    if (!hierarchy[year][region][type]) {
      hierarchy[year][region][type] = []
    }

    hierarchy[year][region][type].push({
      income_over: row.income_over,
      rate: parseFloat(row.rate),
    })
  }

  return hierarchy
}
