// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import ThemeSwitcherButton from '../../../../common/components/ui/ThemeSwitcherButton'
import { ThemeProvider } from '../../../../context/ui/ThemeContext'
export default {
  title: 'Moleculas/Botones/ThemeSwitchButton',
  component: ThemeSwitcherButton,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente se usa para cambiar el thema claro o oscuro.`,
      },
    },
  },
} as Meta<typeof ThemeSwitcherButton>

const Template1: StoryFn<typeof ThemeSwitcherButton> = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcherButton />
    </ThemeProvider>
  )
}

export const Default = Template1.bind({})
Default.storyName = 'Switch boton thema'
