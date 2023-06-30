// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { BotonOrdenar } from '../../../../common/components/ui/BotonOrdenar'
import {
  CriterioOrdenType,
  OrdenEnum,
} from '../../../../common/types/ordenTypes'
import { useState } from 'react'
export default {
  title: 'Moleculas/Botones/BotonOrdenar',
  component: BotonOrdenar,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Este componente se utiliza para agrupar varias acciones representadas en forma de botones dentro de una lista desplegable`,
      },
    },
  },
} as Meta<typeof BotonOrdenar>
const Template1: StoryFn<typeof BotonOrdenar> = (args) => {
  const [ordenCriterios, setOrdenCriterios] = useState<
    Array<CriterioOrdenType>
  >([
    { campo: 'nombre', nombre: 'Nombre', ordenar: true, orden: OrdenEnum.DESC },
    { campo: 'resumen', nombre: 'Resumen', ordenar: true },
    {
      campo: 'fechaPublicacion',
      nombre: 'Fecha Publicación',
      ordenar: true,
    },
    { campo: 'acciones', nombre: 'Eventos' },
  ])
  args.criterios = ordenCriterios
  args.cambioCriterios = setOrdenCriterios
  return <BotonOrdenar {...args} />
}

const Template2: StoryFn<typeof BotonOrdenar> = (args) => {
  const [ordenCriterios, setOrdenCriterios] = useState<
    Array<CriterioOrdenType>
  >([
    { campo: 'nombre', nombre: 'Nombre', ordenar: true },
    { campo: 'resumen', nombre: 'Resumen', ordenar: true },
    {
      campo: 'fechaPublicacion',
      nombre: 'Fecha Publicación',
      ordenar: true,
    },
    { campo: 'acciones', nombre: 'Eventos' },
  ])
  args.criterios = ordenCriterios
  args.cambioCriterios = setOrdenCriterios
  return <BotonOrdenar {...args} />
}
export const Default = Template1.bind({})
Default.storyName = 'Boton ordenar'
Default.args = {
  id: 'idbtn',
  desactivado: false,
  ...Default.args,
  label: 'btnOrdenar',
}
export const BtnOrdenarVacio = Template2.bind({})
BtnOrdenarVacio.storyName = 'Boton ordenar sin funcion activa'
BtnOrdenarVacio.args = {
  id: 'idbtn',
  desactivado: false,
  ...Default.args,
  label: 'btnOrdenar',
  criterios: [],
}
