import { Meta, StoryFn } from '@storybook/react'
import { Bitacora } from '../../../../common/components/ui/Bitacora'
import { IBitacoraItems } from '../../../../common/types'

export default {
  title: 'Organismos/Bitacora/Bitacora',
  component: Bitacora,
} as Meta<typeof Bitacora>

const Template: StoryFn<typeof Bitacora> = (args) => <Bitacora {...args} />

export const BitacoraVacia = Template.bind({})
BitacoraVacia.storyName = 'Bitacora vacía'
BitacoraVacia.args = {
  titulo: 'Últimas acciones',
  items: [],
}

const accionesRealizadasHoy: IBitacoraItems[] = [
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
]

export const AccionesRealizadasHoy = Template.bind({})
AccionesRealizadasHoy.args = {
  titulo: 'Hoy',
  items: accionesRealizadasHoy,
}
