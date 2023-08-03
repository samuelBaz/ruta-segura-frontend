import { MutableRefObject, createRef, useEffect, useRef, useState } from 'react'
import {
  calcularZoom,
  getCentro,
} from '../../../../common/components/ui/mapas/GeoUtils'
import { Meta, StoryFn } from '@storybook/react'
import Mapa from '../../../../common/components/ui/mapas/Mapa'
import { DragEndEvent, DragEndEventHandlerFn, Map, icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { Box, Typography } from '@mui/material'

const ICON = icon({
  iconRetinaUrl: '/leaflet/marker-icon.png',

  iconUrl: '/leaflet/marker-icon.png',

  shadowUrl: '/leaflet/marker-shadow.png',
  // iconSize: [40, 40],
  iconAnchor: [12.5, 41],
})

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

const Template: StoryFn = (args) => {
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

  if (markerRefs.current.length !== puntos.length) {
    markerRefs.current = puntos.map(
      (_, i) => markerRefs.current[i] || createRef()
    )
  }

  const Markers = () =>
    puntos
      .filter((punto) => !isNaN(Number(punto[0])) && !isNaN(Number(punto[1])))
      .map((punto, index) => (
        <Marker
          key={`${index}-marker`}
          icon={ICON}
          draggable={puntos.length < 2}
          ref={markerRefs.current[index]}
          eventHandlers={{
            dragend: (e) => dragEvent(e),
            click: () => clickMarker(index),
          }}
          position={[Number(punto[0]), Number(punto[1])]}
        />
      ))

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
        id="mapa"
        key={'mapa'}
        zoom={zoom}
        centro={centro}
        onClick={puntos.length < 2 ? agregarPunto : undefined}
        markers={<Markers />}
      />
    </>
  )
}

const Template2: StoryFn = (args) => {
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

  if (markerRefs.current.length !== puntos.length) {
    markerRefs.current = puntos.map(
      (_, i) => markerRefs.current[i] || createRef()
    )
  }

  const Markers = () =>
    puntos
      .filter((punto) => !isNaN(Number(punto[0])) && !isNaN(Number(punto[1])))
      .map((punto, index) => (
        <Marker
          key={`${index}-marker`}
          icon={ICON}
          draggable={puntos.length < 2}
          ref={markerRefs.current[index]}
          eventHandlers={{
            dragend: (e) => dragEvent(e),
          }}
          position={[Number(punto[0]), Number(punto[1])]}
        >
          <Box sx={{ p: 10 }}>
            <Popup offset={[0, -40]}>
              <Typography>Marcador de ejemplo</Typography>
            </Popup>
          </Box>
        </Marker>
      ))

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
        id="mapa"
        key={'mapa'}
        zoom={zoom}
        centro={centro}
        onClick={puntos.length < 2 ? agregarPunto : undefined}
        markers={<Markers />}
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
}

export const SoloLecturaConTooltip = Template2.bind({})
SoloLecturaConTooltip.storyName = 'Solo lectura con tooltip'
SoloLecturaConTooltip.args = {
  puntos: puntosExample,
}
