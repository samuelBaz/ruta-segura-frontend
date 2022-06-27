import type { NextPage } from 'next'
import { LayoutLogin } from '../common/components/layouts'
import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Card,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { delay, InterpreteMensajes, siteName } from '../common/utils'
import { Constantes } from '../config'
import { Servicios } from '../common/services'
import { useAuth } from '../context/auth'
import { useForm } from 'react-hook-form'
import ProgresoLineal from '../common/components/ui/ProgresoLineal'
import { useFullScreenLoadingContext } from '../context/ui'
import { FormInputText } from '../common/components/ui/form'
import { useEffect } from 'react'
import { useAlerts } from '../common/hooks'
import { imprimir } from '../common/utils/imprimir'
import { LoginType } from '../modules/login/loginTypes'
import { useRouter } from 'next/router'
import { BotonCiudadania } from '../modules/login/BotonCiudadania'

const Login: NextPage = () => {
  const { ingresar, progresoLogin, autorizarCiudadania } = useAuth()

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const router = useRouter()

  const { Alerta } = useAlerts()

  const { handleSubmit, control } = useForm<LoginType>({
    defaultValues: {
      usuario: 'ADMINISTRADOR-TECNICO',
      contrasena: '123',
    },
  })

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
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      ocultarFullScreen()
    }
  }

  const iniciarSesion = async ({ usuario, contrasena }: LoginType) => {
    await ingresar({ usuario, contrasena })
  }

  useEffect(() => {
    obtenerEstado().then(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!router.isReady) return

    const { code, state, session_state } = router.query
    if (code && state && session_state) {
      autorizarCiudadania({
        code: code as string,
        state: state as string,
        session_state: session_state as string,
      }).finally()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  return (
    <LayoutLogin title={siteName()}>
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
          <Box display="flex" justifyContent="center" alignItems="center">
            <Card sx={{ borderRadius: 4, p: 4, maxWidth: '450px' }}>
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
                  sx={{ borderRadius: 12 }}
                >
                  <Typography
                    align={'center'}
                    color={'primary'}
                    sx={{ flexGrow: 1, fontWeight: 'bold' }}
                  >
                    Iniciar Sesión
                  </Typography>
                  {/*<Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Ingresa con las credenciales proporcionadas
                  </Typography>*/}
                  <Box sx={{ mt: 1, mb: 1 }}></Box>
                  <FormInputText
                    id={'usuario'}
                    control={control}
                    name="usuario"
                    label="Usuario"
                    size={'medium'}
                    labelVariant={'subtitle1'}
                    disabled={progresoLogin}
                    rules={{ required: 'Este campo es requerido' }}
                  />
                  <FormInputText
                    id={'contrasena'}
                    control={control}
                    name="contrasena"
                    label="Contraseña"
                    size={'medium'}
                    labelVariant={'subtitle1'}
                    type={'password'}
                    disabled={progresoLogin}
                    rules={{
                      required: 'Este campo es requerido',
                      minLength: {
                        value: 3,
                        message: 'Mínimo 3 caracteres',
                      },
                    }}
                  />

                  <Box sx={{ mt: 1, mb: 1 }}>
                    <ProgresoLineal mostrar={progresoLogin} />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={progresoLogin}
                    onClick={handleSubmit(iniciarSesion)}
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Ingresar
                    </Typography>
                  </Button>
                  <Box sx={{ pt: 1, pb: 1 }}>
                    <Divider>
                      <Typography color="text.secondary">O</Typography>
                    </Divider>
                  </Box>
                  <BotonCiudadania
                    disabled={progresoLogin}
                    altText={'Ingresar con Ciudadanía'}
                    accion={() => {
                      window.location.href = `${Constantes.baseUrl}/ciudadania-auth`
                    }}
                  >
                    <Typography sx={{ fontWeight: 'bold', pl: 1, pr: 1 }}>
                      Ingresar con Ciudadanía
                    </Typography>
                  </BotonCiudadania>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </LayoutLogin>
  )
}

export default Login
