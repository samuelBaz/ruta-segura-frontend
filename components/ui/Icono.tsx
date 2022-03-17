import Icon from '@mui/material/Icon'
import * as React from 'react'
import { FC } from 'react'

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

const Icono: FC<Props> = ({ color = 'primary', children }) => {
  return (
    <Icon color={`${color}`} className={'material-icons-outlined'}>
      {children}
    </Icon>
  )
}

export default Icono
