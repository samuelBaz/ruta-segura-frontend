import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { delay, siteName } from '../common/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFullScreenLoadingContext } from '../context/ui'

const Inicio: NextPage = () => {
  const nombreSitio: string = siteName()

  const router = useRouter()
  const { mostrarFullScreen } = useFullScreenLoadingContext()

  const abrirLogin = async () => {
    await delay(500)
    mostrarFullScreen()
    await delay(500)
    await router.replace({
      pathname: '/login',
    })
  }

  useEffect(() => {
    if (!router.isReady) return
    abrirLogin().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Typography variant={'h4'} component="h1">
        {nombreSitio}
      </Typography>
    </Grid>
  )
}

export default Inicio
