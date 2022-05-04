import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CrearEditarPoliticaCRUDType,
  guardarPoliticaCRUDType,
  PoliticaCRUDType,
  RolType,
} from '../../../common/types'
import { delay, imprimir, InterpreteMensajes } from '../../../common/utils'
import { Constantes } from '../../../config'
import { Alertas } from '../../../common/components/ui'
import { Box, Button, DialogActions, Grid } from '@mui/material'
import {
  FormInputDropdown,
  FormInputDropdownMultiple,
  FormInputText,
} from '../../../common/components/ui/form'
import ProgresoLineal from '../../../common/components/ui/ProgresoLineal'
import { useAuth } from '../../../context/auth'

export interface ModalPoliticaType {
  politica?: PoliticaCRUDType
  roles: RolType[]
  accionCorrecta: () => void
  accionCancelar: () => void
}

export const VistaModalPolitica = ({
  politica,
  roles,
  accionCorrecta,
  accionCancelar,
}: ModalPoliticaType) => {
  const [loadingModal, setLoadingModal] = useState<boolean>(false)
  // Proveedor de la sesión
  const { sesionPeticion } = useAuth()

  const politicaActual: PoliticaCRUDType | undefined = politica

  const opcionesApp: string[] = ['frontend', 'backend']

  const opcionesAccionesFrontend: string[] = [
    'create',
    'read',
    'update',
    'delete',
  ]

  const opcionesAccionesBackend: string[] = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
  ]

  const { handleSubmit, control, watch, setValue } =
    useForm<CrearEditarPoliticaCRUDType>({
      defaultValues: {
        app: politica?.app,
        accion: politica?.accion.split('|'),
        objeto: politica?.objeto,
        sujeto: politica?.sujeto,
      },
    })

  const valorApp = watch('app')

  const guardarActualizarPolitica = async (
    data: CrearEditarPoliticaCRUDType
  ) => {
    await guardarActualizarPoliticaPeticion({
      ...data,
      ...{ accion: data.accion.join('|') },
    })
  }

  const guardarActualizarPoliticaPeticion = async (
    politicaNueva: guardarPoliticaCRUDType
  ) => {
    try {
      setLoadingModal(true)
      await delay(1000)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/politicas`,
        tipo: politicaActual ? 'patch' : 'post',
        body: politicaNueva,
        params: {
          sujeto: politicaActual?.sujeto,
          objeto: politicaActual?.objeto,
          accion: politicaActual?.accion,
          app: politicaActual?.app,
        },
      })
      Alertas.correcto(InterpreteMensajes(respuesta))
      accionCorrecta()
    } catch (e) {
      imprimir(`Error al crear o actualizar política: ${e}`)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoadingModal(false)
    }
  }

  return (
    <Grid container direction={'column'} justifyContent="space-evenly">
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputDropdown
            id={'sujeto'}
            name="sujeto"
            control={control}
            label="Sujeto"
            disabled={loadingModal}
            options={roles.map((rol) => ({
              key: rol.rol,
              value: rol.rol,
              label: rol.rol,
            }))}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'objeto'}
            control={control}
            name="objeto"
            label="Objeto"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
      </Grid>
      <Box height={'15px'} />
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputDropdown
            id={'app'}
            name="app"
            control={control}
            label="App"
            disabled={loadingModal}
            options={opcionesApp.map((app) => ({
              key: app,
              value: app,
              label: app,
            }))}
            onChange={(event) => {
              imprimir(event.target.value)
              setValue('accion', [])
            }}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputDropdownMultiple
            id={'accion'}
            name="accion"
            control={control}
            label="Acción"
            disabled={loadingModal}
            options={(valorApp == 'frontend'
              ? opcionesAccionesFrontend
              : valorApp == 'backend'
              ? opcionesAccionesBackend
              : []
            ).map((opcionAccion) => ({
              key: opcionAccion,
              value: opcionAccion,
              label: opcionAccion,
            }))}
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
          onClick={handleSubmit(guardarActualizarPolitica)}
        >
          Guardar
        </Button>
      </DialogActions>
    </Grid>
  )
}
