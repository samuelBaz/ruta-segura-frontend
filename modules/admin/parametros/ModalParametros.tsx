import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CrearEditarParametroCRUDType,
  ParametroCRUDType,
} from '../../../common/types'
import { delay, imprimir, InterpreteMensajes } from '../../../common/utils'
import { Constantes } from '../../../config'
import { Alertas } from '../../../common/components/ui'
import { Box, Button, DialogActions, Grid } from '@mui/material'
import { FormInputText } from '../../../common/components/ui/form'
import ProgresoLineal from '../../../common/components/ui/ProgresoLineal'
import { useAuth } from '../../../context/auth'

export interface ModalParametroType {
  parametro?: ParametroCRUDType
  accionCorrecta: () => void
  accionCancelar: () => void
}

export const VistaModalParametro = ({
  parametro,
  accionCorrecta,
  accionCancelar,
}: ModalParametroType) => {
  const [loadingModal, setLoadingModal] = useState<boolean>(false)

  // Proveedor de la sesión
  const { sesionPeticion } = useAuth()

  const { handleSubmit, control } = useForm<CrearEditarParametroCRUDType>({
    defaultValues: {
      id: parametro?.id,
      codigo: parametro?.codigo,
      descripcion: parametro?.descripcion,
      nombre: parametro?.nombre,
      grupo: parametro?.grupo,
    },
  })

  const guardarActualizarParametro = async (
    data: CrearEditarParametroCRUDType
  ) => {
    await guardarActualizarParametrosPeticion(data)
  }

  const guardarActualizarParametrosPeticion = async (
    parametro: CrearEditarParametroCRUDType
  ) => {
    try {
      setLoadingModal(true)
      await delay(1000)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/parametros${
          parametro.id ? `/${parametro.id}` : ''
        }`,
        tipo: !!parametro.id ? 'patch' : 'post',
        body: parametro,
      })
      Alertas.correcto(InterpreteMensajes(respuesta))
      accionCorrecta()
    } catch (e) {
      imprimir(`Error al crear o actualizar parámetro: ${e}`)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoadingModal(false)
    }
  }

  return (
    <Grid container direction={'column'} justifyContent="space-evenly">
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'codigo'}
            control={control}
            name="codigo"
            label="Código"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'nombre'}
            control={control}
            name="nombre"
            label="Nombre"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
      </Grid>
      <Box height={'15px'} />
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'grupo'}
            control={control}
            name="grupo"
            label="Grupo"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'descripcion'}
            control={control}
            name="descripcion"
            label="Decripción"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
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
          pt: 2,
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
          onClick={handleSubmit(guardarActualizarParametro)}
        >
          Guardar
        </Button>
      </DialogActions>
    </Grid>
  )
}
