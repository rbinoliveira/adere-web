'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCookies } from '@/application/shared/constants/app-cookies.constant'
import { appRoutes } from '@/application/shared/constants/app-routes.constant'
import { serverRoutes } from '@/application/shared/constants/server-routes.constant'
import { envVars } from '@/infra/config/env'

export async function SignInWithGoogle() {
  const googleSignInURL = new URL(
    `${serverRoutes.session}/google`,
    envVars.NEXT_PUBLIC_BACKEND_URL,
  )

  redirect(googleSignInURL.toString())
}

export async function SignOut() {
  const cookieStore = await cookies()
  cookieStore.delete(appCookies.ACCESS_TOKEN)
  cookieStore.delete(appCookies.REFRESH_TOKEN)

  redirect(appRoutes.signIn)
}
