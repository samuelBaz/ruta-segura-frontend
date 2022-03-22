export const InterpreteMensajes = (mensaje: any): string => {
  try {
    let nuevoMensaje: string = ''

    if (mensaje instanceof Error) {
      nuevoMensaje = mensaje.message
    } else if (typeof mensaje === 'string') {
      nuevoMensaje = mensaje
    } else {
      nuevoMensaje =
        mensaje.message ||
        mensaje.mensaje ||
        mensaje.error ||
        'Solicitud erronea'
    }
    return nuevoMensaje
  } catch (e) {
    return `${mensaje}`
  }
}
