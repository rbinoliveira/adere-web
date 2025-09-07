import { useMutation } from '@tanstack/react-query'

import { handleError } from '@/application/_shared/helpers/error.helper'
import { ServiceInput } from '@/application/_shared/types/service.type'
import {
  createSessionUseCase,
  CreateSessionUseCaseInput,
} from '@/application/auth/use-cases/create-session.use-case'

export function CreateSessionService({ onSuccess }: ServiceInput) {
  const mutation = useMutation({
    mutationFn: (data: CreateSessionUseCaseInput) => createSessionUseCase(data),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data)
      }
    },
    onError: (error) => {
      handleError(error)
    },
  })
  return mutation
}
