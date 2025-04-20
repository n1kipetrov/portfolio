import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ru'] as const;
type Locale = typeof locales[number];
const defaultLocale = 'en';

// Define pages that should check for the /ru prefix
function getProtectedRoutes() {
  return [
    '/',
    '/about',
    '/awards',
    '/resume',
    '/contact',
    '/writing',
    '/volunteering',
    '/testimonials',
  ]
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If URL already has a locale, don't modify it
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Only redirect protected routes
  if (!getProtectedRoutes().some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next()
  }

  // Get language from cookie or accept-language header (for initial visit)
  let locale = defaultLocale
  const storedLocale = request.cookies.get('language')?.value
  
  if (storedLocale && locales.includes(storedLocale as Locale)) {
    locale = storedLocale
  } else {
    // Check for preferred language in the Accept-Language header
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage) {
      // Simple detection for ru language
      if (acceptLanguage.includes('ru')) {
        locale = 'ru'
      }
    }
  }

  // Store the detected locale in a response cookie for client access
  const response = NextResponse.next()
  if (locale !== defaultLocale) {
    // Set response cookie for the detected locale (useful for client-side)
    response.cookies.set('language', locale, { 
      path: '/', 
      maxAge: 31536000 // 1 year
    })
    // Redirect to locale-prefixed URL for non-default locale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  // Set the cookie for the default locale as well
  response.cookies.set('language', locale, { 
    path: '/', 
    maxAge: 31536000 // 1 year
  })
  
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio).*)'],
} 