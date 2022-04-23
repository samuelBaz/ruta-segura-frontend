// CRUD de usuarios

export interface RolCRUDType {
  id: string
  rol: string
}

export interface UsuarioRolCRUDType {
  fechaCreacion: Date
  usuarioCreacion: string
  fechaActualizacion: Date
  usuarioActualizacion?: any
  id: string
  estado: string
  rol: RolCRUDType
}

export interface PersonaCRUDType {
  nombres: string
  primerApellido: string
  segundoApellido: string
  tipoDocumento: string
  nroDocumento: string
  fechaNacimiento: Date
}

export interface UsuarioCRUDType {
  id: string
  usuario: string
  ciudadaniaDigital: boolean
  correoElectronico: string
  estado: string
  usuarioRol: UsuarioRolCRUDType[]
  persona: PersonaCRUDType
}

// Crear usuario

export interface CrearPersonaType {
  nombres: string
  primerApellido: string
  segundoApellido: string
  nroDocumento: string
  fechaNacimiento: Date
}

export interface CrearEditarUsuarioType {
  id?: string
  usuario?: any
  persona: CrearPersonaType
  ciudadaniaDigital: boolean
  roles: string[]
  estado: string
  correoElectronico: string
}

/// Tipo rol transversal

export interface RolType {
  id: string
  rol: string
  nombre: string
}

/// Filtros

export interface FiltroUsuariosType {
  filtro: string
}
