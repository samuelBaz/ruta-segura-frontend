import type { NextPage } from 'next'
import { Button, Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { usuario } = useAuth()

  return (
    <LayoutUser>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        justifyItems={'center'}
        style={{ minHeight: '90vh' }}
      >
        <Grid item xs={3} xl={4}>
          <Typography
            variant={'body1'}
            component="h1"
            noWrap={true}
            alignItems={'center'}
          >
            Hola {usuario?.persona?.nombres} 🏠
          </Typography>
        </Grid>
      </Grid>
    </LayoutUser>
  )
}
export default Home
