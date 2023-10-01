'use client'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { enhanceEV, EV, EVDerived } from '@/app/ev-database/ev-models'

const keyCols: (keyof EVDerived)[] = [
  'Model Year',
  'Brand',
  'Model Name',
  'Trim',
] as (keyof EVDerived)[]

interface EVFormState {
  applyYearFilter: boolean
  yearMode: string
  yearSelected: string
  ev2023: boolean
}

export default function EvDatabaseClient({ json }: { json: string }) {
  const params = useSearchParams()
  const { handleSubmit, register } = useForm<EVFormState>({
    defaultValues: Object.fromEntries(params),
  })
  const sourceData: EVDerived[] = useMemo(
    () => (JSON.parse(json) as EV[]).map(enhanceEV),
    [json],
  )

  const releaseYears = useMemo(
    () => [
      'any',
      ...Array.from(
        new Set(sourceData.map((ev) => ev.ExpectedReleaseYear)),
      ).sort(),
    ],
    [sourceData],
  )

  const [filteredData, setFilteredData] = useState<EVDerived[]>(sourceData)

  const onSubmit = handleSubmit((data: EVFormState) => {
    let xData = [...sourceData]
    if (data.yearSelected !== '????' && data.yearSelected !== 'any') {
      if (data.yearMode == 'Release') {
        xData = xData.filter(
          (ev) => ev.ExpectedReleaseYear === data.yearSelected,
        )
      }
      if (data.yearMode == 'Model') {
        xData = xData.filter((ev) => ev['Model Year'] === data.yearSelected)
      }
    }
    if (data.ev2023 === true) {
      xData = xData.filter(
        (ev) =>
          ev['Batt kWh'] != null &&
          parseFloat(ev['Batt kWh']) >= 7 &&
          ev['US MSRP'] != null &&
          parseFloat(ev['US MSRP'].replace(/[^\d.]/g, '')) < 80000 &&
          [
            'BMW',
            'Cadillac',
            'Chevrolet',
            'Chrysler',
            'Ford',
            'Jeep',
            'Lincoln',
            'Rivian',
            'Tesla',
            'Volkswagen',
          ].indexOf(ev['Brand']) !== -1 &&
          ev['Model Year'] != null &&
          parseInt(ev['Model Year'], 10) > 2021,
      )
    }
    setFilteredData(xData)
  })

  const groupedData: { [key: string]: EVDerived[] } = {}
  filteredData.forEach((car) => {
    const key = car.Brand ?? '??'
    groupedData[key] = [...(groupedData[key] ?? []), car]
  })

  return (
    <Container>
      <Form onSubmit={onSubmit} method="GET">
        <Row className="align-items-center my-3">
          <Col xs={7} sm={6} md={4} lg={3}>
            <InputGroup>
              <InputGroup.Checkbox {...register('applyYearFilter')} />
              <Form.Control
                as="select"
                className="px-3"
                {...register('yearMode')}
              >
                <option>Release</option>
                <option>Model</option>
              </Form.Control>
              <InputGroup.Text>year</InputGroup.Text>
              <Form.Control as="select" {...register('yearSelected')}>
                {releaseYears.map((ry) => (
                  <option key={ry}>{ry}</option>
                ))}
              </Form.Control>
            </InputGroup>
          </Col>

          <Col xs="auto">
            <Form.Group controlId="formEVCredit">
              <Form.Check
                label="2023 April 18 EV credit"
                {...register('ev2023')}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button type="submit">Apply Filter</Button>
          </Col>
        </Row>
      </Form>
      <Row xs={1} md={5} className="g-3">
        {Object.keys(groupedData)
          .sort()
          .map((groupingKey) => (
            <Col key={JSON.stringify(groupingKey)}>
              <Card>
                <Card.Header>{groupingKey}</Card.Header>
                {groupedData[groupingKey].map((ev, i) => (
                  <Card.Body key={i}>
                    {ev['Model Year']} {ev.Brand} {ev['Model Name']} (Trim:{' '}
                    {ev['Trim']})
                    <br />
                    {ev['Batt kWh']} kWh, USD {ev['US MSRP']}
                  </Card.Body>
                ))}
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  )
}
