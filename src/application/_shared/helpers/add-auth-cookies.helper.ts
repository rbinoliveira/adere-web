import { setCookie } from 'cookies-next'

import { appCookies } from '@/application/_shared/constants/app-cookies.constant'

type AddAuthCookiesProps = {
  userId: string
}

export async function addAuthCookies({
  userId,
}: AddAuthCookiesProps): Promise<void> {
  await setCookie(appCookies.USER_ID, userId)
}
