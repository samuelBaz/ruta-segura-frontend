import type { NextPage } from 'next'
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAuth } from '../../context/auth'
import { LayoutUser } from '../../common/components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import { CasbinTypes } from '../../common/types'
import {
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../../common/components/ui'
import {
  delay,
  InterpreteMensajes,
  siteName,
  titleCase,
} from '../../common/utils'
import { Constantes } from '../../config'

import { Paginacion } from '../../common/components/ui/datatable/Paginacion'
import { useRouter } from 'next/router'
import { useAlerts, useSession } from '../../common/hooks'
import { imprimir } from '../../common/utils/imprimir'
import { FiltroParametros } from '../../modules/admin/parametros/ui/FiltroParametros'
import CustomMensajeEstado from '../../common/components/ui/estados/CustomMensajeEstado'
import { CriterioOrdenType } from '../../common/components/ui/datatable/ordenTypes'
import { ordenFiltrado } from '../../common/components/ui/datatable/utils'
import { BotonOrdenar } from '../../common/components/ui/botones/BotonOrdenar'
import { IconoBoton } from '../../common/components/ui/botones/IconoBoton'
import { CustomSwitch } from '../../common/components/ui/botones/CustomSwitch'
import { CustomToggleButton } from '../../common/components/ui/botones/CustomToogleButton'
import { VistaModalGremio } from '../../modules/admin/gremios/ui/ModalGremio'
import { GremioCRUDType } from '../../modules/admin/gremios/types/gremiosCRUDTypes'
import dayjs from 'dayjs'

const Parametros: NextPage = () => {
  const [gremiosData, setGremiosData] = useState<GremioCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  // Hook para mostrar alertas
  const { Alerta } = useAlerts()
  const [errorGremiosData, setErrorGremiosData] = useState<any>()

  const [modalParametro, setModalParametro] = useState(false)

  /// Indicador para mostrar una vista de alerta de cambio de estado
  const [mostrarAlertaEstadoParametro, setMostrarAlertaEstadoParametro] =
    useState(false)

  const [gremioEdicion, setGremioEdicion] = useState<
    GremioCRUDType | undefined | null
  >()

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const { sesionPeticion } = useSession()
  const { estaAutenticado, permisoUsuario } = useAuth()

  const [filtroParametro, setFiltroParametro] = useState<string>('')
  const [mostrarFiltroParametros, setMostrarFiltroParametros] = useState(false)
  // Permisos para acciones
  const [permisos, setPermisos] = useState<CasbinTypes>({
    read: false,
    create: false,
    update: false,
    delete: false,
  })

  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  /// Método que muestra alerta de cambio de estado

  const editarEstadoParametroModal = (parametro: GremioCRUDType) => {
    setGremioEdicion(parametro) // para mostrar datos de modal en la alerta
    setMostrarAlertaEstadoParametro(true) // para mostrar alerta de parametro
  }

  const cancelarAlertaEstadoParametro = async () => {
    setMostrarAlertaEstadoParametro(false)
    await delay(500) // para no mostrar undefined mientras el modal se cierra
    setGremioEdicion(null)
  }

  /// Método que oculta la alerta de cambio de estado y procede
  const aceptarAlertaEstadoParametro = async () => {
    setMostrarAlertaEstadoParametro(false)
    if (gremioEdicion) {
      await cambiarEstadoParametroPeticion(gremioEdicion)
    }
    setGremioEdicion(null)
  }

  /// Petición que cambia el estado de un parámetro
  const cambiarEstadoParametroPeticion = async (
    parametro: GremioCRUDType
  ) => {
    try {
      setLoading(true)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/gremios/${parametro.id}/${
          parametro.estado == 'ACTIVO' ? 'inactivacion' : 'activacion'
        }`,
        method: 'patch',
      })
      imprimir(`respuesta estado parametro: ${respuesta}`)
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: 'success',
      })
      await obtenerGremiosPeticion()
    } catch (e) {
      imprimir(`Error estado parametro`, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // router para conocer la ruta actual
  const router = useRouter()

  /// Criterios de orden
  const [ordenCriterios, setOrdenCriterios] = useState<
    Array<CriterioOrdenType>
  >([
    { campo: 'nombre', nombre: 'Nombre', ordenar: true },
    { campo: 'descripcion', nombre: 'Descripción', ordenar: true },
    { campo: 'fechaFundacion', nombre: 'Fecha de Fundación', ordenar: true },
    { campo: 'estado', nombre: 'Estado', ordenar: true },
    { campo: 'acciones', nombre: 'Acciones' },
  ])

  const contenidoTabla: Array<Array<ReactNode>> = gremiosData.map(
    (parametroData, indexParametro) => [
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
      >{`${dayjs(parametroData.fechaFundacion).format('DD/MM/YYYY')}`}</Typography>,

      <CustomMensajeEstado
        key={`${parametroData.id}-${indexParametro}-estado`}
        titulo={parametroData.estado}
        descripcion={parametroData.estado}
        color={
          parametroData.estado == 'ACTIVO'
            ? 'success'
            : parametroData.estado == 'INACTIVO'
              ? 'error'
              : 'info'
        }
      />,
      <Stack
        key={`${parametroData.id}-${indexParametro}-acciones`}
        direction={'row'}
        alignItems={'center'}
      >
        {permisos.update && (
          <CustomSwitch
            id={`cambiarEstadoParametro-${parametroData.id}`}
            titulo={parametroData.estado == 'ACTIVO' ? 'Inactivar' : 'Activar'}
            accion={async () => {
              await editarEstadoParametroModal(parametroData)
            }}
            name={
              parametroData.estado == 'ACTIVO'
                ? 'Inactivar Gremio'
                : 'Activar Gremio'
            }
            color={parametroData.estado == 'ACTIVO' ? 'success' : 'error'}
            marcado={parametroData.estado == 'ACTIVO'}
            desactivado={parametroData.estado == 'PENDIENTE'}
          />
        )}
        {permisos.update && (
          <IconoTooltip
            id={`editarParametros-${parametroData.id}`}
            name={'Parámetros'}
            titulo={'Editar'}
            color={'primary'}
            icono={'edit'}
            accion={async () => {
              await editarParametroModal(parametroData)
            }}
          />
        )}
      </Stack>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <CustomToggleButton
      id={'accionFiltrarParametrosToggle'}
      key={'accionFiltrarParametrosToggle'}
      icono="search"
      seleccionado={mostrarFiltroParametros}
      cambiar={setMostrarFiltroParametros}
    />,
    xs && (
      <BotonOrdenar
        id={'ordenarParametros'}
        key={`ordenarParametros`}
        label={'Ordenar parámetros'}
        criterios={ordenCriterios}
        cambioCriterios={setOrdenCriterios}
      />
    ),
    <IconoTooltip
      id={'actualizarParametro'}
      titulo={'Actualizar'}
      key={`accionActualizarParametro`}
      accion={async () => {
        await obtenerGremiosPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de parámetros'}
    />,
    permisos.create && (
      <IconoBoton
        id={'agregarParametro'}
        key={'agregarParametro'}
        texto={'Agregar'}
        variante={xs ? 'icono' : 'boton'}
        icono={'add_circle_outline'}
        descripcion={'Agregar parámetro'}
        accion={() => {
          agregarParametroModal()
        }}
      />
    ),
  ]

  const obtenerGremiosPeticion = async () => {
    try {
      setLoading(true)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/gremios`,
        params: {
          pagina: pagina,
          limite: limite,
          ...(filtroParametro.length == 0 ? {} : { filtro: filtroParametro }),
          ...(ordenFiltrado(ordenCriterios).length == 0
            ? {}
            : {
                orden: ordenFiltrado(ordenCriterios).join(','),
              }),
        },
      })
      setGremiosData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorGremiosData(null)
    } catch (e) {
      imprimir(`Error al obtener gremios`, e)
      setErrorGremiosData(e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const agregarParametroModal = () => {
    setGremioEdicion(undefined)
    setModalParametro(true)
  }
  const editarParametroModal = (parametro: GremioCRUDType) => {
    setGremioEdicion(parametro)
    setModalParametro(true)
  }

  const cerrarModalParametro = async () => {
    setModalParametro(false)
    await delay(500)
    setGremioEdicion(undefined)
  }

  async function definirPermisos() {
    setPermisos(await permisoUsuario(router.pathname))
  }

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

  useEffect(() => {
    if (estaAutenticado) obtenerGremiosPeticion().finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    estaAutenticado,
    pagina,
    limite,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(ordenCriterios),
    filtroParametro,
  ])

  useEffect(() => {
    if (!mostrarFiltroParametros) {
      setFiltroParametro('')
    }
  }, [mostrarFiltroParametros])

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
        isOpen={mostrarAlertaEstadoParametro}
        titulo={'Alerta'}
        texto={`¿Está seguro de ${
          gremioEdicion?.estado == 'ACTIVO' ? 'inactivar' : 'activar'
        } el gremio: ${titleCase(gremioEdicion?.nombre ?? '')} ?`}
      >
        <Button variant={'outlined'} onClick={cancelarAlertaEstadoParametro}>
          Cancelar
        </Button>
        <Button variant={'contained'} onClick={aceptarAlertaEstadoParametro}>
          Aceptar
        </Button>
      </AlertDialog>
      <CustomDialog
        isOpen={modalParametro}
        handleClose={cerrarModalParametro}
        title={gremioEdicion ? 'Editar gremio' : 'Nuevo gremio'}
      >
        <VistaModalGremio
          gremio={gremioEdicion}
          accionCorrecta={() => {
            cerrarModalParametro().finally()
            obtenerGremiosPeticion().finally()
          }}
          accionCancelar={cerrarModalParametro}
        />
      </CustomDialog>
      <LayoutUser title={`Gremios - ${siteName()}`}>
        <CustomDataTable
          titulo={'Gremios'}
          error={!!errorGremiosData}
          cargando={loading}
          acciones={acciones}
          columnas={ordenCriterios}
          cambioOrdenCriterios={setOrdenCriterios}
          paginacion={paginacion}
          contenidoTabla={contenidoTabla}
          filtros={
            mostrarFiltroParametros && (
              <FiltroParametros
                filtroParametro={filtroParametro}
                accionCorrecta={(filtros) => {
                  setPagina(1)
                  setLimite(10)
                  setFiltroParametro(filtros.parametro)
                }}
                accionCerrar={() => {
                  imprimir(`👀 cerrar`)
                }}
              />
            )
          }
        />
      </LayoutUser>
    </>
  )
}
export default Parametros
