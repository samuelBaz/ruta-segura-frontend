import { NextRequest, NextResponse } from 'next/server'
import { imprimir } from '../../common/utils/imprimir'
import { verificarToken } from '../../common/utils/token'

export const middleware = async (req: NextRequest | any) => {
  const { token = '' } = req.cookies
  imprimir(`token middleware 🔐️: ${token}`)

  try {
    if (verificarToken(token)) {
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
