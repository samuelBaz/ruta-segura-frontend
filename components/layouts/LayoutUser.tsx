import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import Head from 'next/head'
import React, { FC, useContext, useEffect } from 'react'

import { NavbarUser } from '../ui'
import Toolbar from '@mui/material/Toolbar'
import { UIContext } from '../../context/ui'
import { imprimir } from '../../utils'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/auth'

interface Props {
  title?: string
}

export const LayoutUser: FC<Props> = ({
  title = 'Frontend base - NextJS',
  children,
}) => {
  const { sidemenuOpen } = useContext(UIContext)
  const router = useRouter()
  const { estaAutenticado, progresoLogin } = useAuth()

  useEffect(() => {
    imprimir(
      `🎨 useEffect LayoutUser: ${router.pathname} - autenticado: ${estaAutenticado} - loading: ${progresoLogin}`
    )
    if (!progresoLogin)
      if (!estaAutenticado) {
        imprimir(`🥾 Cerrando sesión desde ${router.pathname}`)
        router
          .replace({
            pathname: '/login',
          })
          .finally(() => {})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progresoLogin])

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems={'center'}
    >
      <Box sx={{ display: 'flex' }}>
        <Head>
          <title>{title}</title>
        </Head>
        <NavbarUser />
      </Box>
      <Box
        component="main"
        sx={{
          width: sm || xs ? '100%' : sidemenuOpen ? '78%' : '100%',
          // backgroundColor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          ml: sm || xs ? '0%' : sidemenuOpen ? '240px' : '0%',
          transition: 'all 0.1s ease-out !important',
        }}
      >
        <Toolbar />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="initial"
          justifyItems={'center'}
          style={{ minHeight: '80vh' }}
        >
          <div
            style={{
              height: '75vh',
              width: xs || sm ? '90%' : '95%',
            }}
          >
            <Box height={'30px'} />
            {children}
          </div>
        </Grid>
      </Box>
    </Grid>
  )
}
