'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import printRange, { checkLabRange, getLatestRangeInfo } from '@/lib/lab-range-check'
import SerializedLabResult from '../SerializedLabResult.type'

interface GroupedResults {
  [analyte: string]: SerializedLabResult[]
}

function groupByAnalyte(results: SerializedLabResult[]): GroupedResults {
  return results.reduce((acc, result) => {
    const analyte = result.analyte || 'Unknown'
    if (!acc[analyte]) {
      acc[analyte] = []
    }
    acc[analyte].push(result)
    return acc
  }, {} as GroupedResults)
}

export default function LabsCards({ labResults }: { labResults: SerializedLabResult[] }) {
  const results = labResults
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResults = results.filter(
    (result) => result.analyte?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false,
  )

  return (
    <div className="container space-y-4">
      <div className="flex gap-2 items-center">
        <span>🔍</span>
        <span>Filter:</span>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to filter analytes..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(groupByAnalyte(filteredResults)).map(([analyte, tests]) => {
          const rangeInfo = getLatestRangeInfo(tests)
          return (
            <Card key={analyte}>
              <CardHeader>{analyte}</CardHeader>
              <CardContent>
                <div className="mb-4">
                  {rangeInfo ? <div className="mb-2">Expected range: {printRange(rangeInfo)}</div> : null}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>In Range</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tests.map((test, index) => {
                        const { isInRange, message } = checkLabRange({
                          value: test.value,
                          rangeMin: rangeInfo?.rangeMin ?? null,
                          rangeMax: rangeInfo?.rangeMax ?? null,
                          normalValue: rangeInfo?.normalValue ?? null,
                        })
                        return (
                          <TableRow key={index}>
                            <TableCell style={{ width: '100px' }}>
                              {test.resultDatetime == null ? 'Unknown' : new Date(test.resultDatetime).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>
                                      {test.value} {test.unit}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>{test.testName || 'Unknown Test'}</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell style={{ width: '100px' }}>{isInRange ? '✓' : '⚠️'}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
