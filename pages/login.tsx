import { useEffect } from 'react'
import type { NextPage } from 'next'
import { LayoutLogin } from '../components/layouts/LayoutLogin'
import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { delay, imprimir, InterpreteMensajes } from '../utils'
import { Constantes } from '../config'
import { Servicios } from '../services'
import { Alertas, CampoNombre } from '../components/ui'
import { useAuth } from '../context/auth'
import { useForm } from 'react-hook-form'
import ProgresoLineal from '../components/ui/ProgresoLineal'
import { useFullScreenLoadingContext } from '../context/ui'
import { useEffectOnce, useFirstMountState } from 'react-use'

const Login: NextPage = () => {
  const { ingresar, progresoLogin } = useAuth()

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const isFirstMount = useFirstMountState()

  type FormData = {
    usuario: string
    contrasena: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoadingContext()

  const obtenerEstado = async () => {
    try {
      mostrarFullScreen()
      await delay(1000)
      const respuesta = await Servicios.get({
        url: `${Constantes.baseUrl}/estado`,
        body: {},
        headers: {
          accept: 'application/json',
        },
      })
      imprimir(`Se obtuvo el estado 🙌: ${JSON.stringify(respuesta)}`)
    } catch (e) {
      imprimir(`Error al obtener estado: ${e}`)
      Alertas.error(`${InterpreteMensajes(e)}`)
    } finally {
      ocultarFullScreen()
    }
  }

  const iniciarSesion = async ({ usuario, contrasena }: FormData) => {
    await ingresar({ usuario, contrasena })
  }

  useEffectOnce(() => {
    if (isFirstMount) obtenerEstado().then(() => {})
  })

  return (
    <LayoutLogin title={'Frontend base - NextJS'}>
      <form
        onSubmit={handleSubmit(iniciarSesion)}
        name={'Formulario de inicio de sesión'}
        noValidate
      >
        <Grid container justifyContent="space-evenly" alignItems={'center'}>
          <Grid item xl={6} md={5} xs={12}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={sm || xs ? '30vh' : '80vh'}
              color={'primary'}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Typography
                  variant={'h4'}
                  component="h1"
                  color={'primary'}
                  align={sm || xs ? 'center' : 'left'}
                >
                  Frontend base con Next.js, MUI v5 y TypeScript
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              display: {
                sm: 'none',
                xs: 'none',
                md: 'block',
                xl: 'block',
              },
            }}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={'80vh'}
            >
              <Divider
                variant={'middle'}
                sx={{ marginTop: '60px', marginBottom: '60px' }}
                orientation="vertical"
                flexItem
              />
            </Box>
          </Grid>
          <Grid item xl={4} md={5} xs={12}>
            <Card sx={{ borderRadius: 4, p: 4 }}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                color={'primary'}
              >
                <Box
                  display={'grid'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={400}
                  maxWidth={450}
                >
                  <Typography
                    align={'center'}
                    color={'primary'}
                    sx={{ flexGrow: 1, fontWeight: 'bold' }}
                  >
                    Iniciar Sesión
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Este es un ejemplo de Login, las credenciales estan
                    predefinidas en los campos de texto
                  </Typography>
                  <CampoNombre name={'Usuario'}>
                    <TextField
                      id="usuario"
                      defaultValue="ADMINISTRADOR-TECNICO"
                      size={'medium'}
                      disabled={progresoLogin}
                      {...register('usuario', {
                        required: 'Este campo es requerido',
                      })}
                      sx={{ width: '100%' }}
                      error={!!errors.usuario}
                      helperText={errors.usuario?.message}
                    />
                  </CampoNombre>
                  <CampoNombre name={'Contraseña'}>
                    <TextField
                      id="contrasena"
                      type={'password'}
                      defaultValue="123"
                      size={'medium'}
                      disabled={progresoLogin}
                      {...register('contrasena', {
                        required: 'Este campo es requerido',
                        minLength: {
                          value: 3,
                          message: 'Mínimo 3 caracteres',
                        },
                      })}
                      sx={{ width: '100%' }}
                      error={!!errors.contrasena}
                      helperText={errors.contrasena?.message}
                    />
                  </CampoNombre>

                  <ProgresoLineal mostrar={progresoLogin} />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={progresoLogin}
                  >
                    Ingresar
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </form>
    </LayoutLogin>
  )
}

Login.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Login
