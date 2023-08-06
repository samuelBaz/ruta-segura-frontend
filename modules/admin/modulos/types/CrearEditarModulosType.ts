import { optionType } from '../../../../common/components/ui/form/FormInputAutocomplete'

export interface Propiedades {
  icono?: string
  descripcion?: string
  orden: number
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
  propiedades: {
    icono?: optionType
    descripcion?: string
    orden: number
  }
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
