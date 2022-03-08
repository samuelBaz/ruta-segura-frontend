import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../src/createEmotionCache'
import DebugBanner from '../components/DebugBanner'
import { useMediaQuery } from '@mui/material'
import themes from '../src/theme'
import '@fontsource/poppins'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const entorno = process.env.NODE_ENV
  console.log(`🚀 iniciando en modo ${entorno}`)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Proyecto base</title>
      </Head>
      <DebugBanner />
      <ThemeProvider
        theme={prefersDarkMode ? themes.darkTheme : themes.lightTheme}
      >
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
