import { Meta, StoryFn } from '@storybook/react'
import { ContenedorBitacora } from '../../../../common/components/ui/ContenedorBitacora'
import { IBitacoraProps } from '../../../../common/components/ui/Bitacora'

export default {
  title: 'Organismos/Bitacora/ContenedorBitacora',
  component: ContenedorBitacora,
  parameters: {
    docs: {
      description: {
        component:
          'Componente que muestra una tarjeta con un título y una lista de elementos de bitácora. El componente puede tener una altura máxima y mínima configurada y, si la lista está vacía, muestra un mensaje "Sin resultados".',
      },
    },
  },
} as Meta<typeof ContenedorBitacora>

const Template: StoryFn<typeof ContenedorBitacora> = (args) => (
  <ContenedorBitacora {...args} />
)

const accionesRealizadasHoy: IBitacoraProps[] = [
  {
    titulo: 'Procesamiento de la orden',
    items: [
      {
        accion: 'Recibida orden de envío',
        tiempo: '1 de Julio de 2023, 10:30am',
        color_icono: 'info',
      },
      {
        accion: 'Procesamiento de la orden por el almacén',
        tiempo: '1 de Julio de 2023, 11:00am',
        color_icono: 'info',
      },
      {
        accion: 'Empaquetado de los artículos',
        tiempo: '1 de Julio de 2023, 11:30am',
        color_icono: 'info',
      },
      {
        accion: 'Etiquetado del paquete',
        tiempo: '1 de Julio de 2023, 12:00pm',
        color_icono: 'info',
      },
    ],
  },
  {
    titulo: 'Envío del paquete',
    items: [
      {
        accion: 'Carga del paquete en el camión de envío',
        tiempo: '1 de Julio de 2023, 1:00pm',
        color_icono: 'info',
      },
      {
        accion: 'Salida del camión de envío del almacén',
        tiempo: '1 de Julio de 2023, 2:00pm',
        color_icono: 'info',
      },
      {
        accion: 'Llegada del camión de envío al centro de distribución',
        tiempo: '1 de Julio de 2023, 4:00pm',
        color_icono: 'info',
      },
      {
        accion: 'Clasificación del paquete en el centro de distribución',
        tiempo: '1 de Julio de 2023, 4:30pm',
        color_icono: 'info',
      },
      {
        accion: 'Carga del paquete en el avión de envío',
        tiempo: '1 de Julio de 2023, 6:00pm',
        color_icono: 'info',
      },
      {
        accion: 'Salida del avión de envío del centro de distribución',
        tiempo: '1 de Julio de 2023, 8:00pm',
        color_icono: 'info',
      },
      {
        accion: 'Llegada del avión de envío al aeropuerto de destino',
        tiempo: '1 de Julio de 2023, 10:00pm',
        color_icono: 'info',
      },
      {
        accion: 'Desembarque del paquete del avión de envío',
        tiempo: '1 de Julio de 2023, 11:00pm',
        color_icono: 'info',
      },
    ],
  },
  {
    titulo: 'Entrega del paquete',
    items: [
      {
        accion: 'Entrega del paquete a la empresa de mensajería local',
        tiempo: '2 de Julio de 2023, 9:00am',
        color_icono: 'info',
      },
      {
        accion:
          'Llegada del paquete a la oficina de la empresa de mensajería local',
        tiempo: '2 de Julio de 2023, 10:00am',
        color_icono: 'info',
      },
      {
        accion: 'Entrega programada del paquete al destinatario',
        tiempo: '3 de Julio de 2023, 10:00am',
        color_icono: 'info',
      },
      {
        accion: 'Entrega exitosa del paquete al destinatario',
        tiempo: '3 de Julio de 2023, 11:00am',
        color_icono: 'success',
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
    titulo: 'Solicitud de permiso de construcción',
    items: [
      {
        accion: 'Ciudadano presenta solicitud de permiso de construcción',
        tiempo: '2 de Julio de 2023, 10:30am',
        color_icono: 'info',
      },
      {
        accion:
          'Recepción y verificación del documento por parte del empleado de la entidad pública',
        tiempo: '2 de Julio de 2023, 11:00am',
        color_icono: 'info',
      },
      {
        accion:
          'Registro del documento en el sistema de la entidad y envío al departamento correspondiente',
        tiempo: '2 de Julio de 2023, 11:15am',
        color_icono: 'info',
      },
    ],
  },
  {
    titulo: 'Revisión y evaluación del documento',
    items: [
      {
        accion:
          'Revisión del documento por parte del departamento y toma de decisión',
        tiempo: '3 de Julio de 2023, 9:00am',
        color_icono: 'info',
      },
      {
        accion: 'Aprobación o rechazo del documento por parte del departamento',
        tiempo: '3 de Julio de 2023, 10:30am',
        color_icono: 'info',
      },
    ],
  },
  {
    titulo: 'Procesamiento y entrega del documento',
    items: [
      {
        accion:
          'Procesamiento y entrega del documento al ciudadano en caso de aprobación',
        tiempo: '4 de Julio de 2023, 11:00am',
        color_icono: 'success',
      },
      {
        accion:
          'Entrega del documento al ciudadano junto con explicación de la razón del rechazo en caso de rechazo',
        tiempo: '4 de Julio de 2023, 11:00am',
        color_icono: 'warning',
      },
      {
        accion: 'Registro de la transacción en el sistema de la entidad',
        tiempo: '4 de Julio de 2023, 11:15am',
        color_icono: 'success',
      },
      {
        accion:
          'Procesamiento y entrega del documento al ciudadano en caso de aprobación final',
        tiempo: '7 de Julio de 2023, 11:00am',
        color_icono: 'success',
      },
    ],
  },
  {
    titulo: 'Comunicación con el ciudadano',
    items: [
      {
        accion:
          'Comunicación con el ciudadano para solicitar información adicional',
        tiempo: '5 de Julio de 2023, 9:00am',
        color_icono: 'warning',
      },
      {
        accion:
          'Recepción de información adicional del ciudadano y registro en el sistema de la entidad',
        tiempo: '5 de Julio de 2023, 10:00am',
        color_icono: 'info',
      },
    ],
  },
  {
    titulo: 'Revisión y evaluación de la información adicional',
    items: [
      {
        accion:
          'Revisión y evaluación de la información adicional por parte del departamento',
        tiempo: '6 de Julio de 2023, 9:00am',
        color_icono: 'info',
      },
    ],
  },
  {
    titulo: 'Aprobación o rechazo final del permiso',
    items: [
      {
        accion:
          'Aprobación o rechazo final del permiso de construcción por parte del departamento',
        tiempo: '7 de Julio de 2023, 10:30am',
        color_icono: 'info',
      },
    ],
  },
]

export const AccionesRealizadasEnDiferentesTiempos = Template.bind({})
AccionesRealizadasEnDiferentesTiempos.args = {
  titulo: 'Últimas acciones',
  items: accionesRealizadasEnDiferentesTiempos,
}

export const BitacoraVacia = Template.bind({})
BitacoraVacia.storyName = 'Bitacora vacía'
BitacoraVacia.args = {
  titulo: 'Últimas acciones',
  items: [],
}
