// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { NivelSeguridadPass } from '../../../../common/components/ui/NivelSeguridadPass'
export default {
  title: 'Moleculas/Utils/NivelSeguridadPass',
  component: NivelSeguridadPass,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente indica el nivel de seguridad del password registrado.`,
      },
    },
  },
} as Meta<typeof NivelSeguridadPass>

const Template1: StoryFn<typeof NivelSeguridadPass> = (args) => {
  return <NivelSeguridadPass {...args} />
}

export const Default = Template1.bind({})
Default.storyName = 'Nivel seguridad Password'
Default.args = {
  ...Default.args,
}
