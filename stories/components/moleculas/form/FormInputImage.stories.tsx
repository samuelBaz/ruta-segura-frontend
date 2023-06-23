// import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { Path, useForm } from 'react-hook-form'

import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs'
import FormInputImage from '../../../../common/components/ui/form/FormInputImage'

export interface PersonaType {
  id: number
  nombre: string
  apellido: string
  carnet: string
  edad: number
  historialCriminal: string
  imagenes: any
}
export default {
  title: 'Moleculas/Formulario/FormInputImage',
  component: FormInputImage,
  argTypes: {
    onChange: { type: 'function', control: () => {} },
    // control: { type: 'function', description: 'Control<any>' },
  },

  parameters: {
    docs: {
      description: {
        component:
          // 'Form - _FormInputImage_' +
          '\n#### Información sobre  - _FormInputImage_. ' +
          '\n> Para los componentes **_form_** se utiliza [***UseFormHook***](https://react-hook-form.com/api/usecontroller/controller "Ir a la documentación") para su manipulación. \n' +
          '\n```ts' +
          '\nconst {control, handleSubmit} useForm<PersonaType>({' +
          '\n   defaultValues: {' +
          '\n     id: 12,' +
          "\n     nombre: 'Pedro'," +
          "\n     apellido: 'Picapiedra'," +
          "\n     carnet: '9999999'," +
          '\n     edad: 32,' +
          '\n     imagenes: ' +
          "\n     historialCriminal: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
          "\n                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," +
          '\n                         when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into' +
          "\n                         electronic typesetting, remaining essentially unchanged.'," +
          '\n   }' +
          '\n})' +
          '\n```' +
          '\n> Donde ***`const control`*** lo enviaremos a todos nuestros componentes form.' +
          '\n> y ***`name`*** hace referencia al valor.' +
          '\n' +
          '\n> El atributo  ***`imagenes`*** hace refencia a al tipo de archivo de javascript FileList.',
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
// storiesOf('Form/FormInputImage', module).add('Click', () => (
//   <FormInputImage id={'123123'} name="apellido" control={}></FormInputImage>
// ))
// replica del componente
const Template: StoryFn<typeof FormInputImage> = (args) => {
  const { control } = useForm<PersonaType>({
    defaultValues: {
      id: 12,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      edad: 32,
      carnet: '9999999',
      historialCriminal: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged.`,
    },
  })

  return (
    <FormInputImage
      {...args}
      control={control}
      name={args.name as Path<PersonaType>}
    />
  )
}

export const SB_CargaImagenes = Template.bind({})
SB_CargaImagenes.storyName = 'Cargar de Imagenes'
SB_CargaImagenes.args = {
  label: 'Imagenes',
  id: 'textfield-form-1',
  name: 'imagenes',
  multiple: true,
}
export const SB_CargarNImagenes = Template.bind({})
SB_CargarNImagenes.storyName = 'Cargar n(5) cantidad de Imagenes'
SB_CargarNImagenes.args = {
  label: 'Imagenes',
  id: 'textfield-form-3',
  name: 'imagenes',
  multiple: true,
  limite: 5,
}

export const SB_CargarImagen = Template.bind({})
SB_CargarImagen.storyName = 'Cargar una Imagen'
SB_CargarImagen.args = {
  label: 'Imagen',
  id: 'textfield-form-2',
  name: 'imagenes',
}
