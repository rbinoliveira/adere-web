import { useMutation } from '@tanstack/react-query'

import { handleError } from '@/core/_shared/helpers/error.helper'
import { queryClient } from '@/core/_shared/libs/react-query'
import { ServiceInput } from '@/core/_shared/types/service.type'
import { listMedicineQueryKey } from '@/core/medicine/services/list-medicine.service'
import {
  createMedicineUseCase,
  CreateMedicineUseCaseInput,
} from '@/core/medicine/use-cases/create-medicine.use-case'

export function CreateMedicineService({ onSuccess }: ServiceInput) {
  const mutation = useMutation({
    mutationFn: (data: CreateMedicineUseCaseInput) =>
      createMedicineUseCase(data),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data)
      }
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === listMedicineQueryKey,
      })
    },
    onError: (error) => {
      handleError(error)
    },
  })
  return mutation
}
