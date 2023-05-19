import { Icono } from './Icono'
import { ToggleButton } from '@mui/material'

interface BotonFiltroParams {
  id: string
  key: string
  mostrar: boolean
  cambiar: (mostrar: boolean) => void
}

export const BotonBuscar = ({
  id,
  key,
  mostrar,
  cambiar,
}: BotonFiltroParams) => {
  return (
    <ToggleButton
      id={id}
      key={key}
      value="check"
      sx={{
        '&.MuiToggleButton-root': {
          borderRadius: '4px !important',
          border: '0px solid lightgrey !important',
        },
      }}
      size={'small'}
      selected={mostrar}
      onChange={() => {
        cambiar(!mostrar)
      }}
      aria-label="search"
    >
      <Icono>search</Icono>
    </ToggleButton>
  )
}
