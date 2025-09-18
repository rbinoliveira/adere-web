'use client'

import { useForm } from 'react-hook-form'

import { InputSearch } from '@/application/_shared/components/molecules/form/input-search'
import { InputSelect } from '@/application/_shared/components/molecules/form/input-select'
import { cn } from '@/application/_shared/libs/tw-merge'

type TableFilterProps = {
  search: {
    placeholder: string
  }
  className?: string
}

export function TableFilter({ search, className }: TableFilterProps) {
  const { control } = useForm()

  return (
    <div className={cn('', className)}>
      <InputSearch
        control={control}
        name="search"
        placeholder={search.placeholder}
        className="max-w-[320px]"
      />
      <InputSelect
        control={control}
        name="select"
        className="max-w-[150px]"
        variant="sm"
      />
    </div>
  )
}
