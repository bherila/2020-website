import React from 'react'
import ImageAndText from '../../components/image-and-text'
import Layout from '../../components/layout'
import PageHeader from '../../components/page-header'

export default function ProjectsPage(props) {
  return (
    <Layout>
      <PageHeader text="Selected Projects" />
      <ImageAndText
        extraClass=""
        imageUrl="/images/avocado-toast.jpg"
        alt="Avocado toast"
        ctaLink="/recipes"
        ctaText="See Recipes"
      >
        <h3>Cooking</h3>
        <p>
          I like to cook, a lot. Lately, I&apos;ve focused mostly on Asian
          cuisine. However, I also love european cuisine, especially my own
          heritage, Italian, cooking, and French. Since friends have asked,
          I&apos;m posting some recipes and cooking tips online.
        </p>
      </ImageAndText>
      <ImageAndText
        extraClass=""
        imageUrl="/images/underground-cellar-2-min.png"
        alt="Underground Cellar Screenshot"
        ctaLink="https://www.undergroundcellar.com"
        ctaText="www.undergroundcellar.com"
      >
        <h3>Underground Cellar</h3>
        <p>
          As co-founder and CTO at Underground Cellar, I grew the engineering
          team and own the internal products used by the company, spanning
          frontend, backend, administrative interface, and mobile apps for iOS
          and Android platforms. I also work with the CEO and major investors to
          design and implement financial models and reports. As a board
          director, I worked with investors and shape the governance of the
          company.
        </p>
        <ul>
          <li>Custom e-commerce backend</li>
          <li>Y Combinator backed, Winter 2015</li>
          <li>Winner of LAUNCH Festival, Best Consumer Startup</li>
        </ul>
      </ImageAndText>
      <ImageAndText
        extraClass=""
        imageUrl="/images/nom-3-min.png"
        alt="NOM Website Screenshot"
        ctaLink="https://www.thisisnom.co"
        ctaText="www.thisisnom.co"
      >
        <h3>Not Ordinary Media (NOM)</h3>
        <p>Winter 2019</p>
        <p>
          Design-first website for a modern media company. Featuring landing
          pages with custom Salesforce integration. Runs on Webflow.
        </p>
      </ImageAndText>
      <ImageAndText
        extraClass=""
        imageUrl="/images/coh1-min.png"
        alt="Christ Our Hope Catholic Church Website Screenshot"
        ctaLink="https://www.christourhopeseattle.org"
        ctaText="www.christourhopeseattle.org"
      >
        <h3>Christ Our Hope Catholic Church</h3>
        <p>Winter 2015</p>
        <p>
          Website build-out and IT installation. Featuring Office 365 hosted
          email to replace an aging Exchange server on-premises. Custom CMS
          using N2 CMS framework and .NET 3.5. Runs on Microsoft Azure.
        </p>
      </ImageAndText>
    </Layout>
  )
}
