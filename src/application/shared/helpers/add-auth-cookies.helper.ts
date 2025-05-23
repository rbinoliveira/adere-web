import { setCookie } from 'cookies-next'

import { appCookies, appRoutes } from '@/application/shared/constants'
import { api } from '@/infra/libs/axios'

type AddAuthCookiesProps = {
  accessToken: string
  refreshToken: string
  redirectTo?: string
}

export function addAuthCookies({
  accessToken,
  refreshToken,
  redirectTo = appRoutes.dashboard,
}: AddAuthCookiesProps) {
  setCookie(appCookies.ACCESS_TOKEN, accessToken)
  setCookie(appCookies.REFRESH_TOKEN, refreshToken)
  api.defaults.headers.Authorization = `Bearer ${accessToken}`
  window.location.href = redirectTo
}
