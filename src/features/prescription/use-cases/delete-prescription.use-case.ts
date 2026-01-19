import api from '@/shared/libs/axios'
import { PrescriptionModel } from '@/features/prescription/models/prescription.model'

export type DeletePrescriptionUseCaseInput = {
  id: string
}
export type DeletePrescriptionUseCaseOutput = PrescriptionModel

export async function deletePrescriptionUseCase(
  params: DeletePrescriptionUseCaseInput,
): Promise<DeletePrescriptionUseCaseOutput> {
  const response = await api.delete(`/api/prescription/delete/${params.id}`)
  return response.data
}
