import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, PoliticaCRUDType } from '../types'
import {
  Alertas,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../components/ui'
import { imprimir, InterpreteMensajes } from '../utils'
import { Constantes } from '../config'
import { Paginacion } from '../components/ui/Paginacion'
import { useFirstMountState } from 'react-use'

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
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(politicaData)}`)
            editarPoliticaModal(politicaData)
          }}
          icono={'edit'}
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
        await obtenerPoliticas()
      }}
      icono={'refresh'}
      name={'Actualizar lista de políticas'}
    />,
  ]

  const obtenerPoliticas = async () => {
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
    if (estaAutenticado) obtenerPoliticas().finally(() => {})
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
