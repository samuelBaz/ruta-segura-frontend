import { Constantes } from '../../config'

function obtenerNombreFuncionAnterior(d: number) {
  const error = new Error()
  let r = ''
  if (error.stack != null) {
    const firefoxMatch = (error.stack.split('\n')[d].match(/^.*(?=@)/) || [])[0]
    const chromeMatch = (
      (((error.stack.split('at ') || [])[1 + d] || '').match(
        /(^|\.| <| )(.*[^(<])( \()/
      ) || [])[2] || ''
    )
      .split('.')
      .pop()
    const safariMatch = error.stack.split('\n')[d]

    // firefoxMatch ? console.log('firefoxMatch', firefoxMatch) : void 0;
    // chromeMatch ? console.log('chromeMatch', chromeMatch) : void 0;
    // safariMatch ? console.log('safariMatch', safariMatch) : void 0;
    r = firefoxMatch || chromeMatch || safariMatch
  }
  return r
}

export const imprimir = (mensaje: any) => {
  const funcionAnterior: string = obtenerNombreFuncionAnterior(2)
  const ocultarAnterior: boolean =
    funcionAnterior.includes('callee') || false || funcionAnterior === ''
  const entorno = Constantes.appEnv
  if (entorno != 'production') {
    // eslint-disable-next-line no-console
    console.log(
      `🖨 ${ocultarAnterior ? '' : `${funcionAnterior} -> `} ${mensaje}`
    )
  }
}
