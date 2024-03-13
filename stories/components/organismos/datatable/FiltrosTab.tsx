import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { FC, ReactNode, SyntheticEvent } from 'react'
import { Box, Grid, Typography } from '@mui/material'

interface TabFiltrosType {
  titulo: string
  pestanas: Array<string>
  pestanaActiva: number
  acciones?: ReactNode
  accion: (nuevoValor: number) => void
}
export const FiltrosTab: FC<TabFiltrosType> = ({
  acciones,
  titulo,
  pestanas,
  pestanaActiva,
  accion,
}) => {
  const handleChange = (event: SyntheticEvent, nuevoValor: number) => {
    accion(nuevoValor)
  }

  return (
    <Box>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={acciones ? 8 : 12} md={6}>
          <Typography variant={'h5'} sx={{ fontWeight: '600', pl: 1 }}>
            {`${titulo}`}
          </Typography>
        </Grid>
        {acciones && (
          <Grid
            item
            xs={4}
            md={6}
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            {acciones}
          </Grid>
        )}
      </Grid>
      <Tabs
        sx={{
          pt: 1,
          minWidth: 300,
        }}
        value={pestanaActiva}
        onChange={handleChange}
        variant="scrollable"
      >
        {pestanas.map((pestana, indice) => (
          <Tab key={indice} label={pestana} />
        ))}
      </Tabs>
    </Box>
  )
}
