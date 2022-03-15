class UtilidadesClass {
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const Utilidades = new UtilidadesClass()
