import React from 'react'
import Head from 'next/head'

export default function TaxLayout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap@4.5.0/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/devextreme@20.1.6/dist/css/dx.common.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/devextreme@20.1.6/dist/css/dx.material.lime.dark.compact.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/devextreme@20.1.6/dist/css/dx.material.lime.dark.compact.css"
        />
      </Head>
      <div>{children}</div>
    </>
  )
}
