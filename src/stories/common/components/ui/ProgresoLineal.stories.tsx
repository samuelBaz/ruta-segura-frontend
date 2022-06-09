// import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'
import ProgresoLineal from '../../../../../common/components/ui/ProgresoLineal'
export default {
  title: 'COMPONENTES/ProgresoLineal',
  component: ProgresoLineal,
} as ComponentMeta<typeof ProgresoLineal>

const Template: ComponentStory<typeof ProgresoLineal> = (args) => (
  <ProgresoLineal {...args} />
)

export const Activo = Template.bind({})
Activo.storyName = 'Progreso lineal activo'
Activo.args = {
  mostrar: true,
}
export const Inactivo = Template.bind({})
Inactivo.storyName = 'Progreso lineal Inactivo'
Inactivo.args = {
  mostrar: false,
}
