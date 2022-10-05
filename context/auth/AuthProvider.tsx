import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  delay,
  eliminarCookie,
  encodeBase64,
  guardarCookie,
  InterpreteMensajes,
  leerCookie,
} from '../../common/utils'
import {
  estadosSinPermiso,
  peticionFormatoMetodo,
  Servicios,
} from '../../common/services'
import { Constantes } from '../../config'
import { useRouter } from 'next/router'
import { CasbinTypes } from '../../common/types'
import { useFullScreenLoadingContext } from '../ui'

import {
  Enforcer,
  newEnforcer,
  newModelFromString,
  StringAdapter,
} from 'casbin'
import { basicModel, basicPolicy } from '../../common/utils/casbin'
import { useAlerts } from '../../common/hooks'
import { imprimir } from '../../common/utils/imprimir'
import { verificarToken } from '../../common/utils/token'
import {
  AutorizacionLoginType,
  idRolType,
  LoginType,
  PoliticaType,
  RoleType,
  UsuarioType,
} from '../../modules/login/types/loginTypes'

interface ContextProps {
  estaAutenticado: boolean
  usuario: UsuarioType | null
  idRolUsuario: string | undefined | null
  rolUsuario: RoleType | undefined
  setRolUsuario: ({ idRol }: idRolType) => Promise<void>
  ingresar: ({ usuario, contrasena }: LoginType) => Promise<void>
  autorizarCiudadania: ({
    code,
    state,
    session_state,
  }: AutorizacionLoginType) => Promise<void>
  progresoLogin: boolean
  cerrarSesion: () => void
  sesionPeticion: ({
    url,
    tipo,
    headers,
    body,
    params,
    responseType,
    withCredentials,
  }: peticionFormatoMetodo) => Promise<any>
  verificarPermiso: ({
    sujeto,
    objeto,
    accion,
  }: PoliticaType) => Promise<boolean>
  interpretarPermiso: (routerName: string) => Promise<CasbinTypes>
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

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoadingContext()

  const router = useRouter()

  const [enforcer, setEnforcer] = useState<Enforcer>()

  const loadUserFromCookies = async () => {
    const token = leerCookie('token')

    if (token) {
      try {
        mostrarFullScreen()

        const respuestaUsuario = await sesionPeticion({
          url: `${Constantes.baseUrl}/usuarios/cuenta/perfil`,
        })

        imprimir(
          `respuestaUsuario: ${respuestaUsuario.datos.ciudadania_digital}`
        )

        if (respuestaUsuario.datos) {
          setUser(respuestaUsuario.datos)

          if (
            respuestaUsuario.datos.roles &&
            respuestaUsuario.datos.roles.length > 0
          ) {
            imprimir(
              `rol definido en loadUserFromCookies 👨‍💻: ${respuestaUsuario.datos.roles[0].idRol}`
            )
            await AlmacenarRol({
              idRol: leerCookie('rol') ?? respuestaUsuario.datos.roles[0].idRol,
            })
          }
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
        borrarSesion()
        imprimir(`🚨 -> login`)
        await router.replace({
          pathname: '/login',
        })
        throw error
      } finally {
        setLoading(false)
      }
    } else {
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
      borrarSesion()
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

  const actualizarSesion = async () => {
    imprimir(`Actualizando token 🚨`)

    try {
      const respuesta = await Servicios.post({
        url: `${Constantes.baseUrl}/token`,
      })

      guardarCookie('token', respuesta.datos?.access_token)

      await delay(500)
    } catch (e) {
      await logout()
    }
  }

  const sesionPeticion = async ({
    url,
    tipo = 'get',
    body,
    headers,
    params,
    responseType,
    withCredentials,
  }: peticionFormatoMetodo) => {
    try {
      if (!verificarToken(leerCookie('token') ?? '')) {
        imprimir(`Token caducado ⏳`)
        await actualizarSesion()
      }

      const cabeceras = {
        accept: 'application/json',
        Authorization: `Bearer ${leerCookie('token') ?? ''}`,
        ...headers,
      }

      imprimir(`enviando 🔐🌍`, body, tipo, url, cabeceras)
      const response = await Servicios.peticionHTTP({
        url,
        tipo,
        headers: cabeceras,
        body,
        params,
        responseType,
        withCredentials,
      })
      imprimir('respuesta 🔐📡', body, tipo, url, response)
      return response.data
    } catch (e: import('axios').AxiosError | any) {
      if (e.code === 'ECONNABORTED') {
        throw new Error('La petición está tardando demasiado')
      } else if (Servicios.isNetworkError(e))
        throw new Error('Error en la conexión 🌎')
      else if (estadosSinPermiso.includes(e.response?.status)) {
        mostrarFullScreen()
        await logout()
        ocultarFullScreen()
      } else {
        throw e.response?.data || 'Ocurrio un error desconocido'
      }
    }
  }

  const borrarSesion = () => {
    eliminarCookie('token') // Eliminando access_token
    eliminarCookie('rol') // Eliminando rol
    eliminarCookie('jid') // Eliminando refresh token
    eliminarCookie('empresa') // Eliminando empresa
    setUser(null)
    setIdRol(null)
  }

  const logout = async () => {
    let respuesta: { url?: string } | undefined | null
    try {
      setLoading(true)
      mostrarFullScreen()
      // await delay(1000)

      respuesta = await Servicios.get({
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${leerCookie('token') ?? ''}`,
        },
        url: `${Constantes.baseUrl}/logout`,
      })
    } catch (e) {
      imprimir(`Error al cerrar sesión: `, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      imprimir(`finalizando con respuesta`, respuesta)
      borrarSesion()
      if (respuesta?.url) {
        window.location.href = respuesta?.url
      } else {
        router.reload()
        await delay(1000)
        setLoading(false)
        ocultarFullScreen()
      }
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
      await inicializarCasbin(respuestaPermisos.datos)
    }
  }

  const inicializarCasbin = async (politicas: string[][]) => {
    const model = newModelFromString(basicModel)
    const policy = new StringAdapter(basicPolicy)

    const enforcerTemp: Enforcer = await newEnforcer(model, policy)
    for (const p of politicas) {
      await enforcerTemp.addPolicy(p[0], p[1], p[2], p[3], p[4], p[5])
    }
    setEnforcer(enforcerTemp)
  }

  const verificarAutorizacion = async ({
    sujeto,
    objeto,
    accion,
  }: PoliticaType): Promise<boolean> => {
    if (enforcer) {
      return enforcer
        .enforce(sujeto, objeto, accion)
        .then((permitido) => {
          return permitido
        })
        .catch(() => {
          return false
        })
    } else {
      return false
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
        autorizarCiudadania: autorizarCiudadania,
        progresoLogin: loading,
        cerrarSesion: logout,
        sesionPeticion: sesionPeticion,
        verificarPermiso: verificarAutorizacion,
        interpretarPermiso: async (routerName) => {
          if (obtenerRolUsuario()) {
            return {
              read: await verificarAutorizacion({
                sujeto: obtenerRolUsuario()?.rol ?? '',
                objeto: routerName,
                accion: 'read',
              }),
              create: await verificarAutorizacion({
                sujeto: obtenerRolUsuario()?.rol ?? '',
                objeto: routerName,
                accion: 'create',
              }),
              update: await verificarAutorizacion({
                sujeto: obtenerRolUsuario()?.rol ?? '',
                objeto: routerName,
                accion: 'update',
              }),
              delete: await verificarAutorizacion({
                sujeto: obtenerRolUsuario()?.rol ?? '',
                objeto: routerName,
                accion: 'delete',
              }),
            }
          } else
            return {
              read: false,
              create: false,
              update: false,
              delete: false,
            }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
