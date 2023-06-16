export interface IBitacoraItems {
  color_icono: ColorIconoType
  tiempo: string
  accion: string
}

export type ColorIconoType = 'success' | 'error' | 'info' | 'warning'

export interface IAccionesBitacoraItems {
  secciones: Array<string>
  acciones: Array<IBitacoraItems>
}