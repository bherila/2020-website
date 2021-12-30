import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'

import Header from '../components/header'
import Layout from '../components/layout'

export const Home = (): JSX.Element => (
  // <Layout>
  //   <Head>
  //     <title>Ben Herila</title>
  //     <meta content="Ben Herila" property="og:title" />
  //     <meta content="Ben Herila" property="twitter:title" />
  //   </Head>
  //   <div className="v3-container">
  //     <div className="hc-transparent">
  //       <h2>Human Centric Design &amp;&nbsp;Development</h2>
  //       <p className="paragraph-2">
  //         Do you need a website or end-to-end technology solution?
  //       </p>
  //       <a
  //         href="mailto:ben@herila.net?subject=Website%20Contact"
  //         className="cta w-button"
  //       >
  //         Get in touch
  //       </a>
  //     </div>
  //   </div>
  // </Layout>
  <>
    <Header />
    <Container maxWidth="sm">
      <h2>Human Centric Design &amp;&nbsp;Development</h2>
      <p className="paragraph-2">
        Do you need a website or end-to-end technology solution?
      </p>
      <a
        href="mailto:ben@herila.net?subject=Website%20Contact"
        className="cta w-button"
      >
        Get in touch
      </a>
    </Container>
  </>
)

export default Home
