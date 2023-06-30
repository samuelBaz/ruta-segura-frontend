// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { IframeOptimizado } from '../../../utils/IFrameOptimisado'
import DebugBanner from '../../../../common/components/DebugBanner'
import { Constantes } from '../../../../config'
export default {
  title: 'Atomos/util/DebugBaner/DebugBaner',
  component: DebugBanner,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente muestra una etiqueta que indica el entorno en el que se encuentra el sistema, ya sea Desarrollo o Test demo.

        Nota: Esta etiqueta se genera automáticamente en función de las variables de entorno del sistema.`,
      },
    },
  },
} as Meta<typeof DebugBanner>

const Template2: StoryFn<typeof DebugBanner> = (args: any) => {
  Constantes.appEnv = args.texto
  return (
    <IframeOptimizado height="100px" padding="none" border="10px">
      <DebugBanner />
    </IframeOptimizado>
  )
}
export const DebugBanerDevelop = Template2.bind({})
DebugBanerDevelop.storyName = 'Baner develop'
DebugBanerDevelop.args = {
  texto: 'development',
}

export const DebugBanerTest = Template2.bind({})
DebugBanerTest.storyName = 'Baner test'
DebugBanerTest.args = {
  texto: 'test',
}
