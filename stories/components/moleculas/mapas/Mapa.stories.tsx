import { MutableRefObject, createRef, useEffect, useRef, useState } from 'react'
import {
  calcularZoom,
  getCentro,
} from '../../../../common/components/ui/mapas/GeoUtils'
import { Meta, StoryFn } from '@storybook/react'
import Mapa from '../../../../common/components/ui/mapas/Mapa'
import { DragEndEvent, DragEndEventHandlerFn, Map } from 'leaflet'

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
  title: 'Moléculas/Mapas/Mapa',
  component: Mapa,
  argTypes: {},
  parameters: {
    docs: {
      status: {
        type: 'beta',
      },
      description: {
        component:
          'Componente que utiliza la biblioteca Leaflet para mostrar un mapa interactivo en una aplicación web. El componente acepta una serie de propiedades, como la ubicación central del mapa, los marcadores y la función de devolución de llamada para manejar los eventos del mapa. También se pueden utilizar las propiedades para personalizar la apariencia y el comportamiento del mapa. El componente utiliza diferentes componentes de Leaflet, como MapContainer, Marker, Popup, TileLayer, Tooltip y ZoomControl para construir el mapa y los marcadores.',
      },
    },
  },
} as Meta

const Template: StoryFn<typeof Mapa> = (args) => {
  const [zoom, setZoom] = useState<number | undefined>()
  const [centro, setCentro] = useState<number[] | undefined>()
  const [puntos, setPuntos] = useState<Array<string[]>>([])

  const mapRef = createRef<Map>()
  const markerRefs: MutableRefObject<never[]> = useRef([])

  const agregarPunto = (latlng: number[]) => {
    setPuntos([[latlng[0].toString(), latlng[1].toString()]])
  }

  const dragEvent: DragEndEventHandlerFn = (e: DragEndEvent) => {
    const marker = e.target
    if (marker != null) {
      const lat = marker.getLatLng().lat
      const lng = marker.getLatLng().lng
      agregarPunto([lat, lng])
    }
  }

  const clickMarker = async (index: number) => {
    const marker = puntos[index]
    mapRef.current?.flyTo([Number(marker[0]) + 0.005, Number(marker[1])], 15)
  }

  useEffect(() => {
    if (args.puntos) {
      setPuntos([...args.puntos])
      const zoom: number = calcularZoom([...args.puntos])
      setZoom(zoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCentro(getCentro(puntos))
  }, [puntos])

  return (
    <>
      <Mapa
        mapRef={mapRef}
        markerRefs={markerRefs}
        id="mapa"
        key={'mapa'}
        zoom={zoom}
        puntos={puntos}
        centro={centro}
        draggable={args.draggable}
        onClick={agregarPunto}
        onDrag={dragEvent}
        onClickMarker={clickMarker}
      />
    </>
  )
}

export const PorDefecto = Template.bind({})
PorDefecto.storyName = 'Por defecto'
PorDefecto.args = {
  puntos: [],
}

export const SoloLectura = Template.bind({})
SoloLectura.storyName = 'Solo lectura'
SoloLectura.args = {
  puntos: puntosExample,
  draggable: false,
}
