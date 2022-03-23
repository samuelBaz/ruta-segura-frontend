import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, PoliticaCRUDType } from '../types'
import { Alertas, CustomDataTable, IconoTooltip } from '../components/ui'
import { delay, imprimir, InterpreteMensajes } from '../utils'
import { Constantes } from '../config'
import { CustomDialog } from '../components/ui/CustomDialog'

export interface ModalPoliticaType {
  politica?: PoliticaCRUDType
}

const Politicas: NextPage = () => {
  const [politicasData, setPoliticasData] = useState<PoliticaCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorPoliticasData, setErrorPoliticasData] = useState<any>()

  const [modalPolitica, setModalPolitica] = useState(false)

  const [politicaEdicion, setPoliticaEdicion] = useState<
    PoliticaCRUDType | undefined
  >()

  const { sesionPeticion } = useAuth()

  const columnas: Array<ColumnaType> = [
    { campo: 'sujeto', nombre: 'Sujeto' },
    { campo: 'objeto', nombre: 'Objeto' },
    { campo: 'accion', nombre: 'Acción' },
    { campo: 'app', nombre: 'App' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = politicasData.map(
    (politicaData) => [
      <Typography variant={'body2'}>{`${politicaData.sujeto}`}</Typography>,
      <Typography variant={'body2'}>{`${politicaData.objeto}`}</Typography>,
      <Typography variant={'body2'}>{`${politicaData.accion}`}</Typography>,
      <Typography variant={'body2'}>{`${politicaData.app}`}</Typography>,

      <Grid>
        <IconoTooltip
          titulo={'Editar'}
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(politicaData)}`)
            editarPoliticaModal(politicaData)
          }}
          icono={'edit'}
        />
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <IconoTooltip
      titulo={'Agregar política'}
      accion={() => {
        agregarPoliticaModal()
      }}
      icono={'add'}
    />,
    <IconoTooltip titulo={'Buscar'} accion={() => {}} icono={'search'} />,
    <IconoTooltip
      titulo={'Actualizar'}
      accion={async () => {
        await obtenerPoliticas()
      }}
      icono={'refresh'}
    />,
  ]

  const obtenerPoliticas = async () => {
    try {
      setLoading(true)
      await delay(1000)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/politicas`,
      })
      setPoliticasData(respuesta.datos?.filas)
      setErrorPoliticasData(null)
    } catch (e) {
      imprimir(`Error al obtener políticas: ${e}`)
      setErrorPoliticasData(e)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoading(false)
    }
  }

  const VistaModalPolitica = ({ politica }: ModalPoliticaType) => {
    return (
      <Typography>
        {politica ? `Politica: ${JSON.stringify(politica)}` : 'Nueva politica'}
      </Typography>
    )
  }

  const agregarPoliticaModal = () => {
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
    obtenerPoliticas().finally(() => {})
  }, [])

  return (
    <>
      <CustomDialog
        isOpen={modalPolitica}
        handleClose={cerrarModalPolitica}
        title={'Información'}
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
        />
      </LayoutUser>
    </>
  )
}
export default Politicas
