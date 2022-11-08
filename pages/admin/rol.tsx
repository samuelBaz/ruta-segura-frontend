import type { NextPage } from 'next'
import { Button, Grid, Typography } from '@mui/material'
import { useAuth } from '../../context/auth'
import { LayoutUser } from '../../common/components/layouts'
import { ReactNode, useEffect, useState } from 'react'
import { CasbinTypes, ColumnaType } from '../../common/types'
import {
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../../common/components/ui'
import { delay, InterpreteMensajes, siteName, titleCase } from '../../common/utils'
import { Constantes } from '../../config'

import { Paginacion } from '../../common/components/ui/Paginacion'
import { useRouter } from 'next/router'
import { useAlerts } from '../../common/hooks'
import { imprimir } from '../../common/utils/imprimir'
import { RolCRUDType } from '../../modules/admin/rol/types/rolCRUDType'
import CustomMensajeEstado from '../../common/components/ui/CustomMensajeEstado'
import { VistaModalRol } from '../../modules/admin/rol/ui/ModalRol'

const Rol: NextPage = () => {
  const [rolData, setrolData] = useState<RolCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Hook para mostrar alertas
  const { Alerta } = useAlerts()
  const [errorRolData, setErrorRolData] = useState<any>()

  const [modalRol, setModalRol] = useState(false)

  const [rolEdicion, setrolEdicion] = useState<
    RolCRUDType | undefined
  >()

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const { sesionPeticion, estaAutenticado, interpretarPermiso } = useAuth()

  // Permisos para acciones
  const [permisos, setPermisos] = useState<CasbinTypes>({
    read: false,
    create: false,
    update: false,
    delete: false,
  })

  const [mostrarAlertaEstadoRol, setMostrarAlertaEstadoRol] =
    useState(false)

  const editarEstadoRolModal = async (rol: RolCRUDType) => {
    setrolEdicion(rol) // para mostrar datos de Rol en la alerta
    setMostrarAlertaEstadoRol(true) // para mostrar alerta de Rols
  }
  
  const cancelarAlertaEstadoRol = async () => {
    setMostrarAlertaEstadoRol(false)
    await delay(500)
    setrolEdicion(undefined)
  }

  const aceptarAlertaEstadoRol = async () => {
    setMostrarAlertaEstadoRol(false)
    if (rolEdicion) {
      await cambiarEstadoRolPeticion(rolEdicion)
    }
    setrolEdicion(undefined)
  }

  // router para conocer la ruta actual
  const router = useRouter()

  const columnas: Array<ColumnaType> = [
    { campo: 'rol', nombre: 'Rol' },
    { campo: 'nombre', nombre: 'Nombre' },
    { campo: 'estado', nombre: 'Estado' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = rolData.map(
    (rolData, indexRol) => [
      <Typography
        key={`${rolData.id}-${indexRol}-rol`}
        variant={'body2'}
      >
        {`${rolData.rol}`}
      </Typography>,
      <Typography
        key={`${rolData.id}-${indexRol}-nombre`}
        variant={'body2'}
      >{`${rolData.nombre}`}</Typography>,
      <Typography
        key={`${rolData.id}-${indexRol}-estado`}
        component={'div'}
      >
        <CustomMensajeEstado
          titulo={rolData.estado}
          descripcion={rolData.estado}
          color={
            rolData.estado == 'ACTIVO'
              ? 'success'
              : rolData.estado == 'INACTIVO'
              ? 'error'
              : 'info'
          }
        />
      </Typography>,
      <Grid key={`${rolData.id}-${indexRol}-accion`}>
        {permisos.update && (
          <IconoTooltip
            titulo={rolData.estado == 'ACTIVO' ? 'Inactivar' : 'Activar'}
            color={rolData.estado == 'ACTIVO' ? 'success' : 'error'}
            accion={async () => {
              await editarEstadoRolModal(rolData)
            }}
            desactivado={rolData.estado == 'PENDIENTE'}
            icono={rolData.estado == 'ACTIVO' ? 'toggle_on' : 'toggle_off'}
            name={
              rolData.estado == 'ACTIVO'
                ? 'Inactivar Rol'
                : 'Activar Rol'
            }
          />
        )}
        {permisos.update && (
          <IconoTooltip
            titulo={'Editar'}
            color={'primary'}
            accion={() => {
              imprimir(`Editaremos`, rolData)
              editarRolModal(rolData)
            }}
            icono={'edit'}
            name={'Parámetros'}
          />
        )}
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    // <ToggleButton
    //   key={'accionFiltrarRolToggle'}
    //   value="check"
    //   sx={{
    //     '&.MuiToggleButton-root': {
    //       borderRadius: '4px !important',
    //       border: '0px solid lightgrey !important',
    //     },
    //   }}
    //   size={'small'}
    //   selected={mostrarFiltroRols}
    //   onChange={() => {
    //     setMostrarFiltroRols(!mostrarFiltroRols)
    //   }}
    // >
    //   <Icono>search</Icono>
    // </ToggleButton>,
    permisos.create && (
      <IconoTooltip
        titulo={'Agregar parámetro'}
        key={`accionAgregarRol`}
        accion={() => {
          agregarRolModal()
        }}
        icono={'add_circle_outline'}
        name={'Agregar parámetro'}
      />
    ),
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarRol`}
      accion={async () => {
        await obtenerRolsPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de parámetros'}
    />,
  ]

  const cambiarEstadoRolPeticion = async (rol: RolCRUDType) => {
    try {
      setLoading(true)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/roles/${rol.id}/${
          rol.estado == 'ACTIVO' ? 'inactivacion' : 'activacion'
        }`,
        tipo: 'patch',
      })
      imprimir(`respuesta inactivar rol: ${respuesta}`)
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: 'success',
      })
      await obtenerRolsPeticion()
    } catch (e) {
      imprimir(`Error al inactivar rol`, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const obtenerRolsPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/roles/table`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      })
      setrolData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorRolData(null)
    } catch (e) {
      imprimir(`Error al obtener Rols`, e)
      setErrorRolData(e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const agregarRolModal = () => {
    setrolEdicion(undefined)
    setModalRol(true)
  }
  const editarRolModal = (Rol: RolCRUDType) => {
    setrolEdicion(Rol)
    setModalRol(true)
  }

  const cerrarModalRol = async () => {
    setModalRol(false)
    await delay(500)
    setrolEdicion(undefined)
  }

  async function definirPermisos() {
    setPermisos(await interpretarPermiso(router.pathname))
  }
  

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

  useEffect(() => {
    if (estaAutenticado) obtenerRolsPeticion().finally(() => {})
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
      <AlertDialog
        isOpen={mostrarAlertaEstadoRol}
        titulo={'Alerta'}
        texto={`¿Está seguro de ${
          rolEdicion?.estado == 'ACTIVO' ? 'inactivar' : 'activar'
        } a ${titleCase(rolEdicion?.nombre ?? '')} ?`}
      >
        <Button onClick={cancelarAlertaEstadoRol}>Cancelar</Button>
        <Button onClick={aceptarAlertaEstadoRol}>Aceptar</Button>
      </AlertDialog>
      <CustomDialog
        isOpen={modalRol}
        handleClose={cerrarModalRol}
        title={rolEdicion ? 'Editar rol' : 'Nuevo rol'}
      >
        <VistaModalRol
          rol={rolEdicion}
          accionCorrecta={() => {
            cerrarModalRol().finally()
            obtenerRolsPeticion().finally()
          }}
          accionCancelar={cerrarModalRol}
        />
      </CustomDialog>
      <LayoutUser title={`Rol - ${siteName()}`}>
        <CustomDataTable
          titulo={'Roles'}
          error={!!errorRolData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          paginacion={paginacion}
          contenidoTabla={contenidoTabla}
          filtros={
            <></>
          }
        />
      </LayoutUser>
    </>
  )
}
export default Rol
