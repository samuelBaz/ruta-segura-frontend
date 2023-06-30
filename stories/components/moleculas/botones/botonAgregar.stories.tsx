// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BotonAgregar } from '../../../../common/components/ui/BotonAgregar'

export default {
  title: 'Moleculas/Botones/BotonAgregar',
  component: BotonAgregar,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente  se usa para agregar o procesar inserción cuando el tamaño del contenerdor o pantalla el componente
          pone por defecto el icono de add.`,
      },
    },
  },
} as Meta<typeof BotonAgregar>

const Template: StoryFn<typeof BotonAgregar> = (args) => (
  <BotonAgregar {...args} />
)
const Template1: StoryFn<typeof BotonAgregar> = (args) => {
  return <BotonAgregar {...args} />
  // return <BotonAgregar {...args} />
}

export const Default = Template.bind({})
Default.storyName = 'Boton agregar'
Default.args = {
  id: 'idbtn',
  texto: 'Btn Agregar',
  descripcion: '',
  accion: action('()=>{console.log("Click en IconoTooltip")}'),
}
export const BtnAgregarIconco = Template1.bind({})
BtnAgregarIconco.storyName = 'Icono boton agregar'
BtnAgregarIconco.args = {
  id: 'idbtn',
  texto: 'icono',
  descripcion: '',
  accion: action('()=>{console.log("Click en IconoTooltip")}'),
}
BtnAgregarIconco.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
}
