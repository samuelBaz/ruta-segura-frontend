// contexts/auth.js

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

interface ContextProps {
  isAuthenticated: boolean
  user: any
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

export const AuthProvider = ({ children }: AuthContextType) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
      setUser(null)
      window.location.pathname = '/login'
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
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
