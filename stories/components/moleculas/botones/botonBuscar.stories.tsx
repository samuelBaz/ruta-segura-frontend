// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BotonBuscar } from '../../../../common/components/ui/BotonBuscar'
export default {
  title: 'Moleculas/Botones/BotonBuscar',
  component: BotonBuscar,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente es un diseño de boton standar para la accion de buscar`,
      },
    },
  },
} as Meta<typeof BotonBuscar>

const Template: StoryFn<typeof BotonBuscar> = (args) => (
  <BotonBuscar {...args} />
)

export const Default = Template.bind({})
Default.storyName = 'Boton buscar'
Default.args = {
  id: 'idbtnBuscar',
  mostrar: true,
  cambiar: action('()=>{console.log("Click en IconoTooltip")}'),
}
