// import React from 'react'

import { action } from '@storybook/addon-actions'
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs'
import { ComponentStory, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { FormInputDropdownMultiple } from '../../../../../../common/components/ui/form/FormInputDropdownMultiple'

export interface PersonaType {
  id: number
  nombre: string
  apellido: string
  carnet: string
  fechaNacimiento: string
  edad: number
  idsPeliculasFavoritas: number[]
}
export default {
  title: 'Form/FormInputDropdownMultiple',
  component: FormInputDropdownMultiple,
  argTypes: {
    // onChange: { type: 'function', control: () => {} },
    // control: { type: 'function', description: 'Control<any>' },
  },

  parameters: {
    docs: {
      description: {
        component:
          // 'Form - _FormInputDropdownMultiple_' +
          '\n#### Información sobre  - _FormInputDropdownMultiple_. ' +
          '\n> Para los componentes **_form_** se utiliza [***UseFormHook***](https://react-hook-form.com/api/usecontroller/controller "Ir a la documentación") para su manipulación. \n' +
          '\n```ts' +
          '\nconst {control, handleSubmit} useForm<PersonaType>({' +
          '\n   defaultValues: {' +
          '\n     id: 12,' +
          "\n     nombre: 'Pedro'," +
          "\n     apellido: 'El Escamoso'," +
          '\n     edad: 32,' +
          '\n     fechaNacimiento: 05-21-1984,' +
          '\n     idsPeliculasFavoritas: [1,2],' +
          '\n})' +
          '\n```' +
          '\n> Donde ***`const control`*** lo enviaremos a todos nuestros componentes form.' +
          '\n> y ***`name`*** hace referencia al valor.',
      },
      page: () => (
        <>
          <Description />
          <Title />
          <Subtitle />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  // parameters: {
  //   accion: {
  //     handles: ['mouseover', 'CLICK aqui'],
  //   },
  // },
} as Meta

// const eventsFromNames = actions('accion')

// click en componenete
// storiesOf('FormInputDropdownMultiple', module).add('Click', () => (
//   <FormInputDropdownMultiple
//     name="HOla"
//     titulo="ACCION ICONO"
//     icono="face"
//     accion={action('HOLA MUNDO ')}
//   ></FormInputDropdownMultiple>
// ))
// replica del componente
const Template: ComponentStory<typeof FormInputDropdownMultiple> = (args) => {
  const { control } = useForm<PersonaType>({
    defaultValues: {
      id: 12,
      nombre: 'Pedro',
      apellido: 'El Escamoso',
      edad: 32,
      fechaNacimiento: '05-21-1984',
      idsPeliculasFavoritas: [1, 2],
    },
  })

  return <FormInputDropdownMultiple {...args} control={control} />
}

const peliculas = [
  { id: 1, nombre: 'Inteligencia Artificial' },
  { id: 2, nombre: 'Hormiguitas' },
  { id: 3, nombre: 'Bichos' },
  { id: 4, nombre: 'Toys Stori' },
  { id: 5, nombre: 'Batman' },
  { id: 6, nombre: 'La bicicleta de los huanca' },
  { id: 7, nombre: 'Superman' },
]
// export const SB_Requerido = Template.bind({})
// SB_Requerido.storyName = 'Campo Requerido'
// SB_Requerido.parameters = {
//   docs: {
//     description: {
//       story:
//         'Antes de enviar el FormInputDate UseForm nos pedirá llenar el campo vacio',
//     },
//   },
// }
// SB_Requerido.args = {
//   name: 'fechaNacimiento',
//   label: 'Fecha de Nacimiento',
//   id: 'textfield-form-1',
// }

export const SB_Vacio = Template.bind({})
SB_Vacio.storyName = 'Seleccionados'
SB_Vacio.args = {
  id: '1232131',
  label: 'Peliculas favoritas',
  name: 'idsPeliculasFavoritas',
  options: peliculas.map((item) => ({
    key: item.id + '',
    value: item.id + '',
    label: item.nombre,
  })),
}
