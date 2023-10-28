import {
  SPGPRequestType,
  SPGPRequestTypeWithPromo,
} from '@/app/spgp/SPGPRequestSchema'
import { fetchWrapper } from '@/lib/fetchWrapper'
import React from 'react'

export default function SpgpRowActions(props: {
  data: any
  request: SPGPRequestTypeWithPromo
  setData: (value: any) => void
  requests: SPGPRequestType[]
}) {
  const { data, request, setData, requests } = props
  return request.r_promo ? (
    !request.r_used_on ? (
      <a
        onClick={(e) => {
          e.preventDefault()
          fetchWrapper
            .post('/api/spgp/', {
              action: 'mark-used',
              id: request.r_id,
            })
            .then(() => {
              const r = requests.find((r) => r.r_id == request.r_id)!
              r.r_used_on = 'used'
              setData({ ...data, requests })
            })
        }}
        href="#"
      >
        Mark used
      </a>
    ) : (
      <a
        onClick={(e) => {
          e.preventDefault()
          fetchWrapper
            .post('/api/spgp/', {
              action: 'un-mark-used',
              id: request.r_id,
            })
            .then(() => {
              const r = requests.find((r) => r.r_id == request.r_id)!
              delete r.r_used_on
              setData({ ...data, requests })
            })
        }}
        href="#"
      >
        Not used
      </a>
    )
  ) : (
    <a
      onClick={(e) => {
        e.preventDefault()
        fetchWrapper
          .post('/api/spgp/', {
            action: 'withdraw',
            id: request.r_id,
          })
          .then(() => {
            const r = requests.filter((r) => r.r_id !== request.r_id)
            setData({ ...data, requests: r })
          })
      }}
      href="#"
    >
      Withdraw
    </a>
  )
}
