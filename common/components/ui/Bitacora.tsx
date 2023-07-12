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
import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { Icono } from './Icono'

type TamanioIconoType = 'small' | 'medium' | 'large' | 'inherit'

export interface IBitacoraProps {
  titulo: string
  acciones: Array<IBitacoraAcciones>
  onClick?: (item: IBitacoraItems) => void
  children?: ReactNode
  maxHeight?: number
  tamanioIcono?: TamanioIconoType
  mostrarHoras?: boolean
}

export const Bitacora = (
  {
    titulo = '',
    acciones = [],
    onClick,
    children,
    maxHeight,
    tamanioIcono,
    mostrarHoras = false,
  }: IBitacoraProps) => {

  return (
    <>
      {acciones.length > 0 ? (
        <>
          <Paper
            sx={{
              borderRadius: 3,
              p: 1,
              overflowY: 'auto',
              ...(maxHeight ? { maxHeight: maxHeight } : {})
            }}>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
            >
              <Typography
                textAlign={'center'}
                pb={1}
                px={1}
              >
                {titulo}
              </Typography>
            </Grid>
            {acciones.map((accion, index) => (
              <Card
                key={`id-accion-item-${index}`}
                variant="elevation"
                sx={{
                  px: 1,
                  py: 0,
                  ...(index === 0
                    ? { borderRadius: '12px 12px 0px 0px' }
                    : index === acciones.length - 1
                      ? { borderRadius: '0px 0px 12px 12px' }
                      : {}
                  )
                }}
              >
                <CardHeader
                  subheader={accion.titulo}
                  sx={{ pb: 0, pt: 0.5 }}
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
                            sx={{
                              mt: 1,
                              boxShadow: 'none'
                            }}
                            variant={item.icono
                              ? 'filled'
                              : 'filled'
                            }
                          >
                            {item.icono && (
                              <Icono
                                color={'inherit'}
                                fontSize={tamanioIcono
                                  ? tamanioIcono
                                  : 'small'
                                }
                              >
                                {item.icono}
                              </Icono>
                            )}
                          </TimelineDot>
                          {index < accion.items.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent
                          sx={{ py: 0 }}
                          onClick={() => {
                            if (onClick) {
                              onClick(item)
                            }
                          }}>
                          {item.accion && (
                            <Typography
                              variant="subtitle2"
                              fontWeight={'bold'}
                              display={'inline'}
                              pr={1}
                            >
                              {item.accion}
                            </Typography>
                          )}
                          <Typography
                            variant="subtitle2"
                            display={'inline'}>
                            {item.descripcion}
                          </Typography>
                          <Typography
                            color="GrayText"
                            variant="subtitle2">
                            {dayjs(item.fecha).format(mostrarHoras ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY') !== 'Invalid Date'
                              ? dayjs(item.fecha).format(mostrarHoras ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY')
                              : item.fecha
                            }
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
        <Paper
          elevation={1}
          sx={{
            minHeight: 100,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
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
