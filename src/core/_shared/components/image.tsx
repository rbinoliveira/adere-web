'use client'

import clsx from 'clsx'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useEffect, useState } from 'react'

import { UI } from '@/core/_shared/components'

type ImageProps = NextImageProps & {
  imageClassName?: string
  isLoading?: boolean
}

function Img({
  className,
  alt,
  src,
  priority,
  imageClassName,
  isLoading,
}: ImageProps) {
  const [isValidatting, setIsValidatting] = useState(true)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsValid(true)
    }
    img.onerror = () => {
      setIsValid(false)
    }
    img.src = src as string
    setIsValidatting(false)
  }, [src])

  if (isValidatting || isLoading) {
    return <UI.Skeleton className={clsx('bg-primary-light', className)} />
  }

  if (!isValid) {
    return null
  }

  return (
    <div className={`relative ${className}`}>
      <NextImage
        alt={alt}
        src={src}
        className={imageClassName}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  )
}

export { Img as Image }
