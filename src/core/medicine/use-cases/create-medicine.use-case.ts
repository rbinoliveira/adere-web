import { serverRoutes } from '@/core/_shared/constants/server-routes.constant'
import { api } from '@/core/_shared/libs/axios'
import { SessionModel } from '@/core/auth/models/session.model'
import { LoginSchema } from '@/core/auth/schemas/login.schema'

export type CreateMedicineUseCaseInput = LoginSchema
export type CreateMedicineUseCaseOutput = SessionModel

export async function createMedicineUseCase(
  data: CreateMedicineUseCaseInput,
): Promise<CreateMedicineUseCaseOutput> {
  const response = await api.post(`${serverRoutes.medicine}`, data)
  return response.data
}
