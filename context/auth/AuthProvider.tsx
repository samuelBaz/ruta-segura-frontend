import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { encodeBase64, imprimir, InterpreteMensajes } from '../../utils'
import { Servicios } from '../../services'
import { Constantes } from '../../config'
import { Alertas } from '../../components/ui'
import { useRouter } from 'next/router'
import { UsuarioType } from '../../types'

interface ContextProps {
  isAuthenticated: boolean
  user: any
  rolUsuario: any
  setRolUsuario: ({ idRol }: RolType) => void
  login: ({ usuario, contrasena }: LoginType) => Promise<void>
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

interface AuthContextType {
  children: ReactNode
}

interface LoginType {
  usuario: string
  contrasena: string
}

interface RolType {
  idRol: string
}

export const AuthProvider = ({ children }: AuthContextType) => {
  const [user, setUser] = useState<UsuarioType | null>(null)
  const [rol, setRol] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()

  async function loadUserFromCookies() {
    const token = Cookies.get('token')

    if (token) {
      imprimir('Tenemos token, Obtendremos perfil')

      try {
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
      await Servicios.get({
        url: `${Constantes.baseUrl}/logout`,
        headers: {},
      })
    } catch (e) {
      imprimir(`Error al cerrar sesión: ${JSON.stringify(e)}`)
      Alertas.error(`${InterpreteMensajes(e)}`)
    } finally {
      Cookies.remove('token')
      Cookies.remove('rol')
      setUser(null)
      window.location.pathname = '/login'
    }
  }

  const AlmacenarRol = ({ idRol }: RolType) => {
    imprimir(`Almacenando rol 👮‍♂️: ${idRol}`)
    setRol(idRol)
    Cookies.set('rol', idRol)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        rolUsuario: rol,
        setRolUsuario: AlmacenarRol,
        login,
        isLoading: loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
