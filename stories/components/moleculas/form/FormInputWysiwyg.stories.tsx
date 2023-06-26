// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'

import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs'
import { Path, useForm } from 'react-hook-form'
import { FormInputWysiwyg } from '../../../../common/components/ui/form/FormInputWysiwyg'

export interface PersonaType {
  id: number
  nombre: string
  apellido: string
  carnet: string
  edad: number
  comentario: string
}
export default {
  title: 'Moleculas/Formulario/FormInputWysiswyg',
  component: FormInputWysiwyg,
  argTypes: {
    onChange: { type: 'function', control: () => {} },
    // control: { type: 'function', description: 'Control<any>' },
  },

  parameters: {
    docs: {
      description: {
        component:
          // 'Form - _FormInputtext_' +
          '\n#### Información sobre  - _FormInputtext_. ' +
          '\n> Para los componentes **_form_** se utiliza [***UseFormHook***](https://react-hook-form.com/api/usecontroller/controller "Ir a la documentación") para su manipulación. \n' +
          '\n```ts' +
          '\nconst {control, handleSubmit} useForm<PersonaType>({' +
          '\n   defaultValues: {' +
          '\n     id: 12,' +
          "\n     nombre: 'Pedro'," +
          "\n     apellido: 'Picapiedra'," +
          "\n     carnet: '9999999'," +
          '\n     edad: 32,' +
          '\n     comentario: \'Pedro Picapiedra es el personaje principal de la serie animada Los Picapiedra. Es un hombre prehistórico trabajador en una cantera de piedra, esposo de Vilma y padre de Pebbles. Es conocido por su personalidad apasionada y sentido del humor, y por su famoso grito "¡Yabba-Dabba-Doo!".' +
          '\n   }' +
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
} as Meta

// replica del componente
const Template: StoryFn<typeof FormInputWysiwyg> = (args) => {
  let auxHistorial = `Pedro Picapiedra es el personaje principal de la serie animada Los Picapiedra. Es un hombre prehistórico trabajador en una cantera de piedra, esposo de Vilma y padre de Pebbles. Es conocido por su personalidad apasionada y sentido del humor, y por su famoso grito "¡Yabba-Dabba-Doo!".`
  if (args.label == 'Marcas') {
    auxHistorial = `<p><strong>Lorem ipsum dolor sit amet, consectetur </strong></p><p><em>adipiscing elit. Duis pretium maximus sem, in </em></p><p>volutpat dui sodales sit amet. Quisque et elit odio. <strong>Sed quam nunc</strong>, molestie at massa eget, posuere sagittis augue. <em>Ut augue lorem, mollis </em>dapibus massa vel, rutrum rhoncus nulla. </p>`
  } else if (args.label == 'Lista') {
    auxHistorial = `<p><strong>Lorem ipsum dolor sit amet, consectetur </strong></p><ol><li><p><em>adipiscing elit. Duis </em></p></li><li><p><em>pretium maximus sem, in </em></p></li><li><p>volutpat dui sodales sit </p></li></ol><p><strong>amet. Quisque et elit odio. Sed quam nunc, molestie</strong></p><ul><li><p> at massa eget, posuere sagittis </p></li><li><p>augue. <em>Ut augue lorem, mollis </em>dapibus massa vel, rutrum rhoncus nulla. </p></li></ul>`
  } else if (args.label == 'Parrafo') {
    auxHistorial = `<p><strong>Izquierda</strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium maximus sem, in volutpat dui sodales sit amet. Quisque et elit odio. Sed quam nunc, molestie at massa eget, posuere sagittis augue.</p><p><strong>Derecha</strong></p><p style="text-align: right">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium maximus sem, in volutpat dui sodales sit amet. Quisque et elit odio. Sed quam nunc, molestie at massa eget, posuere sagittis augue.</p><p> <strong>Centro</strong></p><p style="text-align: center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium maximus sem, in volutpat dui sodales sit amet. Quisque et elit odio. Sed quam nunc, molestie at massa eget, posuere sagittis augue.</p><p><strong>Justificado</strong></p><p style="text-align: justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium maximus sem, in volutpat dui sodales sit amet. Quisque et elit odio. Sed quam nunc, molestie at massa eget, posuere sagittis augue.</p><p style="text-align: justify"></p>`
  } else if (args.label == 'Link') {
    auxHistorial = `<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://facebook.com"><strong>Izquierda</strong></a></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a target="_blank" rel="noopener noreferrer nofollow" href="https://google.com">Duis pretium maximus sem,</a> in volutpat dui sodales sit amet. Quisque et elit odio. Sed quam nunc, molestie at massa eget, posuere sagittis augue.</p>`
  } else if (args.label == 'Tabla') {
    auxHistorial = `<p><strong>Letra C</strong></p><table><tbody><tr><th colspan="1" rowspan="1"><p>Objeto</p></th><th colspan="1" rowspan="1"><p>País</p></th><th colspan="1" rowspan="1"><p>Fruta</p></th></tr><tr><td colspan="1" rowspan="1"><p>casa</p></td><td colspan="1" rowspan="1"><p>Canada</p></td><td colspan="1" rowspan="1"><p>Coco</p></td></tr><tr><td colspan="1" rowspan="1"><p>Coche</p></td><td colspan="1" rowspan="1"><p>Colombia</p></td><td colspan="1" rowspan="1"><p>Chocolate</p></td></tr><tr><td colspan="3" rowspan="1"><p style="text-align: center">Tiempo: <strong><em>2 mins</em></strong></p></td></tr></tbody></table>`
  }
  const { control } = useForm<PersonaType>({
    defaultValues: {
      id: 12,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      edad: 32,
      carnet: '9999999',
      comentario: auxHistorial,
    },
  })

  return (
    <FormInputWysiwyg
      {...args}
      control={control}
      name={args.name as Path<PersonaType>}
    />
  )
}

export const SB_Wysiwyg = Template.bind({})
SB_Wysiwyg.storyName = 'Wysiwyg'
SB_Wysiwyg.args = {
  label: 'Texto enriquecido',
  id: 'textfield-form-1',
  name: 'comentario',
}

export const SB_Disabled = Template.bind({})
SB_Disabled.storyName = 'Editable'
SB_Disabled.args = {
  name: 'comentario',
  label: 'Texto enriquecido',
  id: 'textfield-form-2',
  editable: false,
}
export const SB_Marcas = Template.bind({})
SB_Marcas.storyName = 'Marcas'
SB_Marcas.args = {
  name: 'comentario',
  label: 'Marcas',
  id: 'textfield-form-3',
}

export const SB_Listas = Template.bind({})
SB_Listas.storyName = 'Lista'
SB_Listas.args = {
  name: 'comentario',
  label: 'Lista',
  id: 'textfield-form-4',
}

export const SB_Parrafo = Template.bind({})
SB_Parrafo.storyName = 'Parrafo'
SB_Parrafo.args = {
  name: 'comentario',
  label: 'Parrafo',

  id: 'textfield-form-5',
}

export const SB_Link = Template.bind({})
SB_Link.storyName = 'Link'
SB_Link.args = {
  name: 'comentario',
  label: 'Link',
  id: 'textfield-form-6',
}

export const SB_Tabla = Template.bind({})
SB_Tabla.storyName = 'Tabla'
SB_Tabla.args = {
  name: 'comentario',
  label: 'Tabla',
  id: 'textfield-form-7',
}
