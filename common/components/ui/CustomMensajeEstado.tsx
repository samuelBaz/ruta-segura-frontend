import { Box, Tooltip } from '@mui/material'
import { useThemeContext } from '../../../context/ui/ThemeContext'

export interface MensajeEstadoProps {
  titulo?: string
  descripcion?: string
  fontSize?: number
  letterSpacing?: number
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
}
const CustomMensajeEstado = ({
  color = 'error',
  titulo = '',
  descripcion = '',
  fontSize = 12,
  letterSpacing = 0,
}: MensajeEstadoProps) => {
  const coloresClaros = {
    primary: '#cce1df',
    secondary: '#dbe0df',
    info: '#cce7f6',
    warning: '#fbe2cc',
    error: '#f1d1d1',
    success: '#d5e5d6',
    inherit: '#f1d1d1',
  }
  const coloresOscuros = {
    primary: '#001513',
    secondary: '#0f1413',
    info: '#001b2a',
    warning: '#2f1600',
    error: '#250505',
    success: '#09190a',
    inherit: '#f1d1d1',
  }
  const { themeMode, toggleTheme } = useThemeContext()

  return (
    <Tooltip title={descripcion}>
      <div>
        <Box
          component="div"
          sx={{
            bgcolor:
              themeMode === 'dark'
                ? coloresOscuros[color]
                : coloresClaros[color],
            textAlign: 'center',
            borderRadius: 1,
            pt: 0.4,
            pr: 1,
            pl: 1,
            pb: 0.4,
            // p: 0.3,
            // m: 1,
          }}
        >
          <Box
            sx={{
              color: `${color}.main`,

              display: 'inline',
              // textTransform: 'lowercase',
              //   overflow: 'hidden',
              fontWeight: 'bold',
              fontSize: fontSize,
              opacity: 1,
              letterSpacing: letterSpacing,
            }}
          >
            {titulo}
          </Box>
        </Box>
      </div>
    </Tooltip>
  )
}

export default CustomMensajeEstado
