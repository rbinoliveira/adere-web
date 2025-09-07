import { serverRoutes } from '@/core/_shared/constants/server-routes.constant'
import { api } from '@/core/_shared/libs/axios'
import { SessionModel } from '@/core/auth/models/session.model'
import { LoginSchema } from '@/core/auth/schemas/login.schema'

export type CreateSessionUseCaseInput = LoginSchema
export type CreateSessionUseCaseOutput = SessionModel

export async function createSessionUseCase(
  data: CreateSessionUseCaseInput,
): Promise<CreateSessionUseCaseOutput> {
  const response = await api.post(`${serverRoutes.auth}/dentist`, data)
  return response.data
}
