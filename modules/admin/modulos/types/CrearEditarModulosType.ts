export interface Propiedades {
  icono: string
  color_dark: string
  color_light: string
  descripcion: string
}

export interface Modulo {
  id: string
}

export interface ModuloCRUDType {
  id: string
  label: string
  url: string
  nombre: string
  esSeccion: boolean
  propiedades: Propiedades
  estado: string
  modulo?: Modulo | undefined
}

export interface CrearEditarModulosType {
  id: string
  label: string
  url: string
  nombre: string
  esSeccion: boolean
  propiedades: Propiedades
  estado: string
  idModulo?: string
}

export interface GuardarModulosType {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: Propiedades
  estado: string
  idModulo?: string
}
