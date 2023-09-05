import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import * as React from 'react'
import MediaCard from '@/components/MediaCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ben Herila',
}

export default function HomePage() {
  const Im = <>I&lsquo;m</>
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container>
        <Grid xs={12} sx={{ maxWidth: '600px' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Hi, {Im} Ben
          </Typography>

          <Typography variant="body1">
            {Im} a Software Engineer at Meta. {Im} currently working on{' '}
            <Link rel="noopener" href="https://horizon.meta.com">
              Horizon Worlds
            </Link>
            .
          </Typography>

          <Typography variant="body1">
            Before Meta, I worked at Airbnb on the i18n team. We expanded
            Airbnb.com to 32 new countries, added support for right-to-left,
            4-byte unicode, and more. You can read about it on the{' '}
            <Link
              rel="noopener"
              href="https://medium.com/airbnb-engineering/building-airbnbs-internationalization-platform-45cf0104b63c"
            >
              Airbnb engineering blog
            </Link>
            .
          </Typography>

          <Typography variant="body1">
            Before Airbnb, I was the co-founder and CTO of an e-commerce wine
            company. We participated in the Y Combinator Winter 2015 batch.
          </Typography>

          <Typography variant="body1">
            I began my professional career at Microsoft, briefly on the Office
            Graphics platform, and then for nearly four years on{' '}
            <Link
              rel="noopener"
              href="https://servercore.net/2013/07/meet-the-new-server-core-program-manager/"
            >
              making Windows Server smaller
            </Link>
            .
          </Typography>

          <Typography variant="body1">
            Before then, I worked on numerous personal projects and business
            ventures, and built the online presence for companies including
            <Link href="/projects/roessner/" rel="noopener">
              Roessner &amp; Co.
            </Link>
            ,{' '}
            <Link href="/projects/walsh/" rel="noopener">
              The Walsh Company
            </Link>
            ,{' '}
            <Link href="/projects/marisol/" rel="noopener">
              Marisol
            </Link>
            , and more.
          </Typography>

          <Typography variant="h4" component="h2">
            Hello
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

function example() {
  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Hello 👋</AlertTitle>
          This app uses the Next.js App Router and Material UI v5.
        </Alert>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading="CMYK"
              text="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="HSL and HSV"
              text="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="RGB"
              text="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="CIELAB"
              text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
            />
          </Grid>
        </Grid>
      </div>
      <Drawer
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            top: ['48px', '56px', '64px'],
            height: 'auto',
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <Typography variant="overline" sx={{ fontWeight: 500 }}>
              On this page
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}
