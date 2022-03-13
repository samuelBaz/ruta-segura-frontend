import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

import { lightTheme, darkTheme } from '../../themes'
import useLocalStorage from '../../hooks/useLocalStorage'
import { imprimir } from '../../utils'

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

  const [primeraVezState, setPrimeraVezState] = useState(false)

  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    'themeMode',
    isDarkOS ? 'light' : 'dark'
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

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  useEffect(() => {
    delay(isDarkOS ? 100 : 0).then(() => {
      // Tarda en reconocer modo oscuro
      imprimir(`useEffect isDarkOS: ${isDarkOS}`)
      if (primeraVezState) {
        setThemeMode(isDarkOS ? 'dark' : 'light')
      } else {
        setPrimeraVezState(true)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS])

  useEffect(() => {
    imprimir(`useEffect primeraVezState: ${primeraVezState}`)
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
