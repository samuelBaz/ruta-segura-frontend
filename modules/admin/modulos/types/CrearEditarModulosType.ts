export interface Propiedades {
  icono: string
  color_dark: string
  color_light: string
  descripcion: string
}

export interface FidModulo {
  id: string
}

export interface ModuloCRUDType {
  id: string
  label: string
  url: string
  nombre: string
  esPadre: boolean
  propiedades: Propiedades
  estado: string
  fidModulo?: FidModulo | undefined
}

export interface CrearEditarModulosType {
  id: string
  label: string
  url: string
  nombre: string
  esPadre: boolean
  propiedades: Propiedades
  estado: string
  fidModulo?: string
}

export interface GuardarModulosType {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: Propiedades
  estado: string
  fidModulo?: string
}
