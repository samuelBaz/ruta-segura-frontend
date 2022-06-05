import { NextRequest, NextResponse } from 'next/server'
import { imprimir } from '../../common/utils/imprimir'

export const middleware = async (req: NextRequest | any) => {
  const { token = '' } = req.cookies
  imprimir(`token middleware 🔐️: ${token}`)

  try {
    if (token != '' || null || undefined) {
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
