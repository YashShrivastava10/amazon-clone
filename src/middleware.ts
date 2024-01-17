import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log(request.cookies)
  const pathName: string = request.nextUrl.pathname
  let redirectStatus = false
  if(pathName === "/signup" || pathName === "/signin") redirectStatus = true 
  if(redirectStatus && request.cookies.get("authToken")?.value)
    return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signup',
    '/signin',
  ]
}