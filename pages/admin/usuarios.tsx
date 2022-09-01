import type { NextPage } from 'next'
import {
  Box,
  Button,
  Chip,
  Grid,
  ToggleButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { LayoutUser } from '../../common/components/layouts'
import {
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  Icono,
  IconoTooltip,
} from '../../common/components/ui'
import { ReactNode, useEffect, useState } from 'react'
import { CasbinTypes, ColumnaType } from '../../common/types'
import { Constantes } from '../../config'
import {
  delay,
  InterpreteMensajes,
  siteName,
  titleCase,
} from '../../common/utils'
import { useAuth } from '../../context/auth'
import { Paginacion } from '../../common/components/ui/Paginacion'
import { useRouter } from 'next/router'
import {
  FiltroUsuarios,
  VistaModalUsuario,
} from '../../modules/admin/usuarios/ui'
import { useAlerts } from '../../common/hooks'
import { imprimir } from '../../common/utils/imprimir'
import CustomMensajeEstado from '../../common/components/ui/CustomMensajeEstado'
import {
  RolType,
  UsuarioCRUDType,
} from '../../modules/admin/usuarios/types/usuariosCRUDTypes'

const Usuarios: NextPage = () => {
  // data de usuarios
  const [usuariosData, setUsuariosData] = useState<UsuarioCRUDType[]>([])

  // Flag que indica que hay un proceso cargando visualmente
  const [loading, setLoading] = useState<boolean>(true)

  // Hook para mostrar alertas
  const { Alerta } = useAlerts()

  /// Indicador de error en una petición
  const [errorData, setErrorData] = useState<any>()

  /// Indicador para mostrar una ventana modal de usuario
  const [modalUsuario, setModalUsuario] = useState(false)

  /// Indicador para mostrar una vista de alerta de cambio de estado
  const [mostrarAlertaEstadoUsuario, setMostrarAlertaEstadoUsuario] =
    useState(false)

  /// Indicador para mostrar una vista de alerta de restablecimiento de contraseña
  const [mostrarAlertaRestablecerUsuario, setMostrarAlertaRestablecerUsuario] =
    useState(false)

  /// Variable que contiene el estado del usuario que se está editando
  const [usuarioEdicion, setUsuarioEdicion] = useState<
    UsuarioCRUDType | undefined | null
  >()

  // Roles de usuario
  const [rolesData, setRolesData] = useState<RolType[]>([])

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const [filtroUsuario, setFiltroUsuario] = useState<string>('')

  const [filtroRoles, setFiltroRoles] = useState<string[]>([])

  /// Indicador para mostrar el filtro de usuarios
  const [mostrarFiltroUsuarios, setMostrarFiltroUsuarios] = useState(false)

  // Proveedor de la sesión
  const { sesionPeticion, estaAutenticado, interpretarPermiso } = useAuth()

  // Permisos para acciones
  const [permisos, setPermisos] = useState<CasbinTypes>({
    read: false,
    create: false,
    update: false,
    delete: false,
  })

  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  // router para conocer la ruta actual
  const router = useRouter()

  /// Columnas para data table
  const columnas: Array<ColumnaType> = [
    { campo: 'nro_documento', nombre: 'Nro. Documento' },
    { campo: 'persona', nombre: 'Persona' },
    { campo: 'usuario', nombre: 'Usuario' },
    { campo: 'tipo', nombre: 'Tipo' },
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
      </div>,
      <Typography
        key={`${usuarioData.id}-${indexUsuario}-usuario`}
        variant={'body2'}
      >
        {usuarioData.usuario}
      </Typography>,

      <Box key={`${usuarioData.id}-${indexUsuario}-tipo`}>
        {usuarioData.ciudadaniaDigital && (
          <Chip
            size={'small'}
            color={'primary'}
            label="Ciudadanía"
            variant="outlined"
          />
        )}
        {!usuarioData.ciudadaniaDigital && (
          <Chip size={'small'} label="Normal" variant="outlined" />
        )}
      </Box>,
      <Grid key={`${usuarioData.id}-${indexUsuario}-roles`}>
        {usuarioData.usuarioRol.map((itemUsuarioRol, indexUsuarioRol) => (
          <Chip
            key={`usuario-rol-${indexUsuarioRol}`}
            label={itemUsuarioRol.rol.rol}
          />
        ))}
      </Grid>,
      <Typography
        component={'div'}
        key={`${usuarioData.id}-${indexUsuario}-estado`}
      >
        <CustomMensajeEstado
          titulo={usuarioData.estado}
          descripcion={usuarioData.estado}
          color={
            usuarioData.estado == 'ACTIVO'
              ? 'success'
              : usuarioData.estado == 'INACTIVO'
              ? 'error'
              : 'info'
          }
        />
      </Typography>,
      <Grid key={`${usuarioData.id}-${indexUsuario}-acciones`}>
        {permisos.update && (
          <IconoTooltip
            titulo={usuarioData.estado == 'ACTIVO' ? 'Inactivar' : 'Activar'}
            color={usuarioData.estado == 'ACTIVO' ? 'success' : 'error'}
            accion={async () => {
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
          titulo={
            usuarioData.ciudadaniaDigital
              ? 'No puede restablecer la contraseña'
              : 'Restablecer contraseña'
          }
          color={'info'}
          accion={async () => {
            await restablecimientoPassUsuarioModal(usuarioData)
          }}
          desactivado={usuarioData.ciudadaniaDigital}
          icono={'vpn_key'}
          name={'Restablecer contraseña'}
        />
        {permisos.update && (
          <IconoTooltip
            titulo={'Editar'}
            color={'primary'}
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
    <ToggleButton
      key={'accionFiltrarUsuarioToggle'}
      value="check"
      sx={{
        '&.MuiToggleButton-root': {
          borderRadius: '4px !important',
          border: '0px solid lightgrey !important',
        },
      }}
      size={'small'}
      selected={mostrarFiltroUsuarios}
      onChange={() => {
        setMostrarFiltroUsuarios(!mostrarFiltroUsuarios)
      }}
    >
      <Icono>search</Icono>
    </ToggleButton>,
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarUsuario`}
      accion={async () => {
        await obtenerUsuariosPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de usuario'}
    />,
    permisos.create && xs && (
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
    permisos.create && !xs && (
      <Button
        key={`accionAgregarUsuarioBoton`}
        variant={'contained'}
        sx={{ ml: 1, mr: 1, textTransform: 'none' }}
        size={'small'}
        onClick={() => {
          agregarUsuarioModal()
        }}
      >
        Agregar
      </Button>
    ),
  ]

  /// Petición que obtiene lista de usuarios
  const obtenerUsuariosPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios`,
        params: {
          pagina: pagina,
          limite: limite,
          ...(filtroUsuario.length == 0 ? {} : { filtro: filtroUsuario }),
          ...(filtroRoles.length == 0 ? {} : { rol: filtroRoles.join(',') }),
        },
      })
      setUsuariosData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorData(null)
    } catch (e) {
      imprimir(`Error al obtener usuarios: ${e}`)
      setErrorData(e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
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
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
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
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: 'success',
      })
      await obtenerUsuariosPeticion()
    } catch (e) {
      imprimir(`Error al inactivar usuarios: ${e}`)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  /// Petición que restablecer la contraseña del usuario
  const restablecerPassUsuarioPeticion = async (usuario: UsuarioCRUDType) => {
    try {
      setLoading(true)
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios/${usuario.id}/restauracion`,
        tipo: 'patch',
      })
      imprimir(`respuesta restablecer usuario: ${respuesta}`)
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: 'success',
      })
      await obtenerUsuariosPeticion()
    } catch (e) {
      imprimir(`Error al restablecer usuario: ${e}`)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
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
  const cerrarModalUsuario = async () => {
    setModalUsuario(false)
    await delay(500)
    setUsuarioEdicion(null)
  }

  /// Método que muestra alerta de cambio de estado

  const editarEstadoUsuarioModal = async (usuario: UsuarioCRUDType) => {
    setUsuarioEdicion(usuario) // para mostrar datos de usuario en la alerta
    setMostrarAlertaEstadoUsuario(true) // para mostrar alerta de usuarios
  }

  /// Método que muestra alerta de restablecimiento de contraseña

  const restablecimientoPassUsuarioModal = async (usuario: UsuarioCRUDType) => {
    setUsuarioEdicion(usuario) // para mostrar datos de usuario en la alerta
    setMostrarAlertaRestablecerUsuario(true) // para mostrar alerta de usuarios
  }

  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEstadoUsuario = async () => {
    setMostrarAlertaEstadoUsuario(false)
    await delay(500) // para no mostrar undefined mientras el modal se cierra
    setUsuarioEdicion(null)
  }

  /// Método que oculta la alerta de cambio de estado y procede al cambio
  const aceptarAlertaEstadoUsuario = async () => {
    setMostrarAlertaEstadoUsuario(false)
    if (usuarioEdicion) {
      await cambiarEstadoUsuarioPeticion(usuarioEdicion)
    }
    setUsuarioEdicion(null)
  }

  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaRestablecerUsuario = async () => {
    setMostrarAlertaRestablecerUsuario(false)
    await delay(500) // para no mostrar undefined mientras el modal se cierra
    setUsuarioEdicion(null)
  }

  /// Método que oculta la alerta de cambio de estado y procede al cambio
  const aceptarAlertaRestablecerUsuario = async () => {
    setMostrarAlertaRestablecerUsuario(false)
    if (usuarioEdicion) {
      await restablecerPassUsuarioPeticion(usuarioEdicion)
    }
    setUsuarioEdicion(null)
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
  }, [estaAutenticado, pagina, limite, filtroRoles, filtroUsuario])

  useEffect(() => {
    imprimir(`filtro cerrado: ${mostrarFiltroUsuarios}`)
    if (!mostrarFiltroUsuarios) {
      setFiltroUsuario('')
      setFiltroRoles([])
    }
  }, [mostrarFiltroUsuarios])

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
      <AlertDialog
        isOpen={mostrarAlertaRestablecerUsuario}
        titulo={'Alerta'}
        texto={`¿Está seguro de restablecer la contraseña de
         ${titleCase(usuarioEdicion?.persona.nombres ?? '')} ?`}
      >
        <Button onClick={cancelarAlertaRestablecerUsuario}>Cancelar</Button>
        <Button onClick={aceptarAlertaRestablecerUsuario}>Aceptar</Button>
      </AlertDialog>
      {/*<CustomDialog
        isOpen={mostrarFiltroUsuarios}
        handleClose={() => {
          setMostrarFiltroUsuarios(false)
        }}
        title={`Filtros`}
      >
        <FiltroModalUsuarios
          filtroRoles={[...filtroRoles]}
          rolesDisponibles={rolesData}
          accionCorrecta={(filtros) => {
            setMostrarFiltroUsuarios(false)
            setFiltroRoles(filtros.roles)
          }}
          accionCerrar={() => {
            setMostrarFiltroUsuarios(false)
          }}
        ></FiltroModalUsuarios>
      </CustomDialog>*/}

      <CustomDialog
        isOpen={modalUsuario}
        handleClose={cerrarModalUsuario}
        title={usuarioEdicion ? 'Editar usuario' : 'Nuevo usuario'}
      >
        <VistaModalUsuario
          usuario={usuarioEdicion}
          roles={rolesData}
          accionCorrecta={() => {
            cerrarModalUsuario().finally()
            obtenerUsuariosPeticion().finally()
          }}
          accionCancelar={cerrarModalUsuario}
        />
      </CustomDialog>
      <LayoutUser title={`Usuarios - ${siteName()}`}>
        <CustomDataTable
          titulo={'Usuarios'}
          error={!!errorData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          contenidoTabla={contenidoTabla}
          filtros={
            mostrarFiltroUsuarios && (
              <FiltroUsuarios
                rolesDisponibles={rolesData}
                filtroRoles={filtroRoles}
                filtroUsuario={filtroUsuario}
                accionCorrecta={(filtros) => {
                  setPagina(1)
                  setLimite(10)
                  setFiltroRoles(filtros.roles)
                  setFiltroUsuario(filtros.usuario)
                }}
                accionCerrar={() => {}}
              />
            )
          }
          paginacion={
            <Paginacion
              pagina={pagina}
              limite={limite}
              total={total}
              cambioPagina={setPagina}
              cambioLimite={setLimite}
            />
          }
        ></CustomDataTable>
      </LayoutUser>
    </>
  )
}

export default Usuarios
