import { Search } from 'lucide-react'
import { Control, FieldValues, Path } from 'react-hook-form'

import { InputText } from '@/application/_shared/components/molecules/form/input-text'

type InputSearchProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  placeholder?: string
  className?: string
}

export function InputSearch<T extends FieldValues>({
  name,
  control,
  placeholder,
  className,
}: InputSearchProps<T>) {
  return (
    <InputText
      name={name}
      control={control}
      placeholder={placeholder}
      className={className}
      iconBefore={<Search size={16} className="text-icon" />}
    />
  )
}
