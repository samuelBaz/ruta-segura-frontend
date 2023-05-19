import { Button, useMediaQuery, useTheme } from '@mui/material'
import { IconoTooltip } from './IconoTooltip'

interface BotonAgregarParams {
  id: string
  key: string
  texto: string
  descripcion: string
  accion: () => void
}

export const BotonAgregar = ({
  id,
  key,
  texto,
  descripcion,
  accion,
}: BotonAgregarParams) => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  return xs ? (
    <IconoTooltip
      id={id}
      titulo={descripcion}
      key={key}
      accion={() => {
        accion()
      }}
      icono={'add_circle_outline'}
      name={texto}
    />
  ) : (
    <Button
      id={id}
      key={key}
      variant={'contained'}
      sx={{ ml: 1, mr: 1, textTransform: 'none' }}
      size={'small'}
      onClick={() => {
        accion()
      }}
    >
      {texto}
    </Button>
  )
}
