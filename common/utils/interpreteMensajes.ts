const isHTML = RegExp.prototype.test.bind(/^(<([^>]+)>)$/i)

export const InterpreteMensajes = (mensaje: any): string => {
  try {
    const errorMessage = JSON.parse(JSON.stringify(mensaje))
    return (
      errorMessage.mensaje ??
      errorMessage.message ??
      errorMessage.error ??
      'Solicitud erronea 🚨'
    )
  } catch (e) {
    return isHTML(mensaje) ? 'Solicitud erronea 🚨' : `${mensaje}`
  }
}
