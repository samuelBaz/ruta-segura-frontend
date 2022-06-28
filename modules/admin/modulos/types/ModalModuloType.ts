import { ModulosType } from './ModulosType'

export interface ModalModuloType {
  modulo?: ModulosType
  accionCorrecta: () => void
  accionCancelar: () => void
  lmodulos: ModulosType[]
}
