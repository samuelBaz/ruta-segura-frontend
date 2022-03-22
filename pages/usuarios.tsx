import type { NextPage } from 'next'
import { Button, Chip, Grid, Typography } from '@mui/material'
import { LayoutUser } from '../components/layouts'
import { Alertas, CustomDataTable, IconoTooltip } from '../components/ui/'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, UsuarioCRUDType } from '../types'
import { Constantes } from '../config'
import { delay, imprimir, InterpreteMensajes } from '../utils'
import { useAuth } from '../context/auth'
import { CustomDialog } from '../components/ui/CustomDialog'

export interface ModalUsuarioType {
  usuario?: UsuarioCRUDType
}

const Usuarios: NextPage = () => {
  const [usuariosData, setUsuariosData] = useState<UsuarioCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorUsuariosData, setErrorUsuariosData] = useState<any>()

  const [modalUsuario, setModalUsuario] = useState(false)

  const [usuarioEdicion, setUsuarioEdicion] = useState<
    UsuarioCRUDType | undefined
  >()

  const { sesionPeticion } = useAuth()

  const columnas: Array<ColumnaType> = [
    { campo: 'nro_documento', nombre: 'Nro. Documento', ordenar: true },
    { campo: 'persona', nombre: 'Persona', ordenar: true },
    { campo: 'usuario', nombre: 'Usuario', ordenar: true },
    { campo: 'rol', nombre: 'Roles', ordenar: true },
    { campo: 'estado', nombre: 'Estado', ordenar: true },
    { campo: 'acciones', nombre: 'Acciones', ordenar: false },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = usuariosData.map(
    (usuarioData) => [
      <Typography variant={'body2'}>
        {`${usuarioData.persona.tipoDocumento} ${usuarioData.persona.nroDocumento}`}
      </Typography>,
      <Typography variant={'body2'}>
        {`${usuarioData.persona.nombres} ${usuarioData.persona.primerApellido} ${usuarioData.persona.segundoApellido}`}
      </Typography>,
      <Typography variant={'body2'}>{usuarioData.usuario}</Typography>,
      <Grid>
        {usuarioData.usuarioRol.map((itemUsuarioRol) => (
          <Chip label={itemUsuarioRol.rol.rol} />
        ))}
      </Grid>,
      <Typography>
        <Button variant="outlined" sx={{ borderRadius: 12 }}>
          {usuarioData.estado}
        </Button>
      </Typography>,
      <Grid>
        <IconoTooltip
          titulo={'Editar'}
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(usuarioData)}`)
            editarUsuarioModal(usuarioData)
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
    <IconoTooltip
      titulo={'Agregar usuario'}
      accion={() => {
        agregarUsuarioModal()
      }}
      icono={'add'}
    />,
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
      imprimir(`Error al obtener usuarios: ${e}`)
      setErrorUsuariosData(e)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoading(false)
    }
  }

  const VistaModalUsuario = ({ usuario }: ModalUsuarioType) => {
    return (
      <Typography>
        {usuario ? `Usuario: ${JSON.stringify(usuario)}` : 'Nuevo usuario'}
      </Typography>
    )
  }

  const agregarUsuarioModal = () => {
    setModalUsuario(true)
  }
  const editarUsuarioModal = (usuario: UsuarioCRUDType) => {
    setUsuarioEdicion(usuario)
    setModalUsuario(true)
  }

  const cerrarModalUsuario = () => {
    setUsuarioEdicion(undefined)
    setModalUsuario(false)
  }

  useEffect(() => {
    obtenerUsuarios().finally(() => {})
  }, [])

  return (
    <>
      <CustomDialog
        isOpen={modalUsuario}
        handleClose={cerrarModalUsuario}
        title={'Información'}
      >
        <VistaModalUsuario usuario={usuarioEdicion} />
      </CustomDialog>
      <LayoutUser title={'Usuarios - Fronted Base'}>
        <CustomDataTable
          titulo={'Usuarios'}
          error={!!errorUsuariosData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          contenidoTabla={contenidoTabla}
        />
      </LayoutUser>
    </>
  )
}
export default Usuarios
