import type { NextPage } from 'next'
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { LayoutUser } from '../components/layouts'
import {
  Alertas,
  AlertDialog,
  CustomDataTable,
  IconoTooltip,
} from '../components/ui/'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnaType, RolType, UsuarioCRUDType } from '../types'
import { Constantes } from '../config'
import { imprimir, InterpreteMensajes, titleCase } from '../utils'
import { useAuth } from '../context/auth'
import { CampoNombre, CustomDialog } from '../components/ui'
import { useForm } from 'react-hook-form'
import { useFirstMountState } from 'react-use'

export interface ModalUsuarioType {
  usuario?: UsuarioCRUDType | undefined | null
}

type FormData = {
  nroDocumento: string
  nombres: string
  primerApellido: string
  segundoApellido: string
  fechaNacimiento: string
  correoElectronico: string
}

const Usuarios: NextPage = () => {
  // data de usuarios
  const [usuariosData, setUsuariosData] = useState<UsuarioCRUDType[]>([])

  // Flag que indica que hay un proceso cargando visualmente
  const [loading, setLoading] = useState<boolean>(true)

  /// Indicador de error en una petición
  const [errorData, setErrorData] = useState<any>()

  /// Indicador para mostrar una ventana modal de usuario
  const [modalUsuario, setModalUsuario] = useState(false)

  /// Indicador para mostrar una vista de alerta
  const [mostrarAlertaEstadoUsuario, setMostrarAlertaEstadoUsuario] =
    useState(false)

  /// Variable que contiene el estado del usuario que se esta editando
  const [usuarioEdicion, setUsuarioEdicion] = useState<
    UsuarioCRUDType | undefined | null
  >()

  // Roles de usuario
  const [rolesData, setRolesData] = useState<RolType[]>([])

  // Verificar primer render
  const isFirstMount = useFirstMountState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const { sesionPeticion, estaAutenticado } = useAuth()

  const columnas: Array<ColumnaType> = [
    { campo: 'nro_documento', nombre: 'Nroa. Documento' },
    { campo: 'persona', nombre: 'Persona' },
    { campo: 'usuario', nombre: 'Usuario' },
    { campo: 'rol', nombre: 'Roles' },
    { campo: 'estado', nombre: 'Estado' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = usuariosData.map(
    (usuarioData, indexUsuario) => [
      <Typography
        key={`${usuarioData.id}-${indexUsuario}-tipoDoc`}
        variant={'body2'}
      >
        {`${usuarioData.persona.tipoDocumento} ${usuarioData.persona.nroDocumento}`}
      </Typography>,
      <Typography
        key={`${usuarioData.id}-${indexUsuario}-nombres`}
        variant={'body2'}
      >
        {`${usuarioData.persona.nombres} ${usuarioData.persona.primerApellido} ${usuarioData.persona.segundoApellido}`}
      </Typography>,
      <Typography
        key={`${usuarioData.id}-${indexUsuario}-usuario`}
        variant={'body2'}
      >
        {usuarioData.usuario}
      </Typography>,
      <Grid key={`${usuarioData.id}-${indexUsuario}-roles`}>
        {usuarioData.usuarioRol.map((itemUsuarioRol, indexUsuarioRol) => (
          <Chip
            key={`usuario-rol-${indexUsuarioRol}`}
            label={itemUsuarioRol.rol.rol}
          />
        ))}
      </Grid>,
      <Typography key={`${usuarioData.id}-${indexUsuario}-estado`}>
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
      <Grid key={`${usuarioData.id}-${indexUsuario}-acciones`}>
        <IconoTooltip
          titulo={usuarioData.estado == 'ACTIVO' ? 'Inactivar' : 'Activar'}
          color={usuarioData.estado == 'ACTIVO' ? 'success' : 'error'}
          accion={async () => {
            imprimir(`estado: ${usuarioData.estado}`)
            await editarEstadoUsuarioModal(usuarioData)
          }}
          desactivado={usuarioData.estado == 'PENDIENTE'}
          icono={usuarioData.estado == 'ACTIVO' ? 'toggle_on' : 'toggle_off'}
          name={
            usuarioData.estado == 'ACTIVO'
              ? 'Inactivar Usuario'
              : 'Activar Usuario'
          }
        />
        <IconoTooltip
          titulo={'Restablecer contraseña'}
          color={'info'}
          accion={() => {
            imprimir(`Restablecer : ${JSON.stringify(usuarioData)}`)
          }}
          icono={'vpn_key'}
          name={'Restablecer contraseña'}
        />
        <IconoTooltip
          titulo={'Editar'}
          accion={() => {
            imprimir(`Editaremos : ${JSON.stringify(usuarioData)}`)
            editarUsuarioModal(usuarioData)
          }}
          icono={'edit'}
          name={'Editar usuario'}
        />
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <IconoTooltip
      titulo={'Agregar usuario'}
      key={`accionAgregarUsuario`}
      accion={() => {
        agregarUsuarioModal()
      }}
      icono={'add_circle_outline'}
      name={'Agregar usuario'}
    />,
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarUsuario`}
      accion={async () => {
        await obtenerUsuariosPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de usuario'}
    />,
  ]

  const filtros: Array<ReactNode> = [
    <CampoNombre key={`filtro1`} name={'Nro. Documento'}>
      <TextField sx={{ width: '100%' }} />
    </CampoNombre>,
    <CampoNombre key={`filtro2`} name={'Datos personales'}>
      <TextField sx={{ width: '100%' }} />
    </CampoNombre>,
    <CampoNombre key={`filtro3`} name={'Roles'}>
      <TextField sx={{ width: '100%' }} />
    </CampoNombre>,
  ]

  const obtenerUsuariosPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios`,
      })
      setUsuariosData(respuesta.datos?.filas)
      setErrorData(null)
    } catch (e) {
      imprimir(`Error al obtener usuarios: ${e}`)
      setErrorData(e)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoading(false)
    }
  }

  const obtenerRolesPeticion = async () => {
    try {
      setLoading(true)
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
      <form
        onSubmit={handleSubmit((data) => {
          imprimir(data)
        })}
      >
        <Grid container direction={'column'} justifyContent="space-evenly">
          <Box height={'10px'} />
          <Typography
            color="text.secondary"
            sx={{ fontSize: 14, fontWeight: 'bold' }}
          >
            Datos personales
          </Typography>
          <Box height={'10px'} />
          <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
            <Grid item xs={12} sm={12} md={4}>
              <CampoNombre name={'Nro. documento'}>
                <TextField
                  sx={{ width: '100%' }}
                  defaultValue={usuario?.persona.nroDocumento}
                  {...register('nroDocumento', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.nroDocumento}
                  helperText={errors.nroDocumento?.message}
                />
              </CampoNombre>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CampoNombre name={'Nombre'}>
                <TextField
                  sx={{ width: '100%' }}
                  defaultValue={usuario?.persona.nombres}
                  {...register('nombres', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.nombres}
                  helperText={errors.nombres?.message}
                />
              </CampoNombre>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CampoNombre name={'Primer apellido'}>
                <TextField
                  sx={{ width: '100%' }}
                  defaultValue={usuario?.persona.primerApellido}
                  {...register('primerApellido', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.primerApellido}
                  helperText={errors.primerApellido?.message}
                />
              </CampoNombre>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CampoNombre name={'Segundo apellido'}>
                <TextField
                  sx={{ width: '100%' }}
                  defaultValue={usuario?.persona.segundoApellido}
                  {...register('segundoApellido', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.segundoApellido}
                  helperText={errors.segundoApellido?.message}
                />
              </CampoNombre>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CampoNombre name={'Fecha de nacimiento'}>
                <TextField
                  sx={{ width: '100%' }}
                  defaultValue={usuario?.persona.fechaNacimiento}
                  {...register('fechaNacimiento', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.fechaNacimiento}
                  helperText={errors.fechaNacimiento?.message}
                />
              </CampoNombre>
            </Grid>
          </Grid>
          <Grid>
            <Box height={'10px'} />
            <CampoNombre name={'Datos de usuario'} />
            <Box height={'10px'} />
            <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
              <Grid item xs={12} sm={12} md={4}>
                <CampoNombre name={'Roles'} />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <CampoNombre name={'Correo electrónico'}>
                  <TextField
                    sx={{ width: '100%' }}
                    defaultValue={usuario?.correoElectronico}
                    {...register('correoElectronico', {
                      required: 'Este campo es requerido',
                    })}
                    error={!!errors.correoElectronico}
                    helperText={errors.correoElectronico?.message}
                  />
                </CampoNombre>
              </Grid>
            </Grid>
          </Grid>
          <Box height={'10px'} />
          <DialogActions
            sx={{
              justifyContent: {
                lg: 'flex-end',
                md: 'flex-end',
                xs: 'center',
                sm: 'center',
              },
            }}
          >
            <Button variant={'outlined'}>Cancelar</Button>
            <Button variant={'contained'}>Aceptar</Button>
          </DialogActions>
        </Grid>
      </form>
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
    if (estaAutenticado)
      if (isFirstMount)
        obtenerRolesPeticion()
          .then(() => {
            obtenerUsuariosPeticion()
              .catch(() => {})
              .finally(() => {})
          })
          .catch(() => {})
          .finally(() => {})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

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
          error={!!errorData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          filtros={filtros}
          contenidoTabla={contenidoTabla}
        />
      </LayoutUser>
    </>
  )
}

export default Usuarios
