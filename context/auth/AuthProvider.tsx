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
import { AxiosError } from 'axios'
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
  idRolType,
  LoginType,
  PoliticaType,
  RoleType,
  UsuarioType,
} from '../../modules/login/loginTypes'

interface ContextProps {
  estaAutenticado: boolean
  usuario: UsuarioType | null
  idRolUsuario: string | undefined
  rolUsuario: RoleType | undefined
  setRolUsuario: ({ idRol }: idRolType) => Promise<void>
  ingresar: ({ usuario, contrasena }: LoginType) => Promise<void>
  progresoLogin: boolean
  cerrarSesion: () => void
  actualizarSesion: () => void
  sesionPeticion: ({
    url,
    tipo,
    headers,
    body,
    params,
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
  const [idRol, setIdRol] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  // Hook para mostrar alertas
  const { Alerta } = useAlerts()

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoadingContext()

  const router = useRouter()

  const [enforcer, setEnforcer] = useState<Enforcer>()

  async function loadUserFromCookies() {
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

        if (router.pathname == '/login' || router.pathname == '/')
          // TODO: Verificar si el usuario tiene permiso de acceder a la ruta
          await router.replace({
            pathname: '/admin/home',
          })

        await delay(1000)
      } catch (error: Error | any) {
        imprimir(`Error durante Auth Provider 🚨: ${JSON.stringify(error)}`)
        eliminarCookie('token')
        await router.replace({
          pathname: '/login',
        })
        throw error
      } finally {
        setLoading(false)
      }
    } else {
      imprimir(`Token no definido 🥾: ${token}`)
      /*await router.replace({
        pathname: '/login',
      })*/
      await delay(1000)
    }
    setLoading(false)
    ocultarFullScreen()
  }

  useEffect(() => {
    loadUserFromCookies().finally(() => {
      imprimir('Verificación de login finalizada 👨‍💻')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        guardarCookie('token', respuesta.datos?.access_token, { expires: 60 })
        imprimir(`Token ✅: ${respuesta.datos?.access_token}`)

        setUser(respuesta.datos)
        imprimir(`Usuarios ✅: ${JSON.stringify(respuesta.datos)}`)

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
      imprimir(`Error al iniciar sesión: ${JSON.stringify(e)}`)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
      ocultarFullScreen()
    }
  }

  const actualizarSesion = async () => {
    imprimir(`Actualizando token 🚨`)

    const respuesta = await Servicios.post({
      url: `${Constantes.baseUrl}/token`,
    })

    guardarCookie('token', respuesta.datos?.access_token, { expires: 60 })

    await delay(500)
  }

  const sesionPeticion = async ({
    url,
    tipo = 'get',
    body,
    headers,
    params,
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

      imprimir(
        `enviando 🔐🌍 : ${
          body ? JSON.stringify(body) : '{}'
        } -> ${tipo} - ${url} - con ${JSON.stringify(cabeceras)}`
      )
      const response = await Servicios.peticionHTTP({
        url,
        tipo,
        headers: cabeceras,
        body,
        params,
      })
      imprimir(
        `respuesta 🔐📡 : ${
          body ? JSON.stringify(body) : '{}'
        } -> ${tipo} - ${url} - con ${JSON.stringify(
          headers
        )} -->> ${JSON.stringify(response)}`
      )
      return response.data
    } catch (e: AxiosError | any) {
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

  const logout = async () => {
    try {
      setLoading(true)
      mostrarFullScreen()
      // await delay(1000)
      await sesionPeticion({ url: `${Constantes.baseUrl}/logout` })
    } catch (e) {
      imprimir(`Error al cerrar sesión: ${JSON.stringify(e)}`)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      eliminarCookie('token')
      eliminarCookie('rol')
      eliminarCookie('jid')
      setUser(null)
      router.reload()
      await delay(1000)
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
        .catch((reason) => {
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
        progresoLogin: loading,
        cerrarSesion: logout,
        sesionPeticion: sesionPeticion,
        actualizarSesion: loadUserFromCookies,
        verificarPermiso: verificarAutorizacion,
        interpretarPermiso: async (routerName) => {
          if (obtenerRolUsuario()) {
            return {
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
