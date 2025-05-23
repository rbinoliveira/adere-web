import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  type?: 'button' | 'submit'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild = false,
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={clsx(
          'rounded-radius inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition-colors',
          // 'focus-visible:outline-primary focus-visible:outline-4 focus-visible:outline-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          '[&_svg]:pointer-events-none [&_svg]:shrink-0',
          {
            'bg-primary text-primary-contrast border-primary border-2 px-6 py-[0.375rem] font-bold leading-[1.5]':
              variant === 'primary',
            'text-primary border-primary border-2 px-6 py-[0.375rem] font-bold leading-[1.5]':
              variant === 'secondary',
            '': variant === 'ghost',
          },
          className,
        )}
        type={type}
        ref={ref}
        {...props}
      />
    )
  },
)

export { Button }
