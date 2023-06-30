// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { LayoutLogin } from '../../../../common/components/layouts'
import { Button } from '@mui/material'
import { IframeOptimizado } from '../../../utils/IFrameOptimisado'
export default {
  title: 'Moleculas/Layauts/LayautLogin',
  component: LayoutLogin,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente se utiliza para envolver un componente children junto con el componente NavBarLogin. Lo envuelve con una etiqueta head y un título en la cabecera.`,
      },
    },
  },
} as Meta<typeof LayoutLogin>

const Template1: StoryFn<typeof LayoutLogin> = (args) => {
  return (
    <IframeOptimizado height="200px">
      <LayoutLogin {...args} />
    </IframeOptimizado>
  )
}

export const Default = Template1.bind({})
Default.storyName = 'Layaut login'
Default.args = {
  title: 'Layaut Login',
  children: <Button variant="contained"> Elemento Hijo </Button>,
  ...Default.args,
}
