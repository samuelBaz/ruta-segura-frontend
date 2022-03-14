import * as React from 'react'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../src/createEmotionCache'
import DebugBanner from '../components/DebugBanner'
import '@fontsource/poppins'
import { UIProvider } from '../context/ui'
import { imprimir } from '../utils'
import { ThemeProvider } from '../context/ui/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // importar estilos para mostrar alertas en toda la aplicación
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const entorno = process.env.NODE_ENV
  imprimir(`🚀 iniciando en modo ${entorno}`)

  return (
    <CacheProvider value={emotionCache}>
      <DebugBanner />
      <ToastContainer />
      <UIProvider>
        <ThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </CacheProvider>
  )
}
