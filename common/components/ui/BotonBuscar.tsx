import { Icono } from './Icono'
import { ToggleButton } from '@mui/material'

interface BotonFiltroParams {
  mostrar: boolean
  cambiar: (mostrar: boolean) => void
}

export const BotonBuscar = ({ mostrar, cambiar }: BotonFiltroParams) => {
  return (
    <ToggleButton
      key={'accionFiltrarUsuarioToggle'}
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
