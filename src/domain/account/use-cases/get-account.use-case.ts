import { getCookie } from 'cookies-next'

import { appCookies, serverRoutes } from '@/application/shared/constants'
import { AccountModel } from '@/domain/account/models/account.model'
import { api } from '@/infra/libs/axios'

export type GetAccountUseCaseOutput = {
  account: AccountModel
} | null

export async function getAccountUseCase(): Promise<GetAccountUseCaseOutput> {
  const refreshToken = getCookie(appCookies.REFRESH_TOKEN)
  const accessToken = getCookie(appCookies.ACCESS_TOKEN)
  if (!refreshToken || !accessToken) {
    return null
  }
  const response = await api.get(`${serverRoutes.account}/me`)
  return response.data
}
