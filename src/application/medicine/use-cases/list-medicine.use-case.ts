import { serverRoutes } from '@/application/_shared/constants/server-routes.constant'
import { api } from '@/application/_shared/libs/axios'
import { ListPaginatedModel } from '@/application/_shared/models/list-paginated.model'
import { MedicineModel } from '@/application/medicine/models/medicine.model'

export type ListMedicineUseCaseOutput = ListPaginatedModel<MedicineModel>

export async function listMedicineUseCase(): Promise<ListMedicineUseCaseOutput> {
  const response = await api.get(`${serverRoutes.medicine}`)
  return response.data
}
