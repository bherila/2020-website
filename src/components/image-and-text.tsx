import React from 'react'
import V3container from './v3-container'
import Link from 'next/link'
import cn from 'classnames'

function renderCta(ctaText, ctaLink) {
  if (ctaLink.indexOf('http') === 0) {
    return (
      <a className="cta w-button" href={ctaLink}>
        {ctaText}
      </a>
    )
  }
  return (
    <Link href={ctaLink}>
      <a className="cta w-button">{ctaText}</a>
    </Link>
  )
}

export default function ImageAndText({
  children,
  imageUrl,
  alt,
  ctaText,
  ctaLink,
  extraClass,
}) {
  return (
    <V3container>
      <div className={cn(extraClass || 'columns', 'w-row')}>
        <div className="w-col w-col-4">
          <img src={imageUrl} alt={alt} />
        </div>
        <div className="w-col w-col-8">
          {children}
          {ctaText ? <>{renderCta(ctaText, ctaLink)}</> : null}
        </div>
      </div>
    </V3container>
  )
}
