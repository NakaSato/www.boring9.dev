import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.pathname;
  
  // Static assets caching (images, CSS, JS, fonts)
  if (
    url.includes('/images/') || 
    url.includes('/_next/static/') || 
    url.endsWith('.css') || 
    url.endsWith('.js') ||
    url.includes('/fonts/')
  ) {
    // Cache static assets for a longer time (1 week)
    response.headers.set(
      'Cache-Control',
      'public, max-age=604800, stale-while-revalidate=86400'
    );
  } 
  // Blog posts
  else if (url.startsWith('/blog/') && !url.endsWith('/blog/')) {
    // Cache blog posts for 1 day but allow revalidation
    response.headers.set(
      'Cache-Control',
      'public, max-age=86400, stale-while-revalidate=3600'
    );
  }
  // Main pages (home, about, etc)
  else {
    // Cache for a short time (5 minutes) to reduce server load
    response.headers.set(
      'Cache-Control',
      'public, max-age=300, stale-while-revalidate=60'
    );
  }
  
  return response;
}
