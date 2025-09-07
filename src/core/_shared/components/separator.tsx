'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'

import { cn } from '@/core/_shared/libs/tw-merge'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  size = 'base',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  size?: 'lg' | 'base'
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border-two shrink-0 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full',
        {
          'data-[orientation=horizontal]:h-px': size === 'base',
          'data-[orientation=vertical]:w-px': size === 'base',
          'data-[orientation=horizontal]:h-[2px]': size === 'lg',
          'data-[orientation=vertical]:w-[2px]': size === 'lg',
        },
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
