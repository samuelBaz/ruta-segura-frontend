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
  imprimir,
  InterpreteMensajes,
  leerCookie,
} from '../../utils'
import {
  estadosSinPermiso,
  peticionFormatoMetodo,
  Servicios,
} from '../../services'
import { Constantes } from '../../config'
import { Alertas } from '../../components/ui'
import { useRouter } from 'next/router'
import { RoleType, UsuarioType } from '../../types'
import { useFullScreenLoadingContext } from '../ui'
import { AxiosError } from 'axios'
import { decodeToken } from 'react-jwt'

interface ContextProps {
  estaAutenticado: boolean
  usuario: UsuarioType | null
  idRolUsuario: string | undefined
  rolUsuario: RoleType | undefined
  setRolUsuario: ({ idRol }: idRolType) => void
  ingresar: ({ usuario, contrasena }: LoginType) => Promise<void>
  progresoLogin: boolean
  cerrarSesion: () => void
  sesionPeticion: ({
    url,
    tipo,
    headers,
    body,
  }: peticionFormatoMetodo) => Promise<any>
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

interface AuthContextType {
  children: ReactNode
}

interface LoginType {
  usuario: string
  contrasena: string
}

interface idRolType {
  idRol: string
}

export const AuthProvider = ({ children }: AuthContextType) => {
  const [user, setUser] = useState<UsuarioType | null>(null)
  const [idRol, setIdRol] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoadingContext()

  const router = useRouter()

  async function loadUserFromCookies() {
    const token = leerCookie('token')

    if (token) {
      const myDecodedToken: any = decodeToken(token)

      if (myDecodedToken) {
        imprimir(`Token 🔐 : expira en ${new Date(myDecodedToken.exp * 1000)}`)
      }

      try {
        mostrarFullScreen()
        await delay(1000)
        const respuesta = await Servicios.get({
          url: `${Constantes.baseUrl}usuarios/cuenta/perfil`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (respuesta.datos) {
          setUser(respuesta.datos)

          if (respuesta.datos.roles && respuesta.datos.roles.length > 0) {
            imprimir(
              `rol encontrado en loadUserFromCookies 👨‍💻: ${respuesta.datos.roles[0].idRol}`
            )
            AlmacenarRol({
              idRol: leerCookie('rol') ?? respuesta.datos.roles[0].idRol,
            })
          }
        }
        await delay(1000)
        await router.replace({
          pathname: '/home',
        })
      } catch (error) {
        eliminarCookie('token')
        await router.replace({
          pathname: '/login',
        })
      } finally {
        setLoading(false)
      }
    } else {
      await router.replace({
        pathname: '/login',
      })
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
          imprimir(
            `rol encontrado en login 👨‍💻: ${respuesta.datos.roles[0].idRol}`
          )
          AlmacenarRol({ idRol: respuesta.datos.roles[0].idRol })
        }

        mostrarFullScreen()
        await delay(1000)
        await router.replace({
          pathname: '/home',
        })
      }
    } catch (e) {
      imprimir(`Error al iniciar sesión: ${JSON.stringify(e)}`)
      Alertas.error(`${InterpreteMensajes(e)}`)
    } finally {
      setLoading(false)
      ocultarFullScreen()
    }
  }

  const sesionPeticion = async ({
    url,
    tipo = 'get',
    headers = {
      accept: 'application/json',
      Authorization: `Bearer ${leerCookie('token') ?? ''}`,
    },
    body,
  }: peticionFormatoMetodo) => {
    try {
      imprimir(
        `enviando 🔐🌍 : ${
          body ? JSON.stringify(body) : '{}'
        } -> ${tipo} - ${url} - con ${JSON.stringify(headers)}`
      )
      const response = await Servicios.peticionHTTP({
        url,
        tipo,
        headers,
        body,
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
      if (Servicios.isNetworkError(e))
        throw new Error('Error en la conexión 🌎')
      else if (estadosSinPermiso.includes(e.response?.status)) {
        await logout()
      }
      throw e.response?.data || 'Ocurrio un error desconocido'
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      mostrarFullScreen()
      await delay(1000)
      /*await Servicios.get({
        url: `${Constantes.baseUrl}/logout`,
        headers: {},
      })*/
    } catch (e) {
      imprimir(`Error al cerrar sesión: ${JSON.stringify(e)}`)
      Alertas.error(`${InterpreteMensajes(e)}`)
    } finally {
      eliminarCookie('token')
      eliminarCookie('rol')
      setUser(null)
      setLoading(false)
      await router.replace({
        pathname: '/login',
      })
      ocultarFullScreen()
    }
  }

  const AlmacenarRol = ({ idRol }: idRolType) => {
    imprimir(`Almacenando rol 👮‍♂️: ${idRol}`)
    setIdRol(idRol)
    guardarCookie('rol', idRol)
  }

  return (
    <AuthContext.Provider
      value={{
        estaAutenticado: !!user,
        usuario: user,
        idRolUsuario: idRol,
        rolUsuario: user?.roles.find((rol) => rol.idRol == idRol),
        setRolUsuario: AlmacenarRol,
        ingresar: login,
        progresoLogin: loading,
        cerrarSesion: logout,
        sesionPeticion: sesionPeticion,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
