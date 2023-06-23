// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { FormInputDate } from '../../../../common/components/ui/form'
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
import dayjs from 'dayjs'

export interface PersonaType {
  id: number
  nombre: string
  apellido: string
  carnet: string
  fechaNacimiento: string
  edad: number
}

export default {
  title: 'Moleculas/Formulario/FormInputDate',
  component: FormInputDate,
  argTypes: {
    // onChange: { type: 'function', control: () => {} },
    // control: { type: 'function', description: 'Control<any>' },
  },

  parameters: {
    docs: {
      description: {
        component:
          // 'Form - _FormInputDate_' +.00
          '\n#### Información sobre  - _FormInputDate_. ' +
          '\n> Para los componentes **_form_** se utiliza [***Controller***](https://react-hook-form.com/api/usecontroller/controller "Ir a la documentación") para su manipulación. \n' +
          '\n```ts' +
          '\nconst {control, handleSubmit} useForm<PersonaType>({' +
          '\n   defaultValues: {' +
          '\n     id: 12,' +
          "\n     nombre: 'Pedro'," +
          "\n     apellido: 'Picapiedra'," +
          '\n     edad: 32,' +
          '\n     fechaNacimiento: 05-21-1984,' +
          "\n     carnet: '9999999'," +
          '\n})' +
          '\n```' +
          '\n> Donde ***`const control`*** lo enviaremos a todos nuestros componentes form.' +
          '\n> y ***`name`*** hace referencia al valor.' +
          '\n\n> Para la validación de `minDate` y `maxDate` se puede enviar en el formato del objeto de ***`dayjs`***, que cuenta con más funciones para [suma](https://day.js.org/docs/en/manipulate/add) o [resta](https://day.js.org/docs/en/manipulate/subtract) de fechas.' +
          '\n> ',
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
const Template: StoryFn<typeof FormInputDate> = (args) => {
  const { control } = useForm<PersonaType>({
    defaultValues: {
      id: 12,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      edad: 32,
      fechaNacimiento: '05-21-1984',
      carnet: '9999999',
    },
  })

  return (
    <FormInputDate
      {...args}
      control={control}
      name={args.name as Path<PersonaType>}
    />
  )
}

export const SB_Requerido = Template.bind({})
SB_Requerido.storyName = 'Campo Requerido'
SB_Requerido.parameters = {
  docs: {
    description: {
      story:
        'Antes de enviar el FormInputDate UseForm nos pedirá llenar el campo vacío',
    },
  },
}
SB_Requerido.args = {
  name: 'fechaNacimiento',
  label: 'Fecha de Nacimiento',
  id: 'textfield-form-1',
}

export const SB_Deshabilitado = Template.bind({})
SB_Deshabilitado.storyName = 'Deshabilitado'
SB_Deshabilitado.args = {
  ...SB_Requerido.args,
  disabled: true,
}

export const SB_MinDate = Template.bind({})
SB_MinDate.storyName = 'Fecha mínima (5 días atras)'
SB_MinDate.args = {
  ...SB_Requerido.args,
  minDate: dayjs().subtract(5, 'day'),
}

export const SB_MaxDate = Template.bind({})
SB_MaxDate.storyName = 'Fecha máxima (1 semana despues)'
SB_MaxDate.args = {
  ...SB_Requerido.args,
  maxDate: dayjs().add(1, 'week'),
}
