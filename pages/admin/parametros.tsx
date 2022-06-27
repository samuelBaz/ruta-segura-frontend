import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { useAuth } from '../../context/auth'
import { LayoutUser } from '../../common/components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import { CasbinTypes, ColumnaType } from '../../common/types'
import {
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../../common/components/ui'
import { delay, InterpreteMensajes, siteName } from '../../common/utils'
import { Constantes } from '../../config'

import { Paginacion } from '../../common/components/ui/Paginacion'
import { useRouter } from 'next/router'
import { VistaModalParametro } from '../../modules/admin/parametros'
import { useAlerts } from '../../common/hooks'
import { imprimir } from '../../common/utils/imprimir'
import { ParametroCRUDType } from '../../modules/admin/parametros/parametrosCRUDTypes'

const Parametros: NextPage = () => {
  const [parametrosData, setParametrosData] = useState<ParametroCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Hook para mostrar alertas
  const { Alerta } = useAlerts()
  const [errorParametrosData, setErrorParametrosData] = useState<any>()

  const [modalParametro, setModalParametro] = useState(false)

  const [parametroEdicion, setParametroEdicion] = useState<
    ParametroCRUDType | undefined
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
            color={'primary'}
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
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const agregarParametroModal = () => {
    setParametroEdicion(undefined)
    setModalParametro(true)
  }
  const editarParametroModal = (parametro: ParametroCRUDType) => {
    setParametroEdicion(parametro)
    setModalParametro(true)
  }

  const cerrarModalParametro = async () => {
    setModalParametro(false)
    await delay(500)
    setParametroEdicion(undefined)
  }

  async function definirPermisos() {
    setPermisos(await interpretarPermiso(router.pathname))
  }

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

  useEffect(() => {
    if (estaAutenticado) obtenerParametrosPeticion().finally(() => { })
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
        <VistaModalParametro
          parametro={parametroEdicion}
          accionCorrecta={() => {
            cerrarModalParametro()
            obtenerParametrosPeticion().finally()
          }}
          accionCancelar={cerrarModalParametro}
        />
      </CustomDialog>
      <LayoutUser title={`Parámetros - ${siteName()}`}>
        <CustomDataTable
          titulo={'Parámetros'}
          error={!!errorParametrosData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          paginacion={paginacion}
          contenidoTabla={contenidoTabla}
        />
      </LayoutUser>
    </>
  )
}
export default Parametros
