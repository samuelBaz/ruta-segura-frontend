import { IPropModulo } from "./iprop-modulo"


export interface IModulos {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: IPropModulo
  estado: string
  fidModulo: any
}