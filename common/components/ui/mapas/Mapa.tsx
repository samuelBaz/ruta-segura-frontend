import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet'

import { Box, Typography } from '@mui/material'
import { DragEndEvent, DragEndEventHandlerFn, icon, Map } from 'leaflet'
import { createRef, ReactNode, useEffect, useRef } from 'react'
import { delay } from '../../../utils'
import 'leaflet/dist/leaflet.css'
import { Icono } from '../Icono'
import L from 'leaflet'

const ICON = icon({
  iconRetinaUrl: '/leaflet/marker-icon.png',

  iconUrl: '/leaflet/marker-icon.png',

  shadowUrl: '/leaflet/marker-shadow.png',
  // iconSize: [40, 40],
  iconAnchor: [12.5, 41],
})

export interface MapaProps {
  centro?: number[]
  puntos?: Array<string[]>
  key: string
  onDrag?: (center: number[], zoom: number) => void
  onZoomed?: (zoom: number, center: number[]) => void
  onClick?: (center: number[], zoom: number) => void
  onClickMarker?: (index: number) => void
  height?: number
  draggable?: boolean
  readonly?: boolean
  zoom?: number
  location?: boolean
  id: string
  children?: ReactNode
  cardMap?: ReactNode
}

const Mapa = ({
  centro = [-17.405356227442883, -66.15823659326952],
  puntos = [],
  key,
  height = 500,
  onDrag,
  onClick,
  onClickMarker,
  cardMap,
  readonly = false,
  draggable = false,
  location = true,
  id,
  zoom = 6,
}: MapaProps) => {
  const markerRefs = useRef([])
  const mapRef = createRef<Map>()
  const locationRef = createRef<any>()

  const ChangeMapView = () => {
    const map = useMap()
    map.setView([centro[0], centro[1]])
    const mapEvents = useMapEvents({
      click: (e) => {
        if (onClick && !readonly) {
          onClick([e.latlng.lat, e.latlng.lng], mapEvents.getZoom())
        }
      },
    })
    return null
  }

  const dragEvent: DragEndEventHandlerFn = (e: DragEndEvent) => {
    const marker = e.target
    if (marker != null) {
      const lat = marker.getLatLng().lat
      const lng = marker.getLatLng().lng
      if (onDrag) {
        onDrag([lat, lng], zoom)
      }
    }
  }

  const Markers = ({ puntos }: { puntos: string[][] }) => {
    const map = useMap()
    return puntos.map((punto: string[], index: number) => {
      if (!isNaN(Number(punto[0])) && !isNaN(Number(punto[1])))
        return (
          <Marker
            key={`${index}-marker`}
            icon={ICON}
            draggable={false}
            ref={markerRefs.current[index]}
            eventHandlers={{
              dragend: (e) => dragEvent(e),
              click: async () => {
                if (onClickMarker) {
                  onClickMarker(index)
                  await delay(300)
                  map.setView([Number(punto[0]) + 0.005, Number(punto[1])], 15)
                } else {
                  map.setView([Number(punto[0]) + 0.005, Number(punto[1])], 15)
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

  const SingleMarker = ({ puntos }: { puntos: string[][] }) => {
    if (puntos.length < 1) return null

    const punto = puntos[0]

    if (!(!isNaN(Number(punto[0])) && !isNaN(Number(punto[1])))) {
      return null
    }

    return (
      <Marker
        icon={ICON}
        draggable={draggable}
        eventHandlers={{
          dragend: (e) => dragEvent(e),
        }}
        position={[Number(punto[0]), Number(punto[1])]}
        ref={markerRefs.current[0]}
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
  }

  if (markerRefs.current.length !== puntos.length) {
    markerRefs.current = puntos.map(
      (_, i) => markerRefs.current[i] || createRef()
    )
  }

  const showPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var latitud = position.coords.latitude
        var longitud = position.coords.longitude
        if (mapRef.current) {
          mapRef.current.flyTo([latitud, longitud], 15)
        }
      })
    } else {
      alert('La geolocalización no es compatible con este navegador.')
    }
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom])

  useEffect(() => {
    if (locationRef.current) {
      L.DomEvent.disableClickPropagation(locationRef.current)
    }
  }, [locationRef])

  return (
    <>
      <div>
        <MapContainer
          key={key}
          id={id}
          ref={mapRef}
          maxZoom={16}
          center={[Number(centro[0]), Number(centro[1])]}
          zoom={zoom}
          scrollWheelZoom={false}
          zoomControl={false}
          style={{ height: height, width: '100%' }}
        >
          <ChangeMapView />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl zoomInTitle="Acercar" zoomOutTitle="Alejar" />
          {location && (
            <div
              ref={locationRef}
              onClick={showPosition}
              style={{
                zIndex: 9999,
                position: 'absolute',
                top: 80,
                left: 12,
                border: '2px solid rgba(0, 0, 0, .3)',
                borderRadius: '4px',
                padding: '4px',
                background: 'white',
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
            >
              <Icono sx={{ color: '#000000' }} fontSize="small">
                my_location
              </Icono>
            </div>
          )}

          {puntos.length == 1 ? (
            <SingleMarker puntos={puntos} />
          ) : (
            puntos.length > 0 && <Markers puntos={puntos} />
          )}
        </MapContainer>
        <Typography>{`${[Number(centro[0]), Number(centro[1])]}`}</Typography>
      </div>
    </>
  )
}
export default Mapa
