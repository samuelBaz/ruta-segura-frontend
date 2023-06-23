import { useEffect, useState } from 'react'
import {
  calcularZoom,
  getCentro,
} from '../../../../common/components/ui/mapas/GeoUtils'
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import { Meta, StoryFn } from '@storybook/react'
import Mapa from '../../../../common/components/ui/mapas/Mapa'

const puntosExample: Array<Array<string>> = [
  ['-16.5000', ' -68.1500'],
  ['-17.7833', '-63.1833'],
  ['-17.3895', '-66.1568'],
  ['-19.0333', '-65.2627'],
  ['-19.5833', '-65.7500'],
  ['-17.9833', '-67.1500'],
  ['-21.5355', '-64.7296'],
  ['-14.8333', '-64.9000'],
  ['-10.9833', '-66.1000'],
  ['-21.9600', '-63.6500'],
]

export default {
  title: 'Moleculas/Mapas/Mapa',
  component: Mapa,
  argTypes: {},
  parameters: {
    docs: {
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

const Template: StoryFn<typeof Mapa> = (args) => {
  const [zoom, setZoom] = useState<number | undefined>()
  const [centro, setCentro] = useState<number[] | undefined>()
  const [puntos, setPuntos] = useState<Array<string[]>>([])

  const agregarPunto = (latlng: number[]) => {
    const puntosActuales = []
    puntosActuales.push([latlng[0].toString(), latlng[1].toString()])
    setPuntos([...puntosActuales])
  }

  useEffect(() => {
    if (args.puntos) {
      setPuntos([...args.puntos])
      const zoom: number = calcularZoom([...args.puntos])
      setZoom(zoom)
    }
  }, [])

  useEffect(() => {
    setCentro(getCentro(puntos))
  }, [puntos])

  return (
    <>
      <Mapa
        id="mapa"
        key={'mapa'}
        zoom={zoom}
        puntos={puntos}
        centro={centro}
        draggable
        onClick={agregarPunto}
        onDrag={agregarPunto}
      ></Mapa>
    </>
  )
}

export const PorDefecto = Template.bind({})
PorDefecto.storyName = 'Por defecto'
PorDefecto.args = {
  puntos: [],
  onlyread: false,
}

export const SoloLectura = Template.bind({})
SoloLectura.storyName = 'Solo lectura'
SoloLectura.args = {
  puntos: puntosExample,
  onlyread: true,
}
