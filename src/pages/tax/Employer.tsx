import Button from 'devextreme-react/button'
import DataGrid, { Editing } from 'devextreme-react/data-grid'
import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'

function parsePayslip(str): any {
  const res: any = {}
  const dates = /(Benjamin Herila).*?([/\d]{10})\s+([/\d]{10})\s*([/\d]{10})/.exec(
    str,
  )
  if (dates) {
    res['Period begin'] = dates[2]
    res['Period end'] = dates[3]
    res['Pay date'] = dates[4]
  }

  const regex = /\s+((?:Transit FSA|Performance Bonus|SEVER|OASDI|Medicare|Federal Withholding|State Tax - [A-Z]{2}|CA VDI|401\(k\)|HSA|TM Travel Coupon Q\d|LTD|Medical|SF|STD|VISION)[^\d]*)([\d,]+\.\d{2}).*?([\d,]+\.\d{2})/gi
  const matches = str
    .split('\n')
    .map((line) => regex.exec(line))
    .filter((x) => !!x)
  for (const match of matches) {
    const key = match[1].trim()
    const value = parseFloat(match[2].replace(',', '').trim())
    res[key] = value
  }

  // const r2 = str.split('\n').map(line => /(Current|YTD|Holiday|(?:Non-Taxable )?Stipend|Salary)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})+/gi.exec(line)).filter(x => !!x);
  // for (const match of r2) {
  // 	res[match[1].trim()] = parseFloat(match[2].trim());
  // }

  const r2 = str
    .split('\n')
    .map((line) =>
      /(Performance Bonus|SEVER|Holiday|Salary|(?:Non-Taxable )?Stipend)[^.]+\.\d{2,6}\s+([\d,]+\.\d{2,6})\s+([\d,]+\.\d{2})/i.exec(
        line,
      ),
    )
    .filter((x) => !!x)
  for (const match of r2) {
    res[match[1].trim()] = parseFloat(match[3].replace(',', '').trim())
  }

  return res
}

export function NewPayslip(props: { onSubmit?: (any) => void }) {
  const [payslip, setPayslip] = useState('')
  const parsed = parsePayslip(payslip)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit(parsed)
        setPayslip('')
      }}
    >
      <h3>Add payslip</h3>
      <textarea
        style={{ width: '100%' }}
        onChange={(e) => setPayslip(e.currentTarget.value)}
        rows={10}
        placeholder={'Paste here'}
        className={'textbox'}
      >
        {payslip}
      </textarea>
      <pre style={{ color: 'white' }}>{JSON.stringify(parsed, null, '  ')}</pre>
      <Button text="Add" useSubmitBehavior={true} />
    </form>
  )
}

interface EmployerProps {
  name: string
  payslips: any[]
  setPayslips: (payslips: any[]) => void
}

export default function Employer({
  name,
  payslips,
  setPayslips,
}: EmployerProps) {
  return (
    <Container fluid>
      <Row>
        <Col sm={8}>
          <h2>{name}</h2>
          <DataGrid
            dataSource={payslips}
            onRowRemoving={(e) =>
              setPayslips(payslips.filter((x) => x !== e.data))
            }
          >
            <Editing
              mode="row"
              allowUpdating={false}
              allowDeleting={true}
              confirmDelete={false}
              allowAdding={false}
            />
          </DataGrid>
        </Col>
        <Col sm={4}>
          <NewPayslip
            onSubmit={(newPayslip) => setPayslips([...payslips, newPayslip])}
          />
        </Col>
      </Row>
    </Container>
  )
}
