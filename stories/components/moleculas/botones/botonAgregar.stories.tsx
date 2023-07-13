// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BotonAgregar } from '../../../../common/components/ui/BotonAgregar'

export default {
  title: 'Moléculas/Botones/BotonAgregar',
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
        component: `Componente que devuelve un botón o un icono con un tooltip dependiendo del valor de la variable "variante". La función toma como argumentos un id, un texto, una descripción, una acción y una variante que es opcional y puede ser "boton" o "icono". Si la variante es "boton", la función devuelve un botón con el texto proporcionado y la acción correspondiente. Si la variante es "icono", la función devuelve un icono con un tooltip que muestra la descripción proporcionada y la acción correspondiente.`,
      },
    },
  },
} as Meta<typeof BotonAgregar>

const Template: StoryFn<typeof BotonAgregar> = (args) => (
  <BotonAgregar {...args} />
)

export const Default = Template.bind({})
Default.storyName = 'Boton agregar'
Default.args = {
  id: 'idbtn',
  texto: 'Agregar',
  descripcion: '',
  accion: action('()=>{console.log("Click en IconoTooltip")}'),
}

export const BtnAgregarIcono = Template.bind({})
BtnAgregarIcono.storyName = 'Icono agregar'
BtnAgregarIcono.args = {
  id: 'idbtn',
  texto: 'icono',
  descripcion: '',
  variante: 'icono',
  accion: action('()=>{console.log("Click en IconoTooltip")}'),
}
