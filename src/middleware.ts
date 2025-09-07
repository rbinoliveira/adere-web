import { type NextRequest, NextResponse } from 'next/server'

import { appCookies } from '@/application/_shared/constants/app-cookies.constant'
import {
  appPublicRoutes,
  appRoutes,
} from '@/application/_shared/constants/app-routes.constant'

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

  const userId = request.cookies.get(appCookies.USER_ID)?.value

  const userIsAuthenticated = !!userId

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
