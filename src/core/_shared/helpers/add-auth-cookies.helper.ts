import { setCookie } from 'cookies-next'

import { appCookies } from '@/core/_shared/constants/app-cookies.constant'
import { appRoutes } from '@/core/_shared/constants/app-routes.constant'
import { api } from '@/core/_shared/libs/axios'

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
