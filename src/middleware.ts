import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all routes except static files, API routes, and admin paths
  matcher: ['/', '/(en-US|bn-BD)/:path*', '/((?!api|_next|images|favicon.ico|admin|admin/.*).*)$'],
}
