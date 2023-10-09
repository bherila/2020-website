'use client'

import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import NewSPGPRequestForm from '@/app/spgp/NewSPGPRequestForm'
import ImportCodeListClient from '@/app/spgp/ImportCodeListClient'
import SPGPImportClient from '@/app/spgp/SPGPImportClient'
import React, { useEffect, useState } from 'react'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import { fetchWrapper } from '@/lib/fetchWrapper'
import Spinner from 'react-bootstrap/Spinner'
import {
  SPGPRequestSchema,
  SPGPRequestType,
  SPGPRequestTypeWithPromo,
} from '@/app/spgp/SPGPRequestSchema'
import { z } from 'zod'

export default function SPGPClient() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()
  useEffect(() => {
    setLoading(true)
    fetchWrapper
      .get('/api/spgp/')
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  const passTypes: ParsedSPGPPassType[] = data?.passTypes ?? []

  const requests: SPGPRequestType[] = data?.requests

  return (
    <>
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
          <Table striped bordered hover size="sm" style={{ fontSize: '8pt' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Promo code</th>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Previous Pass ID</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} align="center">
                    <Spinner className="my-3" />
                  </td>
                </tr>
              ) : (
                requests.map((request: SPGPRequestTypeWithPromo) => (
                  <tr key={request.r_id}>
                    <td>{request.r_id}</td>
                    <td>{request.r_promo ?? 'requested!'}</td>
                    <td>{request.r_first}</td>
                    <td>{request.r_last}</td>
                    <td>{request.r_email}</td>
                    <td>{request.r_birthdate.toString().slice(0, 10)}</td>
                    <td>
                      {request.r_previous_passid} {request.r_comment}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
        <Col sm={4}>
          <NewSPGPRequestForm passTypes={passTypes} />
        </Col>
      </Row>
      <Row>
        <h2>Admin</h2>
        <ImportCodeListClient passTypes={passTypes} />
        <p>Import csv</p>
        <SPGPImportClient passTypes={passTypes} />
      </Row>
    </>
  )
}
