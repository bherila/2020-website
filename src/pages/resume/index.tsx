import React from 'react'

import ImageAndText from '../../components/image-and-text'
import Layout from '../../components/layout'
import PageHeader from '../../components/page-header'
import V3container from '../../components/v3-container'

export default function ResumePage(props) {
  return (
    <Layout>
      <PageHeader text="Resume" />
      <ImageAndText
        extraClass={''}
        alt="Rooftop view"
        ctaLink={'/'}
        ctaText={'Back to Home'}
        imageUrl={'/images/rausch-rooftop---1.jpeg'}
      >
        <h3>Sorry</h3>
        <p>Currently unavailable.</p>
      </ImageAndText>
    </Layout>
  )
}
