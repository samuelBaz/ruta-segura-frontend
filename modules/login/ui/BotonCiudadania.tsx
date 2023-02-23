import Image from 'next/image'
import { Button, ButtonProps } from '@mui/material'
import { useThemeContext } from '../../../context/ui/ThemeContext'
import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import { Constantes } from '../../../config'
import { styled } from '@mui/system'

export interface BotonCiudadaniaType {
  altText: string
  disabled?: boolean | undefined
  accion: MouseEventHandler<any> | undefined
  fullWidth?: boolean
}

const ColorButton = styled(Button)<ButtonProps>(({}) => {
  const { themeMode } = useThemeContext()
  return {
    color: themeMode == 'light' ? '#3C5BA9' : '#B3C5FF',
  }
})

export const BotonCiudadania: FC<PropsWithChildren<BotonCiudadaniaType>> = ({
  disabled,
  accion,
  children,
  altText,
  fullWidth,
}) => {
  return (
    <ColorButton
      type="button"
      sx={{ borderRadius: 2, border: 1, bgcolor: 'background.paper' }}
      variant="outlined"
      fullWidth={fullWidth}
      style={{ textTransform: 'none' }}
      disabled={disabled}
      onClick={accion}
    >
      <Image
        src={`${Constantes.sitePath}/logo_ciudadania_redondo.png`}
        alt={altText}
        width="35"
        height="35"
        quality={'100'}
        style={{ objectFit: 'contain' }}
      />
      {children}
    </ColorButton>
  )
}
