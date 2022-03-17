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
