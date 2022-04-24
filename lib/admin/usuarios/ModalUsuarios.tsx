/// Vista modal de usuario
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CrearEditarUsuarioType,
  RolType,
  UsuarioCRUDType,
} from '../../../types'
import { delay, imprimir, InterpreteMensajes } from '../../../utils'
import { Constantes } from '../../../config'
import { Alertas } from '../../../components/ui'
import { Box, Button, DialogActions, Grid, Typography } from '@mui/material'
import {
  FormInputDate,
  FormInputDropdownMultiple,
  FormInputText,
} from '../../../components/ui/form'
import { isValidEmail } from '../../../utils/validations'
import ProgresoLineal from '../../../components/ui/ProgresoLineal'

import { useAuth } from '../../../context/auth'

export interface ModalUsuarioType {
  usuario?: UsuarioCRUDType | undefined | null
  roles: RolType[]
  accionCorrecta: () => void
  accionCancelar: () => void
}

export const VistaModalUsuario = ({
  usuario,
  roles,
  accionCorrecta,
  accionCancelar,
}: ModalUsuarioType) => {
  // Flag que indica que hay un proceso en ventana modal cargando visualmente
  const [loadingModal, setLoadingModal] = useState<boolean>(false)

  // Proveedor de la sesión
  const { sesionPeticion } = useAuth()

  const { handleSubmit, control } = useForm<CrearEditarUsuarioType>({
    defaultValues: {
      id: usuario?.id,
      usuario: usuario?.usuario,
      roles: usuario?.usuarioRol.map((rol) => rol.rol.id),
      estado: usuario?.estado,
      correoElectronico: usuario?.correoElectronico,
      persona: usuario?.persona,
      ciudadaniaDigital: usuario?.ciudadaniaDigital,
    },
  })

  const guardarActualizarUsuario = async (data: CrearEditarUsuarioType) => {
    await guardarActualizarUsuariosPeticion(data)
  }

  const guardarActualizarUsuariosPeticion = async (
    usuario: CrearEditarUsuarioType
  ) => {
    try {
      setLoadingModal(true)
      await delay(1000)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios/${usuario.id ?? ''}`,
        tipo: !!usuario.id ? 'patch' : 'post',
        body: usuario,
      })
      Alertas.correcto(InterpreteMensajes(respuesta))
      accionCorrecta()
    } catch (e) {
      imprimir(`Error al crear o actualizar usuario: ${e}`)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoadingModal(false)
    }
  }

  return (
    <Grid container direction={'column'} justifyContent="space-evenly">
      <Box height={'10px'} />
      <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
        Datos personales
      </Typography>
      <Box height={'10px'} />
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={4}>
          <FormInputText
            id={'nroDocumento'}
            control={control}
            name="persona.nroDocumento"
            label="Nro. Documento"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormInputText
            id={'nroDocumento'}
            control={control}
            name="persona.nombres"
            label="Nombre"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormInputText
            id={'primerApellido'}
            control={control}
            name="persona.primerApellido"
            label="Primer Apellido"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormInputText
            id={'segundoApellido'}
            control={control}
            name="persona.segundoApellido"
            label="Segundo apellido"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormInputDate
            id={'fechaNacimiento'}
            control={control}
            name="persona.fechaNacimiento"
            label="Fecha de nacimiento"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
      </Grid>
      <Grid>
        <Box height={'10px'} />
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
          Datos personales
        </Typography>
        <Box height={'10px'} />
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputDropdownMultiple
              id={'roles'}
              name="roles"
              control={control}
              label="Roles"
              disabled={loadingModal}
              options={roles.map((rol) => ({
                key: rol.id,
                value: rol.id,
                label: rol.nombre,
              }))}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <FormInputText
              id={'correoElectronico'}
              control={control}
              name="correoElectronico"
              label="Correo electrónico"
              disabled={loadingModal}
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
      <ProgresoLineal mostrar={loadingModal} />
      <Box height={'5px'} />
      <DialogActions
        sx={{
          justifyContent: {
            lg: 'flex-end',
            md: 'flex-end',
            xs: 'center',
            sm: 'center',
          },
        }}
      >
        <Button
          variant={'outlined'}
          disabled={loadingModal}
          onClick={accionCancelar}
        >
          Cancelar
        </Button>
        <Button
          variant={'contained'}
          disabled={loadingModal}
          onClick={handleSubmit(guardarActualizarUsuario)}
        >
          Guardar
        </Button>
      </DialogActions>
    </Grid>
  )
}
