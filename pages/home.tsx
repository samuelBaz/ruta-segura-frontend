import type { NextPage } from 'next'
import { Button, Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'

const Home: NextPage = () => {
  const { user, logout } = useAuth()

  const cerrarSesion = async () => {
    await logout()
  }

  return (
    <LayoutUser>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        justifyItems={'center'}
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={3} xl={4}>
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
            Hola {user?.persona?.nombres}
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
    </LayoutUser>
  )
}
export default Home
