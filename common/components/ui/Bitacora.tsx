import { Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  timelineItemClasses,
  TimelineConnector,
} from '@mui/lab'
import { ColorIconoType, IBitacoraAcciones, IBitacoraItems } from '../../types'
import { ReactNode, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import { IconoTooltip } from './IconoTooltip'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Icono } from './Icono'


export interface IBitacoraProps {
  titulo: string
  acciones: Array<IBitacoraAcciones>
  agruparFecha?: boolean
  onClick?: (item: IBitacoraItems) => void
  children?: ReactNode
  maxHeight?: number
}

export const Bitacora = (
  {
    titulo = '',
    acciones = [],
    agruparFecha = false,
    onClick,
    children,
    maxHeight
  }: IBitacoraProps) => {

  const [datos, setDatos] = useState<Array<IBitacoraAcciones>>([])
  const [agrupar, setAgrupar] = useState<boolean>(false)
  const [orden, setOrden] = useState<boolean>(false)

  const agruparPorFecha = (datosAcciones: Array<IBitacoraAcciones>) => {
    const gruposSet = new Set<string>()
    const agrupados: Array<IBitacoraAcciones> = []
    let listaAcciones: Array<IBitacoraItems> = []
    // Extraemos todas las acciones
    datosAcciones.forEach((accion) => {
      listaAcciones = [...listaAcciones, ...accion.items]
    })

    // Agrupamos por fechas
    let accionesAuxiliar: any = {}
    listaAcciones.sort(ordenarPorFecha).forEach((accion) => {
      const fecha = dayjs(accion.fecha).format('DD/MM/YYYY')
      // const fechaCompleta = dayjs(accion.fecha).format('DD/MM/YYYY HH:mm')
      if (gruposSet.has(fecha)) {
        accionesAuxiliar[fecha].items.push(accion)
      } else {
        accionesAuxiliar = { ...accionesAuxiliar, [fecha]: { items: [accion] } }
        gruposSet.add(fecha)
      }
    })
    for (const key of Object.keys(accionesAuxiliar)) {
      agrupados.push({
        titulo: key,
        items: accionesAuxiliar[key].items
      })
    }
    setDatos(agrupados)
  }

  const ordenarPorFecha = (a: IBitacoraItems, b: IBitacoraItems) => {
    if (a.fecha < b.fecha) {
      return orden ? -1 : 1
    }
    if (a.fecha > b.fecha) {
      return orden ? 1 : -1
    }
    return 0
  }

  useEffect(() => {
    if (acciones.length > 0) {
      setDatos(acciones)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (agrupar) {
      agruparPorFecha(acciones)
    } else {
      setDatos(acciones)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agrupar, orden])

  return (
    <>
      {datos.length > 0 ? (
        <>
          <Paper sx={{
            borderRadius: 3,
            p: 1,
            overflowY: 'auto',
            ...(maxHeight ? { maxHeight: maxHeight } : {})
          }}>
            <Grid container direction={'row'} justifyContent={'space-between'}>
              <Typography textAlign={'center'} py={1} px={1}>{titulo}</Typography>
              {agruparFecha && (
                <Grid item>
                  {agrupar && (
                    <IconoTooltip
                      id='orden-agrupacion-acciones'
                      titulo={orden ? 'Descendente' : 'Ascendente'}
                      name='cambiar-orden'
                      icono={orden ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      accion={() => { setOrden(!orden) }}
                    />
                  )}
                  <IconoTooltip
                    id='bitacora-agrupar'
                    titulo={!agrupar ? 'Agrupar acciones por fecha' : 'Desagrupar'}
                    name='agrupar'
                    icono={!agrupar ? <PlaylistAddCheckIcon /> : <PlaylistRemoveIcon />}
                    accion={() => { setAgrupar(!agrupar) }}
                  />
                </Grid>
              )}
            </Grid>
            {datos.map((accion, index) => (
              <Card
                key={`id-accion-item-${index}`}
                variant="elevation"
                sx={{ px: 1, py: 0, borderRadius: 3, mb: 1 }}
              >
                <CardHeader
                  subheader={accion.titulo}
                  sx={{ pb: 0, pt: 1 }}
                />
                <CardContent sx={{
                  p: 0,
                  my: 0,
                  "&:last-child": {
                    paddingBottom: 0
                  }
                }}>
                  <Timeline
                    sx={{
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                      m: 0,
                      py: 0,
                      pr: 0,
                    }}
                  >
                    {accion.items.map((item, index) => (
                      <TimelineItem key={`accion-${index}`} sx={{ py: 0 }}>
                        <TimelineSeparator>
                          <TimelineDot
                            color={item.color_icono as ColorIconoType}
                            sx={{ mt: 1 }}
                            variant={item.icono ? 'filled' : 'filled'}
                          >
                            {item.icono && (<Icono color={'inherit'}>{item.icono}</Icono>)}
                          </TimelineDot>
                          {index < accion.items.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 0 }} onClick={() => {
                          if (onClick) {
                            onClick(item)
                          }
                        }}>
                          {item.accion && (
                            <Typography variant="subtitle2" fontWeight={'bold'} display={'inline'} pr={1}>
                              {item.accion}
                            </Typography>
                          )}
                          <Typography variant="subtitle2" display={'inline'}>
                            {item.descripcion}
                          </Typography>
                          <Typography color="GrayText" variant="subtitle2">
                            {dayjs(item.fecha).format('DD/MM/YYYY HH:mm')}
                          </Typography>
                          {children}
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </>
      ) : (
        <Paper elevation={1} sx={{ minHeight: 100, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            textAlign={'center'}
            variant="subtitle1"
            color={'text.secondary'}
          >
            No realizaste ninguna acción
          </Typography>
        </Paper>
      )}
    </>
  )
}
