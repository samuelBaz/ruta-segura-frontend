import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'
import { ReactNode } from 'react'

export interface MensajeType {
  id: string
  valor: ReactNode
}

interface UIContextType {
  sideMenuOpen: boolean
  closeSideMenu: () => void
  openSideMenu: () => void
  agregarMensaje: (id: string, valor: ReactNode) => void
  verificarMensaje: (id: string) => ReactNode
}

const UIContext = createContext<UIContextType>({} as UIContextType)
const useSidebar = () => useContext(UIContext)

const SideBarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(true)
  const [mensajes, setMensajes] = useState<MensajeType[]>([])

  const openSideMenu = () => {
    setSideMenuOpen(true)
  }

  const closeSideMenu = () => {
    setSideMenuOpen(false)
  }
  const agregarMensaje = (id: string, valor: ReactNode) => {
    const mensajeExistente = mensajes.find((mensaje) => mensaje.id === id)
    const mensajesActualizados = mensajeExistente
      ? mensajes.map((mensaje) =>
          mensaje.id === id ? { ...mensaje, valor } : mensaje
        )
      : [...mensajes, { id, valor }]
    setMensajes(mensajesActualizados)
  }

  const verificarMensaje = (id: string) =>
    mensajes.find((mensaje) => mensaje.id === id)?.valor

  return (
    <UIContext.Provider
      value={{
        sideMenuOpen,

        // Methods
        closeSideMenu,
        openSideMenu,
        agregarMensaje,
        verificarMensaje,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export { useSidebar, SideBarProvider }
