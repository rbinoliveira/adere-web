import { useMutation } from '@tanstack/react-query'

import { handleError } from '@/core/_shared/helpers/error.helper'
import { ServiceInput } from '@/core/_shared/types/service.type'
import {
  createSessionUseCase,
  CreateSessionUseCaseInput,
} from '@/core/auth/use-cases/create-session.use-case'

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
