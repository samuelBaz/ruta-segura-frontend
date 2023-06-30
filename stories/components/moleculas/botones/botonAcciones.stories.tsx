// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { BotonAcciones } from '../../../../common/components/ui/BotonAcciones'
export default {
  title: 'Moleculas/Botones/BotonAcciones',
  component: BotonAcciones,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente se utiliza para agrupar varias acciones representadas en forma de botones dentro de una lista desplegable.`,
      },
    },
  },
} as Meta<typeof BotonAcciones>

const Template1: StoryFn<typeof BotonAcciones> = (args) => {
  args.acciones = [
    {
      color: 'primary',
      icono: 'savings',
      titulo: 'save',
      desactivado: false,
      mostrar: true,
      name: 'Nprueba',
      id: 'id',
      accion: () => {},
    },
    {
      color: 'primary',
      icono: 'edit',
      titulo: 'edit',
      desactivado: false,
      mostrar: true,
      name: 'Nprueba',
      id: 'id',
      accion: () => {},
    },
    {
      color: 'primary',
      icono: 'refresh',
      titulo: 'refresh',
      desactivado: false,
      mostrar: true,
      name: 'Nprueba',
      id: 'id',
      accion: () => {},
    },
  ]
  return <BotonAcciones {...args} />
}

export const Default = Template1.bind({})
Default.storyName = 'Boton acciones'
Default.args = {
  id: 'idbtn',
  texto: 'Btn Agregar',
  ...Default.args,
  tipo: 'icono',
}
