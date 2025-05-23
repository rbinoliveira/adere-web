import { LoginSchema } from '@/application/account/schemas/login.schema'
import { serverRoutes } from '@/application/shared/constants'
import { SessionModel } from '@/domain/account/models/session.model'
import { api } from '@/infra/libs/axios'

export type CreateSessionUseCaseInput = LoginSchema
export type CreateSessionUseCaseOutput = SessionModel

export async function createSessionUseCase(
  data: CreateSessionUseCaseInput,
): Promise<CreateSessionUseCaseOutput> {
  const response = await api.post(`${serverRoutes.session}`, data)
  return response.data
}
