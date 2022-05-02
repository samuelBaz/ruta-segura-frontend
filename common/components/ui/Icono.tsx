import Icon from '@mui/material/Icon'

import { FC, PropsWithChildren } from 'react'

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
}

export const Icono: FC<PropsWithChildren<Props>> = ({
  color = 'primary',
  children,
}) => {
  return (
    <Icon color={`${color}`} className={'material-icons-outlined'}>
      {children}
    </Icon>
  )
}
