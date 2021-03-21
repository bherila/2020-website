import Head from 'next/head'
import React from 'react'

import V3container from './v3-container'
interface HeaderProps {
  text: string
}

export default function PageHeader({ text }: HeaderProps) {
  return (
    <V3container>
      <Head>
        <title>{text} - Ben Herila</title>
      </Head>
      <h2 className={'align-center'}>{text}</h2>
    </V3container>
  )
}
