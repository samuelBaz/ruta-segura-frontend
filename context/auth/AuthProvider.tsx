import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  delay,
  eliminarCookies,
  encodeBase64,
  guardarCookie,
  InterpreteMensajes,
  leerCookie,
} from '../../common/utils'
import { Servicios } from '../../common/services'
import { Constantes } from '../../config'
import { useRouter } from 'next/router'
import { useFullScreenLoading } from '../ui'
import { useAlerts, useSession } from '../../common/hooks'
import { imprimir } from '../../common/utils/imprimir'
import {
  AutorizacionLoginType,
  idRolType,
  LoginType,
  RoleType,
  UsuarioType,
} from '../../modules/login/types/loginTypes'
import { Enforcer } from 'casbin'

import { CasbinTypes } from '../../common/types'
import { useCasbinEnforcer } from '../../common/hooks'

interface ContextProps {
  estaAutenticado: boolean
  usuario: UsuarioType | null
  idRolUsuario: string | undefined | null
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

  const { sesionPeticion } = useSession()
  const { interpretarPermiso, inicializarCasbin } = useCasbinEnforcer()
  const [enforcer, setEnforcer] = useState<Enforcer>()

  const loadUserFromCookies = async () => {
    const token = leerCookie('token')

    if (!token) {
      imprimir(`Token no definido 🥾: ${token}`)
      await delay(500)
      mostrarFullScreen()
      await delay(500)

      const { code, state, session_state } = router.query
      if (code && state && session_state) {
        await autorizarCiudadania({
          code: code as string,
          state: state as string,
          session_state: session_state as string,
        })
      }

      if (router.pathname == '/') {
        imprimir(`🏡 -> login`)
        await router.replace({
          pathname: '/login',
        })
      }
      setLoading(false)
      ocultarFullScreen()
      return
    }

    try {
      mostrarFullScreen()

      const respuestaUsuario = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios/cuenta/perfil`,
      })

      imprimir(`es ciudadano?: ${respuestaUsuario.datos.ciudadania_digital}`)

      if (
        respuestaUsuario.datos &&
        respuestaUsuario.datos.roles &&
        respuestaUsuario.datos.roles.length > 0
      ) {
        setUser(respuestaUsuario.datos)
        imprimir(
          `rol definido en loadUserFromCookies 👨‍💻: ${respuestaUsuario.datos.roles[0].idRol}`
        )
        await AlmacenarRol({
          idRol: leerCookie('rol') ?? respuestaUsuario.datos.roles[0].idRol,
        })
      }
      await obtenerPermisos()

      if (router.pathname == '/login' || router.pathname == '/') {
        mostrarFullScreen()
        await delay(1000)
        await router.replace({
          pathname: '/admin/home',
        })
      }
    } catch (error: Error | any) {
      imprimir(`Error durante Auth Provider 🚨`, error)
      eliminarCookies()

      setUser(null)
      setIdRol(null)

      imprimir(`🚨 -> login`)
      await router.replace({
        pathname: '/login',
      })
      throw error
    } finally {
      setLoading(false)
    }

    setLoading(false)
    ocultarFullScreen()
  }

  useEffect(() => {
    if (!router.isReady) return

    loadUserFromCookies().finally(() => {
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

      if (respuesta.datos?.access_token) {
        guardarCookie('token', respuesta.datos?.access_token)
        imprimir(`Token ✅: ${respuesta.datos?.access_token}`)

        setUser(respuesta.datos)
        imprimir(`Usuarios ✅`, respuesta.datos)

        if (respuesta.datos.roles && respuesta.datos.roles.length > 0) {
          imprimir(`rol inicial 👨‍💻: ${respuesta.datos.roles[0].idRol}`)
          await AlmacenarRol({ idRol: respuesta.datos.roles[0].idRol })
        }

        await obtenerPermisos()

        mostrarFullScreen()
        await delay(1000)
        await router.replace({
          pathname: '/admin/home',
        })
      }
    } catch (e) {
      imprimir(`Error al iniciar sesión: `, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
      eliminarCookies()

      setUser(null)
      setIdRol(null)
    } finally {
      setLoading(false)
      ocultarFullScreen()
    }
  }

  const autorizarCiudadania = async ({
    code,
    state,
    session_state,
  }: AutorizacionLoginType) => {
    try {
      setLoading(true)
      await delay(500)
      const respuesta = await Servicios.get({
        url: `${Constantes.baseUrl}/ciudadania-autorizar`,
        body: {},
        params: {
          code: code,
          state: state,
          session_state: session_state,
        },
        headers: {
          accept: 'application/json',
        },
      })

      imprimir(`Sesión Autorizada`, respuesta)
      guardarCookie('token', respuesta.access_token)
      await loadUserFromCookies()
    } catch (e) {
      imprimir(`Error al autorizar sesión`, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
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
    await loadUserFromCookies()
  }

  const obtenerPermisos = async () => {
    const respuestaPermisos = await sesionPeticion({
      url: `${Constantes.baseUrl}/autorizacion/permisos`,
    })

    if (respuestaPermisos.datos) {
      setEnforcer(await inicializarCasbin(respuestaPermisos.datos))
    }
  }

  const obtenerRolUsuario = () => user?.roles.find((rol) => rol.idRol == idRol)

  return (
    <AuthContext.Provider
      value={{
        estaAutenticado: !!user && !loading,
        usuario: user,
        idRolUsuario: idRol,
        rolUsuario: obtenerRolUsuario(),
        setRolUsuario: CambiarRol,
        ingresar: login,
        progresoLogin: loading,
        permisoUsuario: (routerName) =>
          interpretarPermiso(routerName, enforcer, obtenerRolUsuario()?.rol),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
