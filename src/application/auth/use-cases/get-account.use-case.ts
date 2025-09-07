import { getCookie } from 'cookies-next'

import { appCookies } from '@/application/_shared/constants/app-cookies.constant'
import { serverRoutes } from '@/application/_shared/constants/server-routes.constant'
import { api } from '@/application/_shared/libs/axios'
import { AccountModel } from '@/application/auth/models/account.model'

export type GetAccountUseCaseOutput = {
  account: AccountModel
} | null

export async function getAccountUseCase(): Promise<GetAccountUseCaseOutput> {
  const refreshToken = getCookie(appCookies.REFRESH_TOKEN)
  const accessToken = getCookie(appCookies.ACCESS_TOKEN)
  if (!refreshToken || !accessToken) {
    return null
  }
  const response = await api.get(`${serverRoutes.dentist}/me`)
  return response.data
}
