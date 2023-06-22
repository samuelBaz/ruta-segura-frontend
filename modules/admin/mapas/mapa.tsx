import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import {
  calcularZoom,
  getCentro,
} from '../../../common/components/ui/mapas/GeoUtils'
import { Grid } from '@mui/material'
import { FormInputAutocompleteSearch } from '../../../common/components/ui/form/FormAutocompleteSearch'
import { useMap } from 'react-leaflet'
import { useForm } from 'react-hook-form'
import { optionType } from '../../../common/components/ui/form'
import { useDebouncedCallback } from 'use-debounce'
import { imprimir } from '../../../common/utils/imprimir'
import { InterpreteMensajes } from '../../../common/utils'
import { Servicios } from '../../../common/services'
import { Constantes } from '../../../config'
import { useAlerts } from '../../../common/hooks'

export interface AddressLeaflet {
  city: string
  county: string
  state: string
  country: string
  country_code: string
  tourism: string
  road: string
  village?: string
  neighbourhood: string
  city_district: string
  postcode: string
}

export interface LeafletUbicacionType {
  place_id: string
  licence?: string
  osm_type?: string
  osm_id?: number
  boundingbox?: string[]
  lat: string
  lon: string
  display_name: string
  class?: string
  type?: string
  importance?: number
  icon?: string
  address?: AddressLeaflet
}

interface MapaProps {
  coordinates: Array<string[]>
}

const Mapa = ({ coordinates }: MapaProps) => {
  const [zoom, setZoom] = useState<number | undefined>()
  const [centro, setCentro] = useState<number[] | undefined>()
  const [puntos, setPuntos] = useState<Array<string[]>>([])

  const agregarPunto = (latlng: number[]) => {
    const puntosActuales = []
    puntosActuales.push([latlng[0].toString(), latlng[1].toString()])
    setPuntos([...puntosActuales])
  }

  const Map = useMemo(
    () =>
      dynamic(() => import('../../../common/components/ui/mapas/BuildMap'), {
        ssr: false,
      }),
    []
  )

  useEffect(() => {
    if (coordinates) {
      setPuntos([...coordinates])
      const zoom: number = calcularZoom([...coordinates])
      setZoom(zoom)
    }
  }, [])

  useEffect(() => {
    setCentro(getCentro(puntos))
  }, [puntos])

  /*
  -------------------- buscador de MAPA ------------------
  */

  const { control, watch } = useForm({
    defaultValues: {
      zona: '',
    },
  })

  const watchZona = watch('zona')

  const defaultOption = { key: '', value: '', label: '' }

  const [loadingAutoComplete, setLoadingAutoComplete] = useState<boolean>(false)
  const { Alerta } = useAlerts()
  const [defaultCategoriaOption, setDefaultCategoriaOption] =
    useState<optionType>(defaultOption)

  const [puntosMapaLeaflet, setPuntoMapaLeafletData] = useState<
    LeafletUbicacionType[]
  >([])

  const debounced = useDebouncedCallback(async (direccion: string) => {
    await obtenerUbicacionMapa(direccion)
  }, 1000)

  const actualizacionDireccion = (direccion: string) => {
    debounced(direccion)
  }

  const obtenerUbicacionMapa = async (
    direccion?: string,
    updateMapa: boolean = true
  ) => {
    try {
      setLoadingAutoComplete(true)
      let referencia = `Bolivia`
      if (direccion) referencia = `${referencia};${direccion}`

      const respuesta = await Servicios.peticionHTTP({
        url: `${Constantes.apiOpenStreetMap}/search/${referencia}`,
        params: {
          format: 'json',
          addressdetails: '1',
          limit: '10',
        },
        headers: {
          'Accept-Language': 'es',
        },
        withCredentials: false,
      })
      if (updateMapa) setPuntoMapaLeafletData(respuesta.data)
    } catch (e) {
      imprimir(`Error al obtener puntos mapa: ${e}`)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      setLoadingAutoComplete(false)
    }
  }

  /*
  -------------------- buscador de MAPA ------------------
  */

  return (
    <>
      <Grid container direction={'column'}>
        <Grid item>
          <FormInputAutocompleteSearch
            id={'zona'}
            defaultValue={defaultCategoriaOption}
            loading={loadingAutoComplete}
            control={control}
            name="zona"
            label="Buscar zona de referencia"
            placeholder={'Ej: Calacoto'}
            options={puntosMapaLeaflet.map((punto) => ({
              key: `${punto.place_id.toString()}`,
              value: JSON.stringify(punto),
              label: `${punto.display_name}`,
            }))}
            onClear={() => {
              setDefaultCategoriaOption(defaultOption)
            }}
            onSelect={(select) => {
              const ubicacion: LeafletUbicacionType = JSON.parse(
                select.value != undefined ? select.value + '' : ''
              )
              const current = puntosMapaLeaflet.find((map) =>
                `${select.key}`.includes(map.place_id.toString())
              )
              if (current) {
                setDefaultCategoriaOption({
                  key: `${current.place_id.toString()}`,
                  value: JSON.stringify(current),
                  label: `${current.display_name}`,
                })
              }
              setCentro([Number(ubicacion.lat), Number(ubicacion.lon)])
              setZoom(15)
            }}
            onChange={(event) => {
              const valor = event.currentTarget.value
              if (valor) {
                actualizacionDireccion(valor)
              }
            }}
          />
        </Grid>
        <Grid item>
          <Map
            id="mapa"
            key={'mapa'}
            zoom={zoom}
            puntos={puntos}
            centro={centro}
            draggable
            onlyread
            onClick={agregarPunto}
            onDrag={agregarPunto}
          ></Map>
        </Grid>
      </Grid>
    </>
  )
}
export default Mapa
