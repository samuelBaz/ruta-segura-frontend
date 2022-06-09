// import React from 'react'

import { ComponentStory, Meta } from '@storybook/react'
import { FormInputDate } from '../../../../../../common/components/ui/form/FormInputDate'
import { useForm } from 'react-hook-form'

import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs'

export interface PersonaType {
  id: number
  nombre: string
  apellido: string
  carnet: string
  fechaNacimiento: string
  edad: number
}
export default {
  title: 'Form/FormInputDate',
  component: FormInputDate,
  argTypes: {
    // onChange: { type: 'function', control: () => {} },
    // control: { type: 'function', description: 'Control<any>' },
  },

  parameters: {
    docs: {
      description: {
        component:
          // 'Form - _FormInputDate_' +
          '\n#### Información sobre  - _FormInputDate_. ' +
          '\n> Para los componentes **_form_** se utiliza [***UseFormHook***](https://react-hook-form.com/api/usecontroller/controller "Ir a la documentación") para su manipulación. \n' +
          '\n```ts' +
          '\nconst {control, handleSubmit} useForm<PersonaType>({' +
          '\n   defaultValues: {' +
          '\n     id: 12,' +
          "\n     nombre: 'Pedro'," +
          "\n     apellido: 'El Escamoso'," +
          '\n     edad: 32,' +
          '\n     fechaNacimiento: 05-21-1984,' +
          "\n     carnet: '7047052 lp'," +
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
// storiesOf('FormInputDate', module).add('Click', () => (
//   <FormInputDate
//     name="HOla"
//     titulo="ACCION ICONO"
//     icono="face"
//     accion={action('HOLA MUNDO ')}
//   ></FormInputDate>
// ))
// replica del componente
const Template: ComponentStory<typeof FormInputDate> = (args) => {
  const { control } = useForm<PersonaType>({
    defaultValues: {
      id: 12,
      nombre: 'Pedro',
      apellido: 'El Escamoso',
      edad: 32,
      fechaNacimiento: '05-21-1984',
      carnet: '7047052 lp',
    },
  })

  return <FormInputDate {...args} control={control} />
}

export const SB_Requerido = Template.bind({})
SB_Requerido.storyName = 'Campo Requerido'
SB_Requerido.parameters = {
  docs: {
    description: {
      story:
        'Antes de enviar el FormInputDate UseForm nos pedirá llenar el campo vacio',
    },
  },
}
SB_Requerido.args = {
  name: 'fechaNacimiento',
  label: 'Fecha de Nacimiento',
  id: 'textfield-form-1',
}

export const SB_Desabilitado = Template.bind({})
SB_Desabilitado.storyName = 'Desabilidado'
SB_Desabilitado.args = {
  ...SB_Requerido.args,
  disabled: true,
}
