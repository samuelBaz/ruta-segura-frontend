import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, ParametroCRUDType } from '../types'
import { Alertas, CustomDataTable, IconoTooltip } from '../components/ui'
import { delay, imprimir, InterpreteMensajes } from '../utils'
import { Constantes } from '../config'
import { CustomDialog } from '../components/ui/CustomDialog'

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

  const { sesionPeticion } = useAuth()

  const columnas: Array<ColumnaType> = [
    { campo: 'nombre', nombre: 'Nombre' },
    { campo: 'codigo', nombre: 'Código' },
    { campo: 'grupo', nombre: 'Grupo' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = parametrosData.map(
    (parametroData, indexParametro) => [
      <Typography
        key={`${parametroData.id}-${indexParametro}-nombre`}
        variant={'body2'}
      >
        {`${parametroData.nombre}`}
      </Typography>,
      <Typography
        key={`${parametroData.id}-${indexParametro}-codigo`}
        variant={'body2'}
      >{`${parametroData.codigo}`}</Typography>,
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
      icono={'add'}
    />,
    <IconoTooltip
      titulo={'Buscar'}
      key={`accionBuscarParametro`}
      accion={() => {}}
      icono={'search'}
    />,
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarParametro`}
      accion={async () => {
        await obtenerParametros()
      }}
      icono={'refresh'}
    />,
  ]

  const obtenerParametros = async () => {
    try {
      setLoading(true)
      await delay(1000)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/parametros`,
      })
      setParametrosData(respuesta.datos?.filas)
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
    obtenerParametros().finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        />
      </LayoutUser>
    </>
  )
}
export default Parametros
