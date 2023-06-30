// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { Button } from '@mui/material'
import { IframeOptimizado } from '../../../utils/IFrameOptimisado'
import { LayoutUser } from '../../../../common/components/layouts'
export default {
  title: 'Moleculas/Layauts/LayautUser',
  component: LayoutUser,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente se utiliza para envolver un componente children junto con el componente NavBarUser. Lo envuelve con una etiqueta head y un título en la cabecera.`,
      },
    },
  },
} as Meta<typeof LayoutUser>

const Template1: StoryFn<typeof LayoutUser> = (args) => {
  return (
    <IframeOptimizado height="200px">
      <LayoutUser {...args} />
    </IframeOptimizado>
  )
}

export const Default = Template1.bind({})
Default.storyName = 'Layaut user'
Default.args = {
  title: 'Layaut Login',
  children: <Button variant="contained"> Elemento Hijo </Button>,
  ...Default.args,
}
