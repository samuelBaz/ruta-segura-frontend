export interface IBitacoraAcciones {
  titulo: string
  items: Array<IBitacoraItems>
}

export interface IBitacoraItems {
  color_icono: ColorIconoType
  descripcion: string
  accion?: string
  fecha: string
  icono?: string
}

export type ColorIconoType = 'success' | 'error' | 'info' | 'warning'
