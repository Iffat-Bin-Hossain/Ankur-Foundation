import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for these paths
  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/_next',
    '/favicon.ico',
    '/icons',
    '/manifest.json',
    '/sw.js',
    '/workbox-',
    '/uploads'
  ]

  // Check if current path should be skipped
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Protected frontend routes
  const protectedRoutes = ['/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // For protected frontend routes, check authentication
  if (isProtectedRoute) {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    return NextResponse.next()
  }

  // Only apply auth check to API routes that need protection
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Get token from multiple sources
  const token = 
    request.cookies.get('auth-token')?.value ||
    request.headers.get('x-auth-token') ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    console.log('Middleware: No token found for', pathname)
    return NextResponse.json(
      { error: 'Unauthorized: No token provided' },
      { status: 401 }
    )
  }

  // Add token to request headers for API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-auth-token', token)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|uploads|manifest.json|sw.js).*)',
  ],
}
