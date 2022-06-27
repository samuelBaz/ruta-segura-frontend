import { IModulos } from "./imodulos"

export interface IModalModuloType {
    modulo?: IModulos
    accionCorrecta: () => void
    accionCancelar: () => void
    lmodulos: IModulos[]
} 