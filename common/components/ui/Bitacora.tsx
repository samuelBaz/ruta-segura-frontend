import { Card, CardHeader, Typography } from "@mui/material"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  timelineItemClasses,
  TimelineConnector
} from "@mui/lab"
import { IBitacoraProps, colorIconoType } from "../../types/bitacoraTypes"


export const Bitacora = ({
  titulo = '',
  items = []
}: IBitacoraProps) => {
  return (
    <>
      {(items && items.length > 0) ? (
        <Card
          variant='elevation'
          sx={{ px: 1, py: 0, borderRadius: 3 }}
        >
          <CardHeader
            subheader={titulo}
            sx={{ py: 0 }}
          />
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
              m: 0,
              py: 0,
              pr: 0
            }}
          >
            {items.map((item, index) => (
              <TimelineItem key={`accion-${index}`} sx={{ py: 0 }}>
                <TimelineSeparator>
                  <TimelineDot color={item.color_icono as colorIconoType} sx={{ mt: 1 }} />
                  {(index < (items.length - 1)) && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 0 }}>
                  <Typography variant='subtitle2' fontWeight={'bold'}>{item.accion}</Typography>
                  <Typography color='GrayText' variant='subtitle2'>{item.tiempo}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Card>)
        :
        <Typography
          textAlign={'center'}
          variant="subtitle1"
          color={'GrayText'}
        >
          Sin resultados
        </Typography>
      }
    </>
  )
}