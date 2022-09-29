import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icono } from '../../../../../common/components/ui/Icono'

export default {
  title: 'COMPONENTES/Icono',
  component: Icono,
} as ComponentMeta<typeof Icono>

// replica del componente
const Template: ComponentStory<typeof Icono> = (args) => <Icono {...args} />

export const FontSize = Template.bind({})
FontSize.storyName = 'Tamaño de icono'
FontSize.args = {
  fontSize: 'medium',
  children: 'face',
}

export const Color = Template.bind({})
Color.storyName = 'Colores según paleta'
Color.args = {
  color: 'success',
  children: 'face',
}

export const IconMdi = Template.bind({})
IconMdi.storyName = 'Icono de Material Design Icons'
IconMdi.args = {
  children: 'add_shopping_cart',
}
