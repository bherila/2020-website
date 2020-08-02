import React from 'react'
import Layout from '../../components/layout'
import ImageAndText from '../../components/image-and-text'
import PageHeader from '../../components/page-header'

export default function ConsultingPage(props) {
  return (
    <Layout>
      <PageHeader text="Consulting" />
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
