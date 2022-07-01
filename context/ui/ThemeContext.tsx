import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

import { darkTheme, lightTheme } from '../../themes'
import useLocalStorage from '../../common/hooks/useLocalStorage'
import { delay } from '../../common/utils'
import { imprimir } from '../../common/utils/imprimir'

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
    delay(100).then(() => {
      imprimir(`useEffect isDarkOS: ${isDarkOS}`)
      if (primeraVezState || isDarkOS) {
        setThemeMode(isDarkOS ? 'dark' : 'light')
      } else {
        setPrimeraVezState(true)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS])

  useEffect(() => {
    // imprimir(`useEffect primeraVezState: ${primeraVezState}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primeraVezState])

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export { useThemeContext, ThemeProvider }
