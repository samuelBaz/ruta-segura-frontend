export const InterpreteMensajes = (mensaje: any): string => {
  try {
    if (mensaje instanceof Error) {
      return mensaje.message
    }
    return mensaje.message ?? mensaje.mensaje ?? mensaje.error
  } catch (e) {
    return `${mensaje}`
  }
}
