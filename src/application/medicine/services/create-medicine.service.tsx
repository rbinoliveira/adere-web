import { useMutation } from '@tanstack/react-query'

import { handleError } from '@/application/_shared/helpers/error.helper'
import { queryClient } from '@/application/_shared/libs/react-query'
import { ServiceInput } from '@/application/_shared/types/service.type'
import { listMedicineQueryKey } from '@/application/medicine/services/list-medicine.service'
import {
  createMedicineUseCase,
  CreateMedicineUseCaseInput,
} from '@/application/medicine/use-cases/create-medicine.use-case'

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
