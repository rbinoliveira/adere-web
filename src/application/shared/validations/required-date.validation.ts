import { z } from 'zod'

type RequiredDateProps = {
  field: string
}

export const requiredDate = ({ field }: RequiredDateProps) => {
  return z.date({
    invalid_type_error: `${field} é obrigatório`,
    required_error: `${field} é obrigatório`,
  })
}
