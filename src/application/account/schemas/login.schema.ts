import { z } from 'zod'

import { requiredEmail, requiredString } from '@/application/shared/validations'

export const loginSchema = z.object({
  email: requiredEmail(),
  password: requiredString({ field: 'password' }),
})

export type LoginSchema = z.infer<typeof loginSchema>
