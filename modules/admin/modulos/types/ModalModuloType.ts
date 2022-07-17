import { ModuloCRUDType } from './CrearEditarModulosType'

export interface ModalModuloType {
  modulo?: ModuloCRUDType
  accionCorrecta: () => void
  accionCancelar: () => void
  modulos: ModuloCRUDType[]
}
