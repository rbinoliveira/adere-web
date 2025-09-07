'use client'

import clsx from 'clsx'
import * as React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'

import { InputError } from '@/application/_shared/components/shared/input-error'
import { InputLabel } from '@/application/_shared/components/shared/input-label'

export interface PrimitiveInputTextProps extends React.ComponentProps<'input'> {
  isErrored?: boolean
  type?: 'password' | 'text'
  variant?: 'base' | 'sm'
}

const PrimitiveInputText = React.forwardRef<
  HTMLInputElement,
  PrimitiveInputTextProps
>(
  (
    { className, type = 'text', isErrored, variant = 'base', ...props },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <input
        {...props}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={type}
        className={clsx(
          'bg-background rounded-radius text-text-one border-[1px] flex w-full ',
          'ring-offset-background placeholder:text-text-two',
          'focus:outline-none text-sm leading-[1.285714286]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-primary': isFocused,
            'border-primary-light': !isFocused,
            '!border-danger': isErrored,
          },
          variant === 'base' ? 'py-[0.625rem] px-4' : 'py-[0.4375rem] px-2',
          className,
        )}
      />
    )
  },
)

export type InputTextProps<T extends FieldValues> = PrimitiveInputTextProps & {
  name: Path<T>
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
  label?: string
  className?: string
}

function InputText<T extends FieldValues>({
  name,
  control,
  defaultValue = '' as PathValue<T, Path<T>>,
  label,
  className,
  ...props
}: InputTextProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={clsx('flex w-full flex-col gap-2', className)}>
          <InputLabel label={label} htmlFor={name} />
          <PrimitiveInputText id={name} {...field} {...props} />
          <InputError error={error} />
        </div>
      )}
    />
  )
}

export { InputText }
