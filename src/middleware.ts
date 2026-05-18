// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ✅ Guard against this explicitly
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
  
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/daily-session', request.url))
    }
  
    return NextResponse.next()
  }
  
  export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
  }