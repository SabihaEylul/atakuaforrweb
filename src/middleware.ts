import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware is currently disabled as authentication is handled client-side
  // on each protected page using localStorage.
  // If you want to re-enable server-side protection via middleware,
  // you would need a mechanism like JWT cookies.

  return NextResponse.next();
}

export const config = {
  // No longer matching any routes
  matcher: [], 
}; 