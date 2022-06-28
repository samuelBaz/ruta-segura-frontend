import { ModuloPropiedadType } from './ModuloPropiedadType'

export interface ModulosType {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: ModuloPropiedadType
  estado: string
  fidModulo: any
}
