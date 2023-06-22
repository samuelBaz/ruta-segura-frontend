import { Meta, StoryFn } from '@storybook/react'
import { ContenedorBitacora } from '../../../../common/components/ui/ContenedorBitacora'
import { IBitacoraProps } from '../../../../common/components/ui/Bitacora'

export default {
  title: 'Organismos/Bitacora/ContenedorBitacora',
  component: ContenedorBitacora,
} as Meta<typeof ContenedorBitacora>

const Template: StoryFn<typeof ContenedorBitacora> = (args) => (
  <ContenedorBitacora {...args} />
)

export const BitacoraVacia = Template.bind({})
BitacoraVacia.storyName = 'Bitacora vacía'
BitacoraVacia.args = {
  titulo: 'Últimas acciones',
  items: [],
}

const accionesRealizadasHoy: IBitacoraProps[] = [
  {
    titulo: 'Hoy',
    items: [
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: 'hace 1 minuto',
      },
      {
        accion: 'Editó iniciativa Almacenamiento d...',
        color_icono: 'info',
        tiempo: 'hace 35 minutos',
      },
      {
        accion: 'Creó iniciativa Almacenamiento d...',
        color_icono: 'success',
        tiempo: 'hace 59 minutos',
      },
      {
        accion: 'Editó iniciativa La planta de liq...',
        color_icono: 'info',
        tiempo: 'hace 1 hora',
      },
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: 'hace 2 horas',
      },
      {
        accion: 'Creó iniciativa Se entregaron di...',
        color_icono: 'success',
        tiempo: 'hace 3 horas',
      },
      {
        accion: 'Eliminó iniciativa ',
        color_icono: 'error',
        tiempo: 'hace 5 horas',
      },
    ],
  },
]

export const AccionesRealizadasHoy = Template.bind({})
AccionesRealizadasHoy.args = {
  titulo: 'Últimas acciones',
  items: accionesRealizadasHoy,
}

const accionesRealizadasEnDiferentesTiempos: IBitacoraProps[] = [
  {
    titulo: 'Hoy',
    items: [
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: 'hace 1 minuto',
      },
      {
        accion: 'Editó iniciativa Almacenamiento d...',
        color_icono: 'info',
        tiempo: 'hace 35 minutos',
      },
      {
        accion: 'Creó iniciativa Almacenamiento d...',
        color_icono: 'success',
        tiempo: 'hace 59 minutos',
      },
      {
        accion: 'Editó iniciativa La planta de liq...',
        color_icono: 'info',
        tiempo: 'hace 1 hora',
      },
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: 'hace 2 horas',
      },
      {
        accion: 'Creó iniciativa Se entregaron di...',
        color_icono: 'success',
        tiempo: 'hace 3 horas',
      },
      {
        accion: 'Eliminó iniciativa ',
        color_icono: 'error',
        tiempo: 'hace 5 horas',
      },
    ],
  },
  {
    titulo: 'Ayer',
    items: [
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: 'hace 19 horas',
      },
      {
        accion: 'Editó iniciativa Almacenamiento d...',
        color_icono: 'info',
        tiempo: 'hace alrededor de 23 horas',
      },
    ],
  },
  {
    titulo: 'Hace 5 días',
    items: [
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: '01/06/2023',
      },
      {
        accion: 'Editó iniciativa Almacenamiento d...',
        color_icono: 'info',
        tiempo: '01/06/2023',
      },
      {
        accion: 'Creó iniciativa Almacenamiento d...',
        color_icono: 'success',
        tiempo: '01/06/2023',
      },
      {
        accion: 'Editó iniciativa La planta de liq...',
        color_icono: 'info',
        tiempo: '01/06/2023',
      },
    ],
  },
  {
    titulo: 'Hace alrededor de 1 mes',
    items: [
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: '01/05/2023',
      },
      {
        accion: 'Editó iniciativa Almacenamiento d...',
        color_icono: 'info',
        tiempo: '01/05/2023',
      },
      {
        accion: 'Creó iniciativa Almacenamiento d...',
        color_icono: 'success',
        tiempo: '01/04/2023',
      },
      {
        accion: 'Editó iniciativa La planta de liq...',
        color_icono: 'info',
        tiempo: '01/03/2023',
      },
    ],
  },
  {
    titulo: 'Hace 2 meses',
    items: [
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: '25/03/2023',
      },
      {
        accion: 'Editó iniciativa Almacenamiento d...',
        color_icono: 'info',
        tiempo: '25/03/2023',
      },
      {
        accion: 'Creó iniciativa Almacenamiento d...',
        color_icono: 'success',
        tiempo: '25/02/2023',
      },
      {
        accion: 'Editó iniciativa La planta de liq...',
        color_icono: 'info',
        tiempo: '25/01/2023',
      },
      {
        accion: 'Aprobó iniciativa ',
        color_icono: 'success',
        tiempo: '25/01/2023',
      },
    ],
  },
]

export const AccionesRealizadasEnDiferentesTiempos = Template.bind({})
AccionesRealizadasEnDiferentesTiempos.args = {
  titulo: 'Últimas acciones',
  items: accionesRealizadasEnDiferentesTiempos,
}
