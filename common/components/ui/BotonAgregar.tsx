import { Button } from '@mui/material'
import { IconoTooltip } from './IconoTooltip'

interface BotonAgregarParams {
  id: string
  variante?: 'icono' | 'boton'
  texto: string
  descripcion: string
  accion: () => void
}

export const BotonAgregar = ({
  id,
  texto,
  variante = 'boton',
  descripcion,
  accion,
}: BotonAgregarParams) => {
  return variante == 'boton' ? (
    <Button
      id={id}
      variant={'contained'}
      sx={{ ml: 1, mr: 1, textTransform: 'none' }}
      size={'small'}
      onClick={() => {
        accion()
      }}
    >
      {texto}
    </Button>
  ) : (
    <IconoTooltip
      id={id}
      titulo={descripcion}
      accion={() => {
        accion()
      }}
      icono={'add_circle_outline'}
      name={texto}
    />
  )
}
