// import React from 'react'

import { ComponentStory, ComponentMeta, storiesOf } from '@storybook/react'

import { action, actions } from '@storybook/addon-actions'
import { Paginacion } from '../../../../../common/components/ui/Paginacion'
export default {
  title: 'COMPONENTES/Paginacion',
  component: Paginacion,
  argTypes: {
    accion: { type: 'function', control: () => {} },
  },
} as ComponentMeta<typeof Paginacion>

const Template: ComponentStory<typeof Paginacion> = (args) => (
  <Paginacion {...args} />
)

export const SB_Paginacion = Template.bind({})
SB_Paginacion.storyName = 'Icono tooltip'
SB_Paginacion.args = {
  limite: 10,
  pagina: 2,
  total: 500,
  cambioPagina: action(
    'cambioPagina: (nuevaPagina: number) => {console.log("Se ha cambiado la página")}'
  ),
  cambioLimite: action(
    'cambioLimite: (nuevoLimite: number) => {console.log("Se ha cambiado el límite")}'
  ),
}
