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

import { InputError } from '@/application/shared/components/shared/input-error'
import { InputLabel } from '@/application/shared/components/shared/input-label'

export interface PrimitiveInputTextProps extends React.ComponentProps<'input'> {
  isErrored?: boolean
  type?: 'password' | 'text'
}

const PrimitiveInputText = React.forwardRef<
  HTMLInputElement,
  PrimitiveInputTextProps
>(({ className, type = 'text', isErrored, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <input
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      type={type}
      className={clsx(
        'bg-background rounded-radius text-text-one flex h-10 w-full border-2 px-4 py-[0.6875rem] text-sm leading-[1.28]',
        'ring-offset-background placeholder:text-text-two',
        'focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border-primary': isFocused,
          'border-primary-light': !isFocused,
          '!border-danger': isErrored,
        },
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

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
