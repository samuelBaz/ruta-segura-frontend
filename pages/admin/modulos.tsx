import { Grid, ToggleButton, Typography } from '@mui/material'
import { NextPage } from 'next'
import { ReactNode, useEffect, useState } from 'react'
import { LayoutUser } from '../../common/components/layouts'
import {
  CustomDataTable,
  CustomDialog,
  Icono,
  IconoTooltip,
} from '../../common/components/ui'
import { Paginacion } from '../../common/components/ui/Paginacion'
import { CasbinTypes, ColumnaType } from '../../common/types'
import { imprimir } from '../../common/utils/imprimir'
import { delay, InterpreteMensajes, siteName } from '../../common/utils'
import { Constantes } from '../../config'
import { useAlerts } from '../../common/hooks'
import { useAuth } from '../../context/auth'
import { ModulosType } from '../../modules/admin/modulos/types/ModulosType'
import { VistaModalModulo } from '../../modules/admin/modulos/ui/ModalModulo'
import { useRouter } from 'next/router'
import { FiltroModulos } from '../../modules/admin/modulos/ui/FiltroModulos'

export interface FiltroTypeM {
  buscar: string
}

const Modulos: NextPage = () => {
  const router = useRouter()
  //const [parametrosData, setParametrosData] = useState<IModulos[]>([])
  const [modulosData, setModulosData] = useState<ModulosType[]>([])
  const [errorParametrosData, setErrorParametrosData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [mostrarFiltroModulo, setMostrarFiltroModulo] = useState(false)
  const [modalModulo, setModalModulo] = useState(false)
  const [limite, setLimite] = useState<number>(10)
  const [pagina, setPagina] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const { Alerta } = useAlerts()
  const { sesionPeticion, estaAutenticado, interpretarPermiso } = useAuth()

  const [filtroBuscar, setFiltroBuscar] = useState<string>('')

  async function definirPermisos() {
    setPermisos(await interpretarPermiso(router.pathname))
  }

  useEffect(() => {
    definirPermisos().finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado])
  const [permisos, setPermisos] = useState<CasbinTypes>({
    read: false,
    create: false,
    update: false,
    delete: false,
  })

  const agregarModuloModal = () => {
    setParametroEdicion(undefined)
    setModalModulo(true)
  }
  useEffect(() => {
    if (estaAutenticado) obtenerModuloPeticion().finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaAutenticado, pagina, limite, filtroBuscar])

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
      selected={mostrarFiltroModulo}
      onChange={() => {
        setMostrarFiltroModulo(!mostrarFiltroModulo)
      }}
    >
      <Icono>search</Icono>
    </ToggleButton>,
    permisos.create && (
      <IconoTooltip
        titulo={'Agregar módulo'}
        key={`accionAgregarModulo`}
        accion={() => {
          agregarModuloModal()
        }}
        icono={'add_circle_outline'}
        name={'Agregar módulo'}
      />
    ),
    <IconoTooltip
      titulo={'Actualizar'}
      key={`accionActualizarModulo`}
      accion={async () => {
        await obtenerModuloPeticion()
      }}
      icono={'refresh'}
      name={'Actualizar lista de parámetros'}
    />,
  ]

  const [parametroEdicion, setParametroEdicion] = useState<
    ModulosType | undefined
  >()

  const paginacion = (
    <Paginacion
      pagina={pagina}
      limite={limite}
      total={total}
      cambioPagina={setPagina}
      cambioLimite={setLimite}
    />
  )
  const editarModuloModal = (parametro: ModulosType) => {
    setParametroEdicion(parametro)
    setModalModulo(true)
  }
  const cerrarModalParametro = async () => {
    setModalModulo(false)
    await delay(500)
    setParametroEdicion(undefined)
  }
  const obtenerModuloPeticion = async () => {
    try {
      setLoading(true)

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/autorizacion/modulos`,
        params: {
          pagina: pagina,
          limite: limite,
          filtro: filtroBuscar,
        },
      })
      setModulosData(respuesta.datos?.filas)
      setTotal(respuesta.datos?.total)
      setErrorParametrosData(null)
    } catch (e) {
      imprimir(`Error al obtener parametros: ${e}`)
      setErrorParametrosData(e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const columnas: Array<ColumnaType> = [
    { campo: 'icono', nombre: 'Icono' },
    { campo: 'nombre', nombre: 'Nombre' },
    { campo: 'label', nombre: 'Label' },
    { campo: 'descripcion', nombre: 'Descripción' },
    { campo: 'url', nombre: 'URL' },
    { campo: 'estado', nombre: 'Estado' },
    { campo: 'acciones', nombre: 'Acciones' },
  ]
  const contenidoTabla: Array<Array<ReactNode>> = modulosData.map(
    (moduloData, indexModulo) => [
      <Typography
        key={`${moduloData.id}-${indexModulo}-icono`}
        variant={'body2'}
      >
        {moduloData.fidModulo === null ? (
          <></>
        ) : (
          <Icono color="inherit">{`${moduloData.propiedades.icono}`}</Icono>
        )}
      </Typography>,
      <Typography
        key={`${moduloData.id}-${indexModulo}-nombre`}
        variant={'body2'}
      >{`${moduloData.nombre}`}</Typography>,
      <Typography
        key={`${moduloData.id}-${indexModulo}-label`}
        variant={'body2'}
      >{`${moduloData.label}`}</Typography>,
      <Typography
        key={`${moduloData.id}-${indexModulo}-descripcion`}
        variant={'body2'}
      >{`${
        moduloData.propiedades?.descripcion
          ? moduloData.propiedades.descripcion
          : ''
      }`}</Typography>,

      <Typography key={`${moduloData.id}-${indexModulo}-url`} variant={'body2'}>
        {`${moduloData.url}`}
      </Typography>,

      <Typography
        key={`${moduloData.id}-${indexModulo}-estado`}
        variant={'body2'}
      >{`${moduloData.estado}`}</Typography>,
      <Grid key={`${moduloData.id}-${indexModulo}-accion`}>
        {permisos.update && (
          <IconoTooltip
            titulo={'Editar'}
            color={'primary'}
            accion={() => {
              imprimir(`Editaremos : ${JSON.stringify(moduloData)}`)
              editarModuloModal(moduloData)
            }}
            icono={'edit'}
            name={'Módulos'}
          />
        )}
      </Grid>,
    ]
  )
  return (
    <>
      <CustomDialog
        isOpen={modalModulo}
        handleClose={cerrarModalParametro}
        title={parametroEdicion ? 'Editar módulo' : 'Nuevo módulo'}
      >
        <VistaModalModulo
          modulo={parametroEdicion}
          accionCorrecta={() => {
            cerrarModalParametro()
            obtenerModuloPeticion().finally()
          }}
          accionCancelar={cerrarModalParametro}
          lmodulos={modulosData.filter((f) => f.fidModulo === null)}
        />
      </CustomDialog>

      <LayoutUser title={`Módulos - ${siteName()}`}>
        <CustomDataTable
          titulo={'Módulos'}
          error={!!errorParametrosData}
          cargando={loading}
          acciones={acciones}
          columnas={columnas}
          paginacion={paginacion}
          contenidoTabla={contenidoTabla}
          filtros={
            mostrarFiltroModulo && (
              <FiltroModulos
                filtroModulo={filtroBuscar}
                accionCorrecta={(filtros) => {
                  setFiltroBuscar(filtros.buscar)
                }}
                accionCerrar={() => {}}
              />
            )
          }
        />
      </LayoutUser>
    </>
  )
}
export default Modulos
