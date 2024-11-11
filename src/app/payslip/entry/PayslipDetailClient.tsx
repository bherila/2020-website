'use client'
import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fin_payslip } from '@/app/payslip/payslipDbCols'

const PayrollForm: React.FC<{ onSave?: (data: fin_payslip) => void }> = ({
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormData({ ...formData, [name]: value ? parseFloat(value) : undefined })
  }

  const handleDateChange = (date: Date | null, field: keyof fin_payslip) => {
    setFormData({
      ...formData,
      [field]: date ? date.toISOString().split('T')[0] : '',
    })
  }

  const handleCheckboxChange = () => {
    setFormData({ ...formData, ps_is_estimated: !formData.ps_is_estimated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h3>Pay Period</h3>
        <Row>
          <Col>
            <Form.Group controlId="period_start">
              <Form.Label>Period Start</Form.Label>
              <DatePicker
                selected={
                  formData.period_start ? new Date(formData.period_start) : null
                }
                onChange={(date) => handleDateChange(date, 'period_start')}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="period_end">
              <Form.Label>Period End</Form.Label>
              <DatePicker
                selected={
                  formData.period_end ? new Date(formData.period_end) : null
                }
                onChange={(date) => handleDateChange(date, 'period_end')}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="pay_date">
              <Form.Label>Pay Date</Form.Label>
              <DatePicker
                selected={
                  formData.pay_date ? new Date(formData.pay_date) : null
                }
                onChange={(date) => handleDateChange(date, 'pay_date')}
              />
            </Form.Group>
          </Col>
        </Row>

        <h3>Earnings</h3>
        <Row>
          {[
            'ps_salary',
            'earnings_gross',
            'earnings_bonus',
            'earnings_rsu',
            'earnings_net_pay',
            'ps_vacation_payout',
          ].map((field) => (
            <Col key={field}>
              <Form.Group controlId={field}>
                <Form.Label>
                  {field.replace(/_/g, ' ').replace(/^ps /, '')}
                </Form.Label>
                <Form.Control
                  type="number"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>

        <h3>Imputed Income</h3>
        <Row>
          {['imp_legal', 'imp_fitness', 'imp_ltd', 'imp_other'].map((field) => (
            <Col key={field}>
              <Form.Group controlId={field}>
                <Form.Label>{field.replace(/_/g, ' ')}</Form.Label>
                <Form.Control
                  type="number"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>

        <h3>Federal Taxes Paid</h3>
        <Row>
          {[
            'ps_oasdi',
            'ps_medicare',
            'ps_fed_tax',
            'ps_fed_tax_addl',
            'ps_fed_tax_refunded',
          ].map((field) => (
            <Col key={field}>
              <Form.Group controlId={field}>
                <Form.Label>{field.replace(/_/g, ' ')}</Form.Label>
                <Form.Control
                  type="number"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>

        <h3>State Taxes</h3>
        <Row>
          {['ps_state_tax', 'ps_state_disability', 'ps_state_tax_addl'].map(
            (field) => (
              <Col key={field}>
                <Form.Group controlId={field}>
                  <Form.Label>{field.replace(/_/g, ' ')}</Form.Label>
                  <Form.Control
                    type="number"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            ),
          )}
        </Row>

        <h3>Retirement Savings</h3>
        <Row>
          {['ps_401k_pretax', 'ps_401k_aftertax', 'ps_401k_employer'].map(
            (field) => (
              <Col key={field}>
                <Form.Group controlId={field}>
                  <Form.Label>{field.replace(/_/g, ' ')}</Form.Label>
                  <Form.Control
                    type="number"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            ),
          )}
        </Row>

        <h3>Pretax Deductions</h3>
        <Row>
          {[
            'ps_pretax_medical',
            'ps_pretax_fsa',
            'ps_pretax_vision',
            'ps_pretax_dental',
          ].map((field) => (
            <Col key={field}>
              <Form.Group controlId={field}>
                <Form.Label>{field.replace(/_/g, ' ')}</Form.Label>
                <Form.Control
                  type="number"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>

        <Form.Group controlId="ps_is_estimated">
          <Form.Check
            type="checkbox"
            label="Values are estimated"
            checked={formData.ps_is_estimated}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  )
}

export default PayrollForm
