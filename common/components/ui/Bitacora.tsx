import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  timelineItemClasses,
  TimelineConnector,
} from '@mui/lab'
import { ColorIconoType, IBitacoraItems } from '../../types'

export interface IBitacoraProps {
  titulo: string
  items: Array<IBitacoraItems>
}

export const Bitacora = ({ titulo = '', items = [] }: IBitacoraProps) => (
  <>
    {items && items.length > 0 ? (
      <Card variant="elevation" sx={{ px: 1, py: 0, borderRadius: 3 }}>
        <CardHeader subheader={titulo} sx={{ py: 0 }} />
        <CardContent sx={{ px: 0, my: 0 }}>
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
            {items.map((item, index) => (
              <TimelineItem key={`accion-${index}`} sx={{ py: 0 }}>
                <TimelineSeparator>
                  <TimelineDot
                    color={item.color_icono as ColorIconoType}
                    sx={{ mt: 1 }}
                  />
                  {index < items.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 0 }}>
                  <Typography variant="subtitle2" fontWeight={'bold'}>
                    {item.accion}
                  </Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item.tiempo}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    ) : (
      <Typography
        textAlign={'center'}
        variant="subtitle1"
        color={'text.secondary'}
      >
        Sin resultados
      </Typography>
    )}
  </>
)
