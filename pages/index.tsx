import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { siteName } from '../common/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Inicio: NextPage = () => {
  const nombreSitio: string = siteName()

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    router
      .replace({
        pathname: '/login',
      })
      .finally()
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
