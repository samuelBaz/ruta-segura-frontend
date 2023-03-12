import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  delay,
  encodeBase64,
  guardarCookie,
  InterpreteMensajes,
  leerCookie,
} from '../../common/utils'
import { Servicios } from '../../common/services'
import { Constantes } from '../../config'
import { useRouter } from 'next/router'
import { useFullScreenLoading } from '../ui'
import { useAlerts, useCasbinEnforcer, useSession } from '../../common/hooks'
import { imprimir } from '../../common/utils/imprimir'
import {
  idRolType,
  LoginType,
  RoleType,
  UsuarioType,
} from '../../modules/login/types/loginTypes'
import { Enforcer } from 'casbin'

import { CasbinTypes } from '../../common/types'

interface ContextProps {
  cargarUsuarioManual: () => Promise<void>
  estaAutenticado: boolean
  usuario: UsuarioType | null
  rolUsuario: RoleType | undefined
  setRolUsuario: ({ idRol }: idRolType) => Promise<void>
  ingresar: ({ usuario, contrasena }: LoginType) => Promise<void>
  progresoLogin: boolean
  permisoUsuario: (routerName: string) => Promise<CasbinTypes>
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

interface AuthContextType {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthContextType) => {
  const [user, setUser] = useState<UsuarioType | null>(null)
  const [idRol, setIdRol] = useState<string | null>()
  const [loading, setLoading] = useState<boolean>(true)

  // Hook para mostrar alertas
  const { Alerta } = useAlerts()

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoading()

  const router = useRouter()

  const { sesionPeticion, borrarCookiesSesion } = useSession()
  const { interpretarPermiso, inicializarCasbin } = useCasbinEnforcer()
  const [enforcer, setEnforcer] = useState<Enforcer>()

  const inicializarUsuario = async () => {
    const token = leerCookie('token')

    if (!token) {
      setLoading(false)
      return
    }

    try {
      mostrarFullScreen()
      await obtenerUsuarioRol()
      await obtenerPermisos()
      await delay(1000)
    } catch (error: Error | any) {
      imprimir(`Error durante inicializarUsuario 🚨`, typeof error, error)
      borrarSesionUsuario()
      await router.replace({
        pathname: '/login',
      })
      throw error
    } finally {
      setLoading(false)
      ocultarFullScreen()
    }
  }

  const borrarSesionUsuario = () => {
    setUser(null)
    setIdRol(null)
    borrarCookiesSesion()
  }

  const cargarUsuarioManual = async () => {
    try {
      await obtenerUsuarioRol()
      await obtenerPermisos()

      mostrarFullScreen()
      await delay(1000)

      await router.replace({
        pathname: '/admin/home',
      })
    } catch (error: Error | any) {
      imprimir(`Error durante cargarUsuarioManual 🚨`, error)
      borrarSesionUsuario()

      imprimir(`🚨 -> login`)
      await router.replace({
        pathname: '/login',
      })
      throw error
    } finally {
      ocultarFullScreen()
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    inicializarUsuario()
      .catch(imprimir)
      .finally(() => {
        imprimir('Verificación de login finalizada 👨‍💻')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const login = async ({ usuario, contrasena }: LoginType) => {
    try {
      setLoading(true)

      await delay(1000)
      const respuesta = await Servicios.post({
        url: `${Constantes.baseUrl}/auth`,
        body: { usuario, contrasena: encodeBase64(encodeURI(contrasena)) },
        headers: {},
      })

      guardarCookie('token', respuesta.datos?.access_token)
      imprimir(`Token ✅: ${respuesta.datos?.access_token}`)

      setUser(respuesta.datos)
      imprimir(`Usuarios ✅`, respuesta.datos)

      if (respuesta?.datos?.roles?.length > 0) {
        imprimir(`rol inicial 👨‍💻: ${respuesta.datos.roles[0].idRol}`)
        await AlmacenarRol({ idRol: respuesta.datos.roles[0].idRol })
      }

      await obtenerPermisos()

      mostrarFullScreen()
      await delay(1000)
      await router.replace({
        pathname: '/admin/home',
      })
    } catch (e) {
      imprimir(`Error al iniciar sesión: `, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
      borrarSesionUsuario()
    } finally {
      setLoading(false)
      ocultarFullScreen()
    }
  }

  const AlmacenarRol = async ({ idRol }: idRolType) => {
    imprimir(`Almacenando rol 👮‍♂️: ${idRol}`)
    setIdRol(idRol)
    guardarCookie('rol', idRol)
  }

  const CambiarRol = async ({ idRol }: idRolType) => {
    imprimir(`Cambiando rol 👮‍♂️: ${idRol}`)
    setIdRol(idRol)
    guardarCookie('rol', idRol)
    await inicializarUsuario()
    await router.replace({
      pathname: '/admin/home',
    })
  }

  const obtenerPermisos = async () => {
    const respuestaPermisos = await sesionPeticion({
      url: `${Constantes.baseUrl}/autorizacion/permisos`,
    })

    if (respuestaPermisos.datos) {
      setEnforcer(await inicializarCasbin(respuestaPermisos.datos))
    }
  }

  const obtenerUsuarioRol = async () => {
    const respuestaUsuario = await sesionPeticion({
      url: `${Constantes.baseUrl}/usuarios/cuenta/perfil`,
    })

    if (respuestaUsuario?.datos?.roles?.length == 0) {
      throw new Error('Error, no tienes los roles necesarios para acceder')
    }

    setUser(respuestaUsuario.datos)
    imprimir(
      `rol definido en obtenerUsuarioRol 👨‍💻: ${respuestaUsuario.datos.roles[0].idRol}`
    )
    await AlmacenarRol({
      idRol: leerCookie('rol') ?? respuestaUsuario.datos.roles[0].idRol,
    })
  }

  const rolUsuario = () => user?.roles.find((rol) => rol.idRol == idRol)

  return (
    <AuthContext.Provider
      value={{
        cargarUsuarioManual,
        estaAutenticado: !!user && !loading,
        usuario: user,
        rolUsuario: rolUsuario(),
        setRolUsuario: CambiarRol,
        ingresar: login,
        progresoLogin: loading,
        permisoUsuario: (routerName: string) =>
          interpretarPermiso(routerName, enforcer, rolUsuario()?.rol),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
