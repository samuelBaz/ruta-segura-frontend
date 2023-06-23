// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { CustomDataTable, IconoTooltip } from '../../../../common/components/ui'
import { Grid, Typography } from '@mui/material'
import { ColumnaType } from '../../../../common/types'
import { ReactNode, useEffect, useState } from 'react'
import { Paginacion } from '../../../../common/components/ui/Paginacion'
import {
  CriterioOrdenType,
  OrdenEnum,
} from '../../../../common/types/ordenTypes'

export default {
  title: 'Organismos/Datatable/CustomDataTable',
  component: CustomDataTable,
  //   argTypes: {
  //     // children: {
  //     //   description: 'ReactNode',
  //     //   control: 'text',
  //     // },
  //     columnas: {
  //       description: 'Array<ColumnaType>',
  //     },
  //   },
  // parameters: {
  //   accion: {
  //     handles: ['mouseover', 'CLICK aqui'],
  //   },
  // },
} as Meta<typeof CustomDataTable>

// const eventsFromNames = actions('accion')

// replica del componente
const Template: StoryFn<typeof CustomDataTable> = (args) => (
  <CustomDataTable {...args} />
)
export const TablaVacia = Template.bind({})
TablaVacia.storyName = 'Tabla vacía'
TablaVacia.args = {
  titulo: 'Tabla mundiales de Bolivia',
  error: false,
  acciones: [],
  contenidoTabla: [],
}

/// Columnas para data table
const columnas: Array<ColumnaType> = [
  { campo: 'nombre', nombre: 'Nombre' },
  { campo: 'resumen', nombre: 'Resumen' },
  { campo: 'fechaPublicacion', nombre: 'Fecha Publicación' },
  { campo: 'observacion', nombre: 'Observaciones' },
  { campo: 'acciones', nombre: 'Eventos' },
]
const solicitudesData: any[] = [
  {
    nombre: 'En busca del tiempo perdido',
    resumen:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.   into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    fechaPublicacion: '02/11/1904',
    observacion: 'Escritor Frances',
  },
]

const contenidoTabla: Array<Array<ReactNode>> = solicitudesData.map(
  (solicitudData, index) => [
    <Typography key={`${solicitudData.id}-${index}-nombre`} variant={'body2'}>
      {`${solicitudData.nombre}`}
    </Typography>,

    <Typography key={`${solicitudData.id}-${index}-resumen`} variant={'body2'}>
      {`${solicitudData.resumen}`}
    </Typography>,

    <Typography
      key={`${solicitudData.id}-${index}-fechaEntrega`}
      variant={'body2'}
    >
      {solicitudData.fechaPublicacion}
    </Typography>,

    <Typography
      key={`${solicitudData.id}-${index}-obervacion`}
      variant={'body2'}
    >
      {solicitudData.observacion ?? ''}
    </Typography>,

    <Grid key={`${solicitudData.id}-${index}-acciones`}>
      <>
        <IconoTooltip
          id={'editarLibro'}
          titulo={'Editar libro'}
          color={'success'}
          accion={() => {}}
          icono={'edit'}
          name={'Editar libro'}
        />
        <IconoTooltip
          id={'verLibro'}
          titulo={'Ver libro'}
          color={'info'}
          accion={() => {}}
          icono={'visibility'}
          name={'Ver libro'}
        />
        <IconoTooltip
          id={'eliminarLibro'}
          titulo={'Eliminar libro'}
          color={'warning'}
          accion={() => {}}
          icono={'delete'}
          name={'Eliminar libro'}
        />
      </>
    </Grid>,
  ]
)
export const Columnas = Template.bind({})

Columnas.args = {
  titulo: 'Tabla Libros',
  error: false,
  acciones: [],
  columnas: columnas,
  contenidoTabla: contenidoTabla,
}

const acciones: Array<ReactNode> = [
  <IconoTooltip
    id={'buscarProyecto'}
    titulo={'Buscar proyecto'}
    key={`BuscarProyecto`}
    accion={() => {}}
    icono={'search'}
    name={'buscarProyecto'}
  />,
  <IconoTooltip
    id={'actualizarProyecto'}
    titulo={'Actualizar proyecto'}
    key={`accionActualizarProyecto`}
    accion={() => {}}
    icono={'refresh'}
    name={'actualizarProyecto'}
  />,
  <IconoTooltip
    id={'agregarProyecto'}
    titulo={'Agregar proyecto'}
    key={`accionAgregarProyecto`}
    accion={() => {}}
    icono={'add_circle_outline'}
    name={'agregarProyecto'}
  />,
]

export const Acciones = Template.bind({})

Acciones.args = {
  ...Columnas.args,
  acciones: acciones,
}
/// Variable con parámetros de paginación
const paginacion = (
  <Paginacion
    pagina={1}
    limite={20}
    total={500}
    cambioPagina={() => {}}
    cambioLimite={() => {}}
  />
)

export const SB_PAGINACION = Template.bind({})
SB_PAGINACION.storyName = 'Paginación'
SB_PAGINACION.args = {
  ...Columnas.args,
  acciones: acciones,
  paginacion: paginacion,
}

export const Cargando = Template.bind({})
Cargando.storyName = 'Tabla cargando'
Cargando.args = {
  ...Columnas.args,
  acciones: acciones,
  cargando: true,
}

// // click en componenete
// storiesOf('CustomDialog', module).add('Cerrado', () => (
//   <CustomDialog
//     title="Modal cerrado"
//     isOpen={false}
//     handleClose={() => {}}
//   ></CustomDialog>
// ))
// export const Titulo = Template.bind({})
// Titulo.storyName = 'Icono tooltip'
// Titulo.args = {
//   titulo: 'Mensaje tooltip para iconos',
//   icono: 'savings',
//   accion: action('()=>{console.log("Click en IconoTooltip")}'),
//   name: 'IconToolTip',
// }
//filtro head flechas

const Template1: StoryFn<typeof CustomDataTable> = (args) => {
  const [datos, setDatos] = useState<any[]>([
    {
      nombre: 'En busca del tiempo perdido',
      resumen:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.   into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      fechaPublicacion: '02/11/1904',
      observacion: 'Escritor Frances',
    },
    {
      nombre: 'Siguiendo mis Pies',
      resumen:
        'oorem Ipsum is simply dummy text of the printing and typesetting industry.   into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      fechaPublicacion: '02/10/1904',
      observacion: 'Autor Frances',
    },
    {
      nombre: 'La Speranza Negra',
      resumen:
        'erem Ipsum is simply dummy text of the printing and typesetting industry.   into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      fechaPublicacion: '03/11/1904',
      observacion: 'reportero Frances',
    },
    {
      nombre: 'Mirando al Cielo',
      resumen:
        'frem Ipsum is simply dummy text of the printing and typesetting industry.   into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      fechaPublicacion: '02/12/1904',
      observacion: 'novelista Frances',
    },
  ])

  const [ordenCriterios, setOrdenCriterios] = useState<
    Array<CriterioOrdenType>
  >([
    { campo: 'nombre', nombre: 'Nombre', ordenar: true, orden: OrdenEnum.DESC },
    { campo: 'resumen', nombre: 'Resumen', ordenar: true },
    {
      campo: 'fechaPublicacion',
      nombre: 'Fecha Publicación',
      ordenar: true,
    },
    {
      campo: 'observacion',
      nombre: 'Observaciones',
      ordenar: true,
    },
    { campo: 'acciones', nombre: 'Eventos' },
  ])
  const contenidoTabla: Array<Array<ReactNode>> = datos.map(
    (solicitudData, index) => [
      <Typography key={`${solicitudData.id}-${index}-nombre`} variant={'body2'}>
        {`${solicitudData.nombre}`}
      </Typography>,

      <Typography
        key={`${solicitudData.id}-${index}-resumen`}
        variant={'body2'}
      >
        {`${solicitudData.resumen}`}
      </Typography>,

      <Typography
        key={`${solicitudData.id}-${index}-fechaEntrega`}
        variant={'body2'}
      >
        {solicitudData.fechaPublicacion}
      </Typography>,

      <Typography
        key={`${solicitudData.id}-${index}-obervacion`}
        variant={'body2'}
      >
        {solicitudData.observacion ?? ''}
      </Typography>,

      <Grid key={`${solicitudData.id}-${index}-acciones`}>
        <>
          <IconoTooltip
            id={'editarLibro'}
            titulo={'Editar libro'}
            color={'success'}
            accion={() => {}}
            icono={'edit'}
            name={'Editar libro'}
          />
          <IconoTooltip
            id={'verLibro'}
            titulo={'Ver libro'}
            color={'info'}
            accion={() => {}}
            icono={'visibility'}
            name={'Ver libro'}
          />
          <IconoTooltip
            id={'eliminarLibro'}
            titulo={'Eliminar libro'}
            color={'warning'}
            accion={() => {}}
            icono={'delete'}
            name={'Eliminar libro'}
          />
        </>
      </Grid>,
    ]
  )
  args.columnas = ordenCriterios
  args.contenidoTabla = contenidoTabla
  args.cambioOrdenCriterios = setOrdenCriterios
  useEffect(() => {
    const result = ordenCriterios.filter((order) => order.orden !== undefined)
    //console.log(result)
    if (result != undefined && result.length > 0) {
      const campo = result[0].campo
      const f = datos.sort((x, y) => {
        const r = x[campo].localeCompare(y[campo])
        return result[0].orden === OrdenEnum.DESC ? -r : r
      })
      setDatos(f)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordenCriterios])
  return <CustomDataTable {...args} />
}

export const HeadFiltro = Template1.bind({})
HeadFiltro.storyName = 'Filtro por columna'
HeadFiltro.args = {
  titulo: 'Tabla Libros',
  error: false,
  cargando: false,
}
