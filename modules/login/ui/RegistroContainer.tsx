import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CrearEditarUsuarioType } from '../../admin/usuarios/types/usuariosCRUDTypes'
import { delay, InterpreteMensajes } from '../../../common/utils'
import { Constantes } from '../../../config'
import { formatoFecha } from '../../../common/utils/fechas'
import { imprimir } from '../../../common/utils/imprimir'
import { Servicios } from '../../../common/services'
import { useAlerts } from '../../../common/hooks'
import { Box, Button, Fade, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  FormInputDate,
  FormInputText,
} from '../../../common/components/ui/form'
import { isValidEmail } from '../../../common/utils/validations'
import ProgresoLineal from '../../../common/components/ui/ProgresoLineal'
import { Icono } from '../../../common/components/ui'

const RegistroContainer = ({ mostrarLogin }: { mostrarLogin: () => void }) => {
  const [indicadorCarga, setIndicadorCarga] = useState<boolean>(false)

  const [indicadorCreacionUsuario, setIndicadorCreacionUsuario] =
    useState<boolean>(false)

  // Hook para mostrar alertas
  const { Alerta } = useAlerts()

  const { handleSubmit, control, reset } = useForm<CrearEditarUsuarioType>({
    defaultValues: {},
  })

  const guardarActualizarUsuario = async (data: CrearEditarUsuarioType) => {
    await guardarActualizarUsuariosPeticion(data)
  }

  const guardarActualizarUsuariosPeticion = async (
    usuario: CrearEditarUsuarioType
  ) => {
    try {
      setIndicadorCarga(true)
      await delay(1000)
      const respuesta = await Servicios.peticion({
        url: `${Constantes.baseUrl}/usuarios/crear-cuenta${
          usuario.id ? `/${usuario.id}` : ''
        }`,
        tipo: 'post',
        body: {
          ...usuario,
          ...{
            persona: {
              ...usuario.persona,
              ...{
                fechaNacimiento: formatoFecha(
                  usuario.persona.fechaNacimiento,
                  'YYYY-MM-DD'
                ),
              },
            },
          },
        },
      })
      setIndicadorCreacionUsuario(true)
      imprimir(InterpreteMensajes(respuesta))
    } catch (e) {
      imprimir(`Error al crear o actualizar usuario: ${JSON.stringify(e)}`)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setIndicadorCarga(false)
    }
  }

  return (
    <Box>
      {indicadorCreacionUsuario && (
        <Fade in={indicadorCreacionUsuario} timeout={500}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Icono fontSize={'large'} color={'success'}>
              check_circle
            </Icono>
            <Box height={'15px'} />
            <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle2'}>
              ¡Tu cuenta ha sido registrada!
            </Typography>
            <Box height={'15px'} />
            <Typography variant={'subtitle2'}>
              Para activar tu cuenta, ingresa con las credenciales enviadas a tu
              correo.
            </Typography>
            <Box height={'15px'} />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => {
                reset()
                setIndicadorCreacionUsuario(false)
                mostrarLogin()
              }}
            >
              <Typography sx={{ fontWeight: 'bold', textTransform: 'none' }}>
                Entendido
              </Typography>
            </Button>
          </Box>
        </Fade>
      )}
      {!indicadorCreacionUsuario && (
        <Box>
          <Box height={'5px'} />
          <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle2'}>
            Datos personales
          </Typography>
          <Box height={'20px'} />
          <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
            <Grid item xs={12} sm={12} md={12}>
              <FormInputText
                id={'nroDocumento'}
                control={control}
                name="persona.nroDocumento"
                label="Nro. Documento"
                disabled={indicadorCarga}
                rules={{ required: 'Este campo es requerido' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormInputText
                id={'nombre'}
                control={control}
                name="persona.nombres"
                label="Nombre"
                disabled={indicadorCarga}
                rules={{ required: 'Este campo es requerido' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormInputText
                id={'primerApellido'}
                control={control}
                name="persona.primerApellido"
                label="Primer Apellido"
                disabled={indicadorCarga}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormInputText
                id={'segundoApellido'}
                control={control}
                name="persona.segundoApellido"
                label="Segundo apellido"
                disabled={indicadorCarga}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormInputDate
                id={'fechaNacimiento'}
                control={control}
                name="persona.fechaNacimiento"
                label="Fecha de nacimiento"
                disabled={indicadorCarga}
                rules={{ required: 'Este campo es requerido' }}
              />
            </Grid>
          </Grid>
          <Grid>
            <Box height={'20px'} />
            <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle2'}>
              Datos de usuario
            </Typography>
            <Box height={'10px'} />
            <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormInputText
                  id={'correoElectronico'}
                  control={control}
                  name="correoElectronico"
                  label="Correo electrónico"
                  disabled={indicadorCarga}
                  rules={{
                    required: 'Este campo es requerido',
                    validate: (value) => {
                      if (!isValidEmail(value)) return 'No es un correo válido'
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Box height={'10px'} />
          <ProgresoLineal mostrar={indicadorCarga} />
          <Box height={'5px'} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={indicadorCarga}
            onClick={handleSubmit(guardarActualizarUsuario)}
          >
            <Typography sx={{ fontWeight: 'bold', textTransform: 'none' }}>
              Crear cuenta
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  )
}
export default RegistroContainer
