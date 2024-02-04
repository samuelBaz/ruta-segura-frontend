import Grid from '@mui/material/Grid'
import { useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'

export const Acciones = ({ acciones }: { acciones: ReactNode[] }) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Grid container={!(xs || sm)} wrap={!(xs || sm) ? 'nowrap' : undefined}>
      {acciones
        .filter((value) => value)
        .map((accion, index) => (
          <span key={`${index}`}>{accion}</span>
        ))}
    </Grid>
  )
}
