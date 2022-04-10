import type { NextPage } from 'next'
import { Box, Button, DialogActions, Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import {
  ColumnaType,
  CrearEditarPoliticaCRUDType,
  PoliticaCRUDType,
} from '../types'
import {
  Alertas,
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../components/ui'
import { delay, imprimir, InterpreteMensajes, titleCase } from '../utils'
import { Constantes } from '../config'
import { Paginacion } from '../components/ui/Paginacion'
import { useFirstMountState } from 'react-use'
import { useForm } from 'react-hook-form'
import { FormInputText } from '../components/ui/form'
import ProgresoLineal from '../components/ui/ProgresoLineal'

export interface ModalPoliticaType {
  politica?: PoliticaCRUDType
}

const Politicas: NextPage = () => {
  const [politicasData, setPoliticasData] = useState<PoliticaCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorPoliticasData, setErrorPoliticasData] = useState<any>()
  const [modalPolitica, setModalPolitica] = useState(false)

  /// Indicador para mostrar una vista de alerta
  const [mostrarAlertaEliminarPolitica, setMostrarAlertaEliminarPolitica] =
    useState(false)

  const [politicaEdicion, setPoliticaEdicion] = useState<
    PoliticaCRUDType | undefined
  >()
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  // Verificar primer render
  const isFirstMount = useFirstMountState()

  const { sesionPeticion, estaAutenticado } = useAuth()

  const columnas: Array<ColumnaType> = [
    { campo: 'sujeto', nombre: 'Sujeto' },
    { campo: 'objeto', nombre: 'Objeto' },
    { campo: 'accion', nombre: 'Acción' },
    { campo: 'app', nombre: 'App' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = politicasData.map(
    (politicaData, indexPolitica) => [
      <Typography
        key={`${politicaData.sujeto}-${indexPolitica}-sujeto`}
        variant={'body2'}
      >{`${politicaData.sujeto}`}</Typography>,
      <Typography
        key={`${politicaData.objeto}-${indexPolitica}-objeto`}
        variant={'body2'}
      >{`${politicaData.objeto}`}</Typography>,
      <Typography
        key={`${politicaData.accion}-${indexPolitica}-accion`}
        variant={'body2'}
      >{`${politicaData.accion}`}</Typography>,
      <Typography
        key={`${politicaData.accion}-${indexPolitica}-app`}
        variant={'body2'}
      >{`${politicaData.app}`}</Typography>,

      <Grid key={`${politicaData.accion}-${indexPolitica}-acciones`}>
        <IconoTooltip
          titulo={'Editar'}
          color={'success'}
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(politicaData)}`)
            editarPoliticaModal(politicaData)
          }}
          icono={'edit'}
          name={'Editar política'}
        />
        <IconoTooltip
          titulo={'Eliminar'}
          color={'error'}
          accion={() => {
            imprimir(`Eliminaremos : ${JSON.stringify(politicaData)}`)
            eliminarPoliticaModal(politicaData)
          }}
          icono={'delete_outline'}
          name={'Editar política'}
        />
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <IconoTooltip
      titulo={'Agregar política'}
      key={`accionAgregarPolitica`}
      accion={() => {
        agregarPoliticaModal()
      }}
      icono={'add_circle_outline'}
      name={'Agregar política'}
    />,
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarPolitica`}
      accion={async () => {
        await obtenerPoliticasPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de políticas'}
    />,
  ]

  const obtenerPoliticasPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/politicas`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      })
      setPoliticasData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorPoliticasData(null)
    } catch (e) {
      imprimir(`Error al obtener políticas: ${e}`)
      setErrorPoliticasData(e)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoading(false)
    }
  }

  const eliminarPoliticaPeticion = async (politica: PoliticaCRUDType) => {
    try {
      setLoading(true)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/politicas`,
        tipo: 'delete',
        params: {
          sujeto: politica?.sujeto,
          objeto: politica?.objeto,
          accion: politica?.accion,
          app: politica?.app,
        },
      })
      imprimir(`respuesta eliminar política: ${respuesta}`)
      Alertas.correcto(InterpreteMensajes(respuesta))
      await obtenerPoliticasPeticion()
    } catch (e) {
      imprimir(`Error al eliminar política: ${e}`)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoading(false)
    }
  }

  const VistaModalPolitica = ({ politica }: ModalPoliticaType) => {
    const [loadingModal, setLoadingModal] = useState<boolean>(false)

    const { handleSubmit, control } = useForm<CrearEditarPoliticaCRUDType>({
      defaultValues: {
        app: politica?.app,
        accion: politica?.accion,
        objeto: politica?.objeto,
        sujeto: politica?.sujeto,
      },
    })

    const guardarActualizarPolitica = async (
      data: CrearEditarPoliticaCRUDType
    ) => {
      await guardarActualizarPoliticaPeticion(data)
    }

    const guardarActualizarPoliticaPeticion = async (
      politica: CrearEditarPoliticaCRUDType
    ) => {
      try {
        setLoadingModal(true)
        await delay(1000)
        const respuesta = await sesionPeticion({
          url: `${Constantes.baseUrl}/autorizacion/politicas`,
          tipo: politicaEdicion ? 'patch' : 'post',
          body: politica,
          params: {
            sujeto: politicaEdicion?.sujeto,
            objeto: politicaEdicion?.objeto,
            accion: politicaEdicion?.accion,
            app: politicaEdicion?.app,
          },
        })
        Alertas.correcto(InterpreteMensajes(respuesta))
        cerrarModalPolitica()
        obtenerPoliticasPeticion().finally()
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
            <FormInputText
              id={'sujeto'}
              control={control}
              name="sujeto"
              label="Sujeto"
              disabled={loadingModal}
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
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={'accion'}
              control={control}
              name="accion"
              label="Acción"
              disabled={loadingModal}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={'app'}
              control={control}
              name="app"
              label="App"
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
            onClick={cerrarModalPolitica}
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

  const agregarPoliticaModal = () => {
    setPoliticaEdicion(undefined)
    setModalPolitica(true)
  }
  const editarPoliticaModal = (politica: PoliticaCRUDType) => {
    setPoliticaEdicion(politica)
    setModalPolitica(true)
  }

  const cerrarModalPolitica = () => {
    setPoliticaEdicion(undefined)
    setModalPolitica(false)
  }

  useEffect(() => {
    if (estaAutenticado) obtenerPoliticasPeticion().finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado, pagina, limite])

  const eliminarPoliticaModal = (politica: PoliticaCRUDType) => {
    setPoliticaEdicion(politica) // para mostrar datos de usuario en la alerta
    setMostrarAlertaEliminarPolitica(true) // para mostrar alerta de usuarios
  }

  const cancelarAlertaEliminarPolitica = () => {
    setMostrarAlertaEliminarPolitica(false)
    setPoliticaEdicion(undefined)
  }

  const aceptarAlertaEliminarPoliticas = async () => {
    setMostrarAlertaEliminarPolitica(false)
    if (politicaEdicion) {
      await eliminarPoliticaPeticion(politicaEdicion)
    }
  }

  const paginacion = (
    <Paginacion
      pagina={pagina}
      limite={limite}
      total={total}
      cambioPagina={setPagina}
      cambioLimite={setLimite}
    />
  )

  return (
    <>
      <AlertDialog
        isOpen={mostrarAlertaEliminarPolitica}
        titulo={'Alerta'}
        texto={`¿Está seguro de eliminar la política ${titleCase(
          `${politicaEdicion?.app}-${politicaEdicion?.objeto}-${politicaEdicion?.sujeto}-${politicaEdicion?.accion}`
        )} ?`}
      >
        <Button onClick={cancelarAlertaEliminarPolitica}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarPoliticas}>Aceptar</Button>
      </AlertDialog>
      <CustomDialog
        isOpen={modalPolitica}
        handleClose={cerrarModalPolitica}
        title={politicaEdicion ? 'Editar política' : 'Nueva política'}
      >
        <VistaModalPolitica politica={politicaEdicion} />
      </CustomDialog>
      <LayoutUser title={'Políticas - Fronted Base'}>
        <CustomDataTable
          titulo={'Políticas'}
          error={!!errorPoliticasData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          contenidoTabla={contenidoTabla}
          paginacion={paginacion}
        />
      </LayoutUser>
    </>
  )
}
export default Politicas
