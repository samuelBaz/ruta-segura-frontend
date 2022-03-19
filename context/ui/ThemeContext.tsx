import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

import { darkTheme, lightTheme } from '../../themes'
import useLocalStorage from '../../hooks/useLocalStorage'
import { delay, imprimir } from '../../utils'

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY)

  // imprimir(`isDarkOS inicial: ${isDarkOS}`)

  const [primeraVezState, setPrimeraVezState] = useState(isDarkOS)
  // Para recuperar de storage en la 2da vez

  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    'themeMode',
    isDarkOS ? 'dark' : 'light'
  )

  const toggleTheme = () => {
    switch (themeMode) {
      case 'light':
        setThemeMode('dark')
        break
      case 'dark':
        setThemeMode('light')
        break
      default:
    }
  }

  useEffect(() => {
    imprimir(`😨 useEffect isDarkOS ${isDarkOS}`)
    if (primeraVezState) {
      setThemeMode(isDarkOS ? 'dark' : 'light')
    } else {
      imprimir(`🚨 no se ejecuta setThemeMode`)
    }
  }, [isDarkOS])

  useLayoutEffect(() => {
    const item = window.localStorage.getItem('themeMode')
    imprimir(`😨 useLayoutEffect ${item}`)
    setThemeMode(item ?? isDarkOS ? 'dark' : 'light')
    delay(100).then(() => {
      setPrimeraVezState(true)
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export { useThemeContext, ThemeProvider }
