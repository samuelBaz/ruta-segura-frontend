import { Meta, StoryFn } from '@storybook/react'
import { CardItem } from './CardItem'
import { Stack } from '@mui/material'
import { IconoTooltip } from '../../../../common/components/ui'
import { ReactNode } from 'react'
import { CardItemTable } from './CardItemTable'
export default {
  title: 'Organismos/Datatable/CardItem',
  component: CardItem,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Componente card que toma una serie de propiedades: id, titulo, subtitulo, descipcion, imagen,  acciones, ancho y alto del avatar. El componente se renderiza dependiendo los propiedades establecidas, siendo obligatorias el título, subtítulo y descripción, referencias: [MUI Material Switch Component - Card](https://mui.com/material-ui/react-card/)`,
      },
    },
  },
} as Meta<typeof CardItem>

const Template: StoryFn<typeof CardItem> = (args) => <CardItem {...args} />

export const Default = Template.bind({})
Default.storyName = 'Card Item'
Default.args = {
  id: '1',
  titulo: 'Título',
  subtitulo: 'Subtítulo',
  descripcion:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  imagen: 'src',
  acciones: (
    <Stack direction={'row'}>
      <IconoTooltip
        id={'editarLibro'}
        titulo={'Editar libro'}
        color={'success'}
        accion={() => {}}
        icono={'edit'}
        name={'Editar libro'}
      />
      <IconoTooltip
        id={'verLibro'}
        titulo={'Ver libro'}
        color={'info'}
        accion={() => {}}
        icono={'visibility'}
        name={'Ver libro'}
      />
      <IconoTooltip
        id={'eliminarLibro'}
        titulo={'Eliminar libro'}
        color={'warning'}
        accion={() => {}}
        icono={'delete'}
        name={'Eliminar libro'}
      />
    </Stack>
  ),
}
export const NoImage = Template.bind({})
NoImage.storyName = 'Card Item sin imagen con acciones'
NoImage.args = {
  id: '1',
  titulo: 'Título',
  subtitulo: 'Subtítulo',
  descripcion:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  acciones: (
    <Stack direction={'row'}>
      <IconoTooltip
        id={'editarLibro'}
        titulo={'Editar libro'}
        color={'success'}
        accion={() => {}}
        icono={'edit'}
        name={'Editar libro'}
      />
      <IconoTooltip
        id={'verLibro'}
        titulo={'Ver libro'}
        color={'info'}
        accion={() => {}}
        icono={'visibility'}
        name={'Ver libro'}
      />
      <IconoTooltip
        id={'eliminarLibro'}
        titulo={'Eliminar libro'}
        color={'warning'}
        accion={() => {}}
        icono={'delete'}
        name={'Eliminar libro'}
      />
    </Stack>
  ),
}
export const NoActions = Template.bind({})
NoActions.storyName = 'Card Item con imagen sin acciones'
NoActions.args = {
  id: '1',
  titulo: 'Título',
  subtitulo: 'Subtítulo',
  imagen: 'IMG',
  descripcion:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
}
export const NoActionsNoImage = Template.bind({})
NoActionsNoImage.storyName = 'Card Item sin imagen ni acciones'
NoActionsNoImage.args = {
  id: '1',
  titulo: 'Título',
  subtitulo: 'Subtítulo',
  descripcion:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
}

const listaLibros = [
  {
    id: '1',
    nombre: 'Cien años de soledad',
    resumen:
      'Una novela de realismo mágico que cuenta la historia de la familia Buendía a lo largo de varias generaciones en el ficticio pueblo de Macondo.',
    fechaPublicacion: '1967-05-30',
  },
  {
    id: '2',
    nombre: '1984',
    resumen:
      'Una novela distópica que presenta una sociedad totalitaria y vigilante en la que el gobierno controla cada aspecto de la vida de sus ciudadanos.',
    fechaPublicacion: '1949-06-08',
  },
  {
    id: '3',
    nombre: 'El señor de los anillos',
    resumen:
      'Una épica trilogía de fantasía que sigue las aventuras de hobbits, elfos, magos y guerreros en su búsqueda para destruir el anillo del poder y derrotar al malvado Sauron.',
    fechaPublicacion: '1954-07-29',
  },
  {
    id: '4',
    nombre: 'Matar a un ruiseñor',
    resumen:
      'Una novela clásica de la literatura estadounidense que aborda temas de racismo y justicia a través de la historia de un abogado que defiende a un hombre negro injustamente acusado de un delito.',
    fechaPublicacion: '1960-07-11',
  },
  {
    id: '5',
    nombre: 'Harry Potter y la piedra filosofal',
    resumen:
      'El primer libro de la serie de fantasía juvenil que sigue las aventuras de un joven mago llamado Harry Potter mientras asiste a la escuela de magia y hechicería de Hogwarts.',
    fechaPublicacion: '1997-06-26',
  },
]
const TemplateCards: StoryFn<typeof CardItem> = () => {
  const contenidoCards: Array<Array<ReactNode>> = listaLibros.map(
    (libro, index) => [
      <CardItem
        key={libro.id}
        titulo={libro.nombre}
        subtitulo={libro.fechaPublicacion}
        descripcion={libro.resumen}
        imagen={`img`}
        acciones={
          <Stack direction={'row'} key={`${libro.id}-${index}-acciones`}>
            <IconoTooltip
              id={'editarLibro'}
              titulo={'Editar libro'}
              color={'success'}
              accion={() => {}}
              icono={'edit'}
              name={'Editar libro'}
            />
            <IconoTooltip
              id={'verLibro'}
              titulo={'Ver libro'}
              color={'info'}
              accion={() => {}}
              icono={'visibility'}
              name={'Ver libro'}
            />
            <IconoTooltip
              id={'eliminarLibro'}
              titulo={'Eliminar libro'}
              color={'warning'}
              accion={() => {}}
              icono={'delete'}
              name={'Eliminar libro'}
            />
          </Stack>
        }
      />,
    ]
  )
  return (
    <CardItemTable
      contenidoTabla={contenidoCards}
      columnas={[]}
      titulo="Card Table"
    />
  )
}
export const CardDataTable = TemplateCards.bind({})
