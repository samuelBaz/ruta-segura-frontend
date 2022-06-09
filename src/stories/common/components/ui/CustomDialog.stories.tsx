// import React from 'react'

import { ComponentStory, ComponentMeta, storiesOf } from '@storybook/react'

import { action, actions } from '@storybook/addon-actions'
import { CustomDialog } from '../../../../../common/components/ui/CustomDialog'
import { Button } from '@mui/material'
export default {
  title: 'COMPONENTES/CustomDialog',
  component: CustomDialog,
  argTypes: {
    children: {
      description: 'ReactNode',
      control: 'text',
    },
  },
  // parameters: {
  //   accion: {
  //     handles: ['mouseover', 'CLICK aqui'],
  //   },
  // },
} as ComponentMeta<typeof CustomDialog>

// const eventsFromNames = actions('accion')

// replica del componente
const Template: ComponentStory<typeof CustomDialog> = (args) => (
  <CustomDialog {...args} />
)
export const Activo = Template.bind({})
Activo.storyName = 'Modal activo'
Activo.args = {
  isOpen: true,
  fullScreen: false,
  maxWidth: 'md',
  title: 'Titulo de modal',
  handleClose: action('handleClose: ()=>{console.log("Cerrar Modal")}'),
}
export const FullWidth = Template.bind({})
FullWidth.storyName = 'Modal pantalla completa'
FullWidth.args = {
  ...Activo.args,
  fullScreen: true,
}

export const ComponeneteHijo = Template.bind({})
ComponeneteHijo.storyName = 'Componenete hijo para modal'
ComponeneteHijo.args = {
  ...Activo.args,
  fullScreen: false,
  children: (
    <div>
      <h3>Componente React...</h3>
      <h6> React node</h6>
    </div>
  ),
}

export const MaxWidth = Template.bind({})
MaxWidth.storyName = 'Tamaño para modal'
MaxWidth.args = {
  ...Activo.args,
  maxWidth: 'xs',
  children: (
    <div>
      <h3>Componente React...</h3>
      <h6> React node</h6>
    </div>
  ),
}

export const TituloReacNode = Template.bind({})
TituloReacNode.storyName = 'Titulo con React node'
TituloReacNode.args = {
  ...Activo.args,
  maxWidth: 'xs',
  title: (
    <div>
      Hola mundo y click{' '}
      <Button onClick={action('Cancelar accion')}>Cancelar</Button>{' '}
      <Button onClick={action('Acpetar accion')}>Aceptar</Button>{' '}
    </div>
  ),
  children: (
    <div>
      <h3>Componente React...</h3>
      <h6> React node</h6>
    </div>
  ),
}

// // click en componenete
// storiesOf('CustomDialog', module).add('Cerrado', () => (
//   <CustomDialog
//     title="Modal cerrado"
//     isOpen={false}
//     handleClose={() => {}}
//   ></CustomDialog>
// ))
// export const Titulo = Template.bind({})
// Titulo.storyName = 'Icono tooltip'
// Titulo.args = {
//   titulo: 'Mensaje tooltip para iconos',
//   icono: 'savings',
//   accion: action('()=>{console.log("Click en IconoTooltip")}'),
//   name: 'IconToolTip',
// }
