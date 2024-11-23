import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import cn from 'classnames'

export default function ImageAndText({ children, imageUrl, alt, ctaText, ctaLink, extraClass }: ImageAndTextProps) {
  return (
    <Row className={cn('pb-4', extraClass)}>
      <Col xs={12} sm={4} md={4} lg={3}>
        <img width="100%" src={imageUrl} alt={alt} />
      </Col>
      <Col xs={12} sm={8} md={8} lg={9}>
        {children}
        {ctaText && ctaLink ? <>{renderCta(ctaText, ctaLink)}</> : null}
      </Col>
    </Row>
  )
}

function renderCta(ctaText: string, ctaLink: string) {
  return (
    <Link href={ctaLink} className="btn btn-primary mt-3">
      {ctaText}
    </Link>
  )
}

interface ImageAndTextProps {
  children: any
  imageUrl: string
  alt: string
  ctaText?: string
  ctaLink?: string
  extraClass?: string
}
