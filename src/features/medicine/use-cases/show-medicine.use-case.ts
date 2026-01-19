import { MedicineModel } from '@/features/medicine/models/medicine.model'
import api from '@/shared/libs/axios'

export type ShowMedicineUseCaseInput = {
  id: string
}
export type ShowMedicineUseCaseOutput = MedicineModel

export async function showMedicineUseCase(
  params: ShowMedicineUseCaseInput,
): Promise<ShowMedicineUseCaseOutput> {
  const response = await api.get(`/api/medicine/show/${params.id}`)
  return response.data
}
