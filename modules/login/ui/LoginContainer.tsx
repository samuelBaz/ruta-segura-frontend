import { Box, Button, Card, Divider } from '@mui/material'
import { FormInputText } from '../../../common/components/ui/form'
import ProgresoLineal from '../../../common/components/ui/progreso/ProgresoLineal'
import Typography from '@mui/material/Typography'
import { BotonCiudadania } from './BotonCiudadania'
import { Constantes } from '../../../config'
import { useAuth } from '../../../context/auth'
import { useForm } from 'react-hook-form'
import { LoginType } from '../types/loginTypes'
import { useRouter } from 'next/router'
import { useFullScreenLoading } from '../../../context/ui'
import { delay } from '../../../common/utils'

const LoginContainer = () => {
  const router = useRouter()

  const { ingresar, progresoLogin } = useAuth()

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoading()

  const { handleSubmit, control } = useForm<LoginType>({
    defaultValues: {
      usuario: 'ADMINISTRADOR-TECNICO',
      contrasena: '123',
    },
  })

  const iniciarSesion = async ({ usuario, contrasena }: LoginType) => {
    await ingresar({ usuario, contrasena })
  }

  return (
    <Card sx={{ borderRadius: 4, p: 4, px: 5, maxWidth: '450px' }}>
      <form onSubmit={handleSubmit(iniciarSesion)}>
        <Box
          display={'grid'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ borderRadius: 12 }}
        >
          <Typography
            align={'center'}
            sx={{ flexGrow: 1, fontWeight: 'medium' }}
          >
            Inicio de Sesión
          </Typography>
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
          <Box sx={{ mt: 1, mb: 1 }}></Box>
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
          <Box sx={{ mt: 0.5, mb: 0.5 }}>
            <ProgresoLineal mostrar={progresoLogin} />
          </Box>
          <Box display="flex" flex="1" justifyContent="start">
            <Button
              onClick={async () => {
                mostrarFullScreen()
                await delay(500)
                await router.push({
                  pathname: '/recuperacion',
                })
                ocultarFullScreen()
              }}
              size={'small'}
              variant={'text'}
              disabled={progresoLogin}
              color={'primary'}
            >
              <Typography fontSize={'small'} sx={{ fontWeight: 'medium' }}>
                ¿Olvidaste tu contraseña?
              </Typography>
            </Button>
          </Box>
          <Box sx={{ height: 15 }}></Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={progresoLogin}
          >
            <Typography sx={{ fontWeight: 'medium' }}>
              Iniciar sesión
            </Typography>
          </Button>

          <Box sx={{ pt: 2, pb: 2 }}>
            <Divider>
              <Typography color="text.secondary">O</Typography>
            </Divider>
          </Box>
          <BotonCiudadania
            fullWidth
            disabled={progresoLogin}
            altText={'Ingresar con Ciudadanía'}
            accion={() => {
              window.location.href = `${Constantes.baseUrl}/ciudadania-auth`
            }}
          >
            <Typography sx={{ fontWeight: 'medium', pl: 1, pr: 1 }}>
              Ingresa con Ciudadanía
            </Typography>
          </BotonCiudadania>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" textAlign="center" fontSize={14}>
              ¿No tienes una cuenta?{' '}
              <Button
                variant="text"
                sx={{ p: 0 }}
                disabled={progresoLogin}
                onClick={async () => {
                  await router.push('registro')
                }}
              >
                Regístrate
              </Button>
            </Typography>
          </Box>
        </Box>
      </form>
    </Card>
  )
}

export default LoginContainer
