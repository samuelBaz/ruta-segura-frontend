import type { NextPage } from 'next'
import { Box, Button, DialogActions, Grid, Typography } from '@mui/material'
import { useAuth } from '../../context/auth'
import { LayoutUser } from '../../components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import {
  ColumnaType,
  CrearEditarParametroCRUDType,
  ParametroCRUDType,
} from '../../types'
import {
  Alertas,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../../components/ui'
import { delay, imprimir, InterpreteMensajes } from '../../utils'
import { Constantes } from '../../config'
import { useFirstMountState } from 'react-use'
import { Paginacion } from '../../components/ui/Paginacion'
import { useForm } from 'react-hook-form'
import { FormInputText } from '../../components/ui/form'
import ProgresoLineal from '../../components/ui/ProgresoLineal'
import { CasbinTypes } from '../../types/casbinTypes'
import { useRouter } from 'next/router'

export interface ModalParametroType {
  parametro?: ParametroCRUDType
}

const Parametros: NextPage = () => {
  const [parametrosData, setParametrosData] = useState<ParametroCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorParametrosData, setErrorParametrosData] = useState<any>()

  const [modalParametro, setModalParametro] = useState(false)

  const [parametroEdicion, setParametroEdicion] = useState<
    ParametroCRUDType | undefined
  >()

  // Verificar primer render
  const isFirstMount = useFirstMountState()

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const { sesionPeticion, estaAutenticado, interpretarPermiso } = useAuth()

  // Permisos para acciones
  const [permisos, setPermisos] = useState<CasbinTypes>({
    create: false,
    update: false,
    delete: false,
  })

  // router para conocer la ruta actual
  const router = useRouter()

  const columnas: Array<ColumnaType> = [
    { campo: 'codigo', nombre: 'Código' },
    { campo: 'nombre', nombre: 'Nombre' },
    { campo: 'descripcion', nombre: 'Descripción' },
    { campo: 'grupo', nombre: 'Grupo' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = parametrosData.map(
    (parametroData, indexParametro) => [
      <Typography
        key={`${parametroData.id}-${indexParametro}-codigo`}
        variant={'body2'}
      >{`${parametroData.codigo}`}</Typography>,
      <Typography
        key={`${parametroData.id}-${indexParametro}-nombre`}
        variant={'body2'}
      >
        {`${parametroData.nombre}`}
      </Typography>,
      <Typography
        key={`${parametroData.id}-${indexParametro}-descripcion`}
        variant={'body2'}
      >{`${parametroData.descripcion}`}</Typography>,
      <Typography
        key={`${parametroData.id}-${indexParametro}-grupo`}
        variant={'body2'}
      >{`${parametroData.grupo}`}</Typography>,
      <Grid key={`${parametroData.id}-${indexParametro}-accion`}>
        {permisos.update && (
          <IconoTooltip
            titulo={'Editar'}
            color={'success'}
            accion={() => {
              imprimir(`Editaremos : ${JSON.stringify(parametroData)}`)
              editarParametroModal(parametroData)
            }}
            icono={'edit'}
            name={'Parámetros'}
          />
        )}
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    permisos.create && (
      <IconoTooltip
        titulo={'Agregar parámetro'}
        key={`accionAgregarParametro`}
        accion={() => {
          agregarParametroModal()
        }}
        icono={'add_circle_outline'}
        name={'Agregar parámetro'}
      />
    ),
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarParametro`}
      accion={async () => {
        await obtenerParametrosPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de parámetros'}
    />,
  ]

  const obtenerParametrosPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/parametros`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      })
      setParametrosData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorParametrosData(null)
    } catch (e) {
      imprimir(`Error al obtener parametros: ${e}`)
      setErrorParametrosData(e)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoading(false)
    }
  }

  const VistaModalParametro = ({ parametro }: ModalParametroType) => {
    const [loadingModal, setLoadingModal] = useState<boolean>(false)

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
        cerrarModalParametro()
        obtenerParametrosPeticion().finally()
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
            onClick={cerrarModalParametro}
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

  const agregarParametroModal = () => {
    setParametroEdicion(undefined)
    setModalParametro(true)
  }
  const editarParametroModal = (parametro: ParametroCRUDType) => {
    setParametroEdicion(parametro)
    setModalParametro(true)
  }

  const cerrarModalParametro = () => {
    setParametroEdicion(undefined)
    setModalParametro(false)
  }

  async function definirPermisos() {
    setPermisos(await interpretarPermiso(router.pathname))
  }

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

  useEffect(() => {
    if (estaAutenticado) obtenerParametrosPeticion().finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado, pagina, limite])

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
      <CustomDialog
        isOpen={modalParametro}
        handleClose={cerrarModalParametro}
        title={parametroEdicion ? 'Editar parámetro' : 'Nuevo parámetro'}
      >
        <VistaModalParametro parametro={parametroEdicion} />
      </CustomDialog>
      <LayoutUser title={'Parametros - Fronted Base'}>
        <CustomDataTable
          titulo={'Parámetros'}
          error={!!errorParametrosData}
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
export default Parametros
