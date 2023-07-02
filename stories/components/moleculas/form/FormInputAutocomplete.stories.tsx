// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { useForm } from 'react-hook-form'
import {
  FormInputAutocomplete,
  optionType,
} from '../../../../common/components/ui/form/FormInputAutocomplete'
import { useEffect, useState } from 'react'
import { imprimir } from '../../../../common/utils/imprimir'
import { Servicios } from '../../../../common/services'

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
  title: 'Moleculas/Formulario/FormInputAutocomplete',
  component: FormInputAutocomplete,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          'Es un componente que utiliza la librería `react-hook-form` y la librería MUI para crear un campo de entrada de texto con autocompletado, para más información: [Using Material UI with React Hook Form](https://blog.logrocket.com/using-material-ui-with-react-hook-form/)',
      },
    },
  },
} as Meta<typeof FormInputAutocomplete>

const Template: StoryFn<typeof FormInputAutocomplete> = (args) => {
  const [opciones, setOpciones] = useState<Array<optionType>>([])

  const { control, watch } = useForm<PersonaType>({
    defaultValues: {
      id: 12,
      nombre: 'Pedro',
      apellido: 'Picapiedra',
      edad: 32,
      fechaNacimiento: '05-21-1984',
      productos: [],
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

  const productos = watch('productos')

  useEffect(() => {
    imprimir(`productos: `, productos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(productos)])

  return (
    <FormInputAutocomplete
      {...args}
      id={'rolesMultiple'}
      name={'productos'}
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
  label: 'Productos',
  name: 'productos',
  multiple: true,
}
