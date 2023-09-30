import React from 'react'

import ImageAndText from '../../components/image-and-text'
import { Metadata } from 'next'
import Typography from '@/components/typography'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export const metadata: Metadata = {
  title: 'Ben Herila - Projects',
}

export default function ProjectsPage() {
  const ProjectTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2>{children}</h2>
  }
  const ProjectDate = ({ children }: { children: React.ReactNode }) => {
    return <p>{children}</p>
  }
  const ProjectDescription = ({ children }: { children: React.ReactNode }) => {
    return <Typography variant="body1">{children}</Typography>
  }
  return (
    <Container>
      <MainTitle>Selected Projects</MainTitle>
      <ImageAndText
        extraClass=""
        imageUrl="/images/avocado-toast.jpg"
        alt="Avocado toast"
        ctaLink="/recipes"
        ctaText="See Recipes"
      >
        <ProjectTitle>Cooking</ProjectTitle>
        <ProjectDescription>
          I like to cook, a lot. Lately, I&apos;ve focused mostly on Asian
          cuisine. However, I also love european cuisine, especially my own
          heritage, Italian, cooking, and French. Since friends have asked,
          I&apos;m posting some recipes and cooking tips online.
        </ProjectDescription>
      </ImageAndText>
      <ImageAndText
        extraClass=""
        imageUrl="/images/underground-cellar-2-min.png"
        alt="Underground Cellar Screenshot"
      >
        <ProjectTitle>Underground Cellar</ProjectTitle>
        <ProjectDescription>
          As co-founder and CTO at Underground Cellar, I grew the engineering
          team and own the internal products used by the company, spanning
          frontend, backend, administrative interface, and mobile apps for iOS
          and Android platforms. I also work with the CEO and major investors to
          design and implement financial models and reports. As a board
          director, I worked with investors and shape the governance of the
          company.
        </ProjectDescription>
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
        <ProjectTitle>Not Ordinary Media (NOM)</ProjectTitle>
        <ProjectDate>Winter 2019</ProjectDate>
        <ProjectDescription>
          Design-first website for a modern media company. Featuring landing
          pages with custom Salesforce integration. Runs on Webflow.
        </ProjectDescription>
      </ImageAndText>
      <ImageAndText
        extraClass=""
        imageUrl="/images/coh1-min.png"
        alt="Christ Our Hope Catholic Church Website Screenshot"
        ctaLink="https://www.christourhopeseattle.org"
        ctaText="www.christourhopeseattle.org"
      >
        <ProjectTitle>Christ Our Hope Catholic Church</ProjectTitle>
        <ProjectDate>Winter 2015</ProjectDate>
        <ProjectDescription>
          Website build-out and IT installation. Featuring Office 365 hosted
          email to replace an aging Exchange server on-premises. Custom CMS
          using N2 CMS framework and .NET 3.5. Runs on Microsoft Azure.
        </ProjectDescription>
      </ImageAndText>
    </Container>
  )
}
