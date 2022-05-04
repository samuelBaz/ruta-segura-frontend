import type { NextPage } from 'next'
import { Button, Grid, Typography } from '@mui/material'
import { useAuth } from '../../context/auth'
import { LayoutUser } from '../../common/components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import {
  CasbinTypes,
  ColumnaType,
  PoliticaCRUDType,
  RolType,
} from '../../common/types'
import {
  Alertas,
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../../common/components/ui'
import {
  delay,
  imprimir,
  InterpreteMensajes,
  siteName,
  titleCase,
} from '../../common/utils'
import { Constantes } from '../../config'
import { Paginacion } from '../../common/components/ui/Paginacion'
import { useRouter } from 'next/router'
import { VistaModalPolitica } from '../../modules/admin/politicas'

const Politicas: NextPage = () => {
  const [politicasData, setPoliticasData] = useState<PoliticaCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorData, setErrorData] = useState<any>()
  const [modalPolitica, setModalPolitica] = useState(false)

  /// Indicador para mostrar una vista de alerta
  const [mostrarAlertaEliminarPolitica, setMostrarAlertaEliminarPolitica] =
    useState(false)

  const [politicaEdicion, setPoliticaEdicion] = useState<
    PoliticaCRUDType | undefined
  >()

  // Roles de usuario
  const [rolesData, setRolesData] = useState<RolType[]>([])

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
        {permisos.update && (
          <IconoTooltip
            titulo={'Editar'}
            color={'primary'}
            accion={() => {
              imprimir(`Editaremos : ${JSON.stringify(politicaData)}`)
              editarPoliticaModal(politicaData)
            }}
            icono={'edit'}
            name={'Editar política'}
          />
        )}

        {permisos.delete && (
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
        )}
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    permisos.create && (
      <IconoTooltip
        titulo={'Agregar política'}
        key={`accionAgregarPolitica`}
        accion={() => {
          agregarPoliticaModal()
        }}
        icono={'add_circle_outline'}
        name={'Agregar política'}
      />
    ),
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
      setErrorData(null)
    } catch (e) {
      imprimir(`Error al obtener políticas: ${e}`)
      setErrorData(e)
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

  const agregarPoliticaModal = () => {
    setPoliticaEdicion(undefined)
    setModalPolitica(true)
  }
  const editarPoliticaModal = (politica: PoliticaCRUDType) => {
    setPoliticaEdicion(politica)
    setModalPolitica(true)
  }

  const cerrarModalPolitica = async () => {
    setModalPolitica(false)
    await delay(500)
    setPoliticaEdicion(undefined)
  }

  const obtenerRolesPeticion = async () => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/roles`,
      })
      setRolesData(respuesta.datos)
      setErrorData(null)
    } catch (e) {
      imprimir(`Error al obtener roles: ${e}`)
      setErrorData(e)
      Alertas.error(InterpreteMensajes(e))
    } finally {
    }
  }

  async function definirPermisos() {
    setPermisos(await interpretarPermiso(router.pathname))
  }

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

  useEffect(() => {
    if (estaAutenticado)
      obtenerRolesPeticion().then(() => {
        obtenerPoliticasPeticion().finally(() => {})
      })
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
        <VistaModalPolitica
          politica={politicaEdicion}
          roles={rolesData}
          accionCorrecta={() => {
            cerrarModalPolitica()
            obtenerPoliticasPeticion().finally()
          }}
          accionCancelar={cerrarModalPolitica}
        />
      </CustomDialog>
      <LayoutUser title={`Políticas - ${siteName()}`}>
        <CustomDataTable
          titulo={'Políticas'}
          error={!!errorData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          contenidoTabla={contenidoTabla}
          paginacion={
            <Paginacion
              pagina={pagina}
              limite={limite}
              total={total}
              cambioPagina={setPagina}
              cambioLimite={setLimite}
            />
          }
        />
      </LayoutUser>
    </>
  )
}
export default Politicas
