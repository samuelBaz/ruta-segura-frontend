import Icon from '@mui/material/Icon'

import { FC, PropsWithChildren } from 'react'
import { OverridableStringUnion } from '@mui/types'
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon'
import { SxProps, Theme } from '@mui/material'

interface Props {
  color?:
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  fontSize?: OverridableStringUnion<
    'inherit' | 'large' | 'medium' | 'small',
    IconPropsSizeOverrides
  >
  sx?: SxProps<Theme> | undefined
}

export const Icono: FC<PropsWithChildren<Props>> = ({
  color = 'primary',
  fontSize = 'medium',
  children,
  sx = {},
}) => {
  return (
    <Icon
      sx={{ ...sx }}
      fontSize={fontSize}
      color={`${color}`}
      className={'material-icons-outlined'}
    >
      {children}
    </Icon>
  )
}
