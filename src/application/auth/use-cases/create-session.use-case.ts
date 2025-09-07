import { serverRoutes } from '@/application/_shared/constants/server-routes.constant'
import { api } from '@/application/_shared/libs/axios'
import { SessionModel } from '@/application/auth/models/session.model'
import { LoginSchema } from '@/application/auth/schemas/login.schema'

export type CreateSessionUseCaseInput = LoginSchema
export type CreateSessionUseCaseOutput = SessionModel

export async function createSessionUseCase(
  data: CreateSessionUseCaseInput,
): Promise<CreateSessionUseCaseOutput> {
  const response = await api.post(`${serverRoutes.auth}/dentist`, data)
  return response.data
}
