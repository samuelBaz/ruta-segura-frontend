import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, ParametroCRUDType } from '../types'
import {
  Alertas,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../components/ui'
import { imprimir, InterpreteMensajes } from '../utils'
import { Constantes } from '../config'
import { useFirstMountState } from 'react-use'
import { Paginacion } from '../components/ui/Paginacion'

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

  const { sesionPeticion, estaAutenticado } = useAuth()

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
        <IconoTooltip
          titulo={'Editar'}
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(parametroData)}`)
            editarParametroModal(parametroData)
          }}
          icono={'edit'}
          name={'Parámetros'}
        />
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <IconoTooltip
      titulo={'Agregar parámetro'}
      key={`accionAgregarParametro`}
      accion={() => {
        agregarParametroModal()
      }}
      icono={'add_circle_outline'}
      name={'Agregar parámetro'}
    />,
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarParametro`}
      accion={async () => {
        await obtenerParametros()
      }}
      icono={'refresh'}
      name={'Actualizar lista de parámetros'}
    />,
  ]

  const obtenerParametros = async () => {
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
    return (
      <Typography>
        {parametro
          ? `Parametro: ${JSON.stringify(parametro)}`
          : 'Nuevo parametro'}
      </Typography>
    )
  }

  const agregarParametroModal = () => {
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

  useEffect(() => {
    if (estaAutenticado) obtenerParametros().finally(() => {})
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
        title={'Información'}
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
