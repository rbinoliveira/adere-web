import { MedicineModel } from '@/features/medicine/models/medicine.model'
import { SaveMedicineUseCaseSchema } from '@/features/medicine/schemas/save-medicine.schema'
import api from '@/shared/libs/axios'

export type UpdateMedicineUseCaseInput = SaveMedicineUseCaseSchema
export type UpdateMedicineUseCaseOutput = MedicineModel

export async function updateMedicineUseCase(
  data: UpdateMedicineUseCaseInput,
): Promise<UpdateMedicineUseCaseOutput> {
  const response = await api.put('/api/medicine/update', data)
  return response.data
}
