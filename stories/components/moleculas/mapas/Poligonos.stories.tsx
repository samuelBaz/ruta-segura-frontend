import { useEffect, useState } from 'react'
import {
  calcularZoom,
  getCentro,
} from '../../../../common/components/ui/mapas/GeoUtils'
import { Meta, StoryFn } from '@storybook/react'
import MapaDibujar from '../../../../common/components/ui/mapas/MapaDibujar'

const poligonoEjemplo = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-66.172371, -17.359486],
        [-66.133232, -17.369316],
        [-66.142845, -17.380784],
        [-66.136665, -17.3952],
        [-66.147308, -17.399459],
        [-66.142159, -17.418787],
        [-66.126366, -17.434511],
        [-66.129799, -17.450232],
        [-66.154518, -17.430252],
        [-66.164131, -17.428287],
        [-66.169968, -17.409615],
        [-66.187134, -17.400442],
        [-66.178207, -17.382095],
        [-66.172371, -17.359486],
      ],
    ],
  },
}

export default {
  title: 'Moleculas/Mapas/Poligonos',
  component: MapaDibujar,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          'Componente que utiliza la biblioteca Leaflet para mostrar un mapa interactivo en una aplicación web. El componente acepta una serie de propiedades, como la ubicación central del mapa, los marcadores y la función de devolución de llamada para manejar los eventos del mapa. También se pueden utilizar las propiedades para personalizar la apariencia y el comportamiento del mapa. El componente utiliza diferentes componentes de Leaflet, como MapContainer, Marker, Popup, TileLayer, Tooltip y ZoomControl para construir el mapa y los marcadores.',
      },
    },
  },
} as Meta

const Template: StoryFn<typeof MapaDibujar> = (args) => {
  const [zoom, setZoom] = useState<number | undefined>()
  const [centro, setCentro] = useState<number[] | undefined>()
  const [puntos, setPuntos] = useState<Array<string[]>>([])

  useEffect(() => {
    if (
      args.poligono &&
      args.poligono.geometry &&
      args.poligono.geometry.coordinates
    ) {
      setPuntos([...args.poligono.geometry.coordinates[0]])
      const zoom: number = calcularZoom([
        ...args.poligono.geometry.coordinates[0],
      ])
      setZoom(zoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCentro(getCentro(puntos))
  }, [puntos])

  return (
    <>
      <MapaDibujar
        onlyread={args.onlyread}
        id={`mapa-poligonos-dibujar`}
        key={`mapa-poligonos-dibujar`}
        height={300}
        zoom={zoom}
        centro={centro}
        poligono={args.poligono}
      />
    </>
  )
}

export const PorDefecto = Template.bind({})
PorDefecto.storyName = 'Por defecto'
PorDefecto.args = {
  poligono: null,
  onlyread: false,
}

export const SoloLectura = Template.bind({})
SoloLectura.storyName = 'Solo lectura'
SoloLectura.args = {
  poligono: poligonoEjemplo,
  onlyread: true,
}
