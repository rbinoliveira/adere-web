import { z } from 'zod'

import { requiredDate } from '@/application/_shared/validations/required-date.validation'
import { requiredEmail } from '@/application/_shared/validations/required-email.validation'
import { requiredString } from '@/application/_shared/validations/required-string.validation'

export const savePatientSchema = z.object({
  name: requiredString({ field: 'nome' }),
  phone: requiredString({ field: 'telefone' }),
  dob: requiredDate({ field: 'data de nascimento' }),
  email: requiredEmail(),
  password: requiredString({ field: 'senha' }),
  ownerId: requiredString({ field: 'ownerId' }),
})

export type SavePatientSchema = z.infer<typeof savePatientSchema>

export const savePatientFormSchema = savePatientSchema.omit({
  password: true,
  ownerId: true,
})

export type SavePatientFormSchema = z.infer<typeof savePatientFormSchema>

export const savePatientFirestoreSchema = savePatientSchema.extend({
  dob: requiredString({ field: 'data de nascimento' }),
})

export type SavePatientFirestoreSchema = z.infer<
  typeof savePatientFirestoreSchema
>
