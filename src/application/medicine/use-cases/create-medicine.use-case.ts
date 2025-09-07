import { serverRoutes } from '@/application/_shared/constants/server-routes.constant'
import { api } from '@/application/_shared/libs/axios'
import { SessionModel } from '@/application/auth/models/session.model'
import { LoginSchema } from '@/application/auth/schemas/login.schema'

export type CreateMedicineUseCaseInput = LoginSchema
export type CreateMedicineUseCaseOutput = SessionModel

export async function createMedicineUseCase(
  data: CreateMedicineUseCaseInput,
): Promise<CreateMedicineUseCaseOutput> {
  const response = await api.post(`${serverRoutes.medicine}`, data)
  return response.data
}
