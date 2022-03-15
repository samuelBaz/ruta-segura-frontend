import * as React from 'react'
import type { NextPage } from 'next'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'

const Home: NextPage = () => {
  const { user, login, isLoading, logout, isAuthenticated } = useAuth()

  async function cerrarSesion() {
    await logout()
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems={'center'}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Typography
          variant={'h4'}
          component="h1"
          color={'primary'}
          alignItems={'center'}
        >
          Vista Home 🏠
        </Typography>
        <Typography
          variant={'body1'}
          component="h1"
          noWrap={true}
          alignItems={'center'}
        >
          User: {`${JSON.stringify(user?.persona)}`}
        </Typography>
        <Typography variant={'body1'} component="h1" alignItems={'center'}>
          Esta autenticando: {`${isAuthenticated}`}
        </Typography>
        <Button
          variant="outlined"
          onClick={async () => {
            await cerrarSesion()
          }}
        >
          Cerrar sesión
        </Button>
      </Grid>
    </Grid>
  )
}
export default Home
