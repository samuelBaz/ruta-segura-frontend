import { createContext } from 'react'

interface ContextProps {
  sideMenuOpen: boolean

  // Methods
  closeSideMenu: () => void
  openSideMenu: () => void
}

export const UIContext = createContext({} as ContextProps) // estado del contexto
