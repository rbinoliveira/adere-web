import { type NextRequest, NextResponse } from 'next/server'

import {
  appPublicRoutes,
  appRoutes,
} from '@/shared/constants/app-routes.constant'
import { appCookies } from '@/shared/constants/app-cookies.constant'
import { userSchema } from '@/features/auth/schemas/user.schema'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isStaticResource =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|css|js)$/)

  if (isStaticResource) {
    return NextResponse.next()
  }

  const isPublicRoute = appPublicRoutes.includes(pathname)
  const isCompleteProfileRoute = pathname === appRoutes.completeProfile
  const userCookie = request.cookies.get(appCookies.USER)?.value

  let userIsAuthenticated = false
  let profileCompleted = false

  try {
    if (userCookie) {
      const user = JSON.parse(userCookie)
      userIsAuthenticated = !!user && !!user.id
      
      // Verifica se o perfil está completo usando o schema
      // O schema requer cro e phone para considerar o perfil completo
      if (userIsAuthenticated) {
        const parsed = userSchema.safeParse(user)
        profileCompleted = parsed.success
      }
    }
  } catch {
    // Invalid cookie, user is not authenticated
    userIsAuthenticated = false
    profileCompleted = false
  }

  // Se não estiver autenticado e tentando acessar rotas protegidas, redireciona para login
  if (!isPublicRoute && !isCompleteProfileRoute && !userIsAuthenticated) {
    return NextResponse.redirect(new URL(appRoutes.signIn, request.url))
  }

  // Se estiver autenticado mas o perfil não estiver completo
  if (userIsAuthenticated && !profileCompleted) {
    // Permite acesso apenas à rota de completar perfil
    if (pathname !== appRoutes.completeProfile) {
      return NextResponse.redirect(
        new URL(appRoutes.completeProfile, request.url),
      )
    }
    // Se já está na rota de completar perfil, permite o acesso
    return NextResponse.next()
  }

  // Se estiver autenticado e o perfil estiver completo
  if (userIsAuthenticated && profileCompleted) {
    // Se estiver tentando acessar rotas públicas ou completar perfil, redireciona para dashboard
    if (isPublicRoute || isCompleteProfileRoute) {
      return NextResponse.redirect(new URL(appRoutes.dashboard, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
