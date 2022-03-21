import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { LayoutLogin } from '../components/layouts/LayoutLogin'
import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Divider,
  Fade,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { delay, imprimir, InterpreteMensajes } from '../utils'
import { Constantes } from '../config'
import { Servicios } from '../services'
import { Alertas } from '../components/ui'
import { useAuth } from '../context/auth'
import { useForm } from 'react-hook-form'
import ProgresoLineal from '../components/ui/ProgresoLineal'
import { useFullScreenLoadingContext } from '../context/ui'

const Login: NextPage = () => {
  const { ingresar, progresoLogin, estaAutenticado } = useAuth()

  const [loading, setLoading] = useState<boolean>(true)

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

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
      setLoading(true)
      mostrarFullScreen()
      await delay(1000)
      const respuesta = await Servicios.get({
        url: `${Constantes.baseUrl}estado`,
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
      setLoading(false)
      ocultarFullScreen()
    }
  }

  const iniciarSesion = async ({ usuario, contrasena }: FormData) => {
    await ingresar({ usuario, contrasena })
    if (estaAutenticado) setLoading(false)
  }

  useEffect(() => {
    imprimir('Primera petición 😨')
    obtenerEstado().then(() => {})
  }, [])

  return (
    <LayoutLogin title={'Frontend base - NextJS'}>
      <form onSubmit={handleSubmit(iniciarSesion)} noValidate>
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
                xs: 'none',
                xl: 'block',
                md: 'block',
                sm: 'none',
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
                  Ingresa con el usuario y contraseña. Si estas en el frontend
                  base son ADMINISTRADOR / 123
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Usuario</Typography>
                <TextField
                  id="usuario"
                  defaultValue="ADMINISTRADOR-TECNICO"
                  disabled={progresoLogin}
                  variant="outlined"
                  {...register('usuario', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.usuario}
                  helperText={errors.usuario?.message}
                />
                <Typography sx={{ fontWeight: 'bold' }}>Contraseña</Typography>
                <TextField
                  id="contrasena"
                  type={'password'}
                  defaultValue="123"
                  disabled={progresoLogin}
                  variant="outlined"
                  {...register('contrasena', {
                    required: 'Este campo es requerido',
                    minLength: {
                      value: 3,
                      message: 'Mínimo 3 caracteres',
                    },
                  })}
                  error={!!errors.contrasena}
                  helperText={errors.contrasena?.message}
                />

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
          </Grid>
        </Grid>
      </form>
    </LayoutLogin>
  )
}
export default Login
