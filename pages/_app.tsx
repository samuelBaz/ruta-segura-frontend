import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../common/utils/createEmotionCache'
import DebugBanner from '../common/components/DebugBanner'
import '@fontsource/poppins'
import { FullScreenLoadingProvider, UIProvider } from '../context/ui'
import { imprimir } from '../common/utils'
import { ThemeProvider } from '../context/ui/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../context/auth'
import { Sidebar } from '../common/components/ui'
import { Constantes } from '../config'
import { SnackbarProvider } from 'notistack'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const entorno = Constantes.appEnv
  imprimir(`🚀 iniciando en modo ${entorno}`)

  return (
    <CacheProvider value={emotionCache}>
      <FullScreenLoadingProvider>
        <SnackbarProvider maxSnack={3}>
          <DebugBanner />
          <AuthProvider>
            <UIProvider>
              <ThemeProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Sidebar />
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
            <ToastContainer />
          </AuthProvider>
        </SnackbarProvider>
      </FullScreenLoadingProvider>
    </CacheProvider>
  )
}
