import type { NextPage } from 'next'
import { Button, Chip, Grid, Typography } from '@mui/material'
import { LayoutUser } from '../../common/components/layouts'
import {
  Alertas,
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  IconoTooltip,
} from '../../common/components/ui'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import {
  CasbinTypes,
  ColumnaType,
  RolType,
  UsuarioCRUDType,
} from '../../common/types'
import { Constantes } from '../../config'
import {
  imprimir,
  InterpreteMensajes,
  siteName,
  titleCase,
} from '../../common/utils'
import { useAuth } from '../../context/auth'
import { Paginacion } from '../../common/components/ui/Paginacion'
import { useRouter } from 'next/router'
import { FiltroUsuarios, VistaModalUsuario } from '../../modules/admin/usuarios'

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
  const [filtro, setFiltro] = useState<string>('')
  const [filtroRoles, setFiltroRoles] = useState<string[]>([])

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
    <FiltroUsuarios
      key={'accionFiltrarUsuario'}
      rolesDisponibles={rolesData}
      cambioFiltroRoles={(idRoles) => {
        setFiltroRoles(idRoles)
      }}
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
          // ...(filtro.length == 0 ? {} : { filtro: filtro }),
          ...(filtroRoles.length == 0 ? {} : { rol: filtroRoles.join(',') }),
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
    setModalUsuario(false)
    setUsuarioEdicion(null)
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
    imprimir(`estaAutenticado: ${estaAutenticado}`)
    imprimir(`pagina: ${pagina}`)
    imprimir(`limite: ${limite}`)
    imprimir(`filtro: ${filtro}`)
    imprimir(`filtroRoles: ${filtroRoles}`)
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
  }, [estaAutenticado, pagina, limite, filtro, filtroRoles])

  const eliminarFiltro = useCallback(
    (index: number) => {
      {
        imprimir(index)
        setFiltroRoles((prevState) => {
          return prevState.filter((item, idRol) => idRol !== index)
        })
      }
    },
    [setFiltroRoles]
  )

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
        <VistaModalUsuario
          usuario={usuarioEdicion}
          roles={rolesData}
          accionCorrecta={() => {
            cerrarModalUsuario()
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
            filtroRoles
              ? filtroRoles.map((idRol, index) => {
                  return (
                    <Chip
                      sx={{ m: 1 }}
                      key={`${index}`}
                      color="primary"
                      label={
                        rolesData.find((rol) => rol.id == idRol)?.nombre ??
                        idRol
                      }
                      onDelete={() => {
                        eliminarFiltro(index)
                      }}
                    />
                  )
                })
              : []
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
        />
      </LayoutUser>
    </>
  )
}

export default Usuarios
