import Icon from '@mui/material/Icon'

import { FC, PropsWithChildren } from 'react'
import { OverridableStringUnion } from '@mui/types'
import {
  IconPropsColorOverrides,
  IconPropsSizeOverrides,
} from '@mui/material/Icon/Icon'

interface Props {
  color?: OverridableStringUnion<
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    IconPropsColorOverrides
  >
  fontSize?: OverridableStringUnion<
    'inherit' | 'large' | 'medium' | 'small',
    IconPropsSizeOverrides
  >
}

export const Icono: FC<PropsWithChildren<Props>> = ({
  color = 'primary',
  fontSize = 'medium',
  children,
}) => {
  return (
    <Icon
      fontSize={fontSize}
      color={`${color}`}
      className={'material-icons-outlined'}
    >
      {children}
    </Icon>
  )
}
