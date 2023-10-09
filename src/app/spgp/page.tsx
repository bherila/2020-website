import Container from '@/components/container'
import { getSession } from '@/lib/session'
import React from 'react'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NewSPGPRequestForm from '@/app/spgp/NewSPGPRequestForm'
import Table from 'react-bootstrap/Table'
import GetSPGPPassTypes from '@/app/spgp/GetSPGPPassTypes'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import SPGPImportClient from '@/app/spgp/SPGPImportClient'
import ImportCodeListClient from '@/app/spgp/ImportCodeListClient'

export default async function SPGPInfo() {
  const session = await getSession()
  const passTypes: ParsedSPGPPassType[] = await GetSPGPPassTypes()
  if (!session?.ax_spgp) {
    return (
      <Container>
        <MainTitle>Access denied</MainTitle>
        <h2>You don&apos;t have access to this application.</h2>
      </Container>
    )
  }
  return (
    <Container>
      <MainTitle>Ski pass group purchase</MainTitle>
      <div className="alert alert-warning">
        Please keep in mind this offer is to be kept in private communication,
        no public websites, and social media spaces. This offer is only valid
        for individuals associated with your group. Please communicate this
        privacy clause to all individuals you provide the offer to.
      </div>
      <ul>
        <li>
          Data you submit will be shared with the company you are requesting the
          offer from.
        </li>
        <li>All submitted data is purged after the ski season.</li>
        <li>Redeem the code directly on the company&apos;s website.</li>
      </ul>
      <Row>
        <Col sm={8}>
          <h2>My requests</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Previous Pass ID</th>
                <th>Promo code</th>
              </tr>
            </thead>
          </Table>
        </Col>
        <Col sm={4}>
          <NewSPGPRequestForm passTypes={passTypes} />
        </Col>
      </Row>
      {passTypes && (
        <Row>
          <h2>Admin</h2>
          <ImportCodeListClient passTypes={passTypes} />
          <p>Import csv</p>
          <SPGPImportClient passTypes={passTypes} />
        </Row>
      )}
    </Container>
  )
}
