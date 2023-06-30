// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { FullScreenLoading } from '../../../../common/components/ui/FullScreenLoading'
import { IframeOptimizado } from '../../../utils/IFrameOptimisado'
export default {
  title: 'Moleculas/Elementos/FullScreenLoading',
  component: FullScreenLoading,
  parameters: {
    docs: {
      description: {
        component: `Este componente proporciona una ventana de carga. Se recomienda utilizarlo junto con su proveedor y envolver los componentes children con dicho proveedor.`,
      },
    },
  },
} as Meta<typeof FullScreenLoading>

const Template1: StoryFn<typeof FullScreenLoading> = (args) => {
  return (
    <IframeOptimizado height="400px" color="white">
      <FullScreenLoading {...args} />
    </IframeOptimizado>
  )
}

export const Default = Template1.bind({})
Default.storyName = 'Full screen loading'
Default.args = {
  ...Default.args,
}
