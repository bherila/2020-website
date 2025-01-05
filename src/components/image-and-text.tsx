import Link from 'next/link'
import cn from 'classnames'

export default function ImageAndText({ children, imageUrl, alt, ctaText, ctaLink, extraClass }: ImageAndTextProps) {
  return (
    <div className={cn('flex flex-wrap pb-4', extraClass)}>
      <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/4">
        <img width="100%" src={imageUrl} alt={alt} />
      </div>
      <div className="w-full sm:w-2/3 md:w-2/3 lg:w-3/4 pl-4">
        {children}
        {ctaText && ctaLink ? (
          <Link href={ctaLink} className="bg-primary-500 hover:bg-primary-700 font-bold py-2 px-4 rounded mt-3">
            {ctaText}
          </Link>
        ) : null}
      </div>
    </div>
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
