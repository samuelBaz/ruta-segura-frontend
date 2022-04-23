import type { NextPage } from 'next'
import {
  Box,
  Button,
  Card,
  Chip,
  DialogActions,
  Grid,
  Typography,
} from '@mui/material'
import { LayoutUser } from '../../components/layouts'
import {
  Alertas,
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../../components/ui'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import {
  ColumnaType,
  CrearEditarUsuarioType,
  FiltroUsuariosType,
  RolType,
  UsuarioCRUDType,
} from '../../types'
import { Constantes } from '../../config'
import { delay, imprimir, InterpreteMensajes, titleCase } from '../../utils'
import { useAuth } from '../../context/auth'
import { useForm } from 'react-hook-form'
import {
  FormInputDate,
  FormInputDropdownMultiple,
  FormInputText,
} from '../../components/ui/form'
import { isValidEmail } from '../../utils/validations'
import ProgresoLineal from '../../components/ui/ProgresoLineal'
import { Paginacion } from '../../components/ui/Paginacion'

import { useRouter } from 'next/router'
import { CasbinTypes } from '../../types/casbinTypes'

export interface ModalUsuarioType {
  usuario?: UsuarioCRUDType | undefined | null
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

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  // Variable de filtro

  const [filtro, setFiltro] = useState<string | undefined>('')

  // Proveedor de la sesión
  const { sesionPeticion, estaAutenticado, interpretarPermiso } = useAuth()

  // Permisos para acciones
  const [permisos, setPermisos] = useState<CasbinTypes>({
    create: false,
    update: false,
    delete: false,
  })

  // router para conocer la ruta actual
  const router = useRouter()

  /// Columnas para data table
  const columnas: Array<ColumnaType> = [
    { campo: 'nro_documento', nombre: 'Nro. Documento' },
    { campo: 'persona', nombre: 'Persona' },
    { campo: 'usuario', nombre: 'Usuario' },
    { campo: 'rol', nombre: 'Roles' },
    { campo: 'estado', nombre: 'Estado' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]

  /// Contenido del data table
  const contenidoTabla: Array<Array<ReactNode>> = usuariosData.map(
    (usuarioData, indexUsuario) => [
      <Typography
        key={`${usuarioData.id}-${indexUsuario}-tipoDoc`}
        variant={'body2'}
      >
        {`${usuarioData.persona.tipoDocumento} ${usuarioData.persona.nroDocumento}`}
      </Typography>,
      <div key={`${usuarioData.id}-${indexUsuario}-nombres`}>
        <Typography variant={'body2'}>
          {`${usuarioData.persona.nombres} ${usuarioData.persona.primerApellido} ${usuarioData.persona.segundoApellido}`}
        </Typography>
        <Typography variant={'body2'}>
          {`${usuarioData.persona.fechaNacimiento}`}
        </Typography>
      </div>,
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
        {permisos.update && (
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
        )}
        <IconoTooltip
          titulo={'Restablecer contraseña'}
          color={'info'}
          accion={() => {
            imprimir(`Restablecer : ${JSON.stringify(usuarioData)}`)
          }}
          icono={'vpn_key'}
          name={'Restablecer contraseña'}
        />
        {permisos.update && (
          <IconoTooltip
            titulo={'Editar'}
            color={'success'}
            accion={() => {
              imprimir(`Editaremos : ${JSON.stringify(usuarioData)}`)
              editarUsuarioModal(usuarioData)
            }}
            icono={'edit'}
            name={'Editar usuario'}
          />
        )}
      </Grid>,
    ]
  )

  /// Acciones para data table
  const acciones: Array<ReactNode> = [
    permisos.create && (
      <IconoTooltip
        titulo={'Agregar usuario'}
        key={`accionAgregarUsuario`}
        accion={() => {
          agregarUsuarioModal()
        }}
        icono={'add_circle_outline'}
        name={'Agregar usuario'}
      />
    ),
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

  /// Petición que obtiene lista de usuarios
  const obtenerUsuariosPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios`,
        params: {
          ...{
            pagina: pagina,
            limite: limite,
          },
          ...(filtro ? { filtro: filtro } : {}),
        },
      })
      setUsuariosData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorData(null)
    } catch (e) {
      imprimir(`Error al obtener usuarios: ${e}`)
      setErrorData(e)
      Alertas.error(InterpreteMensajes(e))
    } finally {
      setLoading(false)
    }
  }

  /// Petición que obtiene lista de roles
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
      throw e
    } finally {
      setLoading(false)
    }
  }

  /// Petición que cambia el estado de un usuario
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

  /// Vista modal de usuario
  const VistaModalUsuario = ({ usuario }: ModalUsuarioType) => {
    // Flag que indica que hay un proceso en ventana modal cargando visualmente
    const [loadingModal, setLoadingModal] = useState<boolean>(false)

    const { handleSubmit, control } = useForm<CrearEditarUsuarioType>({
      defaultValues: {
        id: usuario?.id,
        usuario: usuario?.usuario,
        roles: usuario?.usuarioRol.map((rol) => rol.rol.id),
        estado: usuario?.estado,
        correoElectronico: usuario?.correoElectronico,
        persona: usuario?.persona,
        ciudadaniaDigital: usuario?.ciudadaniaDigital,
      },
    })

    const guardarActualizarUsuario = async (data: CrearEditarUsuarioType) => {
      await guardarActualizarUsuariosPeticion(data)
    }

    const guardarActualizarUsuariosPeticion = async (
      usuario: CrearEditarUsuarioType
    ) => {
      try {
        setLoadingModal(true)
        await delay(1000)
        const respuesta = await sesionPeticion({
          url: `${Constantes.baseUrl}/usuarios/${usuario.id ?? ''}`,
          tipo: !!usuario.id ? 'patch' : 'post',
          body: usuario,
        })
        Alertas.correcto(InterpreteMensajes(respuesta))
        cerrarModalUsuario()
        obtenerUsuariosPeticion().finally()
      } catch (e) {
        imprimir(`Error al crear o actualizar usuario: ${e}`)
        Alertas.error(InterpreteMensajes(e))
      } finally {
        setLoadingModal(false)
      }
    }

    return (
      <Grid container direction={'column'} justifyContent="space-evenly">
        <Box height={'10px'} />
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
          Datos personales
        </Typography>
        <Box height={'10px'} />
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputText
              id={'nroDocumento'}
              control={control}
              name="persona.nroDocumento"
              label="Nro. Documento"
              disabled={loadingModal}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputText
              id={'nroDocumento'}
              control={control}
              name="persona.nombres"
              label="Nombre"
              disabled={loadingModal}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputText
              id={'primerApellido'}
              control={control}
              name="persona.primerApellido"
              label="Primer Apellido"
              disabled={loadingModal}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputText
              id={'segundoApellido'}
              control={control}
              name="persona.segundoApellido"
              label="Segundo apellido"
              disabled={loadingModal}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputDate
              id={'fechaNacimiento'}
              control={control}
              name="persona.fechaNacimiento"
              label="Fecha de nacimiento"
              disabled={loadingModal}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
        </Grid>
        <Grid>
          <Box height={'10px'} />
          <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
            Datos personales
          </Typography>
          <Box height={'10px'} />
          <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
            <Grid item xs={12} sm={12} md={4}>
              <FormInputDropdownMultiple
                id={'roles'}
                name="roles"
                control={control}
                label="Roles"
                disabled={loadingModal}
                options={rolesData.map((rol) => ({
                  key: rol.id,
                  value: rol.id,
                  label: rol.nombre,
                }))}
                rules={{ required: 'Este campo es requerido' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <FormInputText
                id={'correoElectronico'}
                control={control}
                name="correoElectronico"
                label="Correo electrónico"
                disabled={loadingModal}
                rules={{
                  required: 'Este campo es requerido',
                  validate: (value) => {
                    if (!isValidEmail(value)) return 'No es un correo válido'
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box height={'10px'} />
        <ProgresoLineal mostrar={loadingModal} />
        <Box height={'5px'} />
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
          <Button
            variant={'outlined'}
            disabled={loadingModal}
            onClick={cerrarModalUsuario}
          >
            Cancelar
          </Button>
          <Button
            variant={'contained'}
            disabled={loadingModal}
            onClick={handleSubmit(guardarActualizarUsuario)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Grid>
    )
  }

  /// Método abre una ventana modal para un usuario nuevo

  const agregarUsuarioModal = () => {
    setUsuarioEdicion(null)
    setModalUsuario(true)
  }
  /// Método abre una ventana modal para un usuario existente
  const editarUsuarioModal = (usuario: UsuarioCRUDType) => {
    setUsuarioEdicion(usuario)
    setModalUsuario(true)
  }

  /// Método que cierra una ventana modal
  const cerrarModalUsuario = () => {
    setUsuarioEdicion(null)
    setModalUsuario(false)
  }

  /// Método que muestra alerta de cambio de estado

  const editarEstadoUsuarioModal = async (usuario: UsuarioCRUDType) => {
    setUsuarioEdicion(usuario) // para mostrar datos de usuario en la alerta
    setMostrarAlertaEstadoUsuario(true) // para mostrar alerta de usuarios
  }

  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEstadoUsuario = () => {
    setMostrarAlertaEstadoUsuario(false)
    setUsuarioEdicion(null)
  }

  /// Método que oculta la alerta de cambio de estado y procede al cambio
  const aceptarAlertaEstadoUsuario = async () => {
    setMostrarAlertaEstadoUsuario(false)
    if (usuarioEdicion) {
      await cambiarEstadoUsuarioPeticion(usuarioEdicion)
    }
  }

  /// Método que define permisos por rol desde la sesión
  async function definirPermisos() {
    setPermisos(await interpretarPermiso(router.pathname))
  }

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])

  useEffect(() => {
    if (estaAutenticado)
      obtenerRolesPeticion()
        .then(() => {
          obtenerUsuariosPeticion()
            .catch(() => {})
            .finally(() => {})
        })
        .catch(() => {})
        .finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado, pagina, limite, filtro])

  interface filtroUsuariosType {
    filtroUsuariosValor?: string
    cambioFiltroUsuariosValor: (nuevoFiltro?: string) => void
  }

  /// Componente espesífico para filtros de usuarios
  const FiltroUsuarios: FC<filtroUsuariosType> = ({
    filtroUsuariosValor,
    cambioFiltroUsuariosValor,
  }) => {
    const { handleSubmit, control, watch } = useForm<FiltroUsuariosType>({
      defaultValues: {
        filtro: filtroUsuariosValor,
      },
    })

    const filtroWatch: string = watch('filtro')

    const limpiarFiltro = ({ filtro }: FiltroUsuariosType) => {
      cambioFiltroUsuariosValor(undefined)
    }

    useEffect(() => {
      const timeOutId = setTimeout(
        () => cambioFiltroUsuariosValor(filtroWatch),
        1000
      )
      return () => clearTimeout(timeOutId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtroWatch])

    return (
      <Grid
        container
        direction="row"
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 4, md: 8, xl: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ borderRadius: 2, p: 2 }}>
            <FormInputText
              control={control}
              id={'filtro'}
              key={`filtro`}
              name="filtro"
              label="Usuario"
              onClear={handleSubmit(limpiarFiltro)}
            />
          </Card>
        </Grid>
      </Grid>
    )
  }

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
      <LayoutUser title={'Usuarios - Frontend Base'}>
        <CustomDataTable
          titulo={'Usuarios'}
          error={!!errorData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          contenidoTabla={contenidoTabla}
          filtros={
            <FiltroUsuarios
              filtroUsuariosValor={filtro}
              cambioFiltroUsuariosValor={setFiltro}
            />
          }
          accionOcultarFiltro={() => {
            setFiltro(undefined)
          }}
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

export default Usuarios
