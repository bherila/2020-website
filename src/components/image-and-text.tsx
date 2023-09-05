import { Box, Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function ImageAndText({
  children,
  imageUrl,
  alt,
  ctaText,
  ctaLink,
}: ImageAndTextProps) {
  return (
    <Box component="div">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4} lg={3} px={3} py={6}>
          <img width="100%" src={imageUrl} alt={alt} />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={9}>
          {children}
          {ctaText ? <>{renderCta(ctaText, ctaLink)}</> : null}
        </Grid>
      </Grid>
    </Box>
  )
}

function renderCta(ctaText: string, ctaLink: string) {
  if (ctaLink.indexOf('http') === 0) {
    return (
      <a className="cta w-button" href={ctaLink}>
        {ctaText}
      </a>
    )
  }
  return <Link href={ctaLink}>{ctaText}</Link>
}

interface ImageAndTextProps {
  children: any
  imageUrl: string
  alt: string
  ctaText: string
  ctaLink: string
  extraClass: string
}
