import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { delay, encodeBase64, imprimir, InterpreteMensajes } from '../../utils'
import { Servicios } from '../../services'
import { Constantes } from '../../config'
import { Alertas } from '../../components/ui'
import { useRouter } from 'next/router'
import { RoleType, UsuarioType } from '../../types'

interface ContextProps {
  estaAutenticado: boolean
  usuario: UsuarioType | null
  idRolUsuario: string | undefined
  rolUsuario: RoleType | undefined
  setRolUsuario: ({ idRol }: idRolType) => void
  ingresar: ({ usuario, contrasena }: LoginType) => Promise<void>
  progresoLogin: boolean
  cerrarSesion: () => void
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

  const router = useRouter()

  async function loadUserFromCookies() {
    const token = Cookies.get('token')

    if (token) {
      imprimir('Tenemos token, Obtendremos perfil')

      try {
        await delay(1000)
        const respuesta = await Servicios.get({
          url: `${Constantes.baseUrl}usuarios/cuenta/perfil`,
          body: {},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (respuesta.datos) {
          setUser(respuesta.datos)

          if (respuesta.datos.roles && respuesta.datos.roles.length > 0) {
            imprimir(
              `rol encontrado en loadUserFromCookies 🚨: ${respuesta.datos.roles[0].idRol}`
            )
            AlmacenarRol({
              idRol: Cookies.get('rol') ?? respuesta.datos.roles[0].idRol,
            })
          }
        }
        await delay(1000)
        await router.push({
          pathname: '/home',
        })
      } catch (error) {
        Cookies.remove('token')
        await router.push({
          pathname: '/login',
        })
      } finally {
        setLoading(false)
      }
    } else {
      await delay(1000)
      await router.push({
        pathname: '/login',
      })
    }
    setLoading(false)
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
        Cookies.set('token', respuesta.datos?.access_token, { expires: 60 })
        imprimir(`Token ✅: ${respuesta.datos?.access_token}`)

        setUser(respuesta.datos)
        imprimir(`Usuarios ✅: ${JSON.stringify(respuesta.datos)}`)

        if (respuesta.datos.roles && respuesta.datos.roles.length > 0) {
          imprimir(
            `rol encontrado en login 🚨: ${respuesta.datos.roles[0].idRol}`
          )
          AlmacenarRol({ idRol: respuesta.datos.roles[0].idRol })
        }

        await router.push({
          pathname: '/home',
        })
      }
    } catch (e) {
      imprimir(`Error al iniciar sesión: ${JSON.stringify(e)}`)
      Alertas.error(`${InterpreteMensajes(e)}`)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await delay(1000)
      /*await Servicios.get({
        url: `${Constantes.baseUrl}/logout`,
        headers: {},
      })*/
    } catch (e) {
      imprimir(`Error al cerrar sesión: ${JSON.stringify(e)}`)
      Alertas.error(`${InterpreteMensajes(e)}`)
    } finally {
      Cookies.remove('token')
      Cookies.remove('rol')
      setUser(null)
      setLoading(false)
      await router.push({
        pathname: '/login',
      })
    }
  }

  const AlmacenarRol = ({ idRol }: idRolType) => {
    imprimir(`Almacenando rol 👮‍♂️: ${idRol}`)
    setIdRol(idRol)
    Cookies.set('rol', idRol)
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
