import cn from 'classnames'
import CustomLink from './link'

export default function ImageAndText({ children, imageUrl, alt, ctaText, ctaLink, extraClass }: ImageAndTextProps) {
  return (
    <div className={cn('flex flex-wrap pb-4', extraClass)}>
      <div className="sm:w-1/3 md:w-1/3 lg:w-1/4">
        <img width="100%" src={imageUrl} alt={alt} />
      </div>
      <div className="sm:w-2/3 md:w-2/3 lg:w-3/4 pl-6">
        {children}
        {ctaText && ctaLink ? (
          <CustomLink href={ctaLink} className="mt-3 block">
            {ctaText}
          </CustomLink>
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
