import { Meta, StoryFn } from '@storybook/react'
import { IBitacoraAcciones } from '../../../../common/types'
import { Bitacora } from '../../../../common/components/ui/Bitacora'
import { Grid, Typography } from '@mui/material'

export default {
  title: 'Organismos/Bitacora/Bitacora',
  component: Bitacora,
  parameters: {
    status: {
      type: 'beta', // 'beta' | 'stable' | 'deprecated' | 'releaseCandidate'
    },
    docs: {
      description: {
        component:
          'Componente que crea una línea de tiempo de elementos de bitácora. El componente utiliza varios componentes de la biblioteca MUI, incluyendo "Card", "CardHeader", "Timeline", "TimelineItem", "TimelineSeparator", "TimelineDot", "TimelineContent" y "Typography", para construir la línea de tiempo. Toma dos propiedades como entrada, un título y una matriz de elementos de bitácora, y renderiza la línea de tiempo basada en los elementos de la matriz. Si no hay elementos en la matriz, se muestra un mensaje de "Sin resultados". En general, este código proporciona una manera fácil de mostrar una línea de tiempo de eventos en una aplicación web.',
      },
    },
  },
} as Meta<typeof Bitacora>

const Template: StoryFn<typeof Bitacora> = (args) => <Bitacora {...args} />

const listaAcciones: IBitacoraAcciones[] = [
  {
    titulo: 'Procesamiento de la orden',
    items: [
      {
        accion: 'Elaboró',
        descripcion: 'Recibida orden de envío',
        fecha: '2023-06-14T15:15:48.058Z',
        color_icono: 'info',
        icono: 'check',
      },
      {
        accion: 'Inició',
        descripcion: 'Procesamiento de la orden por el almacén',
        fecha: '2023-07-01T07:41:48.058Z',
        color_icono: 'info',
        icono: 'check',
      },
      {
        accion: 'Realizó',
        descripcion: 'Empaquetado de los artículos',
        fecha: '2023-07-01T09:32:48.058Z',
        color_icono: 'info',
        icono: 'check',
      },
      {
        accion: 'Realizó',
        descripcion: 'Etiquetado del paquete',
        fecha: '2023-07-03T12:37:48.058Z',
        color_icono: 'info',
        icono: 'more_horiz',
      },
    ],
  },
  {
    titulo: 'Envío del paquete',
    items: [
      {
        accion: 'Registró',
        descripcion: 'Carga del paquete en el camión de envío',
        fecha: '2023-06-07T12:07:48.058Z',
        color_icono: 'info',
        icono: 'more_horiz',
      },
      {
        accion: 'Autorizó',
        descripcion: 'Salida del camión de envío del almacén',
        fecha: '2023-06-17T12:47:48.058Z',
        color_icono: 'success',
        icono: 'check',
      },
      {
        accion: 'Registró',
        descripcion: 'Llegada del camión de envío al centro de distribución',
        fecha: '2023-06-18T12:27:48.058Z',
        color_icono: 'info',
        icono: 'people',
      },
      {
        accion: 'Realizó',
        descripcion: 'Clasificación del paquete en el centro de distribución',
        fecha: '2023-06-19T12:17:48.058Z',
        color_icono: 'info',
        icono: 'people',
      },
      {
        accion: 'Registró',
        descripcion: 'Carga del paquete en el avión de envío',
        fecha: '2023-07-04T12:37:48.058Z',
        color_icono: 'info',
        icono: 'check',
      },
      {
        accion: 'Autorizó',
        descripcion: 'Salida del avión de envío del centro de distribución',
        fecha: '2023-07-04T14:57:48.058Z',
        color_icono: 'success',
        icono: 'people',
      },
      {
        accion: 'Registró',
        descripcion: 'Llegada del avión de envío al aeropuerto de destino',
        fecha: '2023-07-02T12:37:48.058Z',
        color_icono: 'info',
        icono: 'people',
      },
      {
        accion: 'Autorizó',
        descripcion: 'Desembarque del paquete del avión de envío',
        fecha: '2023-07-02T17:48:48.058Z',
        color_icono: 'success',
        icono: 'check',
      },
    ],
  },
  {
    titulo: 'Entrega del paquete',
    items: [
      {
        accion: 'Realizó',
        descripcion: 'Entrega del paquete a la empresa de mensajería local',
        fecha: '2023-06-03T12:13:48.058Z',
        color_icono: 'success',
        icono: 'check',
      },
      {
        accion: 'Registró',
        descripcion:
          'Llegada del paquete a la oficina de la empresa de mensajería local',
        fecha: '2023-06-04T19:03:48.058Z',
        color_icono: 'success',
        icono: 'people',
      },
      {
        accion: 'Realizó',
        descripcion: 'Entrega programada del paquete al destinatario',
        fecha: '2023-07-02T12:37:48.058Z',
        color_icono: 'info',
        icono: 'check',
      },
      {
        accion: 'Verificó',
        descripcion: 'Entrega exitosa del paquete al destinatario',
        fecha: '2023-07-02T21:54:48.058Z',
        color_icono: 'success',
        icono: 'check',
      },
    ],
  },
]

export const Default = Template.bind({})
Default.storyName = 'Ejemplo Bitacora'
Default.args = {
  titulo: 'Últimas acciones',
  acciones: listaAcciones.map((acciones) => {
    return {
      titulo: acciones.titulo,
      items: acciones.items.map((item) => {
        return {
          descripcion: item.descripcion,
          fecha: item.fecha,
          color_icono: item.color_icono
        }
      })
    }
  })
}

export const BitacoraConAcciones = Template.bind({})
BitacoraConAcciones.storyName = 'Bitácora con acciones'
BitacoraConAcciones.args = {
  titulo: 'Últimas acciones',
  acciones: listaAcciones.map((acciones) => {
    return {
      titulo: acciones.titulo,
      items: acciones.items.map((item) => {
        return {
          accion: item.accion,
          descripcion: item.descripcion,
          fecha: item.fecha,
          color_icono: item.color_icono
        }
      })
    }
  })
}

export const BitacoraConAgrupacion = Template.bind({})
BitacoraConAgrupacion.storyName = 'Ejemplo Bitacora con agrupación por fecha de acción'
BitacoraConAgrupacion.args = {
  titulo: 'Últimas acciones',
  acciones: listaAcciones.map((acciones) => {
    return {
      titulo: acciones.titulo,
      items: acciones.items.map((item) => {
        return {
          descripcion: item.descripcion,
          fecha: item.fecha,
          color_icono: item.color_icono
        }
      })
    }
  }),
  agruparFecha: true
}

export const BitacoraConIconos = Template.bind({})
BitacoraConIconos.storyName = 'Ejemplo Bitacora con íconos en timeline'
BitacoraConIconos.args = {
  titulo: 'Últimas acciones',
  acciones: listaAcciones.map((acciones) => {
    return {
      titulo: acciones.titulo,
      items: acciones.items.map((item) => {
        return {
          descripcion: item.descripcion,
          fecha: item.fecha,
          color_icono: item.color_icono,
          icono: item.icono
        }
      })
    }
  }),
  agruparFecha: true
}


const componente = (
  <Grid>
    <Typography>Contenido de componente personalizable</Typography>
  </Grid>
)
export const BitacoraConComponentePersonalizable = Template.bind({})
BitacoraConComponentePersonalizable.storyName = 'Ejemplo Bitacora con componente personalizable'
BitacoraConComponentePersonalizable.args = {
  titulo: 'Últimas acciones',
  acciones: listaAcciones.map((acciones) => {
    return {
      titulo: acciones.titulo,
      items: acciones.items.map((item) => {
        return {
          descripcion: item.descripcion,
          fecha: item.fecha,
          color_icono: item.color_icono
        }
      })
    }
  }),
  agruparFecha: true,
  children: componente
}

export const BitacoraVacia = Template.bind({})
BitacoraVacia.storyName = 'Bitacora vacía'
BitacoraVacia.args = {
  titulo: 'Últimas acciones',
  acciones: [],
}
