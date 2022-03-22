import type { NextPage } from 'next'
import { Grid, Typography } from '@mui/material'
import { LayoutUser } from '../components/layouts'
import { CustomDataTable, IconoTooltip } from '../components/ui/'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, UsuarioCRUDType } from '../types'
import { Constantes } from '../config'
import { delay, imprimir, InterpreteMensajes } from '../utils'
import { useAuth } from '../context/auth'

const Usuarios: NextPage = () => {
  const [usuariosData, setUsuariosData] = useState<UsuarioCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorUsuariosData, setErrorUsuariosData] = useState<any>()

  const { sesionPeticion } = useAuth()

  const columnas: Array<ColumnaType> = [
    { campo: 'usuario', nombre: 'Usuario', ordenar: true },
    { campo: 'correo', nombre: 'Correo', ordenar: true },
    { campo: 'estado', nombre: 'Estado', ordenar: true },
    { campo: 'acciones', nombre: 'Acciones', ordenar: false },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = usuariosData.map(
    (usuarioData) => [
      <Typography variant={'body2'}>{usuarioData.usuario}</Typography>,
      <Typography variant={'body2'}>
        {usuarioData.correoElectronico}
      </Typography>,
      <Typography>{usuarioData.estado}</Typography>,
      <Grid>
        <IconoTooltip
          titulo={'Editar'}
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(usuarioData)}`)
          }}
          icono={'edit'}
        />
        <IconoTooltip
          titulo={'Restablecer contraseña'}
          accion={() => {
            imprimir(`Restablecer : ${JSON.stringify(usuarioData)}`)
          }}
          icono={'vpn_key'}
        />
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <IconoTooltip titulo={'Agregar usuario'} accion={() => {}} icono={'add'} />,
    <IconoTooltip titulo={'Buscar'} accion={() => {}} icono={'search'} />,
    <IconoTooltip
      titulo={'Actualizar'}
      accion={async () => {
        await obtenerUsuarios()
      }}
      icono={'refresh'}
    />,
  ]

  const obtenerUsuarios = async () => {
    try {
      setLoading(true)
      await delay(1000)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios`,
      })
      setUsuariosData(respuesta.datos?.filas)
      setErrorUsuariosData(null)
    } catch (e) {
      setErrorUsuariosData(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios().finally(() => {})
  }, [])

  return (
    <LayoutUser title={'Usuarios'}>
      {errorUsuariosData ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          justifyItems={'center'}
          style={{ minHeight: '80vh' }}
        >
          <Grid item xs={3} xl={4}>
            <Typography
              variant={'body1'}
              component="h1"
              noWrap={true}
              alignItems={'center'}
            >
              {`${InterpreteMensajes(errorUsuariosData)}`}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <CustomDataTable
          cargando={loading}
          titulo={'Usuarios'}
          acciones={acciones}
          columnas={columnas}
          contenidoTabla={contenidoTabla}
        />
      )}
    </LayoutUser>
  )
}
export default Usuarios
