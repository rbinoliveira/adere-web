import { setCookie } from 'cookies-next'

import { UserModel } from '@/features/auth/models/user.model'
import { appCookies } from '@/shared/constants/app-cookies.constant'

type AddAuthCookiesProps = {
  user: UserModel
}

export async function addAuthCookies({
  user,
}: AddAuthCookiesProps): Promise<void> {
  // Stringify explicitamente para garantir que o cookie seja acessível no servidor
  await setCookie(appCookies.USER, JSON.stringify(user), {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}
