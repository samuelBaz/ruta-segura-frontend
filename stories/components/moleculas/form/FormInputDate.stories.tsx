// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { FormInputDate } from '../../../../common/components/ui/form'
import { Path, useForm } from 'react-hook-form'
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

  parameters: {
    docs: {
      description: {
        component:
          'Componente de formulario de entrada de fecha que utiliza tecnologías de React, MUI y Day.js. El componente se integra con react-hook-form para manejar la validación y el estado del formulario y está diseñado para ser reutilizable en cualquier proyecto que utilice estas tecnologías, para más información: [Using Material UI with React Hook Form](https://blog.logrocket.com/using-material-ui-with-react-hook-form/)',
      },
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
