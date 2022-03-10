import * as React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../src/createEmotionCache'
import DebugBanner from '../components/DebugBanner'
import { useMediaQuery } from '@mui/material'
import { lightTheme, darkTheme } from '../themes'
import '@fontsource/poppins'
import { UIProvider } from '../context/ui'
import { imprimir } from '../utils'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const entorno = process.env.NODE_ENV
  imprimir(`🚀 iniciando en modo ${entorno}`)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <CacheProvider value={emotionCache}>
      <DebugBanner />
      <UIProvider>
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </CacheProvider>
  )
}
