'use client'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import NewSPGPRequestForm from '@/app/spgp/NewSPGPRequestForm'
import ImportCodeListClient from '@/app/spgp/ImportCodeListClient'
import SPGPImportClient from '@/app/spgp/SPGPImportClient'
import { useCallback, useEffect, useState } from 'react'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import { fetchWrapper } from '@/lib/fetchWrapper'
import Spinner from 'react-bootstrap/Spinner'
import { SPGPRequestType, SPGPRequestTypeWithPromo } from '@/app/spgp/SPGPRequestSchema'
import Card from 'react-bootstrap/Card'
import { Button, FormControl, Tab, Tabs } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import SpgpRowActions from './SpgpRowActions'

export default function SPGPClient({ admin, userEmail }: { admin: boolean; userEmail: string }) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()

  const [fetchKey, setFetchKey] = useState(1)
  const refetch = useCallback(() => setFetchKey(fetchKey + 1), [fetchKey])
  useEffect(() => {
    setLoading(true)
    fetchWrapper
      .get('/api/spgp/')
      .then(setData)
      .finally(() => {
        setLoading(false)
        setAdding(false)
      })
  }, [fetchKey])

  const passTypes: ParsedSPGPPassType[] = data?.passTypes ?? []

  const [limit, setLimit] = useState(25)

  const requests: SPGPRequestType[] = data?.requests

  const [isAdding, setAdding] = useState(false)

  const DEFAULT_TAB = 'view-requests'
  const [selectedTab, handleTabSelect] = useState(DEFAULT_TAB)

  const [search, setSearch] = useState('')
  const filtered = !search ? requests : requests.filter((r) => JSON.stringify(r).indexOf(search) !== -1)

  return (
    <>
      <Row className="mb-3 mt-5">
        <Col>
          <h1>Ski pass group purchase</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button
            type="button"
            variant="primary"
            onClick={(e) => {
              e.preventDefault()
              setAdding(true)
            }}
          >
            Add another request
          </Button>
        </Col>
      </Row>
      <div className="alert alert-warning">
        Please keep in mind this offer is to be kept in private communication, no public websites, and social media spaces.
        This offer is only valid for individuals associated with your group. Please communicate this privacy clause to all
        individuals you provide the offer to.
      </div>
      <Modal show={!loading && (isAdding || !requests?.length)} onHide={() => setAdding(false)}>
        <Modal.Header>
          <h2>Request a coupon code</h2>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>All fields are required.</b> Instructions:
          </p>
          <ul>
            <li>Data you submit will be shared with the company you are requesting the offer from.</li>
            <li>Redeem the code directly on the company&apos;s website.</li>
          </ul>
          <NewSPGPRequestForm passTypes={passTypes} refetch={refetch} defaultEmail={userEmail} />
        </Modal.Body>
      </Modal>
      <Tabs id="tab-component" activeKey={selectedTab} onSelect={(s) => handleTabSelect(s || DEFAULT_TAB)}>
        <Tab eventKey="view-requests" title="View Requests" className="mt-3">
          {/* Your "View Requests" content */}

          <Row className="mb-3">
            <Col sm={12}>
              {requests?.length && (
                <div className="mb-3">
                  You can withdraw a request if the promo code is not assigned yet. Duplicate requests would be merged
                  automatically. One promo code per person. Make sure the pass holder name and birthday is correct! You must
                  use the promo code BEFORE you purchase the pass! Discount cannot be applied afterward.
                </div>
              )}
              {admin && (
                <InputGroup className="mb-3" style={{ maxWidth: '270px' }}>
                  <FormControl
                    type="text"
                    placeholder="search"
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                  />
                  {search.length > 0 && (
                    <Button variant="secondary" onClick={() => setSearch('')}>
                      Clear
                    </Button>
                  )}
                </InputGroup>
              )}
              <Table striped bordered hover size="sm" style={{ fontSize: '8pt' }}>
                <thead>
                  <tr>
                    {admin && <th>#</th>}
                    <th>Promo code</th>
                    {admin && <th>Renew or New</th>}
                    <th>First</th>
                    <th>Last</th>
                    <th>Birthday</th>
                    <th>Email</th>
                    <th>Pass Type</th>
                    <th>Pass ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {filtered.map((request: SPGPRequestTypeWithPromo, i) => {
                      if (i > limit) {
                        return null
                      }
                      return (
                        <tr
                          key={request.r_id}
                          style={!!request.r_used_on ? { textDecoration: 'line-through', opacity: 0.5 } : {}}
                        >
                          {admin && <td>{request.r_id}</td>}
                          <td>{request.r_promo ?? (admin ? '' : 'requested!')}</td>
                          {admin && <td>{request.r_comment && request.r_comment.startsWith('I900') ? 'Renew' : 'New'}</td>}
                          <td>{request.r_first}</td>
                          <td>{request.r_last}</td>
                          <td>{request.r_birthdate.toString().slice(0, 10)}</td>
                          <td>{request.r_email}</td>
                          <td>{request.passtype_display_name ?? '?'}</td>
                          <td>
                            {request.r_previous_passid} {request.r_comment}
                          </td>
                          <td>
                            <SpgpRowActions data={data} request={request} setData={setData} requests={requests} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                )}
                {filtered?.length > limit && (
                  <tfoot>
                    <tr>
                      <th colSpan={100}>
                        <Button
                          size="sm"
                          variant="outline-light"
                          type="button"
                          onClick={() => setLimit(Number.MAX_SAFE_INTEGER)}
                        >
                          Show all ({filtered?.length})
                        </Button>
                      </th>
                    </tr>
                  </tfoot>
                )}
              </Table>
              {loading && (
                <div style={{ textAlign: 'center' }}>
                  <Spinner className="my-3" />
                </div>
              )}
            </Col>
          </Row>
        </Tab>
        {admin && (
          <Tab eventKey="import-codes" title="Import Codes" className="mt-3">
            <ImportCodeListClient passTypes={passTypes} />
          </Tab>
        )}
        {admin && (
          <Tab eventKey="import-csv" title="Import Sheet" className="mt-3">
            <Card>
              <Card.Header>Import CSV</Card.Header>
              <Card.Body>
                <SPGPImportClient passTypes={passTypes} />
              </Card.Body>
            </Card>
          </Tab>
        )}
      </Tabs>
    </>
  )
}
