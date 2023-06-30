// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { NavbarLogin } from '../../../../common/components/ui/NavbarLogin'
import { IframeOptimizado } from '../../../utils/IFrameOptimisado'
export default {
  title: 'Organismos/Navegación/NavBarLogin',
  component: NavbarLogin,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente muestra el botón de ayuda y el botón de cambio de tema.`,
      },
    },
  },
} as Meta<typeof NavbarLogin>

const Template1: StoryFn<typeof NavbarLogin> = () => {
  return (
    <IframeOptimizado height="70px">
      <NavbarLogin />
    </IframeOptimizado>
  )
}

export const NavBaroLogin = Template1.bind({})
NavBaroLogin.storyName = 'NavBarLogin'
