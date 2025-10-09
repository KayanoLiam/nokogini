"use client";

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallbackText?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg'
}

export default function Avatar({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  className,
  fallbackText 
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const sizeClass = sizeClasses[size]
  
  // If no src provided or image failed to load, show fallback
  if (!src || imageError) {
    return (
      <div 
        className={cn(
          'rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium',
          sizeClass,
          className
        )}
      >
        {fallbackText ? fallbackText.charAt(0).toUpperCase() : '?'}
      </div>
    )
  }

  return (
    <div className={cn('rounded-full overflow-hidden', sizeClass, className)}>
      <Image
        src={src}
        alt={alt}
        width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  )
}