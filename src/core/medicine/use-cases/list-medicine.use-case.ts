import { serverRoutes } from '@/core/_shared/constants/server-routes.constant'
import { api } from '@/core/_shared/libs/axios'
import { ListPaginatedModel } from '@/core/_shared/models/list-paginated.model'
import { MedicineModel } from '@/core/medicine/models/medicine.model'

export type ListMedicineUseCaseOutput = ListPaginatedModel<MedicineModel>

export async function listMedicineUseCase(): Promise<ListMedicineUseCaseOutput> {
  const response = await api.get(`${serverRoutes.medicine}`)
  return response.data
}
