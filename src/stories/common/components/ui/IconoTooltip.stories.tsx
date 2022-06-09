// import React from 'react'

import { ComponentStory, ComponentMeta, storiesOf } from '@storybook/react'

import { IconoTooltip } from '../../../../../common/components/ui/IconoTooltip'
import { action, actions } from '@storybook/addon-actions'
export default {
  title: 'COMPONENTES/IconoTooltip',
  component: IconoTooltip,
  argTypes: {
    accion: { type: 'function', control: () => {} },
  },
  // parameters: {
  //   accion: {
  //     handles: ['mouseover', 'CLICK aqui'],
  //   },
  // },
} as ComponentMeta<typeof IconoTooltip>

// const eventsFromNames = actions('accion')

// click en componenete
// storiesOf('IconoTooltip', module).add('Click', () => (
//   <IconoTooltip
//     name="HOla"
//     titulo="ACCION ICONO"
//     icono="face"
//     accion={action('HOLA MUNDO ')}
//   ></IconoTooltip>
// ))
// replica del componente
const Template: ComponentStory<typeof IconoTooltip> = (args) => (
  <IconoTooltip {...args} />
)

export const Titulo = Template.bind({})
Titulo.storyName = 'Icono tooltip'
Titulo.args = {
  titulo: 'Mensaje tooltip para iconos',
  icono: 'savings',
  accion: action('()=>{console.log("Click en IconoTooltip")}'),
  name: 'IconToolTip',
}
export const Color = Template.bind({})
Color.storyName = 'Color de icono para tooltip'
Color.args = {
  ...Titulo.args,
  color: 'warning',
  // ...eventsFromNames,
}
export const NombreIcono = Template.bind({})
NombreIcono.storyName = 'Cambio de Icono MDI para tooltip'
NombreIcono.args = {
  ...Titulo.args,
  icono: 'favorite',
}
export const Desactivado = Template.bind({})
Desactivado.storyName = 'Button de tooltip desactivado'
Desactivado.args = {
  ...Titulo.args,
  desactivado: true,
}
