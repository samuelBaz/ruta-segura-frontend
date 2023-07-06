import { Meta, StoryFn } from '@storybook/react'
import { Bitacora } from '../../../../common/components/ui/Bitacora'
import { IBitacoraItems } from '../../../../common/types'

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

const accionesRealizadasHoy: IBitacoraItems[] = [
  {
    accion: 'Registro de la transacción en el sistema de la entidad',
    tiempo: '4 de Julio de 2023, 11:15am',
    color_icono: 'success',
  },
  {
    accion:
      'Entrega del documento al ciudadano junto con explicación de la razón del rechazo en caso de rechazo',
    tiempo: '4 de Julio de 2023, 11:00am',
    color_icono: 'warning',
  },
  {
    accion:
      'Procesamiento y entrega del documento al ciudadano en caso de aprobación',
    tiempo: '4 de Julio de 2023, 11:00am',
    color_icono: 'success',
  },
  {
    accion: 'Aprobación o rechazo del documento por parte del departamento',
    tiempo: '3 de Julio de 2023, 10:30am',
    color_icono: 'info',
  },
  {
    accion:
      'Revisión del documento por parte del departamento y toma de decisión',
    tiempo: '3 de Julio de 2023, 9:00am',
    color_icono: 'info',
  },
  {
    accion:
      'Registro del documento en el sistema de la entidad y envío al departamento correspondiente',
    tiempo: '2 de Julio de 2023, 11:15am',
    color_icono: 'info',
  },
  {
    accion:
      'Recepción y verificación del documento por parte del empleado de la entidad pública',
    tiempo: '2 de Julio de 2023, 11:00am',
    color_icono: 'info',
  },
  {
    accion: 'Ciudadano presenta solicitud de permiso de construcción',
    tiempo: '2 de Julio de 2023, 10:30am',
    color_icono: 'info',
  },
]

export const Default = Template.bind({})
Default.storyName = 'Ejemplo Bitacora'
Default.args = {
  titulo: 'Hoy',
  items: accionesRealizadasHoy,
}

export const BitacoraVacia = Template.bind({})
BitacoraVacia.storyName = 'Bitacora vacía'
BitacoraVacia.args = {
  titulo: 'Últimas acciones',
  items: [],
}
