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
import { createRef, ReactNode, useEffect, useRef, useState } from 'react'
import { delay } from '../../../utils'
import 'leaflet/dist/leaflet.css'

const ICON = icon({
  iconRetinaUrl: '/leaflet/marker-icon.png',

  iconUrl: '/leaflet/marker-icon.png',

  shadowUrl: '/leaflet/marker-shadow.png',
  // iconSize: [40, 40],
  iconAnchor: [12.5, 41],
})

export interface BuildMapProps {
  centro?: number[]
  puntos?: Array<string[]>
  key: string
  onDrag?: (center: number[], zoom: number) => void
  onZoomed?: (zoom: number, center: number[]) => void
  onClick?: (center: number[], zoom: number) => void
  onClickMarker?: (index: number) => void
  height?: number
  draggable?: boolean
  onlyread?: boolean
  zoom?: number
  id: string
  children?: ReactNode
  cardMap?: ReactNode
}

const BuildMap = ({
  centro = [-17.405356227442883, -66.15823659326952],
  puntos = [],
  key,
  height = 500,
  onDrag,
  onClick,
  onClickMarker,
  cardMap,
  onlyread = false,
  draggable = false,
  id,
  zoom = 6,
}: BuildMapProps) => {
  const markerRefs = useRef<any>([])
  const mapRef = createRef<Map>()

  function ChangeMapView() {
    const map = useMap()
    map.setView([centro[0], centro[1]])
    const mapEvents = useMapEvents({
      click: (e) => {
        if (onClick && !onlyread) {
          onClick([e.latlng.lat, e.latlng.lng], mapEvents.getZoom())
        }
      },
      // zoomend: () => {
      //   if (onZoomed && zoom !== mapEvents.getZoom()) {
      //     onZoomed(mapEvents.getZoom(), [position[0], position[1]])
      //   }
      // },
    })
    return null
  }

  const dragEvent: DragEndEventHandlerFn = (e: DragEndEvent) => {
    const marker: any = e.target
    if (marker != null) {
      const lat = marker.getLatLng().lat
      const lng = marker.getLatLng().lng
      if (onDrag) {
        onDrag([lat, lng], zoom)
      }
    }
  }

  function Markers({ puntos }: { puntos: any }) {
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

  function SingleMarker({ puntos }: { puntos: any }) {
    if (puntos.length < 1) return null
    const punto = puntos[0]
    if (!isNaN(Number(punto[0])) && !isNaN(Number(punto[1]))) {
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
    } else {
      return null
    }
  }

  if (markerRefs.current.length !== puntos.length) {
    markerRefs.current = puntos.map(
      (_, i) => markerRefs.current[i] || createRef<any>()
    )
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom)
    }
  }, [zoom])

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
          <ZoomControl
            zoomInTitle="Acercar"
            zoomOutTitle="Alejar"
          ></ZoomControl>

          {puntos.length == 1 ? (
            <SingleMarker puntos={puntos} />
          ) : (
            puntos.length > 0 && <Markers puntos={puntos} />
          )}
        </MapContainer>
        <Typography>{`${[Number(centro[0]), Number(centro[1])]}`}</Typography>
        <Typography>{`${zoom}`}</Typography>
      </div>
    </>
  )
}
export default BuildMap
