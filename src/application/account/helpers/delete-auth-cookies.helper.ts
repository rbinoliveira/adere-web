import { deleteCookie } from 'cookies-next'

import { appCookies } from '@/application/shared/constants/app-cookies.constant'
import { appRoutes } from '@/application/shared/constants/app-routes.constant'

export function deleteAuthCookies() {
  deleteCookie(appCookies.ACCESS_TOKEN)
  deleteCookie(appCookies.REFRESH_TOKEN)
  window.location.href = appRoutes.signIn
}
