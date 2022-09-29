/// CRUD de parametros

export interface ParametroCRUDType {
  id: string
  codigo: string
  nombre: string
  grupo: string
  descripcion: string
}

export interface CrearEditarParametroCRUDType {
  id?: string
  codigo: string
  nombre: string
  grupo: string
  descripcion: string
}
