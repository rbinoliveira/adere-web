import { type NextRequest, NextResponse } from 'next/server'

import {
  appCookies,
  appPublicRoutes,
  appRoutes,
} from '@/application/shared/constants'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isStaticResource =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|css|js)$/)
  if (isStaticResource) {
    return NextResponse.next()
  }

  const atualPath = request.nextUrl.pathname
  const isRoutePublic = appPublicRoutes.includes(atualPath)

  const refreshToken = request.cookies.get(appCookies.REFRESH_TOKEN)?.value
  const accessToken = request.cookies.get(appCookies.ACCESS_TOKEN)?.value

  const userIsAuthenticated = accessToken && refreshToken

  if (isRoutePublic && userIsAuthenticated) {
    return NextResponse.redirect(new URL(appRoutes.dashboard, request.url))
  }

  if (!isRoutePublic && !userIsAuthenticated) {
    return NextResponse.redirect(new URL(appRoutes.signIn, request.url))
  }
}

export const config = {
  matcher: '/:path*',
}
