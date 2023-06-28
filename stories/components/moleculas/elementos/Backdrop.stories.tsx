import { Meta, StoryFn } from '@storybook/react'
import { BackdropVista } from '../../../../common/components/ui/Backdrop'

export default {
  title: 'Moleculas/Elementos/Backdrop',
  component: BackdropVista,
  parameters: {
    docs: {
      description: {
        component: 'Un componente de fondo para cargar algún elemento.',
      },
    },
  },
} as Meta

const Template: StoryFn<typeof BackdropVista> = (args) => (
  <BackdropVista {...args} />
)

export const Default = Template.bind({})
Default.storyName = 'Backdrop'
Default.args = {
  cargando: true,
  color: 'inherit',
  titulo: 'Firmando',
}

export const BackdropSize = Template.bind({})
BackdropSize.storyName = 'Tamaño de icono'
BackdropSize.args = {
  cargando: true,
  color: 'inherit',
  titulo: 'Cargando',
  size: 60,
}

export const BackdropColor = Template.bind({})
BackdropColor.storyName = 'Color de icono'
BackdropColor.args = {
  cargando: true,
  color: 'success',
  titulo: 'Generando',
  size: 60,
}
