import Image from 'next/image'
import { Button } from '@mui/material'
import { useThemeContext } from '../../../context/ui/ThemeContext'
import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import { Constantes } from '../../../config'

export interface BotonCiudadaniaType {
  altText?: string
  disabled?: boolean | undefined
  accion: MouseEventHandler<any> | undefined
  fullWidth?: boolean
}

export const BotonCiudadania: FC<PropsWithChildren<BotonCiudadaniaType>> = ({
  disabled,
  accion,
  children,
  altText,
  fullWidth,
}) => {
  const { themeMode } = useThemeContext()
  return (
    <Button
      type="submit"
      sx={{ borderRadius: 2, backgroundColor: 'background.paper' }}
      variant="outlined"
      fullWidth={fullWidth}
      style={{ textTransform: 'none' }}
      disabled={disabled}
      onClick={accion}
    >
      <Image
        src={
          themeMode == 'light'
            ? `${Constantes.sitePath}/logo_ciudadania2.png`
            : `${Constantes.sitePath}/logo_ciudadania2_dark.png`
        }
        alt={altText}
        width="37"
        height="30"
      />
      {children}
    </Button>
  )
}
