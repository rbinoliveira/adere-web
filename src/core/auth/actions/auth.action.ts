'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { envVars } from '@/core/_shared/config/env/env.mjs'
import { appCookies } from '@/core/_shared/constants/app-cookies.constant'
import { appRoutes } from '@/core/_shared/constants/app-routes.constant'
import { serverRoutes } from '@/core/_shared/constants/server-routes.constant'

export async function SignInWithGoogle() {
  const googleSignInURL = new URL(
    `${serverRoutes.auth}/google`,
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
