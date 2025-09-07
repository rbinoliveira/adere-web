import { useQuery } from '@tanstack/react-query'

import {
  listMedicineUseCase,
  ListMedicineUseCaseOutput,
} from '@/application/medicine/use-cases/list-medicine.use-case'

export const listMedicineQueryKey = 'listMedicineQueryKey'

export function ListMedicineService() {
  const query = useQuery<ListMedicineUseCaseOutput>({
    queryKey: [listMedicineQueryKey],
    queryFn: async () => listMedicineUseCase(),
  })
  return query
}
