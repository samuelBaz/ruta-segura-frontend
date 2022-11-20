import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { imprimir } from './common/utils/imprimir'

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get('token')
  imprimir(`token middleware 🔐️: ${token}`)

  try {
    if (token && token.value != '') {
      return NextResponse.next()
    } else {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  } catch (e) {
    imprimir(`Error verificando token en midleware`)
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/admin/:path*'],
}
