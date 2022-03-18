import type { NextPage } from 'next'
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { usuario, logout } = useAuth()
  const router = useRouter()

  const theme = useTheme()

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xl = useMediaQuery(theme.breakpoints.only('xl'))

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
            variant={'body1'}
            component="h1"
            noWrap={true}
            alignItems={'center'}
          >
            Hola {usuario?.persona?.nombres} ‍💻
          </Typography>
          <Typography>xs {`${xs}`}</Typography>
          <Typography>sm {`${sm}`}</Typography>
          <Typography>md {`${md}`}</Typography>
          <Typography>lg {`${lg}`}</Typography>
          <Typography>xl {`${xl}`}</Typography>
        </Grid>
      </Grid>
    </LayoutUser>
  )
}
export default Home
