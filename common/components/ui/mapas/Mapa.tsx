import {
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
  ZoomControl,
  Marker,
} from 'react-leaflet'

import { Box, Typography } from '@mui/material'
import { DragEndEvent, icon, Map } from 'leaflet'
import {
  createRef,
  MutableRefObject,
  ReactNode,
  RefObject,
  useEffect,
} from 'react'
import 'leaflet/dist/leaflet.css'

const ICON = icon({
  iconRetinaUrl: '/leaflet/marker-icon.png',

  iconUrl: '/leaflet/marker-icon.png',

  shadowUrl: '/leaflet/marker-shadow.png',
  // iconSize: [40, 40],
  iconAnchor: [12.5, 41],
})

export interface MapaProps {
  mapRef: RefObject<Map>
  markerRefs: MutableRefObject<never[]>
  centro?: number[]
  puntos?: Array<string[]>
  key: string
  onDrag?: (event: DragEndEvent) => void
  onZoomed?: (zoom: number, center: number[]) => void
  onClick?: (center: number[], zoom: number) => void
  onClickMarker?: (index: number) => void
  height?: number
  draggable?: boolean
  zoom?: number
  id: string
  children?: ReactNode
  cardMap?: ReactNode
  zoomControl?: boolean
  scrollWheelZoom?: boolean
  maxZoom?: number
}

const Mapa = ({
  mapRef,
  markerRefs,
  centro = [-17.405356227442883, -66.15823659326952],
  puntos = [],
  key,
  height = 500,
  onDrag,
  onClick,
  onClickMarker,
  cardMap,
  draggable = false,
  id,
  zoom = 6,
  maxZoom = 19,
  scrollWheelZoom = false,
  zoomControl = false,
}: MapaProps) => {
  const ChangeMapView = () => {
    const map = useMap()
    map.flyTo([centro[0], centro[1]], zoom)
    const mapEvents = useMapEvents({
      click: (e) => {
        if (onClick && draggable) {
          onClick([e.latlng.lat, e.latlng.lng], mapEvents.getZoom())
        }
      },
    })
    return null
  }

  const Markers = ({ puntos }: { puntos: string[][] }) => {
    return puntos.map((punto: string[], index: number) => {
      if (!isNaN(Number(punto[0])) && !isNaN(Number(punto[1])))
        return (
          <Marker
            key={`${index}-marker`}
            icon={ICON}
            draggable={draggable}
            ref={markerRefs.current[index]}
            eventHandlers={{
              dragend: (e) => {
                if (onDrag) {
                  onDrag(e)
                }
              },
              click: () => {
                if (onClickMarker) {
                  onClickMarker(index)
                }
              },
            }}
            position={[Number(punto[0]), Number(punto[1])]}
          >
            <Box sx={{ p: 10 }}>
              {cardMap ? (
                <Popup offset={[0, -40]}>{cardMap}</Popup>
              ) : (
                punto[2] && <Tooltip direction="bottom">{punto[2]}</Tooltip>
              )}
            </Box>
          </Marker>
        )
    })
  }

  if (markerRefs.current.length !== puntos.length) {
    markerRefs.current = puntos.map(
      (_, i) => markerRefs.current[i] || createRef()
    )
  }

  useEffect(() => {
    if (mapRef?.current) {
      mapRef?.current.flyTo([centro[0], centro[1]], zoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom])

  return (
    <>
      <div>
        <MapContainer
          key={key}
          id={id}
          ref={mapRef}
          maxZoom={maxZoom}
          center={[Number(centro[0]), Number(centro[1])]}
          zoom={zoom}
          scrollWheelZoom={scrollWheelZoom}
          zoomControl={zoomControl}
          style={{ height: height, width: '100%' }}
        >
          <ChangeMapView />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl
            zoomInTitle="Acercar"
            zoomOutTitle="Alejar"
            position={'bottomright'}
          />

          <Markers puntos={puntos} />
        </MapContainer>
        <Typography>{`${[Number(centro[0]), Number(centro[1])]}`}</Typography>
      </div>
    </>
  )
}
export default Mapa
