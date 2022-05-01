// Form Login

export interface LoginType {
  usuario: string
  contrasena: string
}

export interface idRolType {
  idRol: string
}

/// Usuario que iniciar sesión

export interface PropiedadesType {
  icono: string
  descripcion: string
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

export interface PoliticaType {
  sujeto: string
  objeto: string
  accion: string
}
