import { useMutation } from '@tanstack/react-query'

import { handleError } from '@/application/shared/helpers'
import { ServiceInput } from '@/application/shared/types'
import {
  createSessionUseCase,
  CreateSessionUseCaseInput,
} from '@/domain/account/use-cases/create-session.use-case'

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
