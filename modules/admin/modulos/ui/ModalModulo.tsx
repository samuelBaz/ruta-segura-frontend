import { Box, Button, DialogActions, Grid } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormInputDropdown,
  FormInputText,
} from '../../../../common/components/ui/form'
import ProgresoLineal from '../../../../common/components/ui/ProgresoLineal'
import { useAlerts } from '../../../../common/hooks'
import { InterpreteMensajes } from '../../../../common/utils'
import { imprimir } from '../../../../common/utils/imprimir'
import { Constantes } from '../../../../config'
import { useAuth } from '../../../../context/auth'
import { ModalModuloType } from '../types/ModalModuloType'
import {
  CrearEditarModulosType,
  GuardarModulosType,
} from '../types/CrearEditarModulosType'

export const VistaModalModulo = ({
  modulo,
  accionCorrecta,
  accionCancelar,
  modulos,
}: ModalModuloType) => {
  const [loadingModal, setLoadingModal] = useState<boolean>(false)

  // Hook para mostrar alertas
  const { Alerta } = useAlerts()

  // Proveedor de la sesión
  const { sesionPeticion } = useAuth() //hook

  const { handleSubmit, control, watch } = useForm<CrearEditarModulosType>({
    defaultValues: {
      id: modulo?.id,
      label: modulo?.label,
      url: modulo?.url,
      nombre: modulo?.nombre,
      propiedades: modulo?.propiedades,
      estado: modulo?.estado,
      idModulo: modulo?.idModulo?.id,
      esSeccion: modulo?.esSeccion,
    },
  })

  const checked = watch('esSeccion')

  const guardarActualizarModulo = async (data: CrearEditarModulosType) => {
    await guardarActualizarModuloPeticion(data)
  }

  const guardarActualizarModuloPeticion = async (
    modulo: GuardarModulosType
  ) => {
    try {
      setLoadingModal(true)
      //await delay(1000)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/modulos`,
        tipo: !!modulo.id ? 'patch' : 'post',
        body: modulo,
      })
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: 'success',
      })
      accionCorrecta()
    } catch (e) {
      imprimir(`Error al crear o actualizar módulo`, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoadingModal(false)
    }
  }

  return (
    <Grid container direction={'column'} justifyContent="space-evenly">
      {checked ? (
        <></>
      ) : (
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputDropdown
              id={'idModulo'}
              name="idModulo"
              control={control}
              label="Sección"
              disabled={loadingModal}
              options={modulos.map((lm) => ({
                key: lm.id,
                value: lm.id,
                label: lm.label,
              }))}
              onChange={(event) => {
                imprimir(event.target.value)
                //setValue('accion', [])
              }}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={'icono'}
              control={control}
              name="propiedades.icono"
              label="Icono"
              disabled={loadingModal || checked}
              rules={!checked ? { required: 'Este campo es requerido' } : {}}
            />
          </Grid>
        </Grid>
      )}
      <Box height={'15px'} />
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
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

        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'label'}
            control={control}
            name="label"
            label="Label"
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
      </Grid>
      <Box height={'15px'} />
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'descripcion'}
            control={control}
            name="propiedades.descripcion"
            label="Descripción"
            multiline
            rows={2}
            disabled={loadingModal}
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'url'}
            control={control}
            name="url"
            label="URL"
            disabled={loadingModal}
            rules={{
              required: {
                value: true,
                message: 'Este campo es requerido',
              },
            }}
          />
        </Grid>
      </Grid>
      <Box height={'15px'} />
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
          onClick={handleSubmit(guardarActualizarModulo)}
        >
          Guardar
        </Button>
      </DialogActions>
    </Grid>
  )
}
