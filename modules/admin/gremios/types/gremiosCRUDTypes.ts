/// CRUD de parametros

export interface GremioCRUDType {
  id: string
  nombre: string
  fechaFundacion: string
  descripcion: string
  estado: string
}

export interface CrearEditarGremioCRUDType {
  id?: string
  nombre: string
  fechaFundacion: string
  descripcion: string
}
