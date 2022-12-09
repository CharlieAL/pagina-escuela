import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const jwt = request.cookies.get('TokenName')
  const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

  if (jwt === undefined)
    return NextResponse.redirect(new URL('/login', request.url))
  try {
    await jwtVerify(jwt.value, key)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/', '/compose/user', '/compose/task', '/status/profile']
}
