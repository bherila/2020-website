import Head from 'next/head'
import Layout from "../components/layout";
import React from "react";

export const Home = (): JSX.Element => (
  <Layout>
    <Head>
      <title>Ben Herila</title>
      <meta content="Ben Herila" property="og:title"/>
      <meta content="Ben Herila" property="twitter:title"/>
    </Head>
    <div className="container">
      Hello!
    </div>
  </Layout>
)

export default Home
