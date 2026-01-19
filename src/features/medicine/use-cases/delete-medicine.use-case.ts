import { MedicineModel } from '@/features/medicine/models/medicine.model'
import api from '@/shared/libs/axios'

export type DeleteMedicineUseCaseInput = {
  id: string
}
export type DeleteMedicineUseCaseOutput = MedicineModel

export async function deleteMedicineUseCase(
  params: DeleteMedicineUseCaseInput,
): Promise<DeleteMedicineUseCaseOutput> {
  const response = await api.delete(`/api/medicine/delete/${params.id}`)
  return response.data
}
