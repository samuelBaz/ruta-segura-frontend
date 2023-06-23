// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { Path, useForm } from 'react-hook-form'
import {
  FormInputAutocomplete,
  optionType,
} from '../../../../common/components/ui/form/FormInputAutocomplete'
import { useEffect, useState } from 'react'
import { imprimir } from '../../../../common/utils/imprimir'
import { Servicios } from '../../../../common/services'
import { FormInputDropdownMultiple } from '../../../../common/components/ui/form'
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
  productos: number[]
}

interface BusquedaParams {
  buscar?: string
}

interface Producto {
  id: string
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface RespuestaBusqueda {
  products: Producto[]
  total: number
  skip: number
  limit: number
}

export default {
  title: 'Moleculas/Form/FormInputAutocomplete',
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
          '\n#### Información sobre  - _FormInputAutocomplete_. ' +
          '\n> Para los componentes **_form_** se utiliza [***Controller***](https://react-hook-form.com/api/usecontroller/controller "Ir a la documentación") para su manipulación. \n' +
          '\n```ts' +
          '\nconst {control, handleSubmit} useForm<PersonaType>({' +
          '\n   defaultValues: {' +
          '\n     id: 12,' +
          "\n     nombre: 'Pedro'," +
          "\n     apellido: 'Picapiedra'," +
          '\n     edad: 32,' +
          '\n     fechaNacimiento: 05-21-1984,' +
          '\n     productos: [1,2],' +
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

const Template: StoryFn<typeof FormInputAutocomplete> = (args) => {
  const [opciones, setOpciones] = useState<Array<optionType>>([])

  const { control, watch } = useForm<PersonaType>({
    defaultValues: {
      id: 12,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      edad: 32,
      fechaNacimiento: '05-21-1984',
      productos: [1, 2],
    },
  })

  const busqueda = async ({ buscar }: BusquedaParams) => {
    const lista: RespuestaBusqueda = await Servicios.get({
      url: 'https://dummyjson.com/products/search',
      withCredentials: false,
      params: {
        q: buscar,
      },
    })

    setOpciones(
      lista.products.map((value) => ({
        key: value.id,
        value: value.id,
        label: value.title,
      }))
    )
  }

  const idiomas = watch('productos')

  useEffect(() => {
    imprimir(idiomas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(idiomas)])

  return (
    <FormInputAutocomplete
      {...args}
      id={'rolesMultiple'}
      name={args.name as Path<PersonaType>}
      control={control}
      label="Productos"
      disabled={false}
      options={opciones}
      onInputChange={async (event, value) => {
        await busqueda({ buscar: value })
      }}
      rules={{ required: 'Este campo es requerido' }}
    />
  )
}

export const SB_Simple = Template.bind({})
SB_Simple.storyName = 'Simple'
SB_Simple.args = {
  id: '1232131',
  label: 'Idiomas',
  name: 'id-idiomas',
}

export const SB_Multiple = Template.bind({})
SB_Multiple.storyName = 'Multiple'
SB_Multiple.args = {
  id: '1232131',
  label: 'Idiomas',
  name: 'id-idiomas',
  multiple: true,
}
