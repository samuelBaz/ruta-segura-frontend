// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { NavbarUser } from '../../../../common/components/ui'
import { IframeOptimizado } from '../../../utils/IFrameOptimisado'
export default {
  title: 'Organismos/Navegación/NavBarUser',
  component: NavbarUser,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
        Este componente muestra el botón de menú, el botón de ayuda, el botón de cambio de tema y el botón de usuario.`,
      },
    },
  },
} as Meta<typeof NavbarUser>

const Template1: StoryFn<typeof NavbarUser> = () => {
  return (
    <IframeOptimizado height="70px">
      <NavbarUser />
    </IframeOptimizado>
  )
}

export const NavBarUserDefault = Template1.bind({})
NavBarUserDefault.storyName = 'NavBarUser'
