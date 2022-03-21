/// Usuario que iniciar sesión

export interface PropiedadesType {
  icono: string
  color_dark: string
  color_light: string
}

export interface SubModuloType {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: PropiedadesType
  estado: string
}

export interface ModuloType {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: PropiedadesType
  estado: string
  subModulo: SubModuloType[]
}

export interface RoleType {
  idRol: string
  rol: string
  nombre: string
  modulos: ModuloType[]
}

export interface PersonaType {
  nombres: string
  primerApellido: string
  segundoApellido: string
  tipoDocumento: string
  nroDocumento: string
  fechaNacimiento: string
}

export interface UsuarioType {
  access_token: string
  id: string
  usuario: string
  estado: string
  roles: RoleType[]
  persona: PersonaType
}

// DataTable

export interface ColumnaType {
  campo: string
  nombre: string
  ordenar: boolean
}

// Lista de usuarios en CRUD de usuarios

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
  fechaNacimiento: string
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
