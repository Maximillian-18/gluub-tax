import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Check if user has already selected a country preference
  const countryPreference = request.cookies.get('gluub-country-preference');
  
  // If user has already selected a country, respect their choice
  if (countryPreference) {
    return response;
  }
  
  // Get user's country from Vercel Edge geolocation
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  
  // Map country codes to calculator paths
  const countryMap: Record<string, string> = {
    'GB': '/calculator/uk',
    'UK': '/calculator/uk',
    'DE': '/calculator/germany',
    'DK': '/calculator/denmark',
    'US': '/calculator/usa',
  };
  
  const calculatorPath = countryMap[country];
  
  // If we have a mapped country and user is on home page
  if (calculatorPath && request.nextUrl.pathname === '/') {
    const response = NextResponse.redirect(new URL(calculatorPath, request.url));
    // Set a cookie to remember this was auto-redirected
    response.cookies.set('gluub-country-preference', country, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  }
  
  return response;
}

export const config = {
  matcher: '/',
};
