import { MedicineModel } from '@/features/medicine/models/medicine.model'
import { SaveMedicineUseCaseSchema } from '@/features/medicine/schemas/save-medicine.schema'
import api from '@/shared/libs/axios'

export type CreateMedicineUseCaseInput = SaveMedicineUseCaseSchema
export type CreateMedicineUseCaseOutput = MedicineModel

export async function createMedicineUseCase(
  data: CreateMedicineUseCaseInput,
): Promise<CreateMedicineUseCaseOutput> {
  const response = await api.post('/api/medicine/create', data)
  return response.data
}
