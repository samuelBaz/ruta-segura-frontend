import { Button, Grid, ToggleButton, Typography } from '@mui/material'
import { NextPage } from 'next'
import React, { ReactNode, useEffect, useState } from 'react'
import { LayoutUser } from '../../common/components/layouts'
import {
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  Icono,
  IconoTooltip,
} from '../../common/components/ui'
import { Paginacion } from '../../common/components/ui/Paginacion'
import { CasbinTypes, ColumnaType } from '../../common/types'
import { imprimir } from '../../common/utils/imprimir'
import {
  delay,
  InterpreteMensajes,
  siteName,
  titleCase,
} from '../../common/utils'
import { Constantes } from '../../config'
import { useAuth } from '../../context/auth'
import { ModuloCRUDType } from '../../modules/admin/modulos/types/CrearEditarModulosType'
import { VistaModalModulo } from '../../modules/admin/modulos/ui/ModalModulo'
import { useRouter } from 'next/router'
import { FiltroModulos } from '../../modules/admin/modulos/ui/FiltroModulos'
import CustomMensajeEstado from '../../common/components/ui/CustomMensajeEstado'
import { BotonAcciones } from '../../common/components/ui/BotonAcciones'
import { useAlerts, useSession } from '../../common/hooks'

const Modulos: NextPage = () => {
  const router = useRouter()
  /// Módulos
  const [modulosData, setModulosData] = useState<ModuloCRUDType[]>([])
  const [errorModulosData, setErrorModulosData] = useState<any>()
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  /// Secciones
  const [seccionesData, setSeccionesData] = useState<ModuloCRUDType[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [mostrarFiltroModulo, setMostrarFiltroModulo] = useState(false)
  const [modalModulo, setModalModulo] = useState(false)

  /// Indicador para mostrar una vista de alerta de cambio de estado
  const [mostrarAlertaEstadoModulo, setMostrarAlertaEstadoModulo] =
    useState(false)

  const { Alerta } = useAlerts()
  const { sesionPeticion } = useSession()
  const { estaAutenticado, permisoUsuario } = useAuth()

  const [filtroBuscar, setFiltroBuscar] = useState<string>('')

  const definirPermisos = async () => {
    setPermisos(await permisoUsuario(router.pathname))
  }

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

  const [permisos, setPermisos] = useState<CasbinTypes>({
    read: false,
    create: false,
    update: false,
    delete: false,
  })

  const agregarModuloModal = ({ esSeccion }: { esSeccion: boolean }) => {
    setModuloEdicion({ esSeccion: esSeccion } as ModuloCRUDType)
    setModalModulo(true)
  }

  useEffect(() => {
    if (estaAutenticado) {
      obtenerSeccionesPeticion().then(() => {
        obtenerModulosPeticion().finally(() => {})
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado, pagina, limite, filtroBuscar])

  const acciones: Array<ReactNode> = [
    <ToggleButton
      key={'accionFiltrarModuloToggle'}
      value="check"
      sx={{
        '&.MuiToggleButton-root': {
          borderRadius: '4px !important',
          border: '0px solid lightgrey !important',
        },
      }}
      size={'small'}
      selected={mostrarFiltroModulo}
      onChange={() => {
        setMostrarFiltroModulo(!mostrarFiltroModulo)
      }}
      // name="filtroModulo"
      id={'btnFiltro'}
    >
      <Icono>search</Icono>
    </ToggleButton>,
    permisos.create && (
      <BotonAcciones
        id={'agregarModuloSeccion'}
        key={'agregarModuloSeccion'}
        icono={'add_circle_outline'}
        acciones={[
          {
            id: 'agregarModulo',
            mostrar: true,
            titulo: 'Nuevo módulo',
            accion: async () => {
              agregarModuloModal({ esSeccion: false })
            },
            desactivado: false,
            icono: 'menu',
            name: 'Nuevo módulo',
          },
          {
            id: '1',
            mostrar: true,
            titulo: 'Nueva sección',
            accion: async () => {
              agregarModuloModal({ esSeccion: true })
            },
            desactivado: false,
            icono: 'list',
            name: 'Nueva sección',
          },
        ]}
      />
    ),
    <IconoTooltip
      id={`ActualizarModulo`}
      titulo={'Actualizar'}
      key={`ActualizarModulo`}
      accion={async () => {
        await obtenerModulosPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de parámetros'}
    />,
  ]

  const [moduloEdicion, setModuloEdicion] = useState<
    ModuloCRUDType | undefined | null
  >()

  const paginacion = (
    <Paginacion
      pagina={pagina}
      limite={limite}
      total={total}
      cambioPagina={setPagina}
      cambioLimite={setLimite}
    />
  )
  const editarModuloModal = (modulo: ModuloCRUDType) => {
    setModuloEdicion(modulo)
    setModalModulo(true)
  }

  const cerrarModalModulo = async () => {
    setModalModulo(false)
    await delay(500)
    setModuloEdicion(undefined)
  }

  const obtenerModulosPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/modulos`,
        params: {
          pagina: pagina,
          limite: limite,
          ...(filtroBuscar.length == 0 ? {} : { filtro: filtroBuscar }),
        },
      })
      setModulosData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorModulosData(null)
    } catch (e) {
      imprimir(`Error al obtener módulos`, e)
      setErrorModulosData(e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const obtenerSeccionesPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/modulos`,
        params: {
          pagina: 1,
          limite: 20,
          seccion: true,
        },
      })
      setSeccionesData(respuesta.datos?.filas)
    } catch (e) {
      imprimir(`Error al obtener secciones`, e)
      setErrorModulosData(e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  /// Método que muestra alerta de cambio de estado

  const editarEstadoModuloModal = async (modulo: ModuloCRUDType) => {
    setModuloEdicion(modulo) // para mostrar datos de modal en la alerta
    setMostrarAlertaEstadoModulo(true) // para mostrar alerta de modulo
  }

  const cancelarAlertaEstadoModulo = async () => {
    setMostrarAlertaEstadoModulo(false)
    await delay(500) // para no mostrar undefined mientras el modal se cierra
    setModuloEdicion(null)
  }

  /// Método que oculta la alerta de cambio de estado y procede al cambio
  const aceptarAlertaEstadoModulo = async () => {
    setMostrarAlertaEstadoModulo(false)
    if (moduloEdicion) {
      await cambiarEstadoModuloPeticion(moduloEdicion)
    }
    setModuloEdicion(null)
  }

  /// Petición que cambia el estado de un módulo
  const cambiarEstadoModuloPeticion = async (modulo: ModuloCRUDType) => {
    try {
      setLoading(true)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/modulos/${modulo.id}/${
          modulo.estado == 'ACTIVO' ? 'inactivacion' : 'activacion'
        }`,
        tipo: 'patch',
      })
      imprimir(`respuesta estado modulo: ${respuesta}`)
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: 'success',
      })
      await obtenerModulosPeticion()
    } catch (e) {
      imprimir(`Error estado modulo`, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const columnas: Array<ColumnaType> = [
    { campo: 'icono', nombre: 'Icono' },
    { campo: 'orden', nombre: 'Orden' },
    { campo: 'nombre', nombre: 'Nombre' },
    { campo: 'label', nombre: 'Label' },
    { campo: 'descripcion', nombre: 'Descripción' },
    { campo: 'url', nombre: 'URL' },
    { campo: 'estado', nombre: 'Estado' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = modulosData.map(
    (moduloData, indexModulo) => [
      <Typography
        key={`${moduloData.id}-${indexModulo}-icono`}
        variant={'body2'}
      >
        {moduloData.modulo === null ? (
          <></>
        ) : (
          <Icono color="inherit">{`${moduloData.propiedades.icono}`}</Icono>
        )}
      </Typography>,
      <Typography
        key={`${moduloData.id}-${indexModulo}-orden`}
        variant={'body2'}
      >
        {moduloData.propiedades.orden}
      </Typography>,
      <Typography
        key={`${moduloData.id}-${indexModulo}-nombre`}
        variant={'body2'}
      >{`${moduloData.nombre}`}</Typography>,
      <Typography
        key={`${moduloData.id}-${indexModulo}-label`}
        variant={'body2'}
      >{`${moduloData.label}`}</Typography>,
      <Typography
        key={`${moduloData.id}-${indexModulo}-descripcion`}
        variant={'body2'}
      >{`${
        moduloData.propiedades?.descripcion
          ? moduloData.propiedades.descripcion
          : ''
      }`}</Typography>,

      <Typography key={`${moduloData.id}-${indexModulo}-url`} variant={'body2'}>
        {`${moduloData.url}`}
      </Typography>,

      <CustomMensajeEstado
        key={`${moduloData.id}-${indexModulo}-estado`}
        titulo={moduloData.estado}
        descripcion={moduloData.estado}
        color={
          moduloData.estado == 'ACTIVO'
            ? 'success'
            : moduloData.estado == 'INACTIVO'
            ? 'error'
            : 'info'
        }
      />,
      <Grid key={`${moduloData.id}-${indexModulo}-accion`}>
        <Grid key={`${moduloData.id}-${indexModulo}-acciones`}>
          {permisos.update && (
            <IconoTooltip
              id={'cambiarEstadoModulo'}
              titulo={moduloData.estado == 'ACTIVO' ? 'Inactivar' : 'Activar'}
              color={moduloData.estado == 'ACTIVO' ? 'success' : 'error'}
              accion={async () => {
                await editarEstadoModuloModal({
                  ...moduloData,
                  ...{ esSeccion: moduloData?.modulo == null },
                })
              }}
              desactivado={moduloData.estado == 'PENDIENTE'}
              icono={moduloData.estado == 'ACTIVO' ? 'toggle_on' : 'toggle_off'}
              name={
                moduloData.estado == 'ACTIVO'
                  ? 'Inactivar Módulo'
                  : 'Activar Módulo'
              }
            />
          )}

          {permisos.update && (
            <IconoTooltip
              id={'editarModulo'}
              titulo={'Editar'}
              color={'primary'}
              accion={() => {
                imprimir(`Editaremos :`, moduloData)
                editarModuloModal({
                  ...moduloData,
                  ...{ esSeccion: moduloData?.modulo == null },
                })
              }}
              icono={'edit'}
              name={'Editar módulo'}
            />
          )}
        </Grid>
      </Grid>,
    ]
  )
  return (
    <>
      <AlertDialog
        isOpen={mostrarAlertaEstadoModulo}
        titulo={'Alerta'}
        texto={`¿Está seguro de ${
          moduloEdicion?.estado == 'ACTIVO' ? 'inactivar' : 'activar'
        } el módulo: ${titleCase(moduloEdicion?.nombre ?? '')} ?`}
      >
        <Button onClick={cancelarAlertaEstadoModulo}>Cancelar</Button>
        <Button onClick={aceptarAlertaEstadoModulo}>Aceptar</Button>
      </AlertDialog>
      <CustomDialog
        isOpen={modalModulo}
        handleClose={cerrarModalModulo}
        title={
          moduloEdicion?.id
            ? moduloEdicion.esSeccion
              ? 'Editar Sección'
              : 'Editar Módulo'
            : moduloEdicion?.esSeccion
            ? 'Nueva Sección'
            : 'Nuevo Módulo'
        }
      >
        <VistaModalModulo
          modulo={moduloEdicion}
          accionCorrecta={() => {
            cerrarModalModulo().finally()
            obtenerSeccionesPeticion().then(() => {
              obtenerModulosPeticion().finally()
            })
          }}
          accionCancelar={cerrarModalModulo}
          modulos={seccionesData}
        />
      </CustomDialog>

      <LayoutUser title={`Módulos - ${siteName()}`}>
        <CustomDataTable
          titulo={'Módulos'}
          error={!!errorModulosData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          paginacion={paginacion}
          contenidoTabla={contenidoTabla}
          filtros={
            mostrarFiltroModulo && (
              <FiltroModulos
                filtroModulo={filtroBuscar}
                accionCorrecta={(filtros) => {
                  setPagina(1)
                  setLimite(10)
                  setFiltroBuscar(filtros.buscar)
                }}
                accionCerrar={() => {}}
              />
            )
          }
        />
      </LayoutUser>
    </>
  )
}
export default Modulos
