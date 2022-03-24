import type { NextPage } from 'next'
import { Button, Chip, DialogActions, Grid, Typography } from '@mui/material'
import { LayoutUser } from '../components/layouts'
import {
  Alertas,
  AlertDialog,
  CustomDataTable,
  IconoTooltip,
} from '../components/ui/'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, UsuarioCRUDType } from '../types'
import { Constantes } from '../config'
import { delay, imprimir, InterpreteMensajes, titleCase } from '../utils'
import { useAuth } from '../context/auth'
import { CustomDialog } from '../components/ui'

export interface ModalUsuarioType {
  usuario?: UsuarioCRUDType | undefined | null
}

const Usuarios: NextPage = () => {
  const [usuariosData, setUsuariosData] = useState<UsuarioCRUDType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorUsuariosData, setErrorUsuariosData] = useState<any>()

  const [modalUsuario, setModalUsuario] = useState(false)
  const [mostrarAlertaEstadoUsuario, setMostrarAlertaEstadoUsuario] =
    useState(false)

  const [usuarioEdicion, setUsuarioEdicion] = useState<
    UsuarioCRUDType | undefined | null
  >()

  const { sesionPeticion } = useAuth()

  const columnas: Array<ColumnaType> = [
    { campo: 'nro_documento', nombre: 'Nro. Documento' },
    { campo: 'persona', nombre: 'Persona' },
    { campo: 'usuario', nombre: 'Usuario' },
    { campo: 'rol', nombre: 'Roles' },
    { campo: 'estado', nombre: 'Estado' },
    { campo: 'acciones', nombre: 'Acciones' },
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
        {usuarioData.usuarioRol.map((itemUsuarioRol, indexUsuarioRol) => (
          <Chip
            key={`usuario-rol-${indexUsuarioRol}`}
            label={itemUsuarioRol.rol.rol}
          />
        ))}
      </Grid>,
      <Typography>
        <Button
          variant="outlined"
          sx={{ borderRadius: 12 }}
          color={
            usuarioData.estado == 'ACTIVO'
              ? 'success'
              : usuarioData.estado == 'INACTIVO'
              ? 'error'
              : 'info'
          }
        >
          {usuarioData.estado}
        </Button>
      </Typography>,
      <Grid>
        <IconoTooltip
          titulo={usuarioData.estado == 'ACTIVO' ? 'Inactivar' : 'Activar'}
          color={usuarioData.estado == 'ACTIVO' ? 'success' : 'error'}
          accion={async () => {
            imprimir(`estado: ${usuarioData.estado}`)
            await editarEstadoUsuarioModal(usuarioData)
          }}
          desactivado={usuarioData.estado == 'PENDIENTE'}
          icono={usuarioData.estado == 'ACTIVO' ? 'toggle_on' : 'toggle_off'}
        />
        <IconoTooltip
          titulo={'Restablecer contraseña'}
          color={'info'}
          accion={() => {
            imprimir(`Restablecer : ${JSON.stringify(usuarioData)}`)
          }}
          icono={'vpn_key'}
        />
        <IconoTooltip
          titulo={'Editar'}
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(usuarioData)}`)
            editarUsuarioModal(usuarioData)
          }}
          icono={'edit'}
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
        await obtenerUsuariosPeticion()
      }}
      icono={'refresh'}
    />,
  ]

  const obtenerUsuariosPeticion = async () => {
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

  const cambiarEstadoUsuarioPeticion = async (usuario: UsuarioCRUDType) => {
    try {
      setLoading(true)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios/${usuario.id}/${
          usuario.estado == 'ACTIVO' ? 'inactivacion' : 'activacion'
        }`,
        tipo: 'patch',
      })
      imprimir(`respuesta inactivar usuario: ${respuesta}`)
      Alertas.correcto(InterpreteMensajes(respuesta))
      await obtenerUsuariosPeticion()
    } catch (e) {
      imprimir(`Error al inactivar usuarios: ${e}`)
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

  /// Métodos para agregar, editar usuarios

  const agregarUsuarioModal = () => {
    setModalUsuario(true)
  }
  const editarUsuarioModal = (usuario: UsuarioCRUDType) => {
    setUsuarioEdicion(usuario)
    setModalUsuario(true)
  }

  const cerrarModalUsuario = () => {
    setUsuarioEdicion(null)
    setModalUsuario(false)
  }

  /// Métodos para alerta de cambiar de estado

  const editarEstadoUsuarioModal = async (usuario: UsuarioCRUDType) => {
    setUsuarioEdicion(usuario) // para mostrar datos de usuario en la alerta
    setMostrarAlertaEstadoUsuario(true) // para mostrar alerta de usuarios
  }

  const cancelarAlertaEstadoUsuario = () => {
    setUsuarioEdicion(null)
    setMostrarAlertaEstadoUsuario(false)
  }

  const aceptarAlertaEstadoUsuario = async () => {
    setMostrarAlertaEstadoUsuario(false)
    if (usuarioEdicion) {
      await cambiarEstadoUsuarioPeticion(usuarioEdicion)
    }
  }

  useEffect(() => {
    obtenerUsuariosPeticion().finally(() => {})
  }, [])

  return (
    <>
      <AlertDialog
        isOpen={mostrarAlertaEstadoUsuario}
        titulo={'Alerta'}
        texto={`¿Está seguro de ${
          usuarioEdicion?.estado == 'ACTIVO' ? 'inactivar' : 'activar'
        } a ${titleCase(usuarioEdicion?.persona.nombres ?? '')} ?`}
      >
        <Button onClick={cancelarAlertaEstadoUsuario}>Cancelar</Button>
        <Button onClick={aceptarAlertaEstadoUsuario}>Aceptar</Button>
      </AlertDialog>
      <CustomDialog
        isOpen={modalUsuario}
        handleClose={cerrarModalUsuario}
        title={usuarioEdicion ? 'Editar usuario' : 'Nuevo usuario'}
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
