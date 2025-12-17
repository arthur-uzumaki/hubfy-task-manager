import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookiesStore = await cookies()
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/login'

  cookiesStore.delete('accessToken')

  return NextResponse.redirect(redirectUrl)
}
